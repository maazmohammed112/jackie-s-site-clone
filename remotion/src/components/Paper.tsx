import React from "react";
import { C } from "../theme";

export const TORN =
  "polygon(1% 3%, 12% 0.6%, 26% 3.4%, 41% 0.8%, 58% 3.2%, 73% 0.5%, 88% 3.6%, 99% 1.8%, 98.4% 16%, 100% 33%, 97.6% 52%, 99.4% 70%, 97.8% 88%, 99% 98%, 84% 96.4%, 68% 99.4%, 52% 96.8%, 36% 99.6%, 20% 96.6%, 4% 99%, 1.6% 82%, 0.2% 64%, 2.2% 46%, 0.4% 28%, 1.8% 14%)";

export const gridBg = `repeating-linear-gradient(0deg, rgba(12,59,55,0.10) 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, rgba(12,59,55,0.10) 0 1px, transparent 1px 26px), radial-gradient(120% 100% at 30% 10%, ${C.cream} 0%, ${C.creamDeep} 100%)`;

export const linedBg = `repeating-linear-gradient(0deg, transparent 0 27px, rgba(12,59,55,0.13) 27px 28px), linear-gradient(160deg, ${C.cream}, ${C.creamDeep})`;

export const Paper: React.FC<{
  style?: React.CSSProperties;
  torn?: boolean;
  lined?: boolean;
  grid?: boolean;
  children?: React.ReactNode;
}> = ({ style, torn, lined, grid, children }) => (
  <div
    style={{
      background: grid ? gridBg : lined ? linedBg : `linear-gradient(155deg, ${C.cream}, ${C.creamDeep})`,
      clipPath: torn ? TORN : undefined,
      borderRadius: torn ? undefined : 4,
      filter: `drop-shadow(0 26px 40px ${C.shadow})`,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Pin: React.FC<{ style?: React.CSSProperties; size?: number }> = ({ style, size = 26 }) => (
  <div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle at 34% 30%, ${C.cyan}, ${C.teal} 55%, #0A6E66 100%)`,
      boxShadow: `0 6px 10px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(0,0,0,0.35)`,
      ...style,
    }}
  />
);

export const Stitch: React.FC<{ style?: React.CSSProperties; vertical?: boolean }> = ({ style, vertical }) => (
  <div
    style={{
      position: "absolute",
      background: `repeating-linear-gradient(${vertical ? "180deg" : "90deg"}, ${C.teal} 0 9px, transparent 9px 18px)`,
      opacity: 0.75,
      ...style,
    }}
  />
);