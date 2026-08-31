# 김지민 · Resume

Next.js 기반 이력서 / 포트폴리오 사이트. 상단의 **PDF 저장** 버튼으로 이력서를 PDF로 바로 다운로드할 수 있습니다.

- `/` — 이력서
- `/portfolio` — 포트폴리오 (문제 해결 사례, 프로젝트)
- `/api/pdf` — 서버에서 생성한 이력서 PDF 다운로드

## 콘텐츠 수정

이력서/포트폴리오 내용은 [`src/content/resume.ts`](./src/content/resume.ts) 파일 하나에 모여 있습니다. 이 파일을 수정하고 커밋을 push하면 Vercel이 자동으로 재배포합니다.

```bash
npm run dev    # 로컬 개발 서버
npm run build  # 프로덕션 빌드
```

## 배포

`main` 브랜치에 push하면 [Vercel](https://vercel.com)이 자동으로 빌드 및 배포합니다.
