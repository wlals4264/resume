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

function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-gray-400" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

function VelogIcon() {
  return (
    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] bg-[#20c997] text-[9px] font-bold leading-none text-white">
      V
    </span>
  );
}

export default function ResumeContent() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <header className="flex items-end justify-between gap-6 pb-10 pt-16">
        <div>
          <h1 className="text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-gray-900 sm:text-[40px]">
            {profile.name}
          </h1>
          <p className="mt-1 text-[15px] font-medium text-accent">{profile.role}</p>
          <div className="mt-3 space-y-1.5 text-[13px] text-gray-500">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <a href={`mailto:${profile.email}`} className="hover:text-gray-900">
                {profile.email}
              </a>
              <span className="text-gray-300">·</span>
              <span>{profile.phone}</span>
              <span className="text-gray-300">·</span>
              <span>{profile.address}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GithubIcon />
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-gray-900">
                {profile.githubHandle}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <VelogIcon />
              <a href={profile.blog} target="_blank" rel="noreferrer" className="hover:text-gray-900">
                {profile.blogHandle}
              </a>
            </div>
          </div>
        </div>
        <Image
          src="/images/profile.jpg"
          alt={profile.name}
          width={78}
          height={104}
          quality={95}
          priority
          className="h-[104px] w-[78px] shrink-0 rounded-xl object-cover ring-1 ring-gray-200"
        />
      </header>

      <Section title="About">
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
            <div key={item.company} className="break-inside-avoid-page">
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
              <p className="mt-3 text-[14px] leading-[1.8] text-gray-700">{item.summary}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <div className="space-y-5">
          {education.map((item) => (
            <div key={item.school} className="break-inside-avoid-page">
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
            <div key={item.name} className="break-inside-avoid-page">
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
        <ul className="space-y-2 break-inside-avoid-page">
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
