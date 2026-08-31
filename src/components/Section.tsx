import { ReactNode } from "react";

export default function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-gray-100 py-10">
      <h2 className="mb-6 text-[12px] font-bold uppercase tracking-[0.15em] text-accent">
        {title}
      </h2>
      {children}
    </section>
  );
}
