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
      title="Click screen to trigger CRT glitch!"
      className={`relative w-full max-w-[290px] xs:max-w-[350px] sm:max-w-[430px] md:max-w-[480px] mx-auto aspect-[640/480] cursor-pointer select-none transition-all duration-200 ${
        isBurst ? "crt-burst-active" : ""
      }`}
    >
      {/* Scoped Glitch & Jitter Styles (Clipped Strictly Inside Screen Glass) */}
      <style>{`
        .crt-burst-active #screenBaseText { opacity: 0.2; }
        .crt-burst-active .screen-chan { opacity: 0.9; }
        .crt-burst-active #screenChanR { animation: jitterR 0.24s steps(2,end) infinite; }
        .crt-burst-active #screenChanB { animation: jitterB 0.20s steps(2,end) infinite; }
        .crt-burst-active .scanlines-overlay { opacity: 0.65; }
        .crt-burst-active .tear-line {
          opacity: 0.85;
          animation: tearMove 0.5s linear infinite;
        }
        .crt-burst-active .noise-overlay {
          opacity: 0.5;
          animation: noiseFlicker 0.1s steps(1,end) infinite;
        }

        @keyframes jitterR {
          0%   { transform: translate(0,0); }
          30%  { transform: translate(5px,-1px); }
          60%  { transform: translate(-4px,1px); }
          100% { transform: translate(3px,0); }
        }
        @keyframes jitterB {
          0%   { transform: translate(0,0); }
          35%  { transform: translate(-4px,1px); }
          70%  { transform: translate(3px,-1px); }
          100% { transform: translate(-3px,0); }
        }
        @keyframes scanDrift {
          from { background-position-y: 0; }
          to   { background-position-y: 200px; }
        }
        @keyframes tearMove {
          0%   { top: 22%;  height: 3px; }
          45%  { top: 52%; height: 5px; }
          100% { top: 78%; height: 2px; }
        }
        @keyframes noiseFlicker {
          0%,100% { opacity: 0.25; }
          50%     { opacity: 0.55; }
        }
      `}</style>

      {/* SVG CRT Buddy Monitor */}
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 640 480">
        <defs>
          {/* Hand-drawn wobble applied to monitor frame */}
          <filter id="sketchy" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* CRT corner softening */}
          <filter id="crtSoften" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="0.3" />
          </filter>

          {/* Static noise pattern */}
          <filter id="staticNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="42" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
          </filter>

          {/* Channel isolation filters for glitch text chromatic aberration */}
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

          {/* Inner Screen Bezel ClipPath - Keeps glitches STRICTLY inside screen glass */}
          <clipPath id="screenBezelClip">
            <path d="M215,96 C213,90 219,86 228,86 L410,87 C420,87 426,92 426,99 L430,258 C430,268 422,274 411,274 L226,275 C216,275 210,268 211,258 Z" />
          </clipPath>

          {/* Reusable Glitch Text Graphic */}
          <g id="screenTextContent" filter="url(#sketchy)">
            <text
              x="322"
              y="180"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-['Silkscreen',monospace] text-[17px] sm:text-[19px] tracking-[0.2em] font-extrabold fill-[#4DFF9A]"
              style={{
                textShadow: "0 0 12px rgba(77, 255, 154, 0.95), 0 0 20px rgba(77, 255, 154, 0.4)",
              }}
            >
              COOKING MORE...
            </text>
          </g>
        </defs>

        {/* ============ OUTER MONITOR BODY & SHELL (STAYS CRISP & STEADY) ============ */}
        <g filter="url(#sketchy)" fill="none" stroke="var(--ink, #f2ece2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* cord */}
          <path d="M195,300 C160,315 145,335 150,352 C155,370 178,372 182,356 C186,340 168,332 158,344 C150,354 158,368 172,366" strokeWidth="3.5" />

          {/* outer monitor shell */}
          <path d="M182,78 C182,64 196,58 214,57 L432,57 C452,58 464,66 465,80 L470,300 C470,318 456,330 436,332 L206,333 C188,332 176,320 176,302 Z" />

          {/* inner screen bezel outline */}
          <path d="M215,96 C213,90 219,86 228,86 L410,87 C420,87 426,92 426,99 L430,258 C430,268 422,274 411,274 L226,275 C216,275 210,268 211,258 Z" fill="#071a13" />

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

        {/* ============ INNER SCREEN CONTENT (GLITCHES STRICTLY INSIDE SCREEN BEZEL) ============ */}
        <g clipPath="url(#screenBezelClip)">
          {/* Base Screen Text */}
          <use id="screenBaseText" href="#screenTextContent" />

          {/* Glitch Channel Clones */}
          <use id="screenChanR" className="screen-chan" href="#screenTextContent" style={{ opacity: 0, mixBlendMode: "screen", pointerEvents: "none", filter: "url(#isolateR)" }} />
          <use id="screenChanB" className="screen-chan" href="#screenTextContent" style={{ opacity: 0, mixBlendMode: "screen", pointerEvents: "none", filter: "url(#isolateB)" }} />
        </g>

      </svg>

      {/* Scanlines & Noise overlays clipped to screen bounds */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[14px] overflow-hidden"
        style={{
          clipPath: "inset(18% 28% 44% 28%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-35 transition-opacity duration-200 scanlines-overlay"
          style={{
            background: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 2px, transparent 4px)",
            mixBlendMode: "multiply",
            animation: "scanDrift 6s linear infinite",
          }}
        />
        <div
          className="absolute left-0 right-0 opacity-0 pointer-events-none tear-line"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />
        <div className="absolute inset-0 opacity-0 pointer-events-none mix-blend-overlay noise-overlay">
          <svg width="100%" height="100%">
            <rect width="100%" height="100%" filter="url(#staticNoise)" />
          </svg>
        </div>
      </div>

    </div>
  );
}
