import { useCallback, useEffect, useRef, useState } from 'react'
import {
  supabase,
  ADMIN_EMAIL,
  NEWS_BUCKET,
  NEWS_CATEGORIES,
  loadSettings,
  type NewsPost,
  type Inquiry,
} from '../lib/supabase'

const ERR = '#cf4b3e'
const FIELD =
  'w-full rounded-xl border border-line bg-[#f7f6f2] px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold focus:bg-white'

function fmtDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
    d.getDate(),
  ).padStart(2, '0')}`
}
function fmtDateTime(iso: string) {
  const d = new Date(iso)
  return `${fmtDate(iso)} ${String(d.getHours()).padStart(2, '0')}:${String(
    d.getMinutes(),
  ).padStart(2, '0')}`
}

/* ───────────────────────── login ───────────────────────── */
function Login({ onDone }: { onDone: () => void }) {
  const [pw, setPw] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: pw,
    })
    setBusy(false)
    if (error) {
      setError('비밀번호가 올바르지 않습니다.')
      return
    }
    onDone()
  }

  return (
    <section className="flex min-h-[80vh] items-center bg-white pt-[88px]">
      <div className="mx-auto w-full max-w-[400px] px-5 py-20">
        <div className="text-center">
          <p className="eyebrow eyebrow--center">Admin</p>
          <h1 className="display-kr mt-5 text-[1.8rem] text-navy">
            원타임 관리자
          </h1>
          <p className="mt-2 text-[0.9rem] text-muted">
            콘텐츠와 문의 내역을 관리합니다.
          </p>
        </div>
        <form
          onSubmit={submit}
          className="mt-8 rounded-2xl border border-line bg-white p-7 shadow-[0_30px_70px_-50px_rgba(12,28,54,0.5)]"
        >
          <label
            htmlFor="ad-pw"
            className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft"
          >
            관리자 비밀번호
          </label>
          <input
            id="ad-pw"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="••••"
            autoFocus
            className={FIELD}
          />
          {error && (
            <p className="mt-2 text-[0.8rem]" style={{ color: ERR }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || !pw}
            className="btn-gold mt-5 inline-flex w-full items-center justify-center rounded-xl py-3.5 text-[0.96rem] font-bold disabled:opacity-50"
          >
            {busy ? '확인 중…' : '로그인'}
          </button>
        </form>
      </div>
    </section>
  )
}

/* ─────────────────────── news panel ─────────────────────── */
function NewsPanel() {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<string>(NEWS_CATEGORIES[0])
  const [body, setBody] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [bodyImgBusy, setBodyImgBusy] = useState(false)
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(
    null,
  )
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const bodyImgInputRef = useRef<HTMLInputElement>(null)

  const loadPosts = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('news_posts')
      .select('*')
      .order('created_at', { ascending: false })
    setPosts((data as NewsPost[]) ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    setPreview(f ? URL.createObjectURL(f) : '')
  }

  const insertAtCursor = (marker: string) => {
    const ta = bodyRef.current
    if (!ta) {
      setBody((b) => (b ? b + marker : marker.trimStart()))
      return
    }
    const start = ta.selectionStart ?? body.length
    const end = ta.selectionEnd ?? body.length
    const next = body.slice(0, start) + marker + body.slice(end)
    setBody(next)
    requestAnimationFrame(() => {
      const pos = start + marker.length
      ta.focus()
      ta.setSelectionRange(pos, pos)
    })
  }

  const onBodyImagePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (!f) return
    setBodyImgBusy(true)
    setMsg(null)
    try {
      const ext = (f.name.split('.').pop() || 'jpg').toLowerCase()
      const path = `body/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error } = await supabase.storage
        .from(NEWS_BUCKET)
        .upload(path, f, { cacheControl: '3600', upsert: false })
      if (error) throw error
      const url = supabase.storage.from(NEWS_BUCKET).getPublicUrl(path).data
        .publicUrl
      insertAtCursor(`\n\n![](${url})\n\n`)
    } catch {
      setMsg({ kind: 'err', text: '이미지 업로드에 실패했습니다.' })
    } finally {
      setBodyImgBusy(false)
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      setMsg({ kind: 'err', text: '제목과 본문을 입력해 주세요.' })
      return
    }
    setSaving(true)
    setMsg(null)
    try {
      let thumbnail_url: string | null = null
      if (file) {
        const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
        const { error: upErr } = await supabase.storage
          .from(NEWS_BUCKET)
          .upload(path, file, { cacheControl: '3600', upsert: false })
        if (upErr) throw upErr
        thumbnail_url = supabase.storage
          .from(NEWS_BUCKET)
          .getPublicUrl(path).data.publicUrl
      }
      const { error: insErr } = await supabase.from('news_posts').insert({
        title: title.trim(),
        category,
        body: body.trim(),
        thumbnail_url,
      })
      if (insErr) throw insErr
      setTitle('')
      setCategory(NEWS_CATEGORIES[0])
      setBody('')
      setFile(null)
      setPreview('')
      setMsg({ kind: 'ok', text: '게시글이 등록되었습니다.' })
      loadPosts()
    } catch {
      setMsg({ kind: 'err', text: '등록에 실패했습니다. 다시 시도해 주세요.' })
    } finally {
      setSaving(false)
    }
  }

  const remove = async (post: NewsPost) => {
    if (!window.confirm(`'${post.title}' 글을 삭제할까요?`)) return
    if (post.thumbnail_url) {
      const marker = `/${NEWS_BUCKET}/`
      const idx = post.thumbnail_url.indexOf(marker)
      if (idx >= 0) {
        await supabase.storage
          .from(NEWS_BUCKET)
          .remove([post.thumbnail_url.slice(idx + marker.length)])
      }
    }
    await supabase.from('news_posts').delete().eq('id', post.id)
    loadPosts()
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      {/* form */}
      <form onSubmit={submit} className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-line bg-white p-7 shadow-[0_30px_70px_-54px_rgba(12,28,54,0.5)]">
          <h2 className="display-kr text-[1.3rem] text-navy">새 글 작성</h2>
          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft">
                제목 <span className="text-gold-deep">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="기사 제목"
                className={FIELD}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft">
                카테고리
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={FIELD + ' cursor-pointer'}
              >
                {NEWS_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <label className="block text-[0.82rem] font-semibold text-ink-soft">
                  본문 <span className="text-gold-deep">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => bodyImgInputRef.current?.click()}
                  disabled={bodyImgBusy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-[0.78rem] font-semibold text-ink-soft transition-colors duration-200 hover:border-gold hover:text-gold-deep disabled:opacity-50"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  {bodyImgBusy ? '업로드 중…' : '본문에 사진 삽입'}
                </button>
                <input
                  ref={bodyImgInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onBodyImagePick}
                  className="hidden"
                />
              </div>
              <textarea
                ref={bodyRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={9}
                placeholder="내용을 입력하세요. 줄바꿈은 그대로 반영됩니다. 사진은 커서 위치에 ![](url) 형태로 삽입됩니다."
                className={FIELD + ' resize-y font-mono text-[0.92rem]'}
              />
              <p className="mt-1.5 text-[0.76rem] leading-[1.6] text-muted">
                사진은 본문 중간 어디든 들어갈 수 있어요. 버튼을 누르면 커서
                위치에 자동 삽입됩니다.
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft">
                대표 이미지
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={pickFile}
                className="block w-full text-[0.84rem] text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-4 file:py-2 file:text-[0.82rem] file:font-semibold file:text-ivory hover:file:bg-navy-soft"
              />
              {preview && (
                <img
                  src={preview}
                  alt=""
                  className="mt-3 aspect-[16/10] w-full rounded-xl border border-line object-cover"
                />
              )}
            </div>
          </div>
          {msg && (
            <p
              className="mt-4 text-[0.84rem] font-medium"
              style={{ color: msg.kind === 'ok' ? '#1f7a4d' : ERR }}
            >
              {msg.text}
            </p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="btn-gold mt-5 inline-flex w-full items-center justify-center rounded-xl py-3.5 text-[0.96rem] font-bold disabled:opacity-50"
          >
            {saving ? '등록 중…' : '게시글 등록'}
          </button>
        </div>
      </form>

      {/* list */}
      <div className="lg:col-span-7">
        <div className="flex items-baseline justify-between">
          <h2 className="display-kr text-[1.3rem] text-navy">등록된 글</h2>
          <span className="text-[0.85rem] text-muted">총 {posts.length}건</span>
        </div>
        {loading ? (
          <p className="mt-8 text-[0.92rem] text-muted">불러오는 중…</p>
        ) : posts.length === 0 ? (
          <p className="mt-8 text-[0.92rem] text-muted">
            아직 등록된 글이 없습니다.
          </p>
        ) : (
          <ul className="mt-5 space-y-3">
            {posts.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-4 rounded-xl border border-line bg-white p-3.5"
              >
                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-navy">
                  {p.thumbnail_url ? (
                    <img
                      src={p.thumbnail_url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid-lines h-full w-full" aria-hidden />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[0.7rem] font-bold tracking-[0.04em] text-gold-deep">
                    {p.category}
                  </span>
                  <p className="truncate text-[0.96rem] font-semibold text-navy">
                    {p.title}
                  </p>
                  <p className="text-[0.78rem] text-muted">
                    {fmtDate(p.created_at)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(p)}
                  className="shrink-0 rounded-lg border border-line px-3 py-2 text-[0.8rem] font-semibold text-ink-soft transition-colors duration-300 hover:border-[#cf4b3e] hover:text-[#cf4b3e]"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/* ──────────────────── inquiries panel ───────────────────── */
function InquiriesPanel() {
  const [items, setItems] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
    setItems((data as Inquiry[]) ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const remove = async (id: string) => {
    if (!window.confirm('이 문의를 삭제할까요?')) return
    await supabase.from('inquiries').delete().eq('id', id)
    load()
  }

  if (loading) {
    return <p className="text-[0.92rem] text-muted">불러오는 중…</p>
  }
  if (items.length === 0) {
    return (
      <p className="text-[0.92rem] text-muted">접수된 문의가 없습니다.</p>
    )
  }

  return (
    <div>
      <p className="text-[0.85rem] text-muted">총 {items.length}건의 문의</p>
      <ul className="mt-5 space-y-4">
        {items.map((q) => (
          <li
            key={q.id}
            className="rounded-2xl border border-line bg-white p-6 shadow-[0_24px_56px_-50px_rgba(12,28,54,0.5)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="display-kr text-[1.15rem] text-navy">
                  {q.name}
                </span>
                {q.type && (
                  <span className="rounded-full bg-navy/[0.06] px-3 py-1 text-[0.74rem] font-semibold text-ink-soft">
                    {q.type}
                  </span>
                )}
              </div>
              <span className="text-[0.8rem] text-muted">
                {fmtDateTime(q.created_at)}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[0.88rem] text-ink-soft">
              <span>
                <span className="text-muted">연락처</span>{' '}
                <a
                  href={`tel:${q.phone}`}
                  className="font-semibold text-navy hover:text-gold-deep"
                >
                  {q.phone}
                </a>
              </span>
              {q.email && (
                <span>
                  <span className="text-muted">이메일</span>{' '}
                  <a
                    href={`mailto:${q.email}`}
                    className="font-semibold text-navy hover:text-gold-deep"
                  >
                    {q.email}
                  </a>
                </span>
              )}
            </div>
            <p className="mt-4 whitespace-pre-wrap rounded-xl bg-[#f7f6f2] px-4 py-3.5 text-[0.92rem] leading-[1.8] text-ink-soft">
              {q.message}
            </p>
            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={() => remove(q.id)}
                className="rounded-lg border border-line px-3.5 py-2 text-[0.8rem] font-semibold text-ink-soft transition-colors duration-300 hover:border-[#cf4b3e] hover:text-[#cf4b3e]"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ──────────────────── settings panel ────────────────────── */
function SettingsPanel() {
  const [kakao, setKakao] = useState('')
  const [blog, setBlog] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(
    null,
  )

  useEffect(() => {
    loadSettings()
      .then((s) => {
        setKakao(s.kakao_url || '')
        setBlog(s.blog_url || '')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    const { error } = await supabase.from('settings').upsert([
      { key: 'kakao_url', value: kakao.trim() },
      { key: 'blog_url', value: blog.trim() },
    ])
    setSaving(false)
    setMsg(
      error
        ? { kind: 'err', text: '저장에 실패했습니다.' }
        : { kind: 'ok', text: '저장되었습니다. 우측 퀵메뉴에 바로 반영됩니다.' },
    )
  }

  if (loading) {
    return <p className="text-[0.92rem] text-muted">불러오는 중…</p>
  }

  return (
    <form onSubmit={save} className="max-w-[540px]">
      <div className="rounded-2xl border border-line bg-white p-7 shadow-[0_30px_70px_-54px_rgba(12,28,54,0.5)]">
        <h2 className="display-kr text-[1.3rem] text-navy">
          퀵메뉴 링크 설정
        </h2>
        <p className="mt-2 text-[0.88rem] leading-[1.7] text-muted">
          화면 우측 퀵메뉴의 카톡상담·블로그 버튼이 연결될 주소입니다.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft">
              카카오톡 채널 URL
            </label>
            <input
              type="url"
              value={kakao}
              onChange={(e) => setKakao(e.target.value)}
              placeholder="https://pf.kakao.com/_xxxxx"
              className={FIELD}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft">
              블로그 URL
            </label>
            <input
              type="url"
              value={blog}
              onChange={(e) => setBlog(e.target.value)}
              placeholder="https://blog.naver.com/xxxxx"
              className={FIELD}
            />
          </div>
        </div>
        {msg && (
          <p
            className="mt-4 text-[0.84rem] font-medium"
            style={{ color: msg.kind === 'ok' ? '#1f7a4d' : ERR }}
          >
            {msg.text}
          </p>
        )}
        <button
          type="submit"
          disabled={saving}
          className="btn-gold mt-5 inline-flex w-full items-center justify-center rounded-xl py-3.5 text-[0.96rem] font-bold disabled:opacity-50"
        >
          {saving ? '저장 중…' : '저장'}
        </button>
      </div>
    </form>
  )
}

/* ──────────────────────── dashboard ─────────────────────── */
const TABS = [
  { id: 'news', label: '콘텐츠' },
  { id: 'inquiries', label: '문의 내역' },
  { id: 'settings', label: '링크 설정' },
] as const
type TabId = (typeof TABS)[number]['id']

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<TabId>('news')

  const logout = async () => {
    await supabase.auth.signOut()
    onLogout()
  }

  return (
    <section className="bg-white pb-24 pt-[120px] sm:pt-[140px]">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Admin · 관리자</p>
            <h1 className="display-kr mt-4 text-[clamp(1.8rem,3vw,2.4rem)] text-navy">
              원타임 관리자
            </h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="shrink-0 rounded-full border border-navy/25 px-5 py-2.5 text-[0.86rem] font-semibold text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-ivory"
          >
            로그아웃
          </button>
        </div>

        <div className="mt-8 flex gap-1 border-b border-line">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`relative -mb-px px-5 py-3 text-[0.94rem] font-semibold transition-colors duration-200 ${
                tab === t.id ? 'text-navy' : 'text-muted hover:text-navy'
              }`}
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-gold" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {tab === 'news' && <NewsPanel />}
          {tab === 'inquiries' && <InquiriesPanel />}
          {tab === 'settings' && <SettingsPanel />}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── page ─────────────────────────── */
export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session)
    })
  }, [])

  if (authed === null) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center bg-white pt-[88px]">
        <p className="text-[0.95rem] text-muted">불러오는 중…</p>
      </section>
    )
  }

  return authed ? (
    <Dashboard onLogout={() => setAuthed(false)} />
  ) : (
    <Login onDone={() => setAuthed(true)} />
  )
}
