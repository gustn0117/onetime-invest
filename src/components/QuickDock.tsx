const PHONE = '070-4633-5330'

// TODO: 실제 채널 주소로 교체 (받는 대로 적용)
const KAKAO_URL = '#'
const BLOG_URL = '#'

function TalkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[21px] w-[21px]" aria-hidden>
      <path
        d="M12 4C6.9 4 3 7.3 3 11.3c0 2.5 1.7 4.8 4.2 6.1-.2.7-.7 2.4-.8 2.8-.1.4.2.6.5.4.4-.2 2.8-1.9 3.8-2.6.4 0 .9.1 1.3.1 5.1 0 9-3.3 9-7.3S17.1 4 12 4Z"
        fill="currentColor"
      />
    </svg>
  )
}

function BlogIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[21px] w-[21px]" aria-hidden>
      <path
        d="M3 16.8V21h4.2L19.5 8.7l-4.2-4.2L3 16.8Zm17.7-11.3a1.1 1.1 0 0 0 0-1.6l-2.6-2.6a1.1 1.1 0 0 0-1.6 0l-2 2 4.2 4.2 2-2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[21px] w-[21px]" aria-hidden>
      <path
        d="M6.5 3.5h3.3l1.6 4.9-2.4 1.6a12.6 12.6 0 0 0 5.5 5.5l1.6-2.4 4.9 1.6v3.3a1.7 1.7 0 0 1-1.8 1.7A16.9 16.9 0 0 1 4.8 5.3 1.7 1.7 0 0 1 6.5 3.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

const ITEMS = [
  { key: 'kakao', label: '카톡상담', href: KAKAO_URL, icon: <TalkIcon />, external: true },
  { key: 'blog', label: '블로그', href: BLOG_URL, icon: <BlogIcon />, external: true },
  {
    key: 'tel',
    label: '전화상담',
    href: `tel:${PHONE}`,
    icon: <PhoneIcon />,
    sub: PHONE,
  },
]

/** Fixed right-edge quick-contact dock (KakaoTalk · Blog · Phone · scroll-to-top). */
export default function QuickDock() {
  const scrollTop = () =>
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

  return (
    <div className="fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2 sm:right-5">
      <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_48px_-20px_rgba(12,28,54,0.42)]">
        {ITEMS.map((it, i) => (
          <a
            key={it.key}
            href={it.href}
            target={it.external ? '_blank' : undefined}
            rel={it.external ? 'noreferrer' : undefined}
            onClick={(e) => {
              if (it.href === '#') e.preventDefault()
            }}
            className={`group flex w-[78px] flex-col items-center gap-1.5 px-1.5 py-3.5 text-center transition-colors duration-300 hover:bg-cream/70 ${
              i > 0 ? 'border-t border-line' : ''
            }`}
          >
            <span className="text-navy transition-colors duration-300 group-hover:text-gold-deep">
              {it.icon}
            </span>
            <span className="text-[0.63rem] font-semibold tracking-[0.02em] text-ink-soft">
              {it.label}
            </span>
            {it.sub && (
              <span className="text-[0.55rem] font-medium tracking-[-0.01em] text-muted">
                {it.sub}
              </span>
            )}
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={scrollTop}
        aria-label="맨 위로 이동"
        className="flex w-[78px] flex-col items-center gap-0.5 rounded-2xl bg-navy py-2.5 text-ivory transition-colors duration-300 hover:bg-navy-soft"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
          <path
            d="M12 5v14M6 11l6-6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[0.6rem] font-bold tracking-[0.16em]">TOP</span>
      </button>
    </div>
  )
}
