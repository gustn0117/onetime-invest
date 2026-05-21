import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useScrollReveal } from './hooks/useScrollReveal'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Footer from './components/Footer'
import QuickDock from './components/QuickDock'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Process from './pages/Process'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// supabase-backed routes — lazy-loaded so the marketing pages stay lightweight
const News = lazy(() => import('./pages/News'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))
const Admin = lazy(() => import('./pages/Admin'))

const TITLES: Record<string, string> = {
  '/': '원타임 그룹 | ONE TIME INVEST COMPANY — 한 번의 기회가 미래를 바꿉니다',
  '/about': '회사소개 | 원타임 그룹',
  '/services': '사업영역 | 원타임 그룹',
  '/process': '프로세스 | 원타임 그룹',
  '/contact': '상담 문의 | 원타임 그룹',
}

function App() {
  const location = useLocation()
  useScrollReveal(location.pathname)

  useEffect(() => {
    const p = location.pathname
    document.title =
      TITLES[p] ??
      (p.startsWith('/news')
        ? 'NEWS & INSIGHT | 원타임 그룹'
        : p === '/admin'
          ? '콘텐츠 관리자 | 원타임 그룹'
          : '페이지를 찾을 수 없습니다 | 원타임 그룹')
  }, [location.pathname])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-2.5 focus:text-sm focus:text-ivory"
      >
        본문 바로가기
      </a>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Suspense fallback={<div className="min-h-[70vh]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <QuickDock />
    </>
  )
}

export default App
