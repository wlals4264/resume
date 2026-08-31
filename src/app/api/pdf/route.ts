import { renderToBuffer } from "@react-pdf/renderer";
import ResumeDocument, { registerPdfFonts } from "@/lib/pdf/ResumeDocument";
import { profile } from "@/content/resume";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  registerPdfFonts(origin);

  const buffer = await renderToBuffer(ResumeDocument({ imageBaseUrl: origin }));

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
