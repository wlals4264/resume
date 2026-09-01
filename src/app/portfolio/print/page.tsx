import type { Metadata } from "next";
import PortfolioContent from "@/components/PortfolioContent";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PortfolioPrintPage() {
  return <PortfolioContent />;
}
