import { useCallback, useEffect, useState } from 'react'
import {
  supabase,
  ADMIN_EMAIL,
  NEWS_BUCKET,
  NEWS_CATEGORIES,
  type NewsPost,
} from '../lib/supabase'

const ERR = '#cf4b3e'

function fmtDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
    d.getDate(),
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
            콘텐츠 관리자
          </h1>
          <p className="mt-2 text-[0.9rem] text-muted">
            NEWS &amp; INSIGHT 글을 관리합니다.
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
            className="w-full rounded-xl border border-line bg-[#f7f6f2] px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold focus:bg-white"
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

/* ──────────────────────── dashboard ─────────────────────── */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<string>(NEWS_CATEGORIES[0])
  const [body, setBody] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(
    null,
  )

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

  const resetForm = () => {
    setTitle('')
    setCategory(NEWS_CATEGORIES[0])
    setBody('')
    setFile(null)
    setPreview('')
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
      resetForm()
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
        const path = post.thumbnail_url.slice(idx + marker.length)
        await supabase.storage.from(NEWS_BUCKET).remove([path])
      }
    }
    await supabase.from('news_posts').delete().eq('id', post.id)
    loadPosts()
  }

  const logout = async () => {
    await supabase.auth.signOut()
    onLogout()
  }

  const field =
    'w-full rounded-xl border border-line bg-[#f7f6f2] px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold focus:bg-white'

  return (
    <section className="bg-white pb-24 pt-[120px] sm:pt-[140px]">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Admin · 콘텐츠 관리</p>
            <h1 className="display-kr mt-4 text-[clamp(1.8rem,3vw,2.4rem)] text-navy">
              NEWS &amp; INSIGHT 관리
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

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* new post form */}
          <form
            onSubmit={submit}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
          >
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
                    className={field}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft">
                    카테고리
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={field + ' cursor-pointer'}
                  >
                    {NEWS_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft">
                    본문 <span className="text-gold-deep">*</span>
                  </label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={9}
                    placeholder="내용을 입력하세요. 줄바꿈은 그대로 반영됩니다."
                    className={field + ' resize-y'}
                  />
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

          {/* existing posts */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between">
              <h2 className="display-kr text-[1.3rem] text-navy">
                등록된 글
              </h2>
              <span className="text-[0.85rem] text-muted">
                총 {posts.length}건
              </span>
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
