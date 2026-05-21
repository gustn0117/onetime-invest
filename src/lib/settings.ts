import { SUPABASE_URL, SUPABASE_ANON_KEY, DB_SCHEMA } from './publicEnv'

/**
 * Reads public site settings (kakao_url, blog_url, …) with a plain fetch —
 * deliberately avoids importing supabase-js so callers like the always-on
 * QuickDock stay out of the heavy vendor chunk.
 */
export async function fetchPublicSettings(): Promise<Record<string, string>> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/settings?select=key,value`,
      { headers: { apikey: SUPABASE_ANON_KEY, 'Accept-Profile': DB_SCHEMA } },
    )
    if (!res.ok) return {}
    const rows = (await res.json()) as { key: string; value: string }[]
    const map: Record<string, string> = {}
    for (const r of rows) map[r.key] = r.value
    return map
  } catch {
    return {}
  }
}
