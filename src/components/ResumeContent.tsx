import Image from "next/image";
import Section from "@/components/Section";
import {
  career,
  certifications,
  education,
  links,
  profile,
  skills,
  summary,
  training,
} from "@/content/resume";

export default function ResumeContent() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <header className="flex items-end justify-between gap-6 pb-10 pt-16">
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
            <span>{profile.phone}</span>
            <span className="text-gray-300">·</span>
            <span>{profile.address}</span>
          </div>
        </div>
        <Image
          src="/images/profile.jpg"
          alt={profile.name}
          width={96}
          height={128}
          quality={95}
          priority
          className="h-32 w-24 shrink-0 rounded-xl object-cover ring-1 ring-gray-200"
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
              {Array.isArray(item.summary) ? (
                <div className="mt-3 space-y-3">
                  {item.summary.map((section) => (
                    <div key={section.title}>
                      <p className="text-[13px] font-bold text-gray-900">{section.title}</p>
                      <p className="mt-1 text-[14px] leading-[1.8] text-gray-700">{section.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-[14px] leading-[1.8] text-gray-700">{item.summary}</p>
              )}
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

      <Section title="Certification">
        <div className="space-y-5">
          {certifications.map((item) => (
            <div key={item.name} className="break-inside-avoid-page">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[15px] font-bold text-gray-900">{item.name}</h3>
                <span className="text-[12px] text-gray-400">{item.date}</span>
              </div>
              <p className="mt-1 text-[13px] text-gray-400">
                {item.status} · {item.issuer}
              </p>
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
