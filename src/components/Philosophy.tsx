const PILLARS = [
  {
    no: '01',
    en: 'Trust',
    title: '신뢰',
    desc: '투명한 운영과 정직한 소통을 바탕으로, 고객과의 신뢰를 모든 가치의 중심에 둡니다.',
  },
  {
    no: '02',
    en: 'Responsibility',
    title: '책임',
    desc: '책임 있는 의사결정으로 고객의 자산을 신중하게 다루며, 끝까지 함께 책임을 다합니다.',
  },
  {
    no: '03',
    en: 'Expertise',
    title: '전문성',
    desc: '끊임없는 연구와 체계적인 분석 시스템으로 전문성과 내부 역량을 꾸준히 발전시킵니다.',
  },
]

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative overflow-hidden bg-navy py-24 text-ivory sm:py-32"
    >
      <div className="grid-lines absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -right-[6%] top-[8%] h-[40vw] max-h-[520px] w-[40vw] max-w-[520px] rounded-full bg-gold/10 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow text-gold-soft" data-reveal="fade">
              Philosophy · 투자철학
            </p>
            <h2
              className="display-kr mt-6 text-[clamp(2rem,4vw,3.3rem)] leading-[1.3] text-ivory"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              흔들리지 않는 원칙,
              <br />
              <span className="text-gold-soft">변하지 않는 신뢰</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p
              className="text-[0.99rem] leading-[1.95] text-ivory/65"
              data-reveal
              style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
            >
              원타임 그룹은 신뢰와 책임, 그리고 전문성을 기반으로 변화하는
              금융 시장 속에서 고객과 함께 성장하는 든든한 투자 파트너가
              되겠습니다.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <article
              key={p.no}
              className="group relative overflow-hidden rounded-2xl border border-ivory/12 bg-navy-soft/70 p-9 transition-all duration-500 hover:-translate-y-2 hover:border-gold/45 hover:bg-navy-soft sm:p-10"
              data-reveal
              style={{ '--reveal-delay': `${i * 120}ms` } as React.CSSProperties}
            >
              <div
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-soft transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden
              />
              <div className="flex items-baseline justify-between">
                <span className="display text-[1.05rem] tracking-[0.2em] text-gold-soft">
                  {p.no}
                </span>
                <span className="display text-[1.15rem] italic tracking-[0.04em] text-ivory/35">
                  {p.en}
                </span>
              </div>
              <h3 className="display-kr mt-8 text-[clamp(2rem,3vw,2.6rem)] text-ivory">
                {p.title}
              </h3>
              <div className="mt-5 h-px w-12 bg-gold/55" />
              <p className="mt-5 text-[0.95rem] leading-[1.9] text-ivory/62">
                {p.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
