import { ImageResponse } from "next/og";
import { MARK_STROKES, MARK_VIEWBOX } from "@/components/brand/mark-data";
import { clinic } from "@/data/clinic";

export const ogSize = { width: 1200, height: 630 };

/** Shared by the Open Graph and Twitter images. Solid colours only, which the renderer handles reliably. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: "linear-gradient(135deg, #f3faf6 0%, #ffffff 55%, #eaf3fa 100%)",
          color: "#0f2530",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 30, letterSpacing: 6, color: "#235f92", fontWeight: 700 }}>SMILE ARC</div>
          <div style={{ fontSize: 17, letterSpacing: 9, color: "#4a6672", marginTop: 8 }}>DENTAL CARE</div>
          <div style={{ fontSize: 68, lineHeight: 1.08, marginTop: 44, letterSpacing: -1.5 }}>
            Dental care in Kalachowki, Mumbai
          </div>
          <div style={{ fontSize: 28, color: "#4a6672", marginTop: 28 }}>
            {`${clinic.doctor.name}, ${clinic.doctor.qualification}`}
          </div>
          <div style={{ fontSize: 28, color: "#4a6672", marginTop: 6 }}>{`Call ${clinic.phone.display}`}</div>
        </div>
        <svg width="360" height="336" viewBox={MARK_VIEWBOX}>
          {MARK_STROKES.map((s) => (
            <path key={s.id} d={s.shape} fill={s.tone === "green" ? "#2f9a70" : "#3f93d3"} />
          ))}
        </svg>
      </div>
    ),
    ogSize,
  );
}
