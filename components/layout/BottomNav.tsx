'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  {
    href: '/',
    label: 'Home',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#d97706' : 'none'} stroke={active ? '#d97706' : '#a8a29e'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"/>
      </svg>
    ),
  },
  {
    href: '/shop',
    label: 'Shop',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#d97706' : 'none'} stroke={active ? '#d97706' : '#a8a29e'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z"/>
        <line x1="3" y1="6" x2="21" y2="6" stroke={active ? '#d97706' : '#a8a29e'} strokeWidth="1.8"/>
        <path d="M16 10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10" stroke={active ? '#d97706' : '#a8a29e'} strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#d97706' : 'none'} stroke={active ? '#d97706' : '#a8a29e'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15C21 15.53 20.79 16.04 20.41 16.41C20.04 16.79 19.53 17 19 17H7L3 21V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H19C19.53 3 20.04 3.21 20.41 3.59C20.79 3.96 21 4.47 21 5V15Z"/>
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/97 backdrop-blur-md border-t border-stone-100 z-50 shadow-[0_-1px_12px_rgba(0,0,0,0.05)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center h-16">
        {tabs.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 relative"
            >
              {/* Active top indicator */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber-500 rounded-b-full" />
              )}

              {tab.icon(isActive)}

              <span className={`text-[10px] font-semibold tracking-wide transition-colors ${
                isActive ? 'text-amber-600' : 'text-stone-400'
              }`}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
