import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Smile Arc Dental Care, Kalachowki, Mumbai";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
