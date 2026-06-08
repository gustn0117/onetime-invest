import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useScrollReveal } from './hooks/useScrollReveal'
import { usePageMeta } from './hooks/usePageMeta'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Footer from './components/Footer'
import QuickDock from './components/QuickDock'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Process from './pages/Process'
import NotFound from './pages/NotFound'

// supabase-backed routes — lazy-loaded so the marketing pages stay lightweight
const Contact = lazy(() => import('./pages/Contact'))
const News = lazy(() => import('./pages/News'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))
const Admin = lazy(() => import('./pages/Admin'))

type PageMeta = { title: string; description: string }

const ROUTE_META: Record<string, PageMeta> = {
  '/': {
    title:
      '원타임 그룹 | ONE TIME INVEST COMPANY — 투자 컨설팅 · 자산관리 파트너',
    description:
      '원타임 그룹(ONE TIME INVEST COMPANY)은 정확한 분석과 책임 있는 의사결정, 고객과의 신뢰를 바탕으로 가장 중요한 투자 순간에 함께하는 투자 컨설팅 파트너입니다. 상담 070-4336-5191',
  },
  '/about': {
    title: '회사소개 — 원타임 그룹 | 신뢰받는 투자 컨설팅 파트너',
    description:
      '원타임 그룹(대표 권성수)은 투명한 운영과 체계적 분석 시스템, 리스크 관리 체계를 바탕으로 고객의 안정적인 자산 성장을 돕는 투자 컨설팅 파트너입니다.',
  },
  '/services': {
    title: '사업영역 — 원타임 그룹 | 투자 자문 · 자산관리 · 리스크 관리',
    description:
      '시장 분석, 투자 자문, 자산 관리, 리스크 관리 — 원타임 그룹의 핵심 사업영역을 소개합니다. 고객 맞춤형 투자 전략을 제안합니다.',
  },
  '/process': {
    title: '프로세스 — 원타임 그룹 | 체계적인 컨설팅 절차',
    description:
      '상담부터 자산 운영까지 — 원타임 그룹의 체계적인 컨설팅 프로세스로 안정적이고 효율적인 투자를 돕습니다.',
  },
  '/contact': {
    title: '상담 문의 — 원타임 그룹 | 070-4336-5191',
    description:
      '원타임 그룹 상담 문의 — 070-4336-5191 / onetimeinvest1@gmail.com / 평일 09:00-18:00 / 경기도 고양시 일산동구 연리지로 50',
  },
  '/news': {
    title: 'NEWS & INSIGHT — 원타임 그룹 | 경제 뉴스 · 시장 시황 · 수익 내역',
    description:
      '원타임 그룹이 전하는 경제 뉴스, 시장 시황, 수익 내역 — 투자에 필요한 핵심 흐름을 매일 업데이트합니다.',
  },
}

function useRouteMeta(pathname: string) {
  // NewsDetail and Admin set their own meta dynamically; this hook covers the
  // static routes plus a sensible fallback for the news list segment.
  if (pathname.startsWith('/news/') || pathname === '/admin') {
    return null
  }
  const exact = ROUTE_META[pathname]
  if (exact) return { ...exact, path: pathname }
  return {
    title: '페이지를 찾을 수 없습니다 — 원타임 그룹',
    description:
      '요청하신 페이지를 찾을 수 없습니다. 원타임 그룹 홈페이지에서 다시 시도해 주세요.',
    path: pathname,
  }
}

function App() {
  const location = useLocation()
  useScrollReveal(location.pathname)
  usePageMeta(useRouteMeta(location.pathname))

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
