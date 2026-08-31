import Section from "@/components/Section";
import { problemSolving, profile, projects } from "@/content/resume";

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

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <header className="pb-10 pt-16">
        <h1 className="text-[36px] font-extrabold leading-[1.15] tracking-[-0.03em] text-gray-900 sm:text-[44px]">
          Portfolio
        </h1>
        <p className="mt-3 max-w-lg text-[15px] leading-[1.8] text-gray-600">
          {profile.name}이 실무에서 마주친 문제를 배경 → 문제 → 해결 → 결과 순서로 정리한 사례와,
          직접 진행한 프로젝트입니다.
        </p>
      </header>

      <Section title="Problem Solving">
        <div className="space-y-6">
          {problemSolving.map((item, i) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-gray-200 p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-[12px] font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[18px] font-extrabold leading-tight text-gray-900">
                  {item.title}
                </h3>
              </div>
              <CaseField label="문제" text={item.problem} />
              <CaseField label="해결" text={item.solution} />
              <CaseField label="결과" text={item.result} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Projects">
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group rounded-2xl border border-gray-200 p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
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
