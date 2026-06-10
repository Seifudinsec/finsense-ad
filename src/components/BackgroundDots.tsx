import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

export const BackgroundDots: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const DOTS = [
    { x: 8,  y: 82, size: 2, offset: 0.12 },
    { x: 22, y: 88, size: 3, offset: 0.53 },
    { x: 36, y: 80, size: 4, offset: 1.21 },
    { x: 50, y: 90, size: 2, offset: 1.72 },
    { x: 64, y: 85, size: 3, offset: 2.34 },
    { x: 78, y: 92, size: 3, offset: 0.91 },
    { x: 16, y: 78, size: 4, offset: 2.83 },
    { x: 30, y: 94, size: 2, offset: 1.14 },
    { x: 44, y: 83, size: 3, offset: 0.31 },
    { x: 58, y: 91, size: 2, offset: 2.03 },
    { x: 72, y: 76, size: 4, offset: 1.49 },
    { x: 86, y: 86, size: 3, offset: 2.61 },
    { x: 3,  y: 88, size: 2, offset: 0.71 },
    { x: 46, y: 95, size: 4, offset: 2.21 },
  ];

  return (
    <AbsoluteFill style={{ zIndex: -1, pointerEvents: "none" }}>
      {DOTS.map((d, i) => {
        const pulse = (Math.sin((frame / fps) * (2 * Math.PI / 3) + d.offset) + 1) / 2;
        const opacity = 0.1 + pulse * (0.25 - 0.1);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size * 2,
              height: d.size * 2,
              borderRadius: 999,
              background: "#CC0000",
              opacity,
              transform: "translate(-50%, -50%)",
              zIndex: -1,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
