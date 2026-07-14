// Per-IP sliding window. In-memory — Vercel'de instance başına çalışır;
// MVP için yeterli, kalıcı çözüm Faz 2'de (Upstash vb.).

const WINDOW_MS = 10 * 60 * 1000
const MAX_MESSAGES = 20

const hits = new Map<string, number[]>()

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (list.length >= MAX_MESSAGES) {
    hits.set(ip, list)
    return false
  }
  list.push(now)
  hits.set(ip, list)
  // basit temizlik
  if (hits.size > 5000) {
    const cutoff = now - WINDOW_MS
    hits.forEach((v, k) => {
      if (v.every((t) => t < cutoff)) hits.delete(k)
    })
  }
  return true
}
