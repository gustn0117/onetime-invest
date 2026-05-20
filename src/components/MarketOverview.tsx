import { useCallback, useEffect, useState } from 'react'

/* Korean market convention — rise: red, fall: blue */
const UP = '#e23a2e'
const DOWN = '#2862c8'
const FLAT = '#767c8c'

const REFRESH_MS = 60_000

type Row = { label: string; value: string }
type Dir = 'up' | 'down' | 'flat'
type Quote = {
  name: string
  tag: string
  change: string
  rate: string
  dir: Dir
  rows: Row[]
  date: string
}

const str = (v: unknown) => String(v ?? '').trim()
const unsigned = (s: string) => s.replace(/^[-+]/, '')

const dirOf = (rate: string): Dir => {
  const n = parseFloat(rate.replace(/,/g, ''))
  if (!Number.isFinite(n) || n === 0) return 'flat'
  return n > 0 ? 'up' : 'down'
}

const colorOf = (d: Dir) => (d === 'up' ? UP : d === 'down' ? DOWN : FLAT)
const arrowOf = (d: Dir) => (d === 'up' ? '▲' : d === 'down' ? '▼' : '–')
const signOf = (d: Dir) => (d === 'up' ? '+' : d === 'down' ? '−' : '')
const fmtDate = (s: string) => s.slice(0, 10).replace(/-/g, '. ')

async function getRow(url: string): Promise<Record<string, unknown>> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`${url} → ${res.status}`)
  const data = await res.json()
  const row = Array.isArray(data) ? data[0] : data
  if (!row) throw new Error(`${url} → empty`)
  return row
}

async function getIndex(url: string, name: string): Promise<Quote> {
  const d = await getRow(url)
  const rate = str(d.fluctuationsRatio)
  return {
    name,
    tag: '지수',
    change: unsigned(str(d.compareToPreviousClosePrice)),
    rate: unsigned(rate),
    dir: dirOf(rate),
    rows: [
      { label: '현재가', value: str(d.closePrice) },
      { label: '시가', value: str(d.openPrice) },
      { label: '고가', value: str(d.highPrice) },
      { label: '저가', value: str(d.lowPrice) },
    ],
    date: str(d.localTradedAt),
  }
}

async function getFx(url: string): Promise<Quote> {
  const d = await getRow(url)
  const rate = str(d.fluctuationsRatio)
  return {
    name: 'USD/KRW',
    tag: '환율',
    change: unsigned(str(d.fluctuations)),
    rate: unsigned(rate),
    dir: dirOf(rate),
    rows: [
      { label: '현재가', value: str(d.closePrice) },
      { label: '현금 살 때', value: str(d.cashBuyValue) },
      { label: '현금 팔 때', value: str(d.cashSellValue) },
      { label: '송금 보낼 때', value: str(d.sendValue) },
    ],
    date: str(d.localTradedAt),
  }
}

function QuoteCard({ q }: { q: Quote }) {
  const color = colorOf(q.dir)
  return (
    <article className="rounded-2xl border border-line bg-white p-7 shadow-[0_24px_56px_-44px_rgba(12,28,54,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="display text-[1.5rem] text-navy">{q.name}</h3>
        <span className="rounded-full bg-navy/[0.05] px-3 py-1 text-[0.68rem] font-bold tracking-[0.08em] text-ink-soft">
          {q.tag}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <span
          className="inline-flex items-center gap-1 text-[0.92rem] font-bold"
          style={{ color }}
        >
          <span className="text-[0.74rem]" aria-hidden>
            {arrowOf(q.dir)}
          </span>
          {q.change}
        </span>
        <span
          className="text-[clamp(1.7rem,3.6vw,2.2rem)] font-extrabold leading-none tracking-tight"
          style={{ color }}
        >
          {signOf(q.dir)}
          {q.rate}%
        </span>
      </div>

      <dl className="mt-5 space-y-2.5 border-t border-line pt-5">
        {q.rows.map((r, i) => (
          <div key={r.label} className="flex items-baseline justify-between gap-3">
            <dt
              className={
                i === 0
                  ? 'text-[0.9rem] font-semibold text-ink-soft'
                  : 'text-[0.86rem] text-muted'
              }
            >
              {r.label}
            </dt>
            <dd
              className={
                i === 0
                  ? 'text-[1.2rem] font-extrabold text-navy'
                  : 'text-[0.95rem] font-semibold text-ink-soft'
              }
              style={i === 0 ? { color } : undefined}
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-line bg-white p-7 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 rounded bg-line" />
        <div className="h-5 w-10 rounded-full bg-line" />
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div className="h-4 w-16 rounded bg-line" />
        <div className="h-8 w-24 rounded bg-line" />
      </div>
      <div className="mt-6 space-y-3 border-t border-line pt-5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3.5 w-14 rounded bg-line" />
            <div className="h-3.5 w-20 rounded bg-line" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MarketOverview() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [busy, setBusy] = useState(false)
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)

  const load = useCallback(async () => {
    setBusy(true)
    const results = await Promise.allSettled([
      getIndex('/napi/kospi', 'KOSPI'),
      getIndex('/napi/kosdaq', 'KOSDAQ'),
      getFx('/napi/usdkrw'),
    ])
    const ok = results
      .filter((r): r is PromiseFulfilledResult<Quote> => r.status === 'fulfilled')
      .map((r) => r.value)
    if (ok.length > 0) {
      setQuotes(ok)
      setUpdatedAt(new Date())
      setState('ready')
    } else {
      setState((prev) => (prev === 'ready' ? 'ready' : 'error'))
    }
    setBusy(false)
  }, [])

  useEffect(() => {
    load()
    const id = window.setInterval(load, REFRESH_MS)
    const onVisible = () => {
      if (document.visibilityState === 'visible') load()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [load])

  const tradedDate = quotes[0]?.date ? fmtDate(quotes[0].date) : '—'

  return (
    <section className="border-t border-line bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col items-center gap-7">
          <div className="text-center" data-reveal="fade">
            <p className="eyebrow eyebrow--center">Market Watch · 실시간 시장 지표</p>
            <h2 className="display-kr mt-6 text-[clamp(1.95rem,3.7vw,3.05rem)] leading-[1.32] text-navy">
              원타임 그룹이 정하는
              <br />
              <span className="text-gold-deep">핵심 시장 흐름</span>
            </h2>
          </div>

          <div
            className="flex items-center gap-3"
            data-reveal="fade"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="anim-pulse-ring absolute inline-flex h-full w-full rounded-full bg-gold" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-deep" />
              </span>
              <span className="text-[0.78rem] font-bold tracking-[0.06em] text-ink-soft">
                실시간
              </span>
            </span>
            <button
              type="button"
              onClick={load}
              disabled={busy}
              aria-label="시장 지표 새로고침"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-gold/50 hover:text-gold-deep disabled:opacity-50"
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-4 w-4 ${busy ? 'anim-spin-slow' : ''}`}
                style={busy ? { animationDuration: '0.9s' } : undefined}
                aria-hidden
              >
                <path
                  d="M20 11A8 8 0 0 0 6.3 5.7L4 8M4 4v4h4M4 13a8 8 0 0 0 13.7 5.3L20 16m0 4v-4h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
          data-reveal
        >
          {state === 'loading' &&
            [0, 1, 2].map((i) => <SkeletonCard key={i} />)}

          {state === 'error' && quotes.length === 0 && (
            <div className="rounded-2xl border border-line bg-white p-10 text-center md:col-span-3">
              <p className="text-[0.98rem] font-semibold text-ink">
                시장 데이터를 일시적으로 불러올 수 없습니다.
              </p>
              <p className="mt-2 text-[0.9rem] text-muted">
                잠시 후 다시 시도해 주세요.
              </p>
              <button
                type="button"
                onClick={load}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-navy/25 px-6 py-2.5 text-[0.9rem] font-semibold text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-ivory"
              >
                다시 불러오기
              </button>
            </div>
          )}

          {quotes.map((q) => (
            <QuoteCard key={q.name} q={q} />
          ))}
        </div>

        <div
          className="mt-5 flex flex-col items-center gap-1.5 rounded-xl border border-gold/20 bg-gold/[0.06] px-5 py-4 text-center text-[0.82rem]"
          data-reveal="fade"
        >
          <span className="font-semibold text-ink-soft">
            기준일 {tradedDate}
            {updatedAt && (
              <span className="font-normal text-muted">
                {'  ·  '}마지막 업데이트{' '}
                {updatedAt.toLocaleTimeString('ko-KR')}
              </span>
            )}
          </span>
          <span className="text-muted">
            당일 거래가 없을 경우 현재가는 전일 종가가 표기됩니다. · 자료: 네이버
            금융
          </span>
        </div>
      </div>
    </section>
  )
}
