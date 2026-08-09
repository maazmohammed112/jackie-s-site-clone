import { useState, useEffect, useRef } from "react";

export default function GlitchCrtBuddy() {
  const [isBurst, setIsBurst] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let nextTimeoutId: ReturnType<typeof setTimeout>;

    const triggerRandomBurst = () => {
      setIsBurst(true);
      const duration = 120 + Math.random() * 260;
      timeoutId = setTimeout(() => {
        setIsBurst(false);
        const nextInterval = 1800 + Math.random() * 3800;
        nextTimeoutId = setTimeout(triggerRandomBurst, nextInterval);
      }, duration);
    };

    const initialTimer = setTimeout(triggerRandomBurst, 1200);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timeoutId);
      clearTimeout(nextTimeoutId);
    };
  }, []);

  const handleManualBurst = () => {
    setIsBurst(true);
    setTimeout(() => setIsBurst(false), 350);
  };

  return (
    <div
      ref={stageRef}
      onClick={handleManualBurst}
      title="Click me to trigger CRT glitch!"
      className={`relative w-full max-w-[300px] xs:max-w-[360px] sm:max-w-[440px] md:max-w-[500px] mx-auto aspect-[640/480] cursor-pointer select-none transition-all duration-200 ${
        isBurst ? "crt-burst-active" : ""
      }`}
    >
      {/* Scoped Glitch & Jitter Styles */}
      <style>{`
        .crt-burst-active #baseArt { opacity: 0.25; }
        .crt-burst-active .chan { opacity: 0.85; }
        .crt-burst-active #chanR { animation: jitterR 0.28s steps(2,end) infinite; }
        .crt-burst-active #chanB { animation: jitterB 0.24s steps(2,end) infinite; }
        .crt-burst-active { animation: tremor 0.15s steps(1,end) infinite; }
        .crt-burst-active .scanlines-overlay { opacity: 0.65; }
        .crt-burst-active .tear-line {
          opacity: 0.8;
          animation: tearMove 0.6s linear infinite;
        }
        .crt-burst-active .noise-overlay {
          opacity: 0.5;
          animation: noiseFlicker 0.1s steps(1,end) infinite;
        }

        @keyframes jitterR {
          0%   { transform: translate(0,0); }
          30%  { transform: translate(6px,-1px); }
          60%  { transform: translate(-3px,1px); }
          100% { transform: translate(4px,0); }
        }
        @keyframes jitterB {
          0%   { transform: translate(0,0); }
          35%  { transform: translate(-5px,1px); }
          70%  { transform: translate(3px,-1px); }
          100% { transform: translate(-4px,0); }
        }
        @keyframes tremor {
          0%   { transform: translate(0,0) skewX(0deg); }
          25%  { transform: translate(-4px,1px) skewX(0.6deg); }
          50%  { transform: translate(3px,-2px) skewX(-0.4deg); }
          75%  { transform: translate(-2px,2px) skewX(0.3deg); }
          100% { transform: translate(2px,0) skewX(0deg); }
        }
        @keyframes scanDrift {
          from { background-position-y: 0; }
          to   { background-position-y: 200px; }
        }
        @keyframes tearMove {
          0%   { top: 8%;  height: 3px; }
          45%  { top: 55%; height: 6px; }
          100% { top: 92%; height: 2px; }
        }
        @keyframes noiseFlicker {
          0%,100% { opacity: 0.25; }
          50%     { opacity: 0.55; }
        }
      `}</style>

      {/* Ambient CRT scanlines texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35 transition-opacity duration-200 scanlines-overlay"
        style={{
          background: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.16) 0px, rgba(0,0,0,0.16) 1px, transparent 2px, transparent 4px)",
          mixBlendMode: "multiply",
          animation: "scanDrift 6s linear infinite",
        }}
      />

      {/* Rolling horizontal tear line */}
      <div
        className="absolute left-0 right-0 opacity-0 pointer-events-none tear-line"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
        }}
      />

      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 640 480">
        <defs>
          {/* hand-drawn wobble applied to all line art */}
          <filter id="sketchy" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* crt corner softening for the whole stage */}
          <filter id="crtSoften" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="0.3" />
          </filter>

          {/* static noise pattern */}
          <filter id="staticNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="42" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
          </filter>

          {/* channel isolation filters for chromatic aberration */}
          <filter id="isolateR">
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 1 0" />
          </filter>
          <filter id="isolateB">
            <feColorMatrix type="matrix" values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 1 0 0
              0 0 0 1 0" />
          </filter>
        </defs>

        {/* ============ REUSABLE ARTWORK ============ */}
        <g id="art">
          <g filter="url(#sketchy)" fill="none" stroke="var(--ink, #f2ece2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            {/* cord */}
            <path d="M195,300 C160,315 145,335 150,352 C155,370 178,372 182,356 C186,340 168,332 158,344 C150,354 158,368 172,366" strokeWidth="3.5" />

            {/* outer monitor shell */}
            <path d="M182,78 C182,64 196,58 214,57 L432,57 C452,58 464,66 465,80 L470,300 C470,318 456,330 436,332 L206,333 C188,332 176,320 176,302 Z" />

            {/* inner screen bezel */}
            <path d="M215,96 C213,90 219,86 228,86 L410,87 C420,87 426,92 426,99 L430,258 C430,268 422,274 411,274 L226,275 C216,275 210,268 211,258 Z" />

            {/* lower control panel */}
            <path d="M222,286 L378,286" />
            <path d="M222,300 L378,300" />
            <path d="M222,312 C240,308 260,308 278,312 C296,316 300,308 296,304" />
            <circle cx="352" cy="312" r="7" />
            <circle cx="378" cy="312" r="7" />

            {/* feet */}
            <path d="M206,333 L188,362 M226,333 L214,364 M416,332 L430,362 M436,332 L452,362" />
            <path d="M180,364 C240,358 400,358 460,362" strokeWidth="3" />
          </g>

          {/* face: eyes, smile, blush */}
          <g filter="url(#sketchy)">
            <ellipse cx="285" cy="155" rx="8" ry="12" fill="var(--ink, #f2ece2)" />
            <ellipse cx="365" cy="155" rx="8" ry="12" fill="var(--ink, #f2ece2)" />
            <ellipse cx="262" cy="178" rx="18" ry="10" fill="var(--blush, #f4a6b8)" opacity="0.85" />
            <ellipse cx="386" cy="178" rx="18" ry="10" fill="var(--blush, #f4a6b8)" opacity="0.85" />
            <path d="M280,180 C295,202 355,202 370,180" fill="none" stroke="var(--ink, #f2ece2)" strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* GLITCHY CRT TEXT INSIDE MONITOR SCREEN: COOKING MORE... */}
          <g filter="url(#sketchy)">
            <text
              x="324"
              y="235"
              textAnchor="middle"
              className="font-['Silkscreen',monospace] text-[15px] sm:text-[16px] tracking-[0.18em] font-extrabold fill-[#4DFF9A]"
              style={{
                textShadow: "0 0 10px rgba(77, 255, 154, 0.9)",
              }}
            >
              COOKING MORE...
            </text>
          </g>
        </g>
        {/* ============ END ARTWORK ============ */}

        <use id="baseArt" href="#art" />
        <use id="chanR" className="chan" href="#art" style={{ opacity: 0, mixBlendMode: "screen", pointerEvents: "none", filter: "url(#isolateR)" }} />
        <use id="chanB" className="chan" href="#art" style={{ opacity: 0, mixBlendMode: "screen", pointerEvents: "none", filter: "url(#isolateB)" }} />
      </svg>

      {/* Static noise flash overlay */}
      <div className="absolute inset-0 opacity-0 pointer-events-none mix-blend-overlay noise-overlay">
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" filter="url(#staticNoise)" />
        </svg>
      </div>
    </div>
  );
}
