import { NextResponse } from "next/server";
import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-static";

export async function GET() {
  const imagePath = join(process.cwd(), "public", "banner-homepage.webp");
  const imageBuffer = readFileSync(imagePath);

  const resized = await sharp(imageBuffer)
    .resize(1200, 630, { fit: "cover", position: "center" })
    .webp({ quality: 85 })
    .toBuffer();

  return new NextResponse(resized, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
