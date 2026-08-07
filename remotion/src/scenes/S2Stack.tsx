import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Paper, Pin } from "../components/Paper";
import { C, hand, mono } from "../theme";

const ITEMS = [
  { label: "Python", d: "M14 46 L34 26 L54 46", sub: "scripts" },
  { label: "SQL", d: "M10 30 h58 M10 44 h58 M10 58 h58", sub: "data" },
  { label: "UiPath", d: "M14 56 C30 10, 50 10, 64 56", sub: "rpa" },
  { label: "Power Automate", d: "M20 60 L38 18 L34 40 L54 34 L28 66", sub: "flows" },
  { label: "SAP Build", d: "M14 22 h50 v34 h-50 z M14 38 h50", sub: "enterprise" },
  { label: "AWS", d: "M12 48 q10 -22 28 -14 q18 -10 26 14 z", sub: "cloud" },
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