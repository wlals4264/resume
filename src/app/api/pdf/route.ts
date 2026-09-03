import { renderPagePdf } from "@/lib/pdf";
import { profile } from "@/content/resume";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;

  const printParams = new URLSearchParams();
  const currentSalary = url.searchParams.get("currentSalary");
  const desiredSalary = url.searchParams.get("desiredSalary");
  if (currentSalary) printParams.set("currentSalary", currentSalary);
  if (desiredSalary) printParams.set("desiredSalary", desiredSalary);
  const query = printParams.toString();

  const buffer = await renderPagePdf(origin, query ? `/print?${query}` : "/print");

  const filename = `이력서_${profile.name}.pdf`;
  const encodedFilename = encodeURIComponent(filename);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="resume.pdf"; filename*=UTF-8''${encodedFilename}`,
      "Cache-Control": "no-store",
    },
  });
}
