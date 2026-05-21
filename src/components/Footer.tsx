import { Link } from 'react-router-dom'

const QUICK = [
  { to: '/', label: '홈' },
  { to: '/about', label: '회사소개' },
  { to: '/services', label: '사업영역' },
  { to: '/process', label: '프로세스' },
  { to: '/news', label: 'NEWS & INSIGHT' },
  { to: '/contact', label: '상담 문의' },
]

const INFO = [
  { label: '대표번호', value: '1600-0000' },
  { label: '이메일', value: 'contact@onetime.co.kr' },
  { label: '상담시간', value: '평일 09:00 – 18:00' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-ivory">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* brand */}
          <div className="md:col-span-5">
            <img
              src="/onetime-logo-light.png"
              alt="원타임 그룹 ONE TIME INVEST COMPANY"
              className="h-20 w-auto"
            />
            <p className="display-kr mt-6 text-[1.3rem] leading-[1.5] text-ivory/90">
              한 번의 기회가 미래를 바꿉니다.
            </p>
            <p className="mt-3 text-[0.9rem] leading-[1.8] text-ivory/50">
              원타임 그룹은 정확한 분석과 책임 있는 의사결정으로
              <br className="hidden sm:block" />
              가장 중요한 투자 순간에 함께합니다.
            </p>
          </div>

          {/* quick links */}
          <nav className="md:col-span-3" aria-label="푸터 메뉴">
            <p className="font-sans text-[0.72rem] font-semibold tracking-[0.28em] text-gold-soft">
              MENU
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-1">
              {QUICK.map((q) => (
                <li key={q.to}>
                  <Link
                    to={q.to}
                    className="group inline-flex items-center gap-2 text-[0.92rem] text-ivory/65 transition-colors duration-300 hover:text-gold-soft"
                  >
                    <span
                      className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3.5"
                      aria-hidden
                    />
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div className="md:col-span-4">
            <p className="font-sans text-[0.72rem] font-semibold tracking-[0.28em] text-gold-soft">
              CONTACT
            </p>
            <ul className="mt-5 space-y-3.5">
              {INFO.map((it) => (
                <li key={it.label} className="flex items-baseline gap-3">
                  <span className="w-16 shrink-0 text-[0.78rem] tracking-[0.06em] text-ivory/40">
                    {it.label}
                  </span>
                  <span className="text-[0.94rem] font-medium text-ivory/85">
                    {it.value}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-[0.86rem] font-semibold text-gold-soft transition-colors duration-300 hover:bg-gold hover:text-navy"
            >
              상담 문의하기 <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* disclaimer */}
        <p className="mt-14 border-t border-ivory/10 pt-8 text-[0.8rem] leading-[1.85] text-ivory/40">
          본 웹사이트는 원타임 그룹(ONE TIME INVEST COMPANY)의 회사 소개를 위한
          것으로, 게재된 내용은 특정 투자 상품의 권유나 수익을 보장하지
          않습니다. 모든 투자에는 원금 손실의 위험이 있으며, 투자에 대한 최종
          판단과 책임은 투자자 본인에게 있습니다.
        </p>

        {/* bottom bar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.78rem] tracking-[0.04em] text-ivory/45">
            © 2026 ONE TIME INVEST COMPANY. All rights reserved.
          </p>
          <span className="text-[0.78rem] text-ivory/45">
            원타임 그룹 · 대표 권성수
          </span>
        </div>
      </div>
    </footer>
  )
}
