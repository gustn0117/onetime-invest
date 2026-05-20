const PARAGRAPHS_TOP = [
  '원타임 그룹은 빠르게 변화하는 금융 시장과 투자 환경 속에서 고객에게 신뢰받는 투자 컨설팅 파트너가 되기 위해 끊임없이 노력하고 있습니다.',
  '오늘날의 투자 시장은 단순한 정보만으로는 올바른 판단을 내리기 어려운 시대가 되었습니다. 급변하는 글로벌 경제 흐름과 다양한 시장 변수 속에서 무엇보다 중요한 것은 정확한 분석과 책임 있는 의사결정, 그리고 고객과의 신뢰라고 생각합니다.',
  '원타임 그룹은 단기적인 성과만을 추구하기보다 안정성과 지속 가능성을 기반으로 한 장기적인 투자 방향을 중요하게 생각합니다. 투명한 운영과 체계적인 분석 시스템을 바탕으로 고객에게 보다 안정적이고 효율적인 투자 전략을 제안하며, 변화하는 시장 환경 속에서도 흔들리지 않는 원칙을 지켜나가고 있습니다.',
]

const PARAGRAPHS_BOTTOM = [
  '또한 투자 환경과 금융 제도의 변화에 능동적으로 대응하기 위해 시장 분석 역량 강화와 리스크 관리 체계 구축에 지속적으로 힘쓰고 있으며, 고객에게 보다 신뢰도 높은 컨설팅 서비스를 제공하기 위해 전문성과 내부 시스템을 꾸준히 발전시켜 나가고 있습니다.',
  '원타임 그룹은 개인 투자자뿐만 아니라 다양한 투자 목적과 방향성을 가진 고객들에게 맞춤형 컨설팅 서비스를 제공하며, 국내외 시장에 대한 폭넓은 분석과 전략적인 접근을 통해 고객의 안정적인 자산 성장과 미래 가치를 함께 만들어가고자 합니다.',
  '앞으로도 원타임 그룹은 신뢰와 책임, 그리고 전문성을 기반으로 변화하는 금융 시장 속에서 고객과 함께 성장하는 든든한 투자 파트너가 되겠습니다.',
  '끊임없는 연구와 올바른 투자 철학을 바탕으로 더욱 신뢰받는 기업으로 성장해 나가겠습니다.',
  '원타임 그룹을 믿고 함께해주시는 모든 분들께 진심으로 감사드리며, 앞으로도 변함없는 관심과 성원을 부탁드립니다.',
]

export default function Greeting() {
  return (
    <section id="greeting" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div
        className="pointer-events-none absolute -left-[8%] top-[12%] h-[34vw] max-h-[460px] w-[34vw] max-w-[460px] rounded-full bg-gold/[0.07] blur-[110px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="text-center" data-reveal="fade">
          <p className="eyebrow eyebrow--center">CEO Message · 인사말</p>
          <h2 className="display-kr mx-auto mt-6 max-w-[24rem] text-[clamp(1.95rem,3.7vw,3.05rem)] leading-[1.3] text-navy">
            원타임 그룹 <span className="text-gold-deep">대표 인사말</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
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
              원타임 그룹 대표 <span className="text-gold-deep">권성수</span>입니다.
            </p>

            <div className="mt-9 space-y-6">
              {PARAGRAPHS_TOP.map((p, i) => (
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

            {/* pull quote */}
            <blockquote
              className="relative my-11 rounded-2xl border-l-[3px] border-gold bg-paper px-8 py-9 shadow-[0_24px_60px_-40px_rgba(12,28,54,0.5)]"
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
              {PARAGRAPHS_BOTTOM.map((p, i) => (
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

            {/* signature */}
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
