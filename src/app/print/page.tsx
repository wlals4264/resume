import type { Metadata } from "next";
import ResumeContent from "@/components/ResumeContent";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function PrintPage({
  searchParams,
}: {
  searchParams: Promise<{ currentSalary?: string; desiredSalary?: string }>;
}) {
  const { currentSalary, desiredSalary } = await searchParams;
  return <ResumeContent currentSalary={currentSalary} desiredSalary={desiredSalary} />;
}
