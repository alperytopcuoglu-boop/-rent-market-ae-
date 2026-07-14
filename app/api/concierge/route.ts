import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '@/lib/concierge/knowledge'
import { CONCIERGE_TOOLS, runSearchCars, runQuoteTotal } from '@/lib/concierge/tools'
import { checkRateLimit } from '@/lib/concierge/ratelimit'

export const runtime = 'nodejs'
export const maxDuration = 60

const MODEL = 'claude-haiku-4-5'
const MAX_TURNS = 30
const MAX_MSG_CHARS = 2000
const MAX_TOOL_ITERATIONS = 6

interface ClientMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ConciergePart {
  type: 'text' | 'card'
  text?: string
  card?: { type: string; payload: Record<string, unknown> }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'concierge_unconfigured', message: 'Concierge is not configured yet.' },
      { status: 503 }
    )
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  let body: { messages?: ClientMessage[]; entryPage?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const history = (body.messages ?? []).slice(-MAX_TURNS)
  if (history.length === 0 || history[history.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }
  if (history.some((m) => typeof m.content !== 'string' || m.content.length > MAX_MSG_CHARS)) {
    return NextResponse.json({ error: 'message_too_long' }, { status: 400 })
  }

  const client = new Anthropic({ apiKey })
  const system = buildSystemPrompt(body.entryPage)

  const messages: Anthropic.MessageParam[] = history.map((m) => ({
    role: m.role,
    content: m.content,
  }))

  const parts: ConciergePart[] = []

  try {
    for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
        tools: CONCIERGE_TOOLS,
        messages,
      })

      const toolUseBlocks = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
      )

      for (const block of response.content) {
        if (block.type === 'text' && block.text.trim()) {
          parts.push({ type: 'text', text: block.text })
        } else if (block.type === 'tool_use' && block.name === 'render_card') {
          const input = block.input as { type: string; payload: Record<string, unknown> }
          parts.push({ type: 'card', card: { type: input.type, payload: input.payload ?? {} } })
        }
      }

      if (response.stop_reason !== 'tool_use' || toolUseBlocks.length === 0) break

      messages.push({ role: 'assistant', content: response.content })

      const toolResults: Anthropic.ToolResultBlockParam[] = toolUseBlocks.map((tool) => {
        let result = 'rendered'
        try {
          if (tool.name === 'search_cars') {
            result = runSearchCars(tool.input as Parameters<typeof runSearchCars>[0])
          } else if (tool.name === 'quote_total') {
            result = runQuoteTotal(tool.input as Parameters<typeof runQuoteTotal>[0])
          }
        } catch (e) {
          return {
            type: 'tool_result' as const,
            tool_use_id: tool.id,
            content: `ERROR: ${e instanceof Error ? e.message : 'tool failed'}`,
            is_error: true,
          }
        }
        return { type: 'tool_result' as const, tool_use_id: tool.id, content: result }
      })

      messages.push({ role: 'user', content: toolResults })
    }
  } catch (e) {
    console.error('[concierge] API error', e)
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 })
  }

  // İstemcinin sohbet geçmişinde saklayacağı kompakt asistan metni
  const historyText = parts
    .map((p) =>
      p.type === 'text' ? p.text : `[${p.card?.type} card shown: ${JSON.stringify(p.card?.payload).slice(0, 200)}]`
    )
    .join('\n')

  return NextResponse.json({ parts, historyText })
}
