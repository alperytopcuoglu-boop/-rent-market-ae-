'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HeaderProps {
  showSearch?: boolean
  onSearchChange?: (q: string) => void
}

export default function Header({ showSearch = false, onSearchChange }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (val: string) => {
    setSearchValue(val)
    onSearchChange?.(val)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/96 backdrop-blur-md border-b border-stone-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between px-4 h-14">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          <div className="leading-none">
            <span className="font-black text-stone-900 text-[15px] tracking-tight">Rent Market</span>
            <span className="font-black text-amber-500 text-[15px] tracking-tight"> AE</span>
          </div>
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-1.5">
          {/* Search */}
          <button
            onClick={() => {
              setSearchOpen(!searchOpen)
              if (searchOpen) { handleSearch('') }
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              searchOpen ? 'bg-stone-100 text-stone-700' : 'hover:bg-stone-100 text-stone-500'
            }`}
            aria-label="Search"
          >
            {searchOpen ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            )}
          </button>

          {/* WhatsApp */}
          <a
            href="https://wa.me/971556755532"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-green-50 hover:bg-green-100 transition-colors"
            aria-label="WhatsApp"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="#22c55e">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Expandable search bar */}
      {searchOpen && (
        <div className="px-4 pb-3 animate-fade-in">
          <div className="flex items-center gap-2.5 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search cars, brands, providers…"
              className="bg-transparent flex-1 text-sm text-stone-900 placeholder-stone-400 outline-none"
              autoFocus
            />
            {searchValue && (
              <button onClick={() => handleSearch('')} className="text-stone-400">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
