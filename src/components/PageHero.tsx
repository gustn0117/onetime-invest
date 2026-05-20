import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  desc?: string
  image: string
  crumb: string
}

/** Photo banner shown at the top of every sub-page. */
export default function PageHero({
  eyebrow,
  title,
  desc,
  image,
  crumb,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[clamp(400px,56vh,600px)] items-end overflow-hidden bg-navy">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy/78 to-navy/48"
        aria-hidden
      />
      <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-12 pt-[136px] sm:px-8 sm:pb-16 sm:pt-[168px]">
        <nav
          className="flex items-center gap-2 font-sans text-[0.78rem] tracking-[0.04em] text-ivory/55"
          aria-label="현재 위치"
        >
          <Link
            to="/"
            className="transition-colors duration-300 hover:text-gold-soft"
          >
            홈
          </Link>
          <span aria-hidden>›</span>
          <span className="text-gold-soft">{crumb}</span>
        </nav>

        <p className="eyebrow mt-6 text-gold-soft">{eyebrow}</p>
        <h1 className="display-kr mt-5 text-[clamp(2.2rem,5vw,3.85rem)] leading-[1.2] text-ivory">
          {title}
        </h1>
        {desc && (
          <p className="mt-6 max-w-[40rem] text-[clamp(0.99rem,1.5vw,1.14rem)] leading-[1.85] text-ivory/72">
            {desc}
          </p>
        )}
      </div>
    </section>
  )
}
