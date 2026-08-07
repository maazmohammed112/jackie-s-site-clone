import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Backdrop } from "./components/Backdrop";
import { S1Title } from "./scenes/S1Title";
import { S2Stack } from "./scenes/S2Stack";
import { S3Certs } from "./scenes/S3Certs";
import { S4Portrait } from "./scenes/S4Portrait";
import { S5Contact } from "./scenes/S5Contact";

const t = (frames: number) => springTiming({ config: { damping: 200 }, durationInFrames: frames });

export const MainVideo: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={105}>
        <S1Title />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom-right" })} timing={t(16)} />
      <TransitionSeries.Sequence durationInFrames={140}>
        <S2Stack />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t(16)} />
      <TransitionSeries.Sequence durationInFrames={112}>
        <S3Certs />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t(14)} />
      <TransitionSeries.Sequence durationInFrames={112}>
        <S4Portrait />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={t(14)} />
      <TransitionSeries.Sequence durationInFrames={71}>
        <S5Contact />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        background: "radial-gradient(75% 65% at 50% 50%, transparent 45%, rgba(0,0,0,0.55) 100%)",
      }}
    />
  </AbsoluteFill>
);