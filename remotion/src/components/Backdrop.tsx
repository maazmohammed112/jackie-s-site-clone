import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C } from "../theme";

export const Backdrop: React.FC = () => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 90) * 22;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(70% 60% at ${50 + drift / 4}% 38%, #14403C 0%, ${C.bg} 55%, ${C.bgDeep} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.06,
          background:
            "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 40px)",
          transform: `translate(${drift}px, ${-drift / 2}px)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: "radial-gradient(60% 55% at 50% 50%, transparent 40%, rgba(0,0,0,0.72) 100%)",
          opacity: interpolate(f, [0, 40], [0.4, 1], { extrapolateRight: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};