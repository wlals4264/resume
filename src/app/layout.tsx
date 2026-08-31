import type { Metadata } from "next";
import { pretendard } from "@/fonts";
import { profile } from "@/content/resume";
import TopBar from "@/components/TopBar";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.role}`,
  description: `${profile.name} — ${profile.role} 이력서 & 포트폴리오`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TopBar />
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}
