import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Paper, Pin } from "../components/Paper";
import { C, hand, mono } from "../theme";

export const S4Portrait: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = spring({ frame: f, fps, config: { damping: 14, stiffness: 110 } });
  const swing = Math.sin((f - 20) / 16) * interpolate(f, [10, 70], [2.4, 0.4], { extrapolateRight: "clamp" });
  const cap = spring({ frame: f - 26, fps, config: { damping: 20 } });
  const zoom = interpolate(f, [0, 105], [1.06, 1.0]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 70, transform: `scale(${zoom})` }}>
        <div style={{ position: "relative", transformOrigin: "top center", transform: `rotate(${swing}deg) translateY(${interpolate(drop, [0, 1], [-260, 0])}px)`, opacity: drop }}>
          <Paper style={{ padding: 20, paddingBottom: 62, width: 430 }}>
            <div style={{ overflow: "hidden", height: 470, background: "#0C3B37" }}>
              <Img
                src={staticFile("images/portrait.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 18%",
                  transform: `scale(${interpolate(f, [0, 105], [1.06, 1.14])})`,
                }}
              />
            </div>
            <div style={{ fontFamily: hand, fontWeight: 700, fontSize: 34, color: C.ink, textAlign: "center", marginTop: 12 }}>
              Maaz :)
            </div>
          </Paper>
          <Pin style={{ left: "50%", top: -12, marginLeft: -13 }} />
        </div>

        <div style={{ maxWidth: 640, opacity: cap, transform: `translateX(${interpolate(cap, [0, 1], [50, 0])}px)` }}>
          <div style={{ fontFamily: mono, fontSize: 18, letterSpacing: 5, color: C.cyan, marginBottom: 20 }}>
            AUTOMATION ANALYST
          </div>
          <div style={{ fontFamily: hand, fontWeight: 700, fontSize: 74, lineHeight: 1.1, color: C.cream }}>
            Building intelligent systems that make work feel effortless.
          </div>
          <div style={{ marginTop: 26, height: 4, width: interpolate(cap, [0, 1], [0, 300]), background: C.teal }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};