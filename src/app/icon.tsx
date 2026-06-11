import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        {/* Kinetic Triad Isomark tailored for 32x32 viewbox */}
        <svg viewBox="0 0 30 32" width="32" height="32">
          {/* Flat colors used here to ensure absolute compatibility with next/og renderer */}
          <g fill="#18181b" stroke="#8B5CF6" strokeWidth="2">
            <polygon points="0,4 14,4 18,12 4,12" />
            <polygon points="16,4 30,4 26,12 12,12" />
            <polygon points="11,15 19,15 17,32 9,32" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
