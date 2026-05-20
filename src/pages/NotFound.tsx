import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-[78vh] items-center bg-white pt-[72px] sm:pt-[88px]">
      <div className="mx-auto max-w-[1280px] px-5 py-24 text-center sm:px-8">
        <p className="display text-[clamp(5rem,16vw,9rem)] leading-none text-navy/12">
          404
        </p>
        <p className="eyebrow eyebrow--center mt-2">Page Not Found</p>
        <h1 className="display-kr mx-auto mt-6 max-w-[24rem] text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.34] text-navy">
          요청하신 페이지를 <span className="text-gold-deep">찾을 수 없습니다</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[26rem] text-[0.97rem] leading-[1.85] text-muted">
          주소가 변경되었거나 삭제된 페이지일 수 있습니다. 홈으로 돌아가
          원하시는 메뉴를 다시 찾아주세요.
        </p>
        <Link
          to="/"
          className="btn-gold mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.96rem] font-semibold transition-transform duration-300 hover:-translate-y-0.5"
        >
          홈으로 돌아가기
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  )
}
