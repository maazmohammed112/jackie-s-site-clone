import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Paper, Pin } from "../components/Paper";
import { C, hand, mono } from "../theme";

const ITEMS = [
  {
    label: "Python",
    sub: "scripts",
    d: "M26 22 L14 39 L26 56 M52 22 L64 39 L52 56 M44 16 L34 62",
  },
  {
    label: "SQL",
    sub: "data",
    d: "M14 22 q25 -9 50 0 q-25 9 -50 0 M14 22 v17 q25 9 50 0 v-17 M14 39 v17 q25 9 50 0 v-17",
  },
  {
    label: "UiPath",
    sub: "rpa",
    d: "M20 26 h38 v26 h-38 z M28 36 h6 M44 36 h6 M32 46 h14 M39 26 v-8 M20 39 h-8 M58 39 h8",
  },
  {
    label: "Power Automate",
    sub: "flows",
    d: "M16 24 h20 v14 h-20 z M42 42 h20 v14 h-20 z M36 31 h16 v11 M20 38 v18 h22",
  },
  {
    label: "SAP Build",
    sub: "enterprise",
    d: "M16 58 v-26 l23 -14 l23 14 v26 z M30 58 v-16 h18 v16 M22 34 h10",
  },
  {
    label: "AWS",
    sub: "cloud",
    d: "M24 50 a13 13 0 0 1 2 -25 a17 17 0 0 1 31 6 a10 10 0 0 1 -2 19 z M22 60 q18 8 36 0",
  },
];

export const S2Stack: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pan = interpolate(f, [0, 135], [40, -40]);
  const zoom = interpolate(f, [0, 135], [1.02, 1.07]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `translateX(${pan}px) scale(${zoom})`, position: "relative", width: 1500, height: 760 }}>
        <Paper torn grid style={{ position: "absolute", inset: 40, opacity: 0.98 }} />
        <div
          style={{
            position: "absolute", inset: 90,
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26,
          }}
        >
          {ITEMS.map((it, i) => {
            const s = spring({ frame: f - 6 - i * 6, fps, config: { damping: 17, stiffness: 150 } });
            const draw = interpolate(f - 10 - i * 6, [0, 26], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                key={it.label}
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.42)",
                  border: `2px solid rgba(12,59,55,0.35)`,
                  padding: 16,
                  transform: `translateY(${interpolate(s, [0, 1], [50, 0])}px) rotate(${(i % 2 ? 1 : -1) * 1.2}deg) scale(${interpolate(s, [0, 1], [0.94, 1])})`,
                  opacity: s,
                  boxShadow: "0 12px 22px rgba(0,0,0,0.22)",
                  display: "flex", alignItems: "center", gap: 18,
                }}
              >
                <svg width={86} height={86} viewBox="0 0 78 78">
                  <path
                    d={it.d}
                    fill="none"
                    stroke={C.teal}
                    strokeWidth={4.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={260}
                    strokeDashoffset={draw * 260}
                  />
                </svg>
                <div>
                  <div style={{ fontFamily: hand, fontWeight: 700, fontSize: 40, color: C.ink, lineHeight: 1 }}>{it.label}</div>
                  <div style={{ fontFamily: mono, fontSize: 15, letterSpacing: 3, color: "rgba(12,59,55,0.6)", marginTop: 6 }}>
                    {it.sub.toUpperCase()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Pin style={{ left: 120, top: 66 }} />
        <Pin size={20} style={{ right: 130, bottom: 70 }} />
      </div>

      <Ribbon />
    </AbsoluteFill>
  );
};

const Ribbon: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - 46, fps, config: { damping: 20 } });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 52,
        background: C.ink,
        color: C.cream,
        fontFamily: mono,
        fontSize: 24,
        letterSpacing: 4,
        padding: "12px 34px",
        transform: `rotate(-0.8deg) translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
        opacity: s,
        boxShadow: "0 16px 28px rgba(0,0,0,0.55)",
      }}
    >
      Python · SQL · UiPath · Power Automate · SAP · AWS
    </div>
  );
};