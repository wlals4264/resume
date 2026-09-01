import Image from "next/image";

type Bucket = { time: string; steps: number; partial?: boolean };

const buckets: Bucket[] = [
  { time: "06:00–06:15", steps: 480 },
  { time: "07:30–07:45", steps: 512 },
  { time: "09:00–09:15", steps: 605 },
  { time: "09:15–09:30", steps: 588 },
  { time: "12:00–12:15", steps: 460 },
  { time: "12:15–12:30", steps: 398 },
  { time: "15:00–15:15", steps: 610 },
  { time: "15:15–15:30", steps: 548 },
  { time: "15:30–15:38 (8분, 격자 밖 partial)", steps: 236, partial: true },
];

const fullBucketSum = buckets.filter((b) => !b.partial).reduce((sum, b) => sum + b.steps, 0);
const totalSum = buckets.reduce((sum, b) => sum + b.steps, 0);
const uiValue = 4437;

export default function StepSyncCloseup() {
  return (
    <div className="mt-4 rounded-xl border border-gray-200 p-4">
      <div className="grid grid-cols-[150px_1fr] items-start gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
            실제 UI (걸음수 강조)
          </p>
          <div className="relative mt-2 w-full overflow-hidden rounded-xl border border-gray-200">
            <Image
              src="/images/portfolio/steps-full.png"
              alt="걸음수 4,437 / 6,000, 74% (전체 화면)"
              width={1170}
              height={2532}
              className="block h-auto w-full"
            />
            <div
              className="absolute rounded-lg border-2 border-accent"
              style={{
                left: "3.25%",
                top: "45.5%",
                width: "93.5%",
                height: "18.25%",
                boxShadow: "0 0 0 9999px rgba(15,15,20,0.55)",
              }}
            />
            <span
              className="absolute rounded-md bg-accent px-1.5 py-0.5 text-[8px] font-bold text-white"
              style={{ left: "3.25%", top: "calc(45.5% - 18px)" }}
            >
              걸음수 섹션
            </span>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
            버킷 로그 정합성 (예시 데이터)
          </p>
          <div className="mt-2 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full border-collapse text-[10px]">
              <thead>
                <tr className="bg-surface text-gray-500">
                  <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold">
                    버킷 (15분 단위)
                  </th>
                  <th className="border-b border-gray-200 px-2 py-1 text-right font-semibold">걸음수</th>
                </tr>
              </thead>
              <tbody>
                {buckets.map((b) => (
                  <tr key={b.time} className={b.partial ? "bg-accent/5" : undefined}>
                    <td
                      className={`border-b border-gray-100 px-2 py-1 ${
                        b.partial ? "font-semibold text-accent" : "text-gray-600"
                      }`}
                    >
                      {b.time}
                    </td>
                    <td
                      className={`border-b border-gray-100 px-2 py-1 text-right ${
                        b.partial ? "font-semibold text-accent" : "text-gray-600"
                      }`}
                    >
                      {b.steps.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-gray-200 bg-surface p-2.5">
              <p className="text-[9px] font-bold text-gray-400">BEFORE (partial 누락)</p>
              <p className="mt-1 text-[13px] font-extrabold text-gray-700">
                {fullBucketSum.toLocaleString()}
                <span className="ml-1 text-[9px] font-medium text-gray-400">버킷 합계</span>
              </p>
              <p className="mt-1 text-[9.5px] text-gray-500">
                UI {uiValue.toLocaleString()}와 불일치 (diff {(uiValue - fullBucketSum).toLocaleString()})
              </p>
            </div>
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-2.5">
              <p className="text-[9px] font-bold text-accent">AFTER (partial 포함)</p>
              <p className="mt-1 text-[13px] font-extrabold text-accent">
                {totalSum.toLocaleString()}
                <span className="ml-1 text-[9px] font-medium text-accent/70">버킷 합계</span>
              </p>
              <p className="mt-1 text-[9.5px] text-accent/80">UI {uiValue.toLocaleString()}와 일치 ✓</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
