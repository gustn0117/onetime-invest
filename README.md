# 원타임 그룹 (ONE TIME INVEST COMPANY)

투자 컨설팅 기업 원타임 그룹 공식 웹사이트.

## 기술 스택

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4

## 개발

```bash
npm install
npm run dev        # 개발 서버 (http://localhost:5173)
npm run build      # 프로덕션 빌드 → dist/
npm run typecheck  # 타입 검사
```

## 배포

Docker로 셀프호스팅. `main` 브랜치에 push하면 webhook으로 자동 배포된다.

- Dockerfile: Vite 빌드 후 nginx로 정적 서빙 (멀티스테이지)
- 컨테이너 포트: `3151:80`
- 접속 URL: https://onetime-invest.hsweb.pics
