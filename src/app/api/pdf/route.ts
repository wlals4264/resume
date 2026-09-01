import type { Browser } from "puppeteer-core";
import { profile } from "@/content/resume";

export const runtime = "nodejs";
export const maxDuration = 30;

async function launchBrowser(): Promise<Browser> {
  if (!process.env.VERCEL) {
    const puppeteer = await import("puppeteer");
    return puppeteer.launch() as unknown as Promise<Browser>;
  }

  const chromium = (await import("@sparticuz/chromium")).default;
  const puppeteer = await import("puppeteer-core");
  return puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
}

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;

  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.emulateMediaType("screen");
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    await page.goto(`${origin}/print`, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);

    const buffer = await page.pdf({
      format: "a4",
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: "14mm", bottom: "14mm", left: "0mm", right: "0mm" },
    });

    const filename = `이력서_${profile.name}.pdf`;
    const encodedFilename = encodeURIComponent(filename);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume.pdf"; filename*=UTF-8''${encodedFilename}`,
        "Cache-Control": "no-store",
      },
    });
  } finally {
    await browser.close();
  }
}
