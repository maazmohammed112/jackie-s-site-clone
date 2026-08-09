import { useMemo } from "react";

export interface StampProps {
  text: string | string[];
  color?: string;
  rotate?: number;
  width?: number;
  height?: number;
  seed?: number;
}

export function DistressedStamp({
  text,
  color = "#B3261E",
  rotate,
  width = 160,
  height = 70,
  seed,
}: StampProps) {
  const lines = Array.isArray(text) ? text : [text];
  const id = useMemo(
    () => `stamp-${Math.random().toString(36).slice(2, 9)}`,
    [text]
  );
  const grainSeed = seed ?? Math.floor(Math.random() * 100);
  const tilt = rotate ?? Math.round((Math.random() * 8 - 4) * 10) / 10;

  const fontSize = lines.length > 1 ? height * 0.22 : height * 0.28;
  const lineHeight = fontSize * 1.15;
  const startY =
    height / 2 - ((lines.length - 1) * lineHeight) / 2 + fontSize * 0.35;

  return (
    <div
      style={{
        display: "inline-block",
        transform: `rotate(${tilt}deg)`,
        mixBlendMode: "multiply",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={lines.join(" ")}
        className="max-w-full h-auto overflow-hidden block"
      >
        <defs>
          <filter
            id={id}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            filterUnits="objectBoundingBox"
          >
            {/* warp the crisp vector edges so they look hand-stamped */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045 0.09"
              numOctaves="2"
              seed={grainSeed}
              result="warp"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="warp"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* fine grain that eats away at the ink, like worn rubber */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              seed={grainSeed + 7}
              result="grain"
            />
            <feColorMatrix
              in="grain"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.6 -0.45"
              result="grainMask"
            />
            <feComposite
              in="displaced"
              in2="grainMask"
              operator="in"
              result="textured"
            />
          </filter>

          <style>
            {`
              .stamp-text-${id} {
                font-family: 'Oswald', 'Arial Narrow', sans-serif;
                font-weight: 700;
                letter-spacing: 1.5px;
                text-transform: uppercase;
              }
            `}
          </style>
        </defs>

        <g filter={`url(#${id})`}>
          <rect
            x="5"
            y="5"
            width={width - 10}
            height={height - 10}
            rx="8"
            fill="none"
            stroke={color}
            strokeWidth="3"
          />
          <rect
            x="10"
            y="10"
            width={width - 20}
            height={height - 20}
            rx="5"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
          <text
            x={width / 2}
            textAnchor="middle"
            className={`stamp-text-${id}`}
            fill={color}
            fontSize={fontSize}
          >
            {lines.map((line, i) => (
              <tspan key={i} x={width / 2} y={startY + i * lineHeight}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      </svg>
    </div>
  );
}

export default DistressedStamp;
