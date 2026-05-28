#!/usr/bin/env node
// Generates dist/sitemap.xml + dist/rss.xml from published news_posts.
// Runs after `vite build` so feeds are baked into each deployment.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = resolve(ROOT, 'dist')
const SITE = 'https://onetimegroup.co.kr'

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/process', priority: '0.7', changefreq: 'monthly' },
  { path: '/news', priority: '0.9', changefreq: 'daily' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
]

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function rfc822(iso) {
  return new Date(iso).toUTCString()
}

async function readEnv() {
  const src = await readFile(resolve(ROOT, 'src/lib/publicEnv.ts'), 'utf8')
  const url = src.match(/SUPABASE_URL\s*=\s*'([^']+)'/)?.[1]
  const key = src.match(/SUPABASE_ANON_KEY\s*=\s*\n?\s*'([^']+)'/)?.[1]
  const schema = src.match(/DB_SCHEMA\s*=\s*'([^']+)'/)?.[1]
  if (!url || !key || !schema) {
    throw new Error('publicEnv.ts에서 Supabase 설정값을 읽지 못했습니다.')
  }
  return { url, key, schema }
}

async function fetchPosts() {
  const { url, key, schema } = await readEnv()
  const endpoint =
    `${url}/rest/v1/news_posts` +
    `?select=id,title,category,body,thumbnail_url,created_at` +
    `&published=eq.true&order=created_at.desc&limit=200`
  const res = await fetch(endpoint, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Accept-Profile': schema,
    },
  })
  if (!res.ok) {
    throw new Error(`Supabase fetch failed: ${res.status} ${res.statusText}`)
  }
  return await res.json()
}

function stripBodyImages(s) {
  return String(s ?? '')
    .replace(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildSitemap(posts) {
  const now = new Date().toISOString().slice(0, 10)
  const lines = [`<?xml version="1.0" encoding="UTF-8"?>`]
  lines.push(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
  for (const r of STATIC_ROUTES) {
    lines.push(
      `  <url>\n` +
        `    <loc>${SITE}${r.path}</loc>\n` +
        `    <lastmod>${now}</lastmod>\n` +
        `    <changefreq>${r.changefreq}</changefreq>\n` +
        `    <priority>${r.priority}</priority>\n` +
        `  </url>`,
    )
  }
  for (const p of posts) {
    lines.push(
      `  <url>\n` +
        `    <loc>${SITE}/news/${xmlEscape(p.id)}</loc>\n` +
        `    <lastmod>${p.created_at.slice(0, 10)}</lastmod>\n` +
        `    <changefreq>monthly</changefreq>\n` +
        `    <priority>0.7</priority>\n` +
        `  </url>`,
    )
  }
  lines.push(`</urlset>`)
  return lines.join('\n')
}

function buildRss(posts) {
  const now = new Date().toUTCString()
  const items = posts.slice(0, 50).map((p) => {
    const stripped = stripBodyImages(p.body).slice(0, 280)
    const desc =
      stripped ||
      `${p.category} | 원타임 그룹 NEWS & INSIGHT — ${p.title}`
    const guid = `${SITE}/news/${p.id}`
    return (
      `    <item>\n` +
      `      <title>${xmlEscape(p.title)}</title>\n` +
      `      <link>${guid}</link>\n` +
      `      <guid isPermaLink="true">${guid}</guid>\n` +
      `      <category>${xmlEscape(p.category)}</category>\n` +
      `      <pubDate>${rfc822(p.created_at)}</pubDate>\n` +
      `      <description>${xmlEscape(desc)}</description>\n` +
      `    </item>`
    )
  })
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    `  <channel>`,
    `    <title>원타임 그룹 NEWS &amp; INSIGHT</title>`,
    `    <link>${SITE}/news</link>`,
    `    <description>원타임 그룹이 전하는 경제 뉴스, 시장 시황, 수익 내역.</description>`,
    `    <language>ko-KR</language>`,
    `    <lastBuildDate>${now}</lastBuildDate>`,
    `    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />`,
    ...items,
    `  </channel>`,
    `</rss>`,
  ].join('\n')
}

async function main() {
  if (!existsSync(DIST)) {
    await mkdir(DIST, { recursive: true })
  }
  let posts = []
  try {
    posts = await fetchPosts()
  } catch (err) {
    console.warn(`[build-feeds] Supabase 호출 실패 — 빈 피드로 진행: ${err.message}`)
  }
  await writeFile(resolve(DIST, 'sitemap.xml'), buildSitemap(posts), 'utf8')
  await writeFile(resolve(DIST, 'rss.xml'), buildRss(posts), 'utf8')
  console.log(
    `[build-feeds] sitemap.xml + rss.xml 생성 완료 (게시글 ${posts.length}건).`,
  )
}

main().catch((err) => {
  console.error(`[build-feeds] 실패: ${err.message}`)
  process.exit(1)
})
