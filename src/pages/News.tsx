import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { supabase, NEWS_CATEGORIES, type NewsPost } from '../lib/supabase'

const FILTERS = ['전체', ...NEWS_CATEGORIES] as const

function fmtDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
    d.getDate(),
  ).padStart(2, '0')}`
}

function PostCard({ post }: { post: NewsPost }) {
  return (
    <Link
      to={`/news/${post.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-[0_30px_64px_-40px_rgba(12,28,54,0.42)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
        {post.thumbnail_url ? (
          <img
            src={post.thumbnail_url}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid-lines flex h-full w-full items-center justify-center">
            <img src="/onetime-mark-light.png" alt="" className="h-12 w-auto opacity-70" />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-[0.72rem] font-bold tracking-[0.04em] text-gold-soft backdrop-blur-sm">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="display-kr text-[1.2rem] leading-[1.4] text-navy transition-colors duration-300 group-hover:text-gold-deep">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-[0.92rem] leading-[1.7] text-muted">
          {post.body}
        </p>
        <span className="mt-5 text-[0.8rem] font-medium tracking-[0.04em] text-muted">
          {fmtDate(post.created_at)}
        </span>
      </div>
    </Link>
  )
}

export default function News() {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [filter, setFilter] = useState<string>('전체')

  useEffect(() => {
    let alive = true
    supabase
      .from('news_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!alive) return
        if (error) {
          setState('error')
          return
        }
        setPosts((data as NewsPost[]) ?? [])
        setState('ready')
      })
    return () => {
      alive = false
    }
  }, [])

  const shown =
    filter === '전체' ? posts : posts.filter((p) => p.category === filter)

  return (
    <>
      <PageHero
        eyebrow="News & Insight · 뉴스"
        title="경제를 읽는 원타임의 시선"
        desc="경제 뉴스와 금융 이슈, 시장 시황을 매일 한 편씩 — 투자에 필요한 핵심 흐름을 원타임 그룹이 전합니다."
        image="/photo-laptop.jpg"
        crumb="News & Insight"
      />

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          {/* category filter */}
          <div
            className="flex flex-wrap justify-center gap-2.5"
            data-reveal="fade"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full border px-5 py-2.5 text-[0.88rem] font-semibold tracking-[0.02em] transition-all duration-300 ${
                  filter === f
                    ? 'border-gold bg-gold text-navy'
                    : 'border-line bg-white text-ink-soft hover:border-gold/50 hover:text-navy'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* states */}
          {state === 'loading' && (
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-2xl border border-line bg-white"
                >
                  <div className="aspect-[16/10] bg-line" />
                  <div className="space-y-3 p-6">
                    <div className="h-5 w-3/4 rounded bg-line" />
                    <div className="h-3.5 w-full rounded bg-line" />
                    <div className="h-3.5 w-1/3 rounded bg-line" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {state === 'error' && (
            <p className="mt-20 text-center text-[0.98rem] text-muted">
              뉴스를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
            </p>
          )}

          {state === 'ready' && shown.length === 0 && (
            <p className="mt-20 text-center text-[0.98rem] text-muted">
              아직 등록된 콘텐츠가 없습니다.
            </p>
          )}

          {state === 'ready' && shown.length > 0 && (
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
