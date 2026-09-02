const funnelStages = [
  { no: "1", label: "Acquisition", sub: "앱 설치 수", value: 2140, display: "2,140" },
  { no: "2", label: "Activation", sub: "가입자 수", value: 1284, display: "1,284" },
  { no: "3", label: "Retention", sub: "DAU 누적값 / 기간", value: 186, display: "186.4" },
  { no: "4", label: "Referral", sub: "-", value: 0, display: "-" },
  { no: "5", label: "Revenue", sub: "-", value: 0, display: "-" },
];

const measuredStages = funnelStages.filter((s) => s.value > 0);

function FunnelAreaChart() {
  const width = 560;
  const height = 66;
  const padX = 60;
  const padY = 8;
  const max = measuredStages[0].value;
  const stepX = (width - padX * 2) / (measuredStages.length - 1);
  const baseY = height - 18;

  const points = measuredStages.map((s, i) => {
    const x = padX + i * stepX;
    const y = padY + (1 - s.value / max) * (baseY - padY);
    return { x, y, ...s };
  });

  const areaPath =
    `M${points[0].x},${baseY} ` +
    points.map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${points[points.length - 1].x},${baseY} Z`;
  const linePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 w-full" role="img" aria-label="퍼널 전환 추이">
      <path d={areaPath} fill="#4f46e5" fillOpacity={0.12} />
      <polyline points={linePoints} fill="none" stroke="#4f46e5" strokeWidth={2} />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#4f46e5" />
      ))}
      {points.map((p, i) => (
        <text key={i} x={p.x} y={height - 4} textAnchor="middle" fontSize="9" fill="#9ca3af">
          {p.label}
        </text>
      ))}
    </svg>
  );
}

export default function FunnelStatsPreview() {
  return (
    <div className="mt-3 rounded-xl border border-gray-200 p-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
          퍼널 전환 통계 (실제 화면 기반)
        </p>
        <span className="text-[10px] text-gray-300">예시 데이터</span>
      </div>

      <div className="mt-1.5 grid grid-cols-5 gap-1.5">
        {funnelStages.map((s) => (
          <div key={s.no} className="rounded-lg border border-gray-200 bg-surface px-1.5 py-1">
            <p className="text-[8.5px] font-bold text-gray-700">
              {s.no}. {s.label}
            </p>
            <p className="text-[7.5px] text-gray-400">{s.sub}</p>
            <p className="text-[12px] font-extrabold text-gray-900">{s.display}</p>
          </div>
        ))}
      </div>

      <FunnelAreaChart />
    </div>
  );
}
