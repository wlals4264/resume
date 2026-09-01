import type { Browser } from "puppeteer-core";

const PDF_VIEWPORT = { width: 794, height: 1123, deviceScaleFactor: 2 };
const PDF_MARGIN = { top: "14mm", bottom: "14mm", left: "0mm", right: "0mm" };

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

export async function renderPagePdf(origin: string, path: string) {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.emulateMediaType("screen");
    await page.setViewport(PDF_VIEWPORT);
    await page.goto(`${origin}${path}`, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);

    return await page.pdf({
      format: "a4",
      printBackground: true,
      preferCSSPageSize: false,
      margin: PDF_MARGIN,
    });
  } finally {
    await browser.close();
  }
}
