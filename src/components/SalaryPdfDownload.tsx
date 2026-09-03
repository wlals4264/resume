"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/resume";

const STORAGE_KEY = "resume-salary-fields";

export default function SalaryPdfDownload() {
  const [open, setOpen] = useState(false);
  const [currentSalary, setCurrentSalary] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Hydrating client-only localStorage state after mount; safe to disable
  // since server and initial client render both start blank.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved.currentSalary) setCurrentSalary(saved.currentSalary);
      if (saved.desiredSalary) setDesiredSalary(saved.desiredSalary);
    } catch {
      // ignore malformed storage
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function handleDownload() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentSalary, desiredSalary }));
    const params = new URLSearchParams();
    if (currentSalary.trim()) params.set("currentSalary", currentSalary.trim());
    if (desiredSalary.trim()) params.set("desiredSalary", desiredSalary.trim());
    const query = params.toString();
    window.location.href = query ? `/api/pdf?${query}` : "/api/pdf";
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
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
      </button>

      {open && (
        <div className="absolute right-0 top-full z-10 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
          <p className="text-[11px] font-semibold text-gray-500">
            연봉 정보 (선택 · PDF에만 표시)
          </p>
          <div className="mt-2 space-y-2">
            <input
              type="text"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(e.target.value)}
              placeholder="현재 연봉 (예: 3,000만원)"
              className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-[12px] text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none"
            />
            <input
              type="text"
              value={desiredSalary}
              onChange={(e) => setDesiredSalary(e.target.value)}
              placeholder="희망 연봉 (예: 3,400~3,600만원)"
              className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-[12px] text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleDownload}
            className="mt-3 w-full rounded-lg bg-accent px-3 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-accent/85"
          >
            {profile.name} 이력서 다운로드
          </button>
        </div>
      )}
    </div>
  );
}
