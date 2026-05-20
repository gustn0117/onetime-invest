import { useState } from 'react'
import PageHero from '../components/PageHero'

const CONTACT_EMAIL = 'contact@onetime.co.kr'
const ERR = '#cf4b3e'

const CHANNELS = [
  {
    label: '대표번호',
    value: '1600-0000',
    icon: (
      <path
        d="M9 5h6l2 7-4 2c1.4 3 3.6 5.2 6.6 6.6l2-4 7 2v6c0 1.7-1.4 3-3 3C18 35 5 22 5 8c0-1.7 1.3-3 3-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: '이메일',
    value: CONTACT_EMAIL,
    icon: (
      <>
        <rect
          x="5"
          y="8"
          width="30"
          height="24"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
        />
        <path
          d="m6 11 14 10L34 11"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    label: '상담시간',
    value: '평일 09:00 – 18:00',
    icon: (
      <>
        <circle
          cx="20"
          cy="20"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
        />
        <path
          d="M20 11v9l6 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    label: '오시는 길',
    value: '서울특별시 강남구',
    icon: (
      <>
        <path
          d="M20 35c8-8 12-13.6 12-19A12 12 0 0 0 8 16c0 5.4 4 11 12 19Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinejoin="round"
        />
        <circle
          cx="20"
          cy="16"
          r="4.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
        />
      </>
    ),
  },
]

const TYPES = ['투자 상담', '포트폴리오 컨설팅', '리스크 관리', '기타 문의']

type Values = {
  name: string
  phone: string
  email: string
  type: string
  message: string
}
type ErrKey = keyof Values | 'agree'

export default function Contact() {
  const [values, setValues] = useState<Values>({
    name: '',
    phone: '',
    email: '',
    type: TYPES[0],
    message: '',
  })
  const [agree, setAgree] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<ErrKey, string>>>({})
  const [sent, setSent] = useState(false)

  const set = (key: keyof Values, val: string) => {
    setValues((v) => ({ ...v, [key]: val }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Partial<Record<ErrKey, string>> = {}
    if (!values.name.trim()) next.name = '이름을 입력해 주세요.'
    if (!values.phone.trim()) next.phone = '연락처를 입력해 주세요.'
    else if (values.phone.replace(/[^0-9]/g, '').length < 9)
      next.phone = '올바른 연락처를 입력해 주세요.'
    if (
      values.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
    )
      next.email = '올바른 이메일 형식이 아닙니다.'
    if (!values.message.trim()) next.message = '문의 내용을 입력해 주세요.'
    if (!agree) next.agree = '개인정보 수집·이용에 동의해 주세요.'

    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]')
      first?.focus()
      return
    }

    const body =
      `[원타임 그룹 상담 문의]\n\n` +
      `· 이름: ${values.name}\n` +
      `· 연락처: ${values.phone}\n` +
      `· 이메일: ${values.email || '-'}\n` +
      `· 문의 유형: ${values.type}\n\n` +
      `· 문의 내용\n${values.message}\n`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `[원타임 상담문의] ${values.name} 님`,
    )}&body=${encodeURIComponent(body)}`

    setSent(true)
    setValues({ name: '', phone: '', email: '', type: TYPES[0], message: '' })
    setAgree(false)
  }

  const fieldCls = (err?: string) =>
    `w-full rounded-xl border bg-[#f7f6f2] px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors duration-200 placeholder:text-muted/70 focus:bg-white ${
      err ? '' : 'border-line focus:border-gold'
    }`

  return (
    <>
      <PageHero
        eyebrow="Contact · 상담 문의"
        title="원타임과 함께하세요"
        desc="투자에 대한 어떤 고민이든 편하게 문의해 주세요. 원타임 그룹의 전문 컨설턴트가 정성껏 안내해 드립니다."
        image="/photo-boardroom.jpg"
        crumb="상담 문의"
      />

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            {/* left — invitation + channels */}
            <div className="lg:col-span-5">
              <p className="eyebrow" data-reveal="fade">
                Get in touch · 문의 안내
              </p>
              <h2
                className="display-kr mt-6 text-[clamp(1.95rem,3.6vw,2.95rem)] leading-[1.3] text-navy"
                data-reveal
                style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
              >
                가장 중요한 투자 순간,
                <br />
                <span className="text-gold-deep">원타임과 함께하세요</span>
              </h2>
              <p
                className="mt-7 max-w-[27rem] text-[0.99rem] leading-[1.95] text-muted"
                data-reveal
                style={{ '--reveal-delay': '150ms' } as React.CSSProperties}
              >
                아래 채널로 연락 주시거나, 문의 양식을 남겨주시면 전문
                컨설턴트가 신속하게 안내해 드립니다.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {CHANNELS.map((c, i) => (
                  <div
                    key={c.label}
                    className="flex items-center gap-4 rounded-xl border border-line bg-white p-4 transition-colors duration-300 hover:border-gold/45"
                    data-reveal
                    style={
                      { '--reveal-delay': `${i * 90}ms` } as React.CSSProperties
                    }
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy text-gold-soft">
                      <svg viewBox="0 0 40 40" className="h-[22px] w-[22px]">
                        {c.icon}
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-gold-deep">
                        {c.label}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.95rem] font-medium text-ink">
                        {c.value}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* right — form */}
            <div
              className="lg:col-span-7"
              data-reveal="right"
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
            >
              <div className="rounded-2xl border border-line bg-white p-7 shadow-[0_36px_80px_-50px_rgba(12,28,54,0.5)] sm:p-10">
                <h3 className="display-kr text-[1.5rem] text-navy">
                  투자 상담 신청
                </h3>
                <p className="mt-2 text-[0.9rem] text-muted">
                  아래 정보를 남겨주시면 빠르게 연락드리겠습니다.
                </p>

                {sent && (
                  <div
                    role="status"
                    className="mt-6 flex items-start gap-3 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3.5 text-[0.9rem] text-ink-soft"
                  >
                    <span className="mt-0.5 text-gold-deep" aria-hidden>
                      ✓
                    </span>
                    <span>
                      문의 내용이 메일 작성 창으로 전달되었습니다. 메일 앱이
                      열리지 않으면{' '}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="font-semibold text-gold-deep underline underline-offset-2"
                      >
                        {CONTACT_EMAIL}
                      </a>{' '}
                      으로 보내주세요.
                    </span>
                  </div>
                )}

                <form
                  className="mt-6 space-y-4"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="cf-name"
                        className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft"
                      >
                        이름 <span className="text-gold-deep">*</span>
                      </label>
                      <input
                        id="cf-name"
                        type="text"
                        value={values.name}
                        onChange={(e) => set('name', e.target.value)}
                        placeholder="홍길동"
                        aria-invalid={!!errors.name}
                        className={fieldCls(errors.name)}
                        style={errors.name ? { borderColor: ERR } : undefined}
                      />
                      {errors.name && (
                        <p
                          className="mt-1.5 text-[0.78rem]"
                          style={{ color: ERR }}
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cf-phone"
                        className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft"
                      >
                        연락처 <span className="text-gold-deep">*</span>
                      </label>
                      <input
                        id="cf-phone"
                        type="tel"
                        value={values.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        placeholder="010-0000-0000"
                        aria-invalid={!!errors.phone}
                        className={fieldCls(errors.phone)}
                        style={errors.phone ? { borderColor: ERR } : undefined}
                      />
                      {errors.phone && (
                        <p
                          className="mt-1.5 text-[0.78rem]"
                          style={{ color: ERR }}
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="cf-email"
                        className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft"
                      >
                        이메일
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        value={values.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder="example@email.com"
                        aria-invalid={!!errors.email}
                        className={fieldCls(errors.email)}
                        style={errors.email ? { borderColor: ERR } : undefined}
                      />
                      {errors.email && (
                        <p
                          className="mt-1.5 text-[0.78rem]"
                          style={{ color: ERR }}
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cf-type"
                        className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft"
                      >
                        문의 유형
                      </label>
                      <div className="relative">
                        <select
                          id="cf-type"
                          value={values.type}
                          onChange={(e) => set('type', e.target.value)}
                          className={
                            fieldCls() + ' cursor-pointer appearance-none pr-10'
                          }
                        >
                          {TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <svg
                          viewBox="0 0 24 24"
                          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                          aria-hidden
                        >
                          <path
                            d="m6 9 6 6 6-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cf-message"
                      className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft"
                    >
                      문의 내용 <span className="text-gold-deep">*</span>
                    </label>
                    <textarea
                      id="cf-message"
                      rows={4}
                      value={values.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder="투자 목표나 궁금하신 내용을 자유롭게 적어주세요."
                      aria-invalid={!!errors.message}
                      className={fieldCls(errors.message) + ' resize-none'}
                      style={errors.message ? { borderColor: ERR } : undefined}
                    />
                    {errors.message && (
                      <p
                        className="mt-1.5 text-[0.78rem]"
                        style={{ color: ERR }}
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex cursor-pointer items-start gap-2.5 text-[0.86rem] text-ink-soft">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => {
                          setAgree(e.target.checked)
                          if (errors.agree)
                            setErrors((er) => ({ ...er, agree: undefined }))
                        }}
                        aria-invalid={!!errors.agree}
                        className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-gold"
                      />
                      <span>
                        개인정보 수집·이용에 동의합니다. 수집한 정보는 상담
                        목적으로만 이용됩니다.{' '}
                        <span className="text-gold-deep">*</span>
                      </span>
                    </label>
                    {errors.agree && (
                      <p
                        className="mt-1.5 text-[0.78rem]"
                        style={{ color: ERR }}
                      >
                        {errors.agree}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-gold mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[0.98rem] font-bold tracking-[0.02em] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    상담 문의 보내기
                    <span aria-hidden>→</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
