import { ImageResponse } from "next/og";

export const alt = "Rishabh Jain — UI/UX Designer & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 76,
          backgroundColor: "#F2ECDD",
          color: "#241D12",
          backgroundImage:
            "radial-gradient(circle at 88% -25%, rgba(201,162,39,0.35), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: "#6F6350",
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            Rishabh Jain
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              color: "#574C3A",
              letterSpacing: 1,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: "#8A6410",
              }}
            />
            Available for opportunities
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: 34 }}
        >
          <span
            style={{
              fontSize: 78,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            Designing interfaces for
            <br />
            complex digital products.
          </span>
          <span
            style={{
              display: "flex",
              fontSize: 24,
              color: "#8A6410",
              letterSpacing: 1,
            }}
          >
            UI/UX Designer · Full-Stack Developer · Backend & AI
          </span>
        </div>
      </div>
    ),
    size,
  );
}
