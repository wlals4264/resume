import Section from "@/components/Section";
import {
  career,
  education,
  links,
  profile,
  skills,
  summary,
  training,
} from "@/content/resume";

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
      <header className="pb-10">
        <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
        <p className="mt-1.5 text-base text-muted">{profile.role}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <a href={`mailto:${profile.email}`} className="hover:text-foreground">
            {profile.email}
          </a>
          <span className="text-border">|</span>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
            {profile.githubHandle}
          </a>
          <span className="text-border">|</span>
          <a href={profile.blog} target="_blank" rel="noreferrer" className="hover:text-foreground">
            {profile.blogHandle}
          </a>
        </div>
      </header>

      <Section title="Summary">
        <div className="space-y-3 text-[15px] leading-7 text-foreground/90">
          {summary.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <dl className="space-y-2.5">
          {skills.map((group) => (
            <div key={group.category} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <dt className="w-40 shrink-0 text-sm font-medium text-muted">{group.category}</dt>
              <dd className="text-sm leading-6 text-foreground/90">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Career">
        <div className="space-y-10">
          {career.map((item) => (
            <div key={item.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold">{item.company}</h3>
                <span className="text-sm text-muted">
                  {item.period}
                  {item.periodDetail ? ` (${item.periodDetail})` : ""}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{item.role}</p>
              <p className="mt-1 text-sm text-subtle">{item.description}</p>
              <ul className="mt-3 space-y-2">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-[15px] leading-7 text-foreground/90">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-subtle" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              {item.highlight && (
                <div className="mt-4 rounded-xl border border-border bg-tag-bg/60 p-4">
                  <p className="text-sm font-semibold">{item.highlight.title}</p>
                  <ul className="mt-2 space-y-1.5">
                    {item.highlight.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-6 text-foreground/80">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-subtle" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <div className="space-y-4">
          {education.map((item) => (
            <div key={item.school}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold">{item.school}</h3>
                <span className="text-sm text-muted">{item.period}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{item.major}</p>
              <p className="mt-1 text-sm text-subtle">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Training">
        <div className="space-y-4">
          {training.map((item) => (
            <div key={item.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold">{item.name}</h3>
                <span className="text-sm text-muted">{item.period}</span>
              </div>
              <p className="mt-1 text-sm text-subtle">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Links">
        <ul className="space-y-1.5">
          {links.map((link) => (
            <li key={link.url} className="flex gap-3 text-sm">
              <span className="w-28 shrink-0 text-muted">{link.label}</span>
              <a href={link.url} target="_blank" rel="noreferrer" className="text-foreground/90 hover:underline">
                {link.value}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
