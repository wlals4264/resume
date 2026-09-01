import Image from "next/image";

export default function ProjectScreens({
  basePath,
  count,
  alt,
}: {
  basePath: string;
  count: number;
  alt: string;
}) {
  return (
    <div className="mt-4 grid grid-cols-5 gap-1.5">
      {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
        <div key={i} className="overflow-hidden rounded-lg border border-gray-200 bg-surface">
          <Image
            src={`${basePath}/screen-${i}.png`}
            alt={`${alt} ${i}`}
            width={1290}
            height={2796}
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}
