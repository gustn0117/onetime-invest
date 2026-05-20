import { useEffect } from 'react'

/**
 * Adds the `is-visible` class to every `[data-reveal]` element once it
 * scrolls into view. A single shared IntersectionObserver keeps it cheap.
 *
 * Pass the current route key so the observer re-binds after navigation,
 * since each page mounts a fresh set of `[data-reveal]` elements.
 */
export function useScrollReveal(routeKey?: string) {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    )
    if (els.length === 0) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -7% 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [routeKey])
}
