"use client";

import { useEffect, useState } from "react";

const TOTAL_STEPS = 4;

function TimelineItem({
  active,
  text,
  tone,
}: {
  active: boolean;
  text: string;
  tone: "neutral" | "fail" | "success";
}) {
  const icon = tone === "fail" ? "✕" : tone === "success" ? "✓" : "·";
  const iconColor =
    tone === "fail" ? "text-gray-400" : tone === "success" ? "text-accent" : "text-gray-300";

  return (
    <li
      className={`flex items-start gap-2 text-[11px] leading-snug transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-25"
      }`}
    >
      <span className={`mt-[1px] w-3 shrink-0 font-bold ${iconColor}`}>{icon}</span>
      <span className={tone === "success" ? "font-semibold text-accent" : "text-gray-600"}>
        {text}
      </span>
    </li>
  );
}

function ResultScreen({ resolved, ok }: { resolved: boolean; ok: boolean }) {
  return (
    <div className="mt-3 flex h-20 w-full items-center justify-center rounded-lg border border-gray-200 bg-surface">
      {!resolved ? (
        <span className="text-[10px] text-gray-300">대기 중</span>
      ) : ok ? (
        <div className="flex items-center gap-1.5 text-accent">
          <span className="text-[16px]">📄</span>
          <span className="text-[11px] font-semibold">리포트 화면</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-gray-400">
          <span className="text-[16px]">⏳</span>
          <span className="text-[11px] font-semibold">화면 멈춤</span>
        </div>
      )}
    </div>
  );
}

export default function NavigationRaceDemo() {
  const [step, setStep] = useState(TOTAL_STEPS);
  const playing = step < TOTAL_STEPS;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setStep((s) => s + 1), 650);
    return () => clearTimeout(t);
  }, [playing, step]);

  const play = () => setStep(0);

  return (
    <div className="mt-4 rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
          Before / After 시뮬레이션
        </p>
        <button
          type="button"
          onClick={play}
          disabled={playing}
          className="rounded-lg bg-accent px-3 py-1 text-[11px] font-bold text-white transition-colors hover:bg-accent/85 disabled:opacity-50"
        >
          ▶ 재생
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] font-bold text-gray-500">이전</p>
          <ol className="mt-2 space-y-1.5">
            <TimelineItem active={step >= 1} text="수면 측정 종료 → Native postMessage 전송" tone="neutral" />
            <TimelineItem active={step >= 2} text="React listener 등록 전 도착 → 메시지 유실" tone="fail" />
            <TimelineItem active={step >= 3} text="재전송 없음" tone="neutral" />
          </ol>
          <ResultScreen resolved={step >= TOTAL_STEPS} ok={false} />
        </div>

        <div>
          <p className="text-[11px] font-bold text-accent">이후</p>
          <ol className="mt-2 space-y-1.5">
            <TimelineItem active={step >= 1} text="수면 측정 종료 → Native postMessage 전송" tone="neutral" />
            <TimelineItem active={step >= 2} text="pending event queue에 임시 저장" tone="neutral" />
            <TimelineItem active={step >= 3} text="early listener 등록 → 큐 flush → router.replace" tone="success" />
          </ol>
          <ResultScreen resolved={step >= TOTAL_STEPS} ok={true} />
        </div>
      </div>
    </div>
  );
}
