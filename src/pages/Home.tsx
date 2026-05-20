import { Link } from 'react-router-dom'
import MarketOverview from '../components/MarketOverview'
import { HIGHLIGHTS, SERVICES } from '../data'

const PRINCIPLES = ['정확한 분석', '책임 있는 의사결정', '고객과의 신뢰']

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy pt-[72px] sm:pt-[88px]">
      <img
        src="/photo-skyline.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy-deep/94 via-navy/82 to-navy/55"
        aria-hidden
      />
      <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8">
        <div className="max-w-[46rem]">
          <p className="eyebrow text-gold-soft" data-reveal="fade">
            ONE TIME INVEST COMPANY
          </p>

          <h1
            className="display-kr mt-7 text-[clamp(2.7rem,6.6vw,5.5rem)] leading-[1.15] text-ivory"
            data-reveal
            style={{ '--reveal-delay': '90ms' } as React.CSSProperties}
          >
            한 번의 기회가
            <br />
            <span className="text-gold-soft">미래</span>를 바꿉니다
          </h1>

          <p
            className="mt-8 max-w-[34rem] text-[clamp(1.05rem,1.7vw,1.3rem)] font-medium leading-[1.7] text-ivory/90"
            data-reveal
            style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
          >
            원타임 그룹은 가장 중요한 투자 순간에 함께합니다.
          </p>
          <p
            className="mt-4 max-w-[33rem] text-[0.99rem] leading-[1.85] text-ivory/60"
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
            <Link
              to="/contact"
              className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.96rem] font-semibold transition-transform duration-300 hover:-translate-y-0.5"
            >
              상담 문의하기
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/35 px-7 py-3.5 text-[0.96rem] font-semibold text-ivory transition-all duration-300 hover:border-ivory hover:bg-ivory hover:text-navy"
            >
              원타임 소개
            </Link>
          </div>

          <ul
            className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ivory/15 pt-7"
            data-reveal
            style={{ '--reveal-delay': '440ms' } as React.CSSProperties}
          >
            {PRINCIPLES.map((p, i) => (
              <li key={p} className="flex items-center gap-5">
                {i > 0 && (
                  <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
                )}
                <span className="text-[0.92rem] font-semibold tracking-[0.02em] text-ivory/75">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-hidden
      >
        <span className="font-sans text-[0.62rem] font-semibold tracking-[0.32em] text-ivory/50">
          SCROLL
        </span>
        <span className="relative h-9 w-px bg-ivory/25">
          <span className="anim-scroll-cue absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-gold" />
        </span>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
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
            className="mt-8 max-w-[34rem] text-[clamp(1.02rem,1.5vw,1.14rem)] font-medium leading-[1.85] text-ink"
            data-reveal
            style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
          >
            원타임 그룹은 빠르게 변화하는 금융 시장과 투자 환경 속에서, 고객에게
            신뢰받는 투자 컨설팅 파트너가 되기 위해 끊임없이 노력합니다.
          </p>
          <p
            className="mt-5 max-w-[34rem] text-[0.99rem] leading-[1.9] text-muted"
            data-reveal
            style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
          >
            정확한 분석과 책임 있는 의사결정, 그리고 고객과의 신뢰를 가장
            중요한 가치로 삼아 안정성과 지속 가능성에 기반한 장기적인 투자
            방향을 제시합니다.
          </p>
          <Link
            to="/about"
            className="group mt-9 inline-flex items-center gap-2 text-[0.96rem] font-semibold text-navy"
            data-reveal
            style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
          >
            <span className="border-b-2 border-gold pb-0.5">
              회사소개 자세히 보기
            </span>
            <span
              className="text-gold-deep transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>

        <div
          className="lg:col-span-6"
          data-reveal="right"
          style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
        >
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-line shadow-[0_36px_80px_-46px_rgba(12,28,54,0.5)]">
              <img
                src="/photo-corridor.jpg"
                alt="원타임 그룹의 현대적인 오피스 공간"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-7 -left-3 hidden rounded-2xl bg-navy px-7 py-6 shadow-[0_28px_60px_-30px_rgba(12,28,54,0.7)] sm:block">
              <p className="display text-[2.6rem] leading-none text-gold-soft">
                ONE
              </p>
              <p className="mt-1.5 text-[0.82rem] leading-snug text-ivory/70">
                한 번의 기회가
                <br />
                미래를 바꿉니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <section className="border-t border-line bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="text-center" data-reveal="fade">
          <p className="eyebrow eyebrow--center">Why ONE TIME · 핵심 가치</p>
          <h2 className="display-kr mx-auto mt-6 max-w-[28rem] text-[clamp(1.95rem,3.7vw,3.05rem)] leading-[1.32] text-navy">
            원타임이 지키는 <span className="text-gold-deep">세 가지 원칙</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
          {HIGHLIGHTS.map((h, i) => (
            <article
              key={h.title}
              className="group rounded-2xl border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-[0_30px_64px_-40px_rgba(12,28,54,0.42)]"
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

function ServicesPreview() {
  return (
    <section className="border-t border-line bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[34rem]">
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
          </div>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 self-start text-[0.96rem] font-semibold text-navy sm:self-auto"
            data-reveal="fade"
          >
            <span className="border-b-2 border-gold pb-0.5">전체 보기</span>
            <span
              className="text-gold-deep transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {SERVICES.map((s, i) => (
            <Link
              key={s.no}
              to="/services"
              className="group relative flex items-start gap-5 overflow-hidden rounded-2xl border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_30px_64px_-38px_rgba(12,28,54,0.42)] sm:p-8"
              data-reveal
              style={{ '--reveal-delay': `${(i % 2) * 110}ms` } as React.CSSProperties}
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-gold-soft transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
                <svg viewBox="0 0 40 40" className="h-7 w-7">
                  {s.icon}
                </svg>
              </span>
              <span className="min-w-0">
                <span className="font-sans text-[0.66rem] font-semibold tracking-[0.3em] text-gold-deep">
                  {s.no} · {s.en.toUpperCase()}
                </span>
                <span className="display-kr mt-1.5 block text-[1.28rem] text-navy">
                  {s.title}
                </span>
                <span className="mt-2 block text-[0.92rem] leading-[1.75] text-muted">
                  {s.desc}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-ivory sm:py-28">
      <img
        src="/photo-towers.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 to-navy/80"
        aria-hidden
      />
      <div className="grid-lines absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1280px] px-5 text-center sm:px-8">
        <p className="eyebrow eyebrow--center text-gold-soft" data-reveal="fade">
          Contact · 상담 문의
        </p>
        <h2
          className="display-kr mx-auto mt-6 max-w-[30rem] text-[clamp(1.95rem,3.7vw,3.1rem)] leading-[1.32] text-ivory"
          data-reveal
        >
          가장 중요한 투자 순간,
          <br />
          <span className="text-gold-soft">원타임과 함께하세요</span>
        </h2>
        <p
          className="mx-auto mt-6 max-w-[31rem] text-[0.99rem] leading-[1.9] text-ivory/65"
          data-reveal
        >
          투자에 대한 어떤 고민이든 편하게 문의해 주세요. 원타임 그룹의 전문
          컨설턴트가 정성껏 안내해 드립니다.
        </p>
        <Link
          to="/contact"
          className="btn-gold mt-9 inline-flex items-center gap-2 rounded-full px-8 py-4 text-[0.98rem] font-bold transition-transform duration-300 hover:-translate-y-0.5"
          data-reveal
        >
          상담 문의하기
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <MarketOverview />
      <Intro />
      <Highlights />
      <ServicesPreview />
      <CtaBand />
    </>
  )
}
