import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Paper, Stitch, Pin } from "../components/Paper";
import { C, hand, mono } from "../theme";

const LINES = [
  "Bengaluru, India",
  "maazmohammed112@gmail.com",
  "linkedin.com/in/mohammed-maaz-a-0aa730217",
  "github.com/maazmohammed112",
];

export const S5Contact: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 19, stiffness: 130 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Paper
        grid
        style={{
          width: 1080, padding: "54px 60px", position: "relative",
          border: `6px solid ${C.teal}`,
          transform: `scale(${interpolate(s, [0, 1], [0.94, 1])}) rotate(-0.6deg)`,
          opacity: s,
        }}
      >
        <Stitch style={{ left: 26, right: 26, top: 20, height: 3 }} />
        <div style={{ fontFamily: hand, fontWeight: 700, fontSize: 74, color: C.ink, textAlign: "center" }}>
          Let's build something automated.
        </div>
        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
          {LINES.map((l, i) => {
            const ls = spring({ frame: f - 6 - i * 4, fps, config: { damping: 20, stiffness: 160 } });
            return (
              <div
                key={l}
                style={{
                  fontFamily: mono, fontSize: 30, color: C.ink,
                  opacity: ls, transform: `translateY(${interpolate(ls, [0, 1], [16, 0])}px)`,
                }}
              >
                {l}
              </div>
            );
          })}
        </div>
        <Stitch style={{ left: 26, right: 26, bottom: 20, height: 3 }} />
        <Pin style={{ left: 40, top: 40 }} size={22} />
        <Pin style={{ right: 40, top: 40 }} size={22} />
      </Paper>
    </AbsoluteFill>
  );
};