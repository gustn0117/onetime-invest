import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY, DB_SCHEMA } from './publicEnv'

// Self-hosted Supabase — backend for NEWS & INSIGHT, inquiries, and settings.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  db: { schema: DB_SCHEMA },
  auth: { persistSession: true, autoRefreshToken: true },
})

/** Fixed internal account — the /admin page signs into this with the shared password. */
export const ADMIN_EMAIL = 'cms@onetime-invest.app'

export const NEWS_BUCKET = 'news'

export const NEWS_CATEGORIES = ['경제뉴스', '시장시황', '수익내역'] as const
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

/** A consultation request submitted through the Contact form. */
export type Inquiry = {
  id: string
  name: string
  phone: string
  email: string | null
  type: string | null
  message: string
  created_at: string
}

/** Loads editable site settings (e.g. kakao_url, blog_url) as a key→value map. */
export async function loadSettings(): Promise<Record<string, string>> {
  const { data } = await supabase.from('settings').select('key, value')
  const map: Record<string, string> = {}
  for (const row of (data as { key: string; value: string }[] | null) ?? []) {
    map[row.key] = row.value
  }
  return map
}
