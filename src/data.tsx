import type { ReactNode } from 'react'

/** Core brand values — shown on Home and 회사소개 as photo cards. */
export type Highlight = {
  no: string
  en: string
  title: string
  desc: string
  image: string
}

export const HIGHLIGHTS: Highlight[] = [
  {
    no: '01',
    en: 'Precise Analysis',
    title: '정확한 분석',
    desc: '급변하는 글로벌 경제 흐름과 다양한 시장 변수를 정밀하게 읽어냅니다.',
    image: '/card-analysis.jpg',
  },
  {
    no: '02',
    en: 'Accountable Decision',
    title: '책임 있는 의사결정',
    desc: '모든 판단에 책임을 더해 고객의 소중한 자산을 신중하게 다룹니다.',
    image: '/card-decision.jpg',
  },
  {
    no: '03',
    en: 'Transparent Trust',
    title: '투명한 신뢰',
    desc: '투명한 운영과 정직한 소통으로 고객과의 신뢰를 끝까지 지킵니다.',
    image: '/card-trust.jpg',
  },
]

/** Consulting service areas — shown on Home (preview) and 사업영역. */
export type Service = {
  no: string
  title: string
  en: string
  desc: string
  image: string
  icon: ReactNode
}

export const SERVICES: Service[] = [
  {
    no: '01',
    title: '시장 분석 & 리서치',
    en: 'Market Research',
    desc: '급변하는 글로벌 경제 흐름과 다양한 시장 변수를 정밀하게 분석하여, 데이터에 기반한 정확한 투자 인사이트를 제공합니다.',
    image: '/card-research.jpg',
    icon: (
      <path
        d="M6 34h32M10 34V20m8 14V12m8 22V22m8 12V8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    ),
  },
  {
    no: '02',
    title: '맞춤형 투자 컨설팅',
    en: 'Tailored Consulting',
    desc: '개인 투자자부터 다양한 목적과 방향성을 가진 고객까지, 투자 성향에 맞춘 1:1 맞춤형 전략을 설계합니다.',
    image: '/card-consulting.jpg',
    icon: (
      <>
        <circle
          cx="20"
          cy="13"
          r="7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
        />
        <path
          d="M7 35c0-7.2 5.8-13 13-13s13 5.8 13 13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    no: '03',
    title: '리스크 관리',
    en: 'Risk Management',
    desc: '체계적인 리스크 관리 시스템으로 변화하는 시장 환경 속에서도 고객의 소중한 자산을 안정적으로 지켜냅니다.',
    image: '/card-risk.jpg',
    icon: (
      <path
        d="M20 4 7 9v10c0 8.4 5.4 13.4 13 16 7.6-2.6 13-7.6 13-16V9L20 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    no: '04',
    title: '장기 자산 전략',
    en: 'Long-term Strategy',
    desc: '단기 성과가 아닌 안정성과 지속 가능성에 기반하여, 고객의 미래 가치를 키워가는 장기 자산 전략을 제시합니다.',
    image: '/card-strategy.jpg',
    icon: (
      <>
        <circle
          cx="20"
          cy="20"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
        />
        <path
          d="M20 9v11l8 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
]
