import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase, type NewsPost } from '../lib/supabase'
import { parseBody } from '../lib/postBody'

function fmtDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
    d.getDate(),
  ).padStart(2, '0')}`
}

export default function NewsDetail() {
  const { id } = useParams()
  const [post, setPost] = useState<NewsPost | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading')

  useEffect(() => {
    let alive = true
    if (!id) {
      setState('missing')
      return
    }
    ;(async () => {
      try {
        const { data, error } = await supabase
          .from('news_posts')
          .select('*')
          .eq('id', id)
          .maybeSingle()
        if (!alive) return
        if (error || !data) {
          setState('missing')
          return
        }
        setPost(data as NewsPost)
        setState('ready')
      } catch {
        if (alive) setState('missing')
      }
    })()
    return () => {
      alive = false
    }
  }, [id])

  if (state === 'loading') {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-white pt-[88px]">
        <p className="text-[0.95rem] text-muted">불러오는 중…</p>
      </section>
    )
  }

  if (state === 'missing' || !post) {
    return (
      <section className="flex min-h-[70vh] items-center bg-white pt-[88px]">
        <div className="mx-auto max-w-[1280px] px-5 py-24 text-center sm:px-8">
          <p className="eyebrow eyebrow--center">News & Insight</p>
          <h1 className="display-kr mt-6 text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.3] text-navy">
            요청하신 글을 찾을 수 없습니다
          </h1>
          <Link
            to="/news"
            className="btn-gold mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.96rem] font-semibold"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* header band */}
      <section className="relative overflow-hidden bg-navy pb-14 pt-[136px] sm:pb-16 sm:pt-[168px]">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-[820px] px-5 sm:px-8">
          <nav
            className="flex items-center gap-2 font-sans text-[0.78rem] tracking-[0.04em] text-ivory/55"
            aria-label="현재 위치"
          >
            <Link to="/" className="transition-colors hover:text-gold-soft">
              홈
            </Link>
            <span aria-hidden>›</span>
            <Link to="/news" className="transition-colors hover:text-gold-soft">
              News &amp; Insight
            </Link>
          </nav>
          <span className="mt-6 inline-block rounded-full border border-gold/40 px-3.5 py-1 text-[0.74rem] font-bold tracking-[0.04em] text-gold-soft">
            {post.category}
          </span>
          <h1 className="display-kr mt-5 text-[clamp(1.85rem,3.6vw,2.85rem)] leading-[1.32] text-ivory">
            {post.title}
          </h1>
          <p className="mt-5 text-[0.85rem] tracking-[0.04em] text-ivory/55">
            {fmtDate(post.created_at)}
          </p>
        </div>
      </section>

      {/* body */}
      <section className="bg-white py-20 sm:py-24">
        <article className="mx-auto max-w-[820px] px-5 sm:px-8">
          {post.thumbnail_url && (
            <img
              src={post.thumbnail_url}
              alt=""
              className="mb-12 w-full rounded-2xl border border-line object-cover"
            />
          )}
          <div className="space-y-7 text-[clamp(1rem,1.5vw,1.1rem)] leading-[1.95] text-ink-soft">
            {parseBody(post.body).map((part, i) =>
              part.kind === 'img' ? (
                <img
                  key={i}
                  src={part.value}
                  alt=""
                  loading="lazy"
                  className="w-full rounded-2xl border border-line object-cover"
                />
              ) : (
                <p key={i} className="whitespace-pre-wrap">
                  {part.value}
                </p>
              ),
            )}
          </div>

          <div className="mt-14 border-t border-line pt-9">
            <Link
              to="/news"
              className="group inline-flex items-center gap-2 text-[0.96rem] font-semibold text-navy"
            >
              <span
                className="text-gold-deep transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden
              >
                ←
              </span>
              <span className="border-b-2 border-gold pb-0.5">
                목록으로 돌아가기
              </span>
            </Link>
          </div>
        </article>
      </section>
    </>
  )
}
