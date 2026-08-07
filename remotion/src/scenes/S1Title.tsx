import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { Paper, Pin, Stitch } from "../components/Paper";
import { C, hand, serif, mono } from "../theme";

const TITLES = ["Automation Analyst", "RPA Developer", "AI Automation", "Agentic AI", "Gen AI"];

export const S1Title: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const layer = (d: number, from: number) => {
    const s = spring({ frame: f - d, fps, config: { damping: 18, stiffness: 140 } });
    return { x: interpolate(s, [0, 1], [from, 0]), o: s };
  };
  const a = layer(0, -420);
  const b = layer(6, 380);
  const c = layer(12, 220);

  const idx = Math.min(TITLES.length - 1, Math.max(0, Math.floor((f - 34) / 11)));
  const sub = spring({ frame: f - 34 - idx * 11, fps, config: { damping: 22, stiffness: 220 } });
  const camera = interpolate(f, [0, 105], [1.09, 1.0]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${camera})`, position: "relative", width: 1250, height: 700 }}>
        <Paper
          torn
          style={{
            position: "absolute", left: 40, top: 60, width: 900, height: 560,
            transform: `translateX(${a.x}px) rotate(-3.2deg)`, opacity: a.o,
          }}
        />
        <Paper
          torn lined
          style={{
            position: "absolute", right: 30, top: 30, width: 780, height: 520,
            transform: `translateX(${b.x}px) rotate(2.6deg)`, opacity: b.o * 0.96,
          }}
        />
        <Paper
          torn grid
          style={{
            position: "absolute", left: 200, top: 110, width: 880, height: 470,
            transform: `translateX(${c.x}px) rotate(-0.8deg)`, opacity: c.o,
          }}
        >
          <Stitch style={{ left: 40, right: 40, top: 26, height: 3 }} />
          <Stitch style={{ left: 40, right: 40, bottom: 26, height: 3 }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: 40 }}>
            <Sequence from={22} layout="none">
              <Title />
            </Sequence>
          </div>
        </Paper>
        <Pin style={{ left: 620, top: 96, opacity: c.o }} />
        <Pin size={20} style={{ left: 250, top: 560, opacity: a.o }} />
      </div>

      <div style={{ position: "absolute", bottom: 74, fontFamily: mono, letterSpacing: 8, fontSize: 20, color: C.cyan, opacity: interpolate(f, [40, 62], [0, 0.9], { extrapolateRight: "clamp" }) }}>
        BENGALURU · KARNATAKA · INDIA
      </div>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: 200, top: 220, fontFamily: hand, fontSize: 44, color: C.teal, opacity: 0.0 }} />
      </div>

      <SubTitle idx={idx} sub={sub} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.35))` }} />
      <div style={{ position: "absolute", inset: 0, fontFamily: serif, opacity: 0 }}>.</div>
    </AbsoluteFill>
  );
};

const Title: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letters = "MAAZ".split("");
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {letters.map((l, i) => {
        const s = spring({ frame: f - i * 4, fps, config: { damping: 14, stiffness: 130 } });
        return (
          <span
            key={i}
            style={{
              fontFamily: hand,
              fontWeight: 700,
              fontSize: 190,
              lineHeight: 1,
              color: C.ink,
              display: "inline-block",
              transform: `translateY(${interpolate(s, [0, 1], [70, 0])}px) rotate(${interpolate(s, [0, 1], [8, i % 2 ? 1.2 : -1.4])}deg)`,
              opacity: s,
              filter: `blur(${interpolate(s, [0, 1], [8, 0])}px)`,
            }}
          >
            {l}
          </span>
        );
      })}
    </div>
  );
};

const SubTitle: React.FC<{ idx: number; sub: number }> = ({ idx, sub }) => {
  const f = useCurrentFrame();
  if (f < 34) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "66%",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          background: C.ink,
          color: C.cream,
          padding: "10px 30px",
          fontFamily: mono,
          fontSize: 30,
          letterSpacing: 2,
          transform: `translateY(${interpolate(sub, [0, 1], [18, 0])}px) rotate(-1deg) scale(${interpolate(sub, [0, 1], [0.96, 1])})`,
          opacity: interpolate(sub, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
          boxShadow: "0 14px 26px rgba(0,0,0,0.5)",
        }}
      >
        {TITLES[idx]}
      </div>
    </div>
  );
};