type PhotoCardProps = {
  image: string
  no: string
  en: string
  title: string
  desc: string
}

/** Cinematic photo card — number + label up top, title + copy over a navy-graded photo. */
export default function PhotoCard({ image, no, en, title, desc }: PhotoCardProps) {
  return (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy">
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/15 to-navy-deep"
        aria-hidden
      />
      {/* gold corner accents */}
      <span
        className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-gold/55 transition-colors duration-500 group-hover:border-gold"
        aria-hidden
      />
      <span
        className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-gold/55 transition-colors duration-500 group-hover:border-gold"
        aria-hidden
      />

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="display text-[1.7rem] leading-none text-ivory">
            {no}
          </span>
          <span className="h-px w-6 bg-gold/60" aria-hidden />
          <span className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold-soft">
            {en}
          </span>
        </div>

        <div>
          <h3 className="display-kr text-[clamp(1.2rem,1.5vw,1.45rem)] leading-[1.36] text-ivory">
            {title}
          </h3>
          <p className="mt-2.5 line-clamp-3 text-[0.86rem] leading-[1.7] text-ivory/70">
            {desc}
          </p>
        </div>
      </div>
    </article>
  )
}
