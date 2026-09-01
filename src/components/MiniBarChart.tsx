export function MiniBarChart({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: number }[];
}) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="mt-4 rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">{title}</p>
        <span className="text-[10px] text-gray-300">예시 데이터</span>
      </div>
      <div className="mt-4 flex items-end gap-2" style={{ height: 90 }}>
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[9px] font-semibold text-gray-500">{d.value}</span>
            <div
              className="w-full rounded-t bg-accent/60"
              style={{ height: `${(d.value / max) * 64}px` }}
            />
            <span className="text-[9px] text-gray-400">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
