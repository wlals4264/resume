const dauSeries = [162, 178, 171, 190, 168, 175, 186];
const dauDates = ["08/26", "08/27", "08/28", "08/29", "08/30", "08/31", "09/01"];

function StatCard({
  label,
  value,
  trend,
  highlight,
}: {
  label: string;
  value: string;
  trend?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        highlight ? "border-accent/30 bg-accent/5" : "border-gray-200 bg-surface"
      }`}
    >
      <p className="text-[10px] font-semibold text-gray-500">{label}</p>
      <p className="mt-1.5 flex items-baseline gap-1.5">
        <span className={`text-[18px] font-extrabold ${highlight ? "text-accent" : "text-gray-900"}`}>
          {value}
        </span>
        {trend && <span className="text-[10px] font-semibold text-accent">{trend}</span>}
      </p>
    </div>
  );
}

// 실제 dauLineChartOption(useWeeklyDAUStats)처럼 마지막 구간(전일→오늘)만 점선으로 표시한다.
function DauLineChart() {
  const width = 560;
  const height = 130;
  const padX = 24;
  const padY = 16;
  const max = Math.max(...dauSeries);
  const min = Math.min(...dauSeries);
  const stepX = (width - padX * 2) / (dauSeries.length - 1);

  const points = dauSeries.map((v, i) => {
    const x = padX + i * stepX;
    const y = padY + (1 - (v - min) / (max - min || 1)) * (height - padY * 2);
    return { x, y, v };
  });

  const solidPoints = points.slice(0, -1);
  const dottedSegment = points.slice(-2);

  const toPath = (pts: typeof points) => pts.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 w-full" role="img" aria-label="주간 DAU 추이">
      <polyline points={toPath(solidPoints)} fill="none" stroke="#4f46e5" strokeWidth={2} />
      <polyline
        points={toPath(dottedSegment)}
        fill="none"
        stroke="#4f46e5"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#4f46e5" />
      ))}
      {points.map((p, i) => (
        <text key={i} x={p.x} y={height - 2} textAnchor="middle" fontSize="9" fill="#9ca3af">
          {dauDates[i]}
        </text>
      ))}
    </svg>
  );
}

export default function AdminDashboardPreview() {
  return (
    <div className="mt-4 rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
          Admin 대시보드 (실제 화면 기반)
        </p>
        <span className="text-[10px] text-gray-300">예시 데이터</span>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2.5">
        <StatCard label="총 가입자 수" value="1,284" />
        <StatCard label="DAU" value="186" trend="+9.5%" highlight />
        <StatCard label="오류 보고 현황" value="3" trend="0건 신규" />
      </div>

      <p className="mt-3 text-[10px] font-semibold text-gray-500">지난 7일간 DAU</p>
      <DauLineChart />
    </div>
  );
}
