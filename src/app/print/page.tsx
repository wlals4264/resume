import type { Metadata } from "next";
import ResumeContent from "@/components/ResumeContent";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PrintPage() {
  return <ResumeContent />;
}
