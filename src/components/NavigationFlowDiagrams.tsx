type FlowColumn = {
  label: string;
  steps: string[];
  highlightStep?: string;
  ok?: boolean;
};

function FlowStep({
  text,
  highlighted,
  last,
  ok,
}: {
  text: string;
  highlighted?: boolean;
  last?: boolean;
  ok?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={`w-full rounded-lg border px-3 py-1.5 text-center text-[11px] font-semibold ${
          highlighted
            ? "border-accent bg-accent/10 text-accent"
            : last && ok
              ? "border-accent/40 bg-accent/5 text-accent"
              : "border-gray-200 bg-surface text-gray-700"
        }`}
      >
        {text}
      </span>
      {!last && <span className="my-1 text-[11px] text-gray-300">↓</span>}
    </div>
  );
}

// Before/After를 좌우 두 열로 배치하고, 각 열은 위→아래로 읽는 세로 타임라인으로 표현한다.
export function BeforeAfterCompare({ columns }: { columns: [FlowColumn, FlowColumn] }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-6 rounded-xl border border-gray-200 p-4">
      {columns.map((col) => (
        <div key={col.label}>
          <p
            className={`mb-2 text-center text-[11px] font-bold uppercase tracking-wide ${
              col.ok ? "text-accent" : "text-gray-400"
            }`}
          >
            {col.label}
          </p>
          {col.steps.map((step, i) => (
            <FlowStep
              key={step}
              text={step}
              highlighted={step === col.highlightStep}
              last={i === col.steps.length - 1}
              ok={col.ok}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Flutter → WebView(pendingQueue) → React 3-lane 시퀀스 다이어그램.
export function PendingQueueDiagram() {
  const laneX = { flutter: 110, webview: 390, react: 670 };
  const laneLabel = {
    flutter: "Flutter",
    webview: "WebView (navigatePostMessage.ts)",
    react: "React (useNavigateFromFlutterPostMessage)",
  };
  const headerW = 190;
  const headerY = 0;
  const headerH = 36;
  const lifelineBottom = 352;
  const width = 780;
  const height = 368;

  const box = (cx: number) => ({ x: cx - headerW / 2, w: headerW });

  return (
    <div className="mt-4 rounded-xl border border-gray-200 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">
        Pending Queue 동작 (실제 코드 기준)
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Pending Queue 시퀀스 다이어그램">
        <defs>
          <marker id="pq-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 Z" fill="#9ca3af" />
          </marker>
        </defs>

        {/* 헤더 박스 + 라이프라인 */}
        {(Object.keys(laneX) as (keyof typeof laneX)[]).map((key) => {
          const cx = laneX[key];
          const { x, w } = box(cx);
          return (
            <g key={key}>
              <rect x={x} y={headerY} width={w} height={headerH} rx={8} fill="#fafafa" stroke="#e5e7eb" />
              <foreignObject x={x} y={headerY} width={w} height={headerH}>
                <div
                  {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#374151",
                    padding: "0 6px",
                    lineHeight: 1.25,
                  }}
                >
                  {laneLabel[key]}
                </div>
              </foreignObject>
              <line x1={cx} y1={headerH} x2={cx} y2={lifelineBottom} stroke="#e5e7eb" strokeWidth={1.5} strokeDasharray="3 4" />
            </g>
          );
        })}

        {/* 1) Flutter -> WebView: postMessage */}
        <text x={(laneX.flutter + laneX.webview) / 2} y={62} textAnchor="middle" fontSize="9" fill="#6a7282">
          postMessage({"{"}type:&apos;navigate&apos;{"}"})
        </text>
        <line x1={laneX.flutter} y1={72} x2={laneX.webview - 6} y2={72} stroke="#9ca3af" strokeWidth={1.5} markerEnd="url(#pq-arrow)" />

        {/* 2) pendingQueue 박스 */}
        <rect x={laneX.webview - 95} y={88} width={190} height={64} rx={8} fill="#f5f3ff" stroke="#c7bfff" />
        <foreignObject x={laneX.webview - 95} y={88} width={190} height={64}>
          <div
            {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "4px",
              fontSize: "9.5px",
              color: "#4f46e5",
              padding: "0 8px",
              lineHeight: 1.25,
            }}
          >
            <div style={{ fontWeight: 700 }}>리스너 없음 → pendingQueue 저장</div>
            <div style={{ fontSize: "13px" }}>✉️</div>
          </div>
        </foreignObject>

        {/* 시간 경과 표시 */}
        <text x={laneX.webview} y={178} textAnchor="middle" fontSize="9" fill="#d1d5db">
          ⋮ 컴포넌트 mount 대기
        </text>

        {/* 3) React -> WebView: 구독 */}
        <text x={(laneX.webview + laneX.react) / 2} y={214} textAnchor="middle" fontSize="9" fill="#6a7282">
          구독 (mount) subscribeNavigatePostMessage
        </text>
        <line x1={laneX.react} y1={224} x2={laneX.webview + 6} y2={224} stroke="#9ca3af" strokeWidth={1.5} markerEnd="url(#pq-arrow)" />

        {/* 4) WebView -> React: 큐 drain */}
        <text x={(laneX.webview + laneX.react) / 2} y={254} textAnchor="middle" fontSize="9" fill="#6a7282">
          큐 drain → 콜백 실행
        </text>
        <line x1={laneX.webview} y1={264} x2={laneX.react - 6} y2={264} stroke="#9ca3af" strokeWidth={1.5} markerEnd="url(#pq-arrow)" />

        {/* 5) 결과 */}
        <rect x={laneX.react - 95} y={288} width={190} height={48} rx={8} fill="#fafafa" stroke="#e5e7eb" />
        <foreignObject x={laneX.react - 95} y={288} width={190} height={48}>
          <div
            {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "9.5px",
              fontWeight: 700,
              color: "#374151",
              padding: "0 8px",
              lineHeight: 1.3,
            }}
          >
            router.replace(path) → 리포트 화면
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
