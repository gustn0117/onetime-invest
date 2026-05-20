import PageHero from '../components/PageHero'
import { HIGHLIGHTS } from '../data'

const VALUES = ['투명한 운영', '체계적 분석', '리스크 관리']

const LETTER_TOP = [
  '원타임 그룹은 빠르게 변화하는 금융 시장과 투자 환경 속에서 고객에게 신뢰받는 투자 컨설팅 파트너가 되기 위해 끊임없이 노력하고 있습니다.',
  '오늘날의 투자 시장은 단순한 정보만으로는 올바른 판단을 내리기 어려운 시대가 되었습니다. 급변하는 글로벌 경제 흐름과 다양한 시장 변수 속에서 무엇보다 중요한 것은 정확한 분석과 책임 있는 의사결정, 그리고 고객과의 신뢰라고 생각합니다.',
  '원타임 그룹은 단기적인 성과만을 추구하기보다 안정성과 지속 가능성을 기반으로 한 장기적인 투자 방향을 중요하게 생각합니다. 투명한 운영과 체계적인 분석 시스템을 바탕으로 고객에게 보다 안정적이고 효율적인 투자 전략을 제안하며, 변화하는 시장 환경 속에서도 흔들리지 않는 원칙을 지켜나가고 있습니다.',
]

const LETTER_BOTTOM = [
  '또한 투자 환경과 금융 제도의 변화에 능동적으로 대응하기 위해 시장 분석 역량 강화와 리스크 관리 체계 구축에 지속적으로 힘쓰고 있으며, 고객에게 보다 신뢰도 높은 컨설팅 서비스를 제공하기 위해 전문성과 내부 시스템을 꾸준히 발전시켜 나가고 있습니다.',
  '원타임 그룹은 개인 투자자뿐만 아니라 다양한 투자 목적과 방향성을 가진 고객들에게 맞춤형 컨설팅 서비스를 제공하며, 국내외 시장에 대한 폭넓은 분석과 전략적인 접근을 통해 고객의 안정적인 자산 성장과 미래 가치를 함께 만들어가고자 합니다.',
  '앞으로도 원타임 그룹은 신뢰와 책임, 그리고 전문성을 기반으로 변화하는 금융 시장 속에서 고객과 함께 성장하는 든든한 투자 파트너가 되겠습니다. 끊임없는 연구와 올바른 투자 철학을 바탕으로 더욱 신뢰받는 기업으로 성장해 나가겠습니다.',
  '원타임 그룹을 믿고 함께해주시는 모든 분들께 진심으로 감사드리며, 앞으로도 변함없는 관심과 성원을 부탁드립니다.',
]

function Overview() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal="fade">
              Overview · 기업 개요
            </p>
            <h2
              className="display-kr mt-6 text-[clamp(1.95rem,3.7vw,3.05rem)] leading-[1.32] text-navy"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              정확한 분석과 책임으로
              <br />
              <span className="text-gold-deep">미래 가치</span>를 함께합니다
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
      </div>
    </section>
  )
}

function Values() {
  return (
    <section className="border-t border-line bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="text-center" data-reveal="fade">
          <p className="eyebrow eyebrow--center">Core Value · 핵심 가치</p>
          <h2 className="display-kr mx-auto mt-6 max-w-[28rem] text-[clamp(1.95rem,3.7vw,3.05rem)] leading-[1.32] text-navy">
            원타임을 움직이는 <span className="text-gold-deep">가치</span>
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

function Greeting() {
  return (
    <section className="border-t border-line bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="text-center" data-reveal="fade">
          <p className="eyebrow eyebrow--center">CEO Message · 인사말</p>
          <h2 className="display-kr mx-auto mt-6 max-w-[24rem] text-[clamp(1.95rem,3.7vw,3.05rem)] leading-[1.3] text-navy">
            원타임 그룹 <span className="text-gold-deep">대표 인사말</span>
          </h2>
        </div>

        <div
          className="mt-14 overflow-hidden rounded-2xl border border-line shadow-[0_36px_80px_-50px_rgba(12,28,54,0.5)]"
          data-reveal="fade"
        >
          <img
            src="/photo-lounge.jpg"
            alt="밝고 개방적인 원타임 그룹의 오피스 라운지"
            loading="lazy"
            className="aspect-[16/7] w-full object-cover"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* nameplate */}
          <div className="lg:col-span-4">
            <div
              className="lg:sticky lg:top-28"
              data-reveal="left"
              style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
            >
              <div className="relative overflow-hidden rounded-2xl bg-navy p-2.5">
                <div className="grid-lines absolute inset-0" aria-hidden />
                <div className="relative flex flex-col items-center rounded-xl border border-gold/25 px-7 py-12 text-center">
                  <img
                    src="/onetime-mark-light.png"
                    alt=""
                    className="h-16 w-auto"
                  />
                  <p className="mt-8 font-sans text-[0.68rem] font-semibold tracking-[0.36em] text-gold-soft">
                    CEO · 대표이사
                  </p>
                  <p className="display mt-3 text-[2.7rem] leading-none text-ivory">
                    권성수
                  </p>
                  <div className="mt-7 h-px w-14 bg-gold/55" />
                  <p className="mt-7 text-[0.9rem] leading-[1.85] text-ivory/65">
                    “한 번의 기회가
                    <br />
                    미래를 바꿉니다.”
                  </p>
                  <p className="mt-6 font-sans text-[0.62rem] font-semibold tracking-[0.3em] text-ivory/40">
                    ONE TIME INVEST COMPANY
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* letter */}
          <div className="lg:col-span-8">
            <p
              className="display-kr text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.55] text-navy"
              data-reveal
            >
              안녕하십니까.
              <br />
              원타임 그룹 대표 <span className="text-gold-deep">권성수</span>
              입니다.
            </p>

            <div className="mt-9 space-y-6">
              {LETTER_TOP.map((p, i) => (
                <p
                  key={i}
                  className="text-[clamp(0.99rem,1.4vw,1.09rem)] leading-[2] text-ink-soft"
                  data-reveal
                  style={
                    { '--reveal-delay': `${i * 60}ms` } as React.CSSProperties
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            <blockquote
              className="relative my-11 rounded-2xl border-l-[3px] border-gold bg-white px-8 py-9 shadow-[0_24px_60px_-44px_rgba(12,28,54,0.5)]"
              data-reveal
            >
              <span
                className="display absolute right-7 top-3 text-[5rem] leading-none text-gold/15"
                aria-hidden
              >
                ”
              </span>
              <p className="display-kr text-[clamp(1.3rem,2.4vw,1.85rem)] leading-[1.55] text-navy">
                한 번의 기회가 미래를 바꿉니다.
              </p>
              <p className="mt-3 text-[0.95rem] leading-[1.8] text-muted">
                원타임 그룹은 가장 중요한 투자 순간에 함께합니다.
              </p>
            </blockquote>

            <div className="space-y-6">
              {LETTER_BOTTOM.map((p, i) => (
                <p
                  key={i}
                  className="text-[clamp(0.99rem,1.4vw,1.09rem)] leading-[2] text-ink-soft"
                  data-reveal
                  style={
                    { '--reveal-delay': `${i * 50}ms` } as React.CSSProperties
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            <div
              className="mt-12 flex items-end justify-between gap-6 border-t border-line pt-9"
              data-reveal
            >
              <p className="text-[clamp(1.05rem,1.6vw,1.2rem)] font-semibold text-ink">
                감사합니다.
              </p>
              <p className="text-right leading-tight">
                <span className="block font-sans text-[0.78rem] tracking-[0.16em] text-muted">
                  원타임 그룹 대표
                </span>
                <span className="display mt-1.5 block text-[1.85rem] leading-none text-navy">
                  권성수
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About · 회사소개"
        title={
          <>
            신뢰받는
            <br className="sm:hidden" /> 투자 컨설팅 파트너
          </>
        }
        desc="원타임 그룹은 정확한 분석과 책임 있는 의사결정, 고객과의 신뢰를 바탕으로 가장 중요한 투자 순간에 함께합니다."
        image="/photo-office.jpg"
        crumb="회사소개"
      />
      <Overview />
      <Values />
      <Greeting />
    </>
  )
}
