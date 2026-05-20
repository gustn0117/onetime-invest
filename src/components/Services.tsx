const SERVICES = [
  {
    no: '01',
    title: '시장 분석 & 리서치',
    en: 'Market Research',
    desc: '급변하는 글로벌 경제 흐름과 다양한 시장 변수를 정밀하게 분석하여, 데이터에 기반한 정확한 투자 인사이트를 제공합니다.',
    tags: ['글로벌 매크로', '산업 분석'],
    icon: (
      <>
        <path
          d="M6 34h32M10 34V20m8 14V12m8 22V22m8 12V8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    no: '02',
    title: '맞춤형 투자 컨설팅',
    en: 'Tailored Consulting',
    desc: '개인 투자자부터 다양한 목적과 방향성을 가진 고객까지, 투자 성향에 맞춘 1:1 맞춤형 전략을 설계합니다.',
    tags: ['1:1 컨설팅', '포트폴리오 설계'],
    icon: (
      <>
        <circle cx="20" cy="13" r="7" fill="none" stroke="currentColor" strokeWidth="2.6" />
        <path
          d="M7 35c0-7.2 5.8-13 13-13s13 5.8 13 13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    no: '03',
    title: '리스크 관리',
    en: 'Risk Management',
    desc: '체계적인 리스크 관리 시스템으로 변화하는 시장 환경 속에서도 고객의 소중한 자산을 안정적으로 지켜냅니다.',
    tags: ['리스크 진단', '자산 방어'],
    icon: (
      <path
        d="M20 4 7 9v10c0 8.4 5.4 13.4 13 16 7.6-2.6 13-7.6 13-16V9L20 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    no: '04',
    title: '장기 자산 전략',
    en: 'Long-term Strategy',
    desc: '단기 성과가 아닌 안정성과 지속 가능성에 기반하여, 고객의 미래 가치를 키워가는 장기 자산 전략을 제시합니다.',
    tags: ['지속 가능성', '자산 성장'],
    icon: (
      <>
        <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="2.6" />
        <path
          d="M20 9v11l8 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="max-w-[44rem]">
          <p className="eyebrow" data-reveal="fade">
            Services · 사업영역
          </p>
          <h2
            className="display-kr mt-6 text-[clamp(1.95rem,3.7vw,3.05rem)] leading-[1.32] text-navy"
            data-reveal
            style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
          >
            원타임이 함께하는
            <br />
            <span className="text-gold-deep">투자 컨설팅 영역</span>
          </h2>
          <p
            className="mt-7 text-[0.99rem] leading-[1.9] text-muted"
            data-reveal
            style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
          >
            정확한 분석과 책임 있는 전략으로, 고객의 안정적인 자산 성장을
            위한 컨설팅 서비스를 제공합니다.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {SERVICES.map((s, i) => (
            <article
              key={s.no}
              className="group relative overflow-hidden rounded-2xl border border-line bg-ivory p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_30px_64px_-36px_rgba(12,28,54,0.46)] sm:p-10"
              data-reveal
              style={{ '--reveal-delay': `${(i % 2) * 110}ms` } as React.CSSProperties}
            >
              <span
                className="display absolute right-7 top-5 text-[4.4rem] leading-none text-navy/[0.06] transition-colors duration-500 group-hover:text-gold/20"
                aria-hidden
              >
                {s.no}
              </span>
              <div className="relative">
                <span className="flex h-15 w-15 items-center justify-center rounded-xl bg-navy text-gold-soft transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
                  <svg viewBox="0 0 40 40" className="h-8 w-8">
                    {s.icon}
                  </svg>
                </span>
                <p className="mt-6 font-sans text-[0.66rem] font-semibold tracking-[0.3em] text-gold-deep">
                  {s.en.toUpperCase()}
                </p>
                <h3 className="display-kr mt-2 text-[clamp(1.3rem,2vw,1.6rem)] text-navy">
                  {s.title}
                </h3>
                <p className="mt-3.5 text-[0.95rem] leading-[1.85] text-muted">
                  {s.desc}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-navy/[0.05] px-3.5 py-1.5 text-[0.8rem] font-medium text-ink-soft"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
