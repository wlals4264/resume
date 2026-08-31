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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-2xl items-center justify-between px-6">
        <nav className="flex gap-1">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  active
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-900"
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
          className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-accent/85"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
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
