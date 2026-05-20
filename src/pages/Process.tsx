import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const STEPS = [
  {
    no: '01',
    title: '상담 신청',
    desc: '간단한 문의를 남겨주시면, 원타임 전문 컨설턴트가 신속하게 연락드립니다.',
  },
  {
    no: '02',
    title: '투자 성향 분석',
    desc: '고객의 투자 목표와 자산 현황, 투자 성향을 면밀하게 진단합니다.',
  },
  {
    no: '03',
    title: '맞춤 전략 제안',
    desc: '분석 결과를 바탕으로 고객에게 최적화된 맞춤형 투자 전략을 제안합니다.',
  },
  {
    no: '04',
    title: '지속 관리 & 리뷰',
    desc: '변화하는 시장 환경에 맞춰 전략을 점검하고 지속적으로 관리합니다.',
  },
]

function Steps() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="text-center" data-reveal="fade">
          <p className="eyebrow eyebrow--center">Process · 컨설팅 프로세스</p>
          <h2 className="display-kr mx-auto mt-6 max-w-[30rem] text-[clamp(1.95rem,3.7vw,3.05rem)] leading-[1.32] text-navy">
            체계적인 <span className="text-gold-deep">4단계</span> 컨설팅
          </h2>
          <p className="mx-auto mt-6 max-w-[33rem] text-[0.99rem] leading-[1.9] text-muted">
            첫 상담부터 지속적인 사후 관리까지, 원타임의 검증된 프로세스가
            고객과 함께합니다.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-line lg:block"
            aria-hidden
          />
          {STEPS.map((s, i) => (
            <div
              key={s.no}
              className="group relative flex gap-5 lg:flex-col lg:gap-0 lg:text-center"
              data-reveal
              style={{ '--reveal-delay': `${i * 110}ms` } as React.CSSProperties}
            >
              <div className="flex flex-col items-center">
                <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line bg-white transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_16px_34px_-18px_rgba(196,154,60,0.7)] lg:mx-auto">
                  <span className="display text-[1.5rem] text-navy transition-colors duration-500 group-hover:text-gold-deep">
                    {s.no}
                  </span>
                </span>
                {i < STEPS.length - 1 && (
                  <span
                    className="mt-1 h-full w-px flex-1 bg-line lg:hidden"
                    aria-hidden
                  />
                )}
              </div>
              <div className="pb-2 lg:mt-7 lg:pb-0">
                <h3 className="display-kr text-[1.32rem] text-navy">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[0.93rem] leading-[1.8] text-muted lg:mx-auto lg:max-w-[15rem]">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Promise() {
  return (
    <section className="border-t border-line bg-white pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1280px] px-5 pt-24 sm:px-8 sm:pt-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div
            className="lg:col-span-6"
            data-reveal="left"
          >
            <div className="overflow-hidden rounded-2xl border border-line shadow-[0_36px_80px_-46px_rgba(12,28,54,0.5)]">
              <img
                src="/photo-laptop.jpg"
                alt="데이터 기반 투자 분석 화면"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="eyebrow" data-reveal="fade">
              Our Promise · 약속
            </p>
            <h2
              className="display-kr mt-6 text-[clamp(1.85rem,3.4vw,2.8rem)] leading-[1.34] text-navy"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              상담 그 이후까지,
              <br />
              <span className="text-gold-deep">끝까지 함께합니다</span>
            </h2>
            <p
              className="mt-7 text-[0.99rem] leading-[1.95] text-muted"
              data-reveal
              style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
            >
              원타임 그룹의 컨설팅은 전략 제안으로 끝나지 않습니다. 변화하는
              시장 환경을 지속적으로 점검하고, 고객의 자산이 안정적으로 성장할
              수 있도록 책임감 있게 관리해 나갑니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-ivory sm:py-28">
      <img
        src="/photo-corridor.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 to-navy/82"
        aria-hidden
      />
      <div className="grid-lines absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1280px] px-5 text-center sm:px-8">
        <h2 className="display-kr mx-auto max-w-[30rem] text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.34] text-ivory" data-reveal="fade">
          지금, 원타임과 <span className="text-gold-soft">첫 상담</span>을
          시작하세요
        </h2>
        <Link
          to="/contact"
          className="btn-gold mt-9 inline-flex items-center gap-2 rounded-full px-8 py-4 text-[0.98rem] font-bold transition-transform duration-300 hover:-translate-y-0.5"
          data-reveal="fade"
        >
          상담 문의하기
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  )
}

export default function Process() {
  return (
    <>
      <PageHero
        eyebrow="Process · 프로세스"
        title="검증된 컨설팅 프로세스"
        desc="첫 상담부터 투자 성향 분석, 맞춤 전략 제안, 지속 관리까지 — 원타임의 4단계 프로세스를 소개합니다."
        image="/photo-meeting.jpg"
        crumb="프로세스"
      />
      <Steps />
      <Promise />
      <Cta />
    </>
  )
}
