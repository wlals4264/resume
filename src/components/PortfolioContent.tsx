import AdminDashboardPreview from "@/components/AdminDashboardPreview";
import BlogPostCard from "@/components/BlogPostCard";
import { BeforeAfterCompare, PendingQueueDiagram } from "@/components/NavigationFlowDiagrams";
import ProjectScreens from "@/components/ProjectScreens";
import Section from "@/components/Section";
import StepSyncCloseup from "@/components/StepSyncCloseup";
import { problemSolving, profile, projects, type ProblemCase } from "@/content/resume";

function CaseField({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-3">
      <p className="text-[12px] font-bold text-accent">{label}</p>
      <p className="mt-1.5 flex gap-2 text-[13px] leading-[1.7] text-gray-600">
        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/40" />
        <span>{text}</span>
      </p>
    </div>
  );
}

function ProblemCaseCard({ item, index }: { item: ProblemCase; index: number }) {
  return (
    <div className="group rounded-2xl border border-gray-200 p-6 break-inside-avoid-page transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
      <div className="mb-3 flex items-center gap-2">
        <span className="font-mono text-[12px] font-bold text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-[18px] font-extrabold leading-tight text-gray-900">{item.title}</h3>
      </div>
      <CaseField label="문제" text={item.problem} />
      <CaseField label="해결" text={item.solution} />
      <CaseField label="결과" text={item.result} />
      {item.id === "navigation" && (
        <>
          <BeforeAfterCompare
            columns={[
              { label: "Before", steps: ["수면 측정 종료", "웹뷰 복귀 (pop)", "홈 화면"] },
              {
                label: "After",
                steps: ["수면 측정 종료", "웹뷰 복귀 (pop)", "홈", "router.replace", "리포트 화면"],
                highlightStep: "router.replace",
                ok: true,
              },
            ]}
          />
          <PendingQueueDiagram />
        </>
      )}
      {item.process && (
        <div className="mt-4 space-y-3">
          {item.process.rows.map((row) => (
            <div key={row.label}>
              <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                {row.label}
              </p>
              {row.loopBack ? (
                <LoopDiagram steps={row.steps} />
              ) : row.plain ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {row.steps.map((step) => (
                    <span
                      key={step}
                      className="rounded-lg border border-gray-200 bg-surface px-2.5 py-1.5 text-[11px] font-semibold text-gray-700"
                    >
                      {step}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {row.steps.map((step, i) => (
                    <div key={`${step}-${i}`} className="flex items-center gap-1.5">
                      <span
                        className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold ${
                          step === row.highlightStep
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-gray-200 bg-surface text-gray-700"
                        }`}
                      >
                        {step}
                      </span>
                      {i < row.steps.length - 1 && (
                        <span className="text-[11px] text-gray-300">→</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {item.id === "ga4" && <AdminDashboardPreview />}
      {item.id === "healthkit" && <StepSyncCloseup />}
    </div>
  );
}

// 5개 스텝을 상단 3개(왼→오) · 하단 2개(오→왼)로 배치하고,
// 마지막 스텝에서 첫 스텝으로 되돌아가는 화살표로 순환 구조를 표현한다.
function LoopDiagram({ steps }: { steps: string[] }) {
  const boxW = 138;
  const boxH = 34;
  const hGap = 24;
  const vGap = 28;
  const col = [0, boxW + hGap, 2 * (boxW + hGap)];
  const row = [0, boxH + vGap];
  const width = col[2] + boxW;
  const height = row[1] + boxH;

  const nodes = [
    { x: col[0], y: row[0], label: steps[0] },
    { x: col[1], y: row[0], label: steps[1] },
    { x: col[2], y: row[0], label: steps[2] },
    { x: col[2], y: row[1], label: steps[3] },
    { x: col[1], y: row[1], label: steps[4] },
  ];
  const cx = (n: { x: number }) => n.x + boxW / 2;
  const cy = (n: { y: number }) => n.y + boxH / 2;

  const connectors = [
    `M${nodes[0].x + boxW},${cy(nodes[0])} L${nodes[1].x},${cy(nodes[1])}`,
    `M${nodes[1].x + boxW},${cy(nodes[1])} L${nodes[2].x},${cy(nodes[2])}`,
    `M${cx(nodes[2])},${nodes[2].y + boxH} L${cx(nodes[3])},${nodes[3].y}`,
    `M${nodes[3].x},${cy(nodes[3])} L${nodes[4].x + boxW},${cy(nodes[4])}`,
    `M${nodes[4].x},${cy(nodes[4])} L${cx(nodes[0])},${cy(nodes[4])} L${cx(nodes[0])},${nodes[0].y + boxH}`,
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mt-2 mx-auto block"
      style={{ width: "100%", maxWidth: width, height: "auto" }}
      role="img"
      aria-label="회귀 피드백 루프 다이어그램"
    >
      <defs>
        <marker
          id="loop-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill="#9ca3af" />
        </marker>
      </defs>

      {connectors.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#d1d5db"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#loop-arrow)"
        />
      ))}

      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={boxW} height={boxH} rx={8} fill="#fafafa" stroke="#e5e7eb" />
          <foreignObject x={n.x} y={n.y} width={boxW} height={boxH}>
            <div
              {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "9.5px",
                fontWeight: 600,
                color: "#374151",
                padding: "0 6px",
                lineHeight: 1.25,
              }}
            >
              {n.label}
            </div>
          </foreignObject>
        </g>
      ))}
    </svg>
  );
}

export default function PortfolioContent() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <header className="pb-10 pt-16">
        <p className="text-[13px] font-bold uppercase tracking-[0.15em] text-accent">Portfolio</p>
        <h1 className="mt-2 text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-gray-900 sm:text-[40px]">
          {profile.name}
        </h1>
        <p className="mt-1 text-[15px] font-medium text-accent">{profile.role}</p>
        <p className="mt-3 max-w-lg text-[15px] leading-[1.8] text-gray-600">
          실무에서 마주친 문제를 배경 → 문제 → 해결 → 결과 순서로 정리한 사례와,
          <br />
          직접 진행한 개인&팀 프로젝트입니다.
        </p>
      </header>

      <Section title="Work & Impact">
        <div className="space-y-6">
          {problemSolving.map((item, i) => (
            <ProblemCaseCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </Section>

      <Section title="Projects">
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group rounded-2xl border border-gray-200 p-6 break-inside-avoid-page transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[18px] font-extrabold leading-tight text-gray-900">
                  {project.name}
                  <span className="ml-2 text-[13px] font-medium text-accent">{project.role}</span>
                </h3>
                <span className="text-[12px] text-gray-400">{project.period}</span>
              </div>
              <p className="mt-1.5 text-[13px] text-gray-500">
                {project.team} · {project.description}
              </p>
              <ul className="mt-3 space-y-1.5">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-[14px] leading-[1.8] text-gray-700">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent/40" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              {project.name === "OOOTTT" && (
                <ProjectScreens basePath="/images/portfolio/ooottt" count={5} alt="OOOTTT 화면" />
              )}
              {project.name === "OlaOla" && (
                <BlogPostCard
                  title="[개인 프로젝트 - OlaOla] IndexedDB로 브라우저 환경에서 로컬 데이터베이스 구축하기"
                  excerpt="백엔드 구현보다 프론트엔드 역량 강화에 집중하기 위해, Firebase 같은 서버 환경 대신 IndexedDB로 브라우저에서 직접 로컬 데이터베이스를 구축한 과정을 정리했습니다."
                  date="2024.12.18"
                  url="https://velog.io/@wlals4264/개인-프로젝트-OlaOla-IndexedDB로-브라우저-환경에서-로컬-데이터베이스-구축하기"
                />
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-[12px] font-semibold text-gray-600 transition-colors hover:border-accent hover:text-accent"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
