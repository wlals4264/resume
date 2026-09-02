export default function BlogPostCard({
  title,
  excerpt,
  date,
  url,
}: {
  title: string;
  excerpt: string;
  date: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="mt-4 block rounded-xl border border-gray-200 p-4 transition-colors hover:border-accent/30"
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">기술 블로그</p>
        <span className="text-[10px] text-gray-300">velog.io · {date}</span>
      </div>
      <p className="mt-2 text-[13px] font-bold leading-snug text-gray-900">{title}</p>
      <p className="mt-1.5 text-[12px] leading-[1.7] text-gray-500">{excerpt}</p>
    </a>
  );
}
