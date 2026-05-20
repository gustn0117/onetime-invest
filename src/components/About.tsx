const HIGHLIGHTS = [
  {
    title: '정확한 분석',
    desc: '급변하는 글로벌 경제 흐름과 다양한 시장 변수를 정밀하게 읽어냅니다.',
    icon: (
      <path
        d="M4 28 14 17l7 6L36 8M27 8h9v9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: '책임 있는 의사결정',
    desc: '모든 판단에 책임을 더해 고객의 소중한 자산을 신중하게 다룹니다.',
    icon: (
      <path
        d="M20 4 6 10v9c0 9 6 14 14 17 8-3 14-8 14-17v-9L20 4Zm-6 16 4 4 9-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: '투명한 신뢰',
    desc: '투명한 운영과 정직한 소통으로 고객과의 신뢰를 끝까지 지킵니다.',
    icon: (
      <>
        <circle
          cx="20"
          cy="20"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <path
          d="M20 11v9l6 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
]

const VALUES = ['투명한 운영', '체계적 분석', '리스크 관리']

export default function About() {
  return (
    <section id="about" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* intro copy */}
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal="fade">
              About · 회사소개
            </p>
            <h2
              className="display-kr mt-6 text-[clamp(1.95rem,3.7vw,3.05rem)] leading-[1.32] text-navy"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              신뢰받는 투자 컨설팅 파트너,
              <br />
              <span className="text-gold-deep">원타임 그룹</span>입니다
            </h2>
            <div className="rule-gold mt-8" data-reveal="fade" />
            <p
              className="mt-8 max-w-[40rem] text-[clamp(1.02rem,1.5vw,1.16rem)] font-medium leading-[1.85] text-ink"
              data-reveal
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
            >
              원타임 그룹은 빠르게 변화하는 금융 시장과 투자 환경 속에서,
              고객에게 신뢰받는 투자 컨설팅 파트너가 되기 위해 끊임없이
              노력합니다.
            </p>
            <p
              className="mt-5 max-w-[40rem] text-[0.99rem] leading-[1.9] text-muted"
              data-reveal
              style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
            >
              단순한 정보만으로는 올바른 판단을 내리기 어려운 시대입니다.
              원타임 그룹은 정확한 분석과 책임 있는 의사결정, 그리고 고객과의
              신뢰를 가장 중요한 가치로 삼아 안정성과 지속 가능성에 기반한
              장기적인 투자 방향을 제시합니다.
            </p>
          </div>

          {/* navy statement card */}
          <div
            className="lg:col-span-5"
            data-reveal="right"
            style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
          >
            <div className="relative overflow-hidden rounded-2xl bg-navy p-9 sm:p-10">
              <div className="grid-lines absolute inset-0" aria-hidden />
              <div
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/12 blur-2xl"
                aria-hidden
              />
              <div className="relative">
                <img
                  src="/onetime-mark-light.png"
                  alt=""
                  className="h-12 w-auto"
                />
                <p className="mt-7 font-sans text-[0.7rem] font-semibold tracking-[0.34em] text-gold-soft">
                  ONE TIME GROUP
                </p>
                <p className="display-kr mt-4 text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[1.5] text-ivory">
                  가장 중요한 투자 순간,
                  <br />
                  흔들리지 않는 원칙으로
                  <br />
                  함께합니다.
                </p>
                <div className="mt-8 h-px w-full bg-ivory/12" />
                <ul className="mt-7 flex flex-wrap gap-2.5">
                  {VALUES.map((v) => (
                    <li
                      key={v}
                      className="rounded-full border border-gold/35 px-4 py-1.5 text-[0.82rem] font-medium text-gold-soft"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* highlights */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-3 sm:gap-6">
          {HIGHLIGHTS.map((h, i) => (
            <article
              key={h.title}
              className="group rounded-2xl border border-line bg-ivory p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-[0_28px_60px_-34px_rgba(12,28,54,0.42)]"
              data-reveal
              style={{ '--reveal-delay': `${i * 110}ms` } as React.CSSProperties}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-gold-soft transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
                <svg viewBox="0 0 40 40" className="h-7 w-7">
                  {h.icon}
                </svg>
              </span>
              <h3 className="display-kr mt-6 text-[1.3rem] text-navy">
                {h.title}
              </h3>
              <p className="mt-3 text-[0.94rem] leading-[1.8] text-muted">
                {h.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
