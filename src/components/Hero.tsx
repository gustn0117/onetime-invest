const PRINCIPLES = ['정확한 분석', '책임 있는 의사결정', '고객과의 신뢰']

function Emblem() {
  return (
    <div className="relative aspect-square w-full max-w-[460px]">
      {/* soft navy halo */}
      <div
        className="absolute inset-[14%] rounded-full bg-navy/5 blur-2xl"
        aria-hidden
      />
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <circle cx="200" cy="200" r="186" fill="none" stroke="#0c1c36" strokeOpacity="0.12" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="#c49a3c" strokeOpacity="0.4" />
        <g className="anim-spin-slow" style={{ transformOrigin: '200px 200px' }}>
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="#c49a3c"
            strokeWidth="1.5"
            strokeDasharray="2 14"
            strokeLinecap="round"
          />
          <circle cx="200" cy="50" r="6.5" fill="#c49a3c" />
        </g>
        <circle cx="200" cy="200" r="116" fill="none" stroke="#0c1c36" strokeOpacity="0.16" />
        {/* tick marks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180
          const r1 = 116
          const r2 = i % 3 === 0 ? 100 : 108
          return (
            <line
              key={i}
              x1={200 + r1 * Math.sin(a)}
              y1={200 - r1 * Math.cos(a)}
              x2={200 + r2 * Math.sin(a)}
              y2={200 - r2 * Math.cos(a)}
              stroke="#0c1c36"
              strokeOpacity={i % 3 === 0 ? 0.5 : 0.22}
              strokeWidth={i % 3 === 0 ? 2 : 1.4}
            />
          )
        })}
      </svg>
      {/* monogram core */}
      <div className="absolute inset-[33%] flex items-center justify-center">
        <img src="/onetime-mark.png" alt="" className="anim-float h-full w-auto" />
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream pt-[72px] sm:pt-[88px]"
    >
      {/* background atmospherics */}
      <div
        className="pointer-events-none absolute -right-[14%] -top-[10%] h-[58vw] max-h-[760px] w-[58vw] max-w-[760px] rounded-full bg-gold/10 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[20%] -left-[10%] h-[44vw] w-[44vw] rounded-full bg-navy/[0.05] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-24">
        {/* copy */}
        <div className="lg:col-span-7">
          <p className="eyebrow" data-reveal="fade">
            ONE TIME INVEST COMPANY
          </p>

          <h1
            className="display-kr mt-7 text-[clamp(2.6rem,6.6vw,5.5rem)] leading-[1.16] text-navy"
            data-reveal
            style={{ '--reveal-delay': '90ms' } as React.CSSProperties}
          >
            한 번의 기회가
            <br />
            <span className="text-gold-deep">미래</span>를 바꿉니다
          </h1>

          <p
            className="mt-8 max-w-[34rem] text-[clamp(1.05rem,1.7vw,1.32rem)] font-medium leading-[1.7] text-ink"
            data-reveal
            style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
          >
            원타임 그룹은 가장 중요한 투자 순간에 함께합니다.
          </p>
          <p
            className="mt-4 max-w-[33rem] text-[0.98rem] leading-[1.85] text-muted"
            data-reveal
            style={{ '--reveal-delay': '280ms' } as React.CSSProperties}
          >
            빠르게 변화하는 금융 시장 속에서, 신뢰받는 투자 컨설팅 파트너로서
            고객의 안정적인 자산 성장과 미래 가치를 함께 만들어갑니다.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-3.5"
            data-reveal
            style={{ '--reveal-delay': '360ms' } as React.CSSProperties}
          >
            <a
              href="#contact"
              className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.96rem] font-semibold transition-transform duration-300 hover:-translate-y-0.5"
            >
              상담 문의하기
              <span aria-hidden>→</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-navy/25 px-7 py-3.5 text-[0.96rem] font-semibold text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-ivory"
            >
              원타임 소개
            </a>
          </div>

          <ul
            className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-7"
            data-reveal
            style={{ '--reveal-delay': '440ms' } as React.CSSProperties}
          >
            {PRINCIPLES.map((p, i) => (
              <li key={p} className="flex items-center gap-5">
                {i > 0 && (
                  <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
                )}
                <span className="text-[0.92rem] font-semibold tracking-[0.02em] text-ink-soft">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* emblem */}
        <div
          className="flex justify-center lg:col-span-5 lg:justify-end"
          data-reveal="right"
          style={{ '--reveal-delay': '260ms' } as React.CSSProperties}
        >
          <Emblem />
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-label="아래로 스크롤"
      >
        <span className="font-sans text-[0.62rem] font-semibold tracking-[0.32em] text-muted">
          SCROLL
        </span>
        <span className="relative h-9 w-px bg-line">
          <span className="anim-scroll-cue absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-gold" />
        </span>
      </a>
    </section>
  )
}
