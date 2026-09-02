const sprintStats = { done: 3, inProgress: 1, backlog: 4, progress: 62 };

const sprintTasks: { type: string; content: string; status: string; assignee: string }[] = [
  { type: "작업", content: "카카오 SDK 업데이트", status: "완료", assignee: "김지민" },
  { type: "작업", content: "Flutter 오류 셀 동기화", status: "진행 중", assignee: "김지민" },
  { type: "작업", content: "오류 보고 유형 분류", status: "완료", assignee: "김지민" },
  { type: "버그", content: "모달·스낵바 오류 UX", status: "리뷰", assignee: "김지민" },
  { type: "작업", content: "전면 오류 네트워크 점검", status: "완료", assignee: "김지민" },
];

function SprintStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        highlight ? "border-accent/30 bg-accent/5" : "border-gray-200 bg-surface"
      }`}
    >
      <p className="text-[10px] font-semibold text-gray-500">{label}</p>
      <p className={`mt-1.5 text-[18px] font-extrabold ${highlight ? "text-accent" : "text-gray-900"}`}>
        {value}
      </p>
    </div>
  );
}

export default function SprintDashboardPreview() {
  return (
    <div className="mt-4 rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
          9월 1주차 Sprint (실제 화면 기반)
        </p>
        <span className="text-[10px] text-gray-300">예시 데이터</span>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-2">
        <SprintStat label="완료" value={String(sprintStats.done)} />
        <SprintStat label="진행 중" value={String(sprintStats.inProgress)} />
        <SprintStat label="백로그" value={String(sprintStats.backlog)} />
        <SprintStat label="전체 진행률" value={`${sprintStats.progress}%`} highlight />
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-[10px]">
          <thead>
            <tr className="bg-surface text-gray-500">
              <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold">타입</th>
              <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold">작업 내용</th>
              <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold">진행 상태</th>
              <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold">담당자</th>
            </tr>
          </thead>
          <tbody>
            {sprintTasks.map((t, i) => (
              <tr key={i}>
                <td className="border-b border-gray-100 px-2 py-1 text-gray-500">{t.type}</td>
                <td className="border-b border-gray-100 px-2 py-1 text-gray-700">{t.content}</td>
                <td className="border-b border-gray-100 px-2 py-1 text-gray-500">{t.status}</td>
                <td className="border-b border-gray-100 px-2 py-1 text-gray-500">{t.assignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
