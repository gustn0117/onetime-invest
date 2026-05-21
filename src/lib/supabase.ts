import { createClient } from '@supabase/supabase-js'

/**
 * Self-hosted Supabase — backend for the NEWS & INSIGHT content space.
 * The anon key is public by design (row-level security gates all access).
 */
const SUPABASE_URL = 'https://api.hsweb.pics'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNjQxNzY5MjAwLCJleHAiOjE3OTk1MzU2MDB9.pei5Gx1wqEkbcDs1CiHFuTWNuVRlcrG5dPmYdrAqDdY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  db: { schema: 'onetime_invest' },
  auth: { persistSession: true, autoRefreshToken: true },
})

/** Fixed internal account — the /admin page signs into this with the shared password. */
export const ADMIN_EMAIL = 'cms@onetime-invest.app'

export const NEWS_BUCKET = 'news'

export const NEWS_CATEGORIES = ['경제뉴스', '금융이슈', '시장시황'] as const
export type NewsCategory = (typeof NEWS_CATEGORIES)[number]

export type NewsPost = {
  id: string
  title: string
  category: string
  body: string
  thumbnail_url: string | null
  published: boolean
  created_at: string
}

/** Public URL of an uploaded thumbnail in the news storage bucket. */
export function newsImageUrl(path: string) {
  return supabase.storage.from(NEWS_BUCKET).getPublicUrl(path).data.publicUrl
}
