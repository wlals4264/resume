import Section from "@/components/Section";
import { problemSolving, profile, projects } from "@/content/resume";

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
      <header className="pb-10">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
        <p className="mt-1.5 text-base text-muted">{profile.name} · 문제 해결 사례와 프로젝트</p>
      </header>

      <Section title="Problem Solving">
        <div className="space-y-8">
          {problemSolving.map((item, i) => (
            <div key={item.id}>
              <h3 className="text-base font-semibold">
                <span className="mr-2 text-subtle">{String(i + 1).padStart(2, "0")}</span>
                {item.title}
              </h3>
              <dl className="mt-3 space-y-2.5">
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 rounded bg-tag-bg px-1.5 py-0.5 text-center text-xs font-medium text-muted">
                    문제
                  </dt>
                  <dd className="text-[15px] leading-7 text-foreground/90">{item.problem}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 rounded bg-tag-bg px-1.5 py-0.5 text-center text-xs font-medium text-muted">
                    해결
                  </dt>
                  <dd className="text-[15px] leading-7 text-foreground/90">{item.solution}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 rounded bg-tag-bg px-1.5 py-0.5 text-center text-xs font-medium text-muted">
                    결과
                  </dt>
                  <dd className="text-[15px] leading-7 text-foreground/90">{item.result}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Projects">
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold">
                  {project.name}
                  <span className="ml-2 text-sm font-normal text-muted">{project.role}</span>
                </h3>
                <span className="text-sm text-muted">{project.period}</span>
              </div>
              <p className="mt-1 text-sm text-subtle">
                {project.team} · {project.description}
              </p>
              <ul className="mt-3 space-y-2">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-[15px] leading-7 text-foreground/90">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-subtle" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
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
