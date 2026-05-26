// Inline image markers `![](url)` embedded in news_posts.body — keeps storage
// schema unchanged while letting the editor mix text and images freely.

export type BodyPart =
  | { kind: 'text'; value: string }
  | { kind: 'img'; value: string }

const IMG_RE = /!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g

export function parseBody(body: string): BodyPart[] {
  const parts: BodyPart[] = []
  let last = 0
  let m: RegExpExecArray | null
  IMG_RE.lastIndex = 0
  while ((m = IMG_RE.exec(body)) !== null) {
    if (m.index > last) {
      const text = body.slice(last, m.index).replace(/^\n+|\n+$/g, '')
      if (text) parts.push({ kind: 'text', value: text })
    }
    parts.push({ kind: 'img', value: m[1] })
    last = m.index + m[0].length
  }
  if (last < body.length) {
    const text = body.slice(last).replace(/^\n+|\n+$/g, '')
    if (text) parts.push({ kind: 'text', value: text })
  }
  return parts
}

export function stripBodyImages(body: string): string {
  return body.replace(IMG_RE, ' ').replace(/\s{2,}/g, ' ').trim()
}
