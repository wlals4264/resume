import { ReactNode } from "react";

export default function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border py-8 first:border-t-0 first:pt-0">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-subtle">
        {title}
      </h2>
      {children}
    </section>
  );
}
