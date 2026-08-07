import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Paper, Stitch } from "../components/Paper";
import { C, hand, mono, serif } from "../theme";

const CERTS = [
  { t: "AWS Certified", s: "Cloud Practitioner" },
  { t: "SAP Certified", s: "Build Process Automation" },
  { t: "Microsoft Certified", s: "Power Platform" },
];

const HINTS = ["Enterprise Automation", "Data Analytics", "Full-Stack Development", "Intelligent Process Automation"];

export const S3Certs: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = spring({ frame: f - 2, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontFamily: serif, fontSize: 62, color: C.cream, marginBottom: 34,
          opacity: head, transform: `translateY(${interpolate(head, [0, 1], [26, 0])}px)`,
        }}
      >
        Certified to build it properly
      </div>

      <div style={{ display: "flex", gap: 34, perspective: 1200 }}>
        {CERTS.map((c, i) => {
          const s = spring({ frame: f - 10 - i * 9, fps, config: { damping: 16, stiffness: 120 } });
          return (
            <Paper
              key={c.t}
              style={{
                width: 400, height: 262, padding: 28,
                transformOrigin: "top center",
                transform: `rotateX(${interpolate(s, [0, 1], [-88, 0])}deg) translateY(${interpolate(s, [0, 1], [-30, 0])}px) rotate(${(i - 1) * 1.6}deg)`,
                opacity: interpolate(s, [0, 0.25], [0, 1], { extrapolateRight: "clamp" }),
                position: "relative",
              }}
            >
              <Stitch style={{ left: 18, right: 18, top: 16, height: 3 }} />
              <div style={{ marginTop: 44, fontFamily: hand, fontWeight: 700, fontSize: 52, color: C.ink, lineHeight: 1.05 }}>{c.t}</div>
              <div style={{ marginTop: 12, fontFamily: mono, fontSize: 17, letterSpacing: 2, color: "rgba(12,59,55,0.65)" }}>{c.s}</div>
              <div
                style={{
                  position: "absolute", left: 28, bottom: 26, width: 74, height: 74, borderRadius: "50%",
                  border: `3px solid ${C.teal}`, display: "grid", placeItems: "center",
                  fontFamily: mono, fontSize: 12, color: C.teal, letterSpacing: 1,
                  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                SEAL
              </div>
            </Paper>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 18, marginTop: 44, flexWrap: "wrap", justifyContent: "center" }}>
        {HINTS.map((h, i) => {
          const s = spring({ frame: f - 46 - i * 5, fps, config: { damping: 22 } });
          return (
            <div
              key={h}
              style={{
                border: `2px dashed ${C.teal}`, color: C.cyan, fontFamily: mono, fontSize: 18,
                padding: "8px 20px", opacity: s * 0.95,
                transform: `translateY(${interpolate(s, [0, 1], [18, 0])}px)`,
              }}
            >
              {h}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};