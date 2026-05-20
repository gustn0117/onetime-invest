import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { to: '/about', label: '회사소개' },
  { to: '/services', label: '사업영역' },
  { to: '/process', label: '프로세스' },
] as const

function Brandmark({
  light = false,
  onClick,
}: {
  light?: boolean
  onClick?: () => void
}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex items-center gap-3"
      aria-label="원타임 그룹 홈"
    >
      <img
        src={light ? '/onetime-mark-light.png' : '/onetime-mark.png'}
        alt=""
        className="h-10 w-auto transition-transform duration-500 group-hover:scale-105 sm:h-11"
      />
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span
          className={`display text-[1.18rem] tracking-[0.18em] sm:text-[1.32rem] ${
            light ? 'text-ivory' : 'text-navy'
          }`}
        >
          ONE&nbsp;TIME
        </span>
        <span className="mt-[3px] font-sans text-[0.5rem] font-semibold tracking-[0.275em] text-gold-deep sm:text-[0.56rem]">
          INVEST&nbsp;COMPANY
        </span>
      </span>
    </Link>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (to: string) => pathname === to

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-line bg-white/95 shadow-[0_10px_40px_-26px_rgba(12,28,54,0.5)] backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:h-[88px] sm:px-8">
          <Brandmark light={!scrolled} />

          <nav className="hidden items-center gap-9 lg:flex" aria-label="주요 메뉴">
            {NAV.map((item) => {
              const active = isActive(item.to)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative font-sans text-[0.95rem] font-medium tracking-[0.01em] transition-colors duration-300 ${
                    scrolled
                      ? active
                        ? 'text-navy'
                        : 'text-ink-soft hover:text-navy'
                      : active
                        ? 'text-ivory'
                        : 'text-ivory/72 hover:text-ivory'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-[400ms] ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="btn-gold hidden rounded-full px-6 py-3 text-[0.9rem] font-semibold tracking-[0.02em] transition-transform duration-300 hover:-translate-y-0.5 lg:inline-flex"
            >
              상담 문의
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3.5 w-6" aria-hidden>
                <span
                  className={`absolute left-0 top-0 block h-[2px] w-6 ${scrolled ? 'bg-navy' : 'bg-ivory'}`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-[2px] w-6 ${scrolled ? 'bg-navy' : 'bg-ivory'}`}
                />
                <span
                  className={`absolute left-0 top-3 block h-[2px] w-6 ${scrolled ? 'bg-navy' : 'bg-ivory'}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-navy transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="relative flex h-[72px] shrink-0 items-center justify-between px-5">
          <Brandmark light onClick={() => setOpen(false)} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="메뉴 닫기"
            className="flex h-11 w-11 items-center justify-center"
          >
            <span className="relative block h-5 w-5" aria-hidden>
              <span className="absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 rotate-45 bg-ivory" />
              <span className="absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 -rotate-45 bg-ivory" />
            </span>
          </button>
        </div>

        <nav
          className="relative flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-7 py-6"
          aria-label="모바일 메뉴"
        >
          {NAV.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-ivory/10 py-4"
            >
              <span className="display text-sm text-gold/70">0{i + 1}</span>
              <span
                className={`display-kr text-[1.7rem] transition-colors duration-300 group-hover:text-gold-soft ${
                  isActive(item.to) ? 'text-gold-soft' : 'text-ivory'
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="btn-gold mt-8 inline-flex w-full items-center justify-center rounded-full py-4 text-base font-semibold"
          >
            상담 문의하기
          </Link>
        </nav>

        <p className="relative shrink-0 px-7 pb-9 font-sans text-xs tracking-[0.05em] text-ivory/45">
          ONE TIME GROUP · 한 번의 기회가 미래를 바꿉니다
        </p>
      </div>
    </>
  )
}
