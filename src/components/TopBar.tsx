"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SalaryPdfDownload from "@/components/SalaryPdfDownload";

const tabs = [
  { href: "/", label: "이력서" },
  { href: "/portfolio", label: "포트폴리오" },
];

export default function TopBar() {
  const pathname = usePathname();

  if (pathname === "/print" || pathname === "/portfolio/print") return null;

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
        {/* 어느 탭에서든 PDF 저장은 항상 이력서 페이지(/print) 기준으로 통일 */}
        <SalaryPdfDownload />
      </div>
    </header>
  );
}
