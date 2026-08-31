import Image from "next/image";
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
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <header className="flex items-center gap-5 pb-10 pt-16">
        <Image
          src="/images/profile.jpg"
          alt={profile.name}
          width={88}
          height={88}
          priority
          className="h-[88px] w-[88px] shrink-0 rounded-full object-cover ring-1 ring-gray-200"
        />
        <div>
          <h1 className="text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-gray-900 sm:text-[40px]">
            {profile.name}
          </h1>
          <p className="mt-1 text-[15px] font-medium text-accent">{profile.role}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-gray-500">
            <a href={`mailto:${profile.email}`} className="hover:text-gray-900">
              {profile.email}
            </a>
            <span className="text-gray-300">·</span>
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-gray-900">
              {profile.githubHandle}
            </a>
            <span className="text-gray-300">·</span>
            <a href={profile.blog} target="_blank" rel="noreferrer" className="hover:text-gray-900">
              {profile.blogHandle}
            </a>
          </div>
        </div>
      </header>

      <Section title="Summary">
        <div className="space-y-3 text-[15px] leading-[1.8] text-gray-700">
          {summary.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <dl className="space-y-3">
          {skills.map((group) => (
            <div key={group.category} className="flex flex-col gap-1.5 sm:flex-row sm:gap-4">
              <dt className="w-36 shrink-0 text-[13px] font-semibold text-gray-500">
                {group.category}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-200 bg-surface px-3 py-1 font-mono text-[12px] text-gray-700"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Career">
        <div className="space-y-10">
          {career.map((item) => (
            <div key={item.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[18px] font-extrabold leading-tight text-gray-900">
                  {item.company}
                </h3>
                <span className="text-[12px] text-gray-400">
                  {item.period}
                  {item.periodDetail ? ` (${item.periodDetail})` : ""}
                </span>
              </div>
              <p className="mt-1 text-[13px] font-medium text-accent">{item.role}</p>
              <p className="mt-1.5 text-[13px] text-gray-500">{item.description}</p>
              <ul className="mt-3 space-y-1.5">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-[14px] leading-[1.8] text-gray-700">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent/40" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              {item.highlight && (
                <div className="mt-4 rounded-2xl border border-gray-200 bg-surface p-5">
                  <p className="text-[13px] font-bold text-gray-900">{item.highlight.title}</p>
                  <ul className="mt-2.5 space-y-1.5">
                    {item.highlight.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2 text-[13px] leading-[1.7] text-gray-600">
                        <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent/40" />
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
        <div className="space-y-5">
          {education.map((item) => (
            <div key={item.school}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[15px] font-bold text-gray-900">{item.school}</h3>
                <span className="text-[12px] text-gray-400">{item.period}</span>
              </div>
              <p className="mt-1 text-[13px] text-gray-500">{item.major}</p>
              <p className="mt-1 text-[13px] text-gray-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Training">
        <div className="space-y-5">
          {training.map((item) => (
            <div key={item.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[15px] font-bold text-gray-900">{item.name}</h3>
                <span className="text-[12px] text-gray-400">{item.period}</span>
              </div>
              <p className="mt-1 text-[13px] text-gray-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Links">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.url} className="flex gap-3 text-[13px]">
              <span className="w-28 shrink-0 text-gray-400">{link.label}</span>
              <a href={link.url} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-accent">
                {link.value}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
