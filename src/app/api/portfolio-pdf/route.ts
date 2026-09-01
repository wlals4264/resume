import { renderPagePdf } from "@/lib/pdf";
import { profile } from "@/content/resume";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const buffer = await renderPagePdf(origin, "/portfolio/print");

  const filename = `포트폴리오_${profile.name}.pdf`;
  const encodedFilename = encodeURIComponent(filename);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="portfolio.pdf"; filename*=UTF-8''${encodedFilename}`,
      "Cache-Control": "no-store",
    },
  });
}
