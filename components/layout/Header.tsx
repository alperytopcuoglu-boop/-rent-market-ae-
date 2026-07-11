'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Fleet' },
  { href: '/contact', label: 'Contact' },
]

interface HeaderProps {
  showSearch?: boolean
  onSearchChange?: (q: string) => void
}

export default function Header({ showSearch = false, onSearchChange }: HeaderProps) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (val: string) => {
    setSearchValue(val)
    onSearchChange?.(val)
  }

  return (
    <header className="sticky top-0 z-40 glass-strong">
      <div className="flex items-center justify-between px-5 h-16 md:h-[72px] max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Rent Market AE"
            width={168}
            height={49}
            priority
            unoptimized
            className="h-9 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-semibold tracking-wide uppercase transition-colors ${
                  isActive ? 'text-gold' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => {
              setSearchOpen(!searchOpen)
              if (searchOpen) { handleSearch('') }
            }}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors border ${
              searchOpen
                ? 'bg-stone-100 border-stone-300 text-stone-800'
                : 'border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-100'
            }`}
            aria-label="Search"
          >
            {searchOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            )}
          </button>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/971556755532"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-10 px-3.5 md:px-5 rounded-full bg-gold-gradient text-white transition-transform hover:scale-[1.03]"
            aria-label="WhatsApp"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="hidden md:inline text-[12px] font-bold tracking-wide uppercase">Book Now</span>
          </a>
        </div>
      </div>

      {/* Expandable search bar */}
      {searchOpen && (
        <div className="px-5 pb-4 animate-fade-in max-w-7xl mx-auto">
          <div className="flex items-center gap-3 glass rounded-2xl px-4 py-3">
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
              <button onClick={() => handleSearch('')} className="text-stone-400 hover:text-stone-900">
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
