import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { SERVICES } from '../data'

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

function ServiceList() {
  return (
    <section className="bg-white py-24 sm:py-32">
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
            정확한 분석과 책임 있는 전략으로, 고객의 안정적인 자산 성장을 위한
            컨설팅 서비스를 제공합니다.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {SERVICES.map((s, i) => (
            <article
              key={s.no}
              className="group relative overflow-hidden rounded-2xl border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_30px_64px_-36px_rgba(12,28,54,0.46)] sm:p-10"
              data-reveal
              style={
                { '--reveal-delay': `${(i % 2) * 110}ms` } as React.CSSProperties
              }
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

function Philosophy() {
  return (
    <section className="border-t border-line bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow" data-reveal="fade">
              Philosophy · 투자철학
            </p>
            <h2
              className="display-kr mt-6 text-[clamp(1.95rem,3.7vw,3.05rem)] leading-[1.3] text-navy"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              흔들리지 않는 원칙,
              <br />
              <span className="text-gold-deep">변하지 않는 신뢰</span>
            </h2>
            <div className="rule-gold mt-8" data-reveal="fade" />
            <p
              className="mt-8 max-w-[34rem] text-[0.99rem] leading-[1.95] text-muted"
              data-reveal
              style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
            >
              원타임 그룹은 신뢰와 책임, 그리고 전문성을 기반으로 변화하는
              금융 시장 속에서 고객과 함께 성장하는 든든한 투자 파트너가
              되겠습니다. 단기적인 성과보다 안정성과 지속 가능성에 기반한
              장기적인 투자 방향을 가장 중요하게 생각합니다.
            </p>
          </div>

          <div
            className="lg:col-span-6"
            data-reveal="right"
            style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
          >
            <div className="overflow-hidden rounded-2xl border border-line shadow-[0_36px_80px_-46px_rgba(12,28,54,0.5)]">
              <img
                src="/photo-towers.jpg"
                alt="신뢰를 상징하는 현대적인 금융 빌딩"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <article
              key={p.no}
              className="group relative overflow-hidden rounded-2xl bg-navy p-9 transition-all duration-500 hover:-translate-y-2 sm:p-10"
              data-reveal
              style={{ '--reveal-delay': `${i * 120}ms` } as React.CSSProperties}
            >
              <div className="grid-lines absolute inset-0" aria-hidden />
              <div
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-soft transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden
              />
              <div className="relative">
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function NextStep() {
  return (
    <section className="border-t border-line bg-white py-20 sm:py-24">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div data-reveal="fade">
          <h2 className="display-kr text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.4] text-navy">
            컨설팅이 어떻게 진행되는지 궁금하신가요?
          </h2>
          <p className="mt-3 text-[0.96rem] leading-[1.8] text-muted">
            첫 상담부터 사후 관리까지, 원타임의 4단계 프로세스를 확인해 보세요.
          </p>
        </div>
        <Link
          to="/process"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-navy/25 px-7 py-3.5 text-[0.95rem] font-semibold text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-ivory"
          data-reveal="fade"
        >
          프로세스 보기
          <span
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          >
            →
          </span>
        </Link>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services · 사업영역"
        title="투자 컨설팅 영역"
        desc="시장 분석부터 맞춤형 컨설팅, 리스크 관리, 장기 자산 전략까지 — 데이터에 기반한 책임 있는 투자 솔루션을 제공합니다."
        image="/photo-dashboard.jpg"
        crumb="사업영역"
      />
      <ServiceList />
      <Philosophy />
      <NextStep />
    </>
  )
}
