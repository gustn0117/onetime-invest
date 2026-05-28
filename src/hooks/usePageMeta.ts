import { useEffect } from 'react'

const SITE_URL = 'https://onetimegroup.co.kr'

type Meta = {
  title: string
  description: string
  path?: string
  image?: string
}

function setOrCreate(
  selector: string,
  attrs: Record<string, string>,
  content: string,
) {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
    document.head.appendChild(el)
  }
  if (el.tagName === 'LINK') {
    el.setAttribute('href', content)
  } else {
    el.setAttribute('content', content)
  }
}

/** Updates document.title + meta description + Open Graph tags + canonical for the current route. */
export function usePageMeta(meta: Meta | null) {
  useEffect(() => {
    if (!meta) return
    const url =
      meta.path !== undefined ? `${SITE_URL}${meta.path}` : window.location.href
    const image = meta.image
      ? meta.image.startsWith('http')
        ? meta.image
        : `${SITE_URL}${meta.image}`
      : `${SITE_URL}/og-image.jpg`

    document.title = meta.title
    setOrCreate('meta[name="description"]', { name: 'description' }, meta.description)
    setOrCreate('meta[property="og:title"]', { property: 'og:title' }, meta.title)
    setOrCreate(
      'meta[property="og:description"]',
      { property: 'og:description' },
      meta.description,
    )
    setOrCreate('meta[property="og:url"]', { property: 'og:url' }, url)
    setOrCreate('meta[property="og:image"]', { property: 'og:image' }, image)
    setOrCreate(
      'meta[name="twitter:title"]',
      { name: 'twitter:title' },
      meta.title,
    )
    setOrCreate(
      'meta[name="twitter:description"]',
      { name: 'twitter:description' },
      meta.description,
    )
    setOrCreate(
      'meta[name="twitter:image"]',
      { name: 'twitter:image' },
      image,
    )
    setOrCreate('link[rel="canonical"]', { rel: 'canonical' }, url)
  }, [meta?.title, meta?.description, meta?.path, meta?.image])
}
