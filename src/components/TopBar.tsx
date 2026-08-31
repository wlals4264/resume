"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content/resume";

const tabs = [
  { href: "/", label: "이력서" },
  { href: "/portfolio", label: "포트폴리오" },
];

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 sm:px-10">
        <nav className="flex items-center gap-1">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-accent text-background"
                    : "text-muted hover:bg-tag-bg hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
        <a
          href="/api/pdf"
          download={`이력서_${profile.name}.pdf`}
          className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-tag-bg"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
          PDF 저장
        </a>
      </div>
    </header>
  );
}
