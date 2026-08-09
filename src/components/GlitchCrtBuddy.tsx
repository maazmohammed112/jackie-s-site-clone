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
      title="Click monitor to trigger CRT glitch burst!"
      className={`relative w-full max-w-[300px] xs:max-w-[380px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[620px] mx-auto aspect-[640/480] cursor-pointer select-none transition-transform active:scale-98 ${
        isBurst ? "burst" : ""
      }`}
    >
      {/* Scoped Glitch & Jitter Styles (Strictly Confined to Screen) */}
      <style>{`
        /* chromatic-aberration clones of the screen content, hidden until a burst */
        .chan {
          opacity: 0;
          mix-blend-mode: screen;
          pointer-events: none;
        }
        #chanR { filter: url(#isolateR); }
        #chanB { filter: url(#isolateB); }

        .burst #baseScreen { opacity: 0.3; }
        .burst .chan { opacity: 0.9; }
        .burst #chanR { animation: jitterR 0.28s steps(2,end) infinite; }
        .burst #chanB { animation: jitterB 0.24s steps(2,end) infinite; }

        @keyframes jitterR {
          0%   { transform: translate(0,0); }
          30%  { transform: translate(3px,-1px); }
          60%  { transform: translate(-2px,1px); }
          100% { transform: translate(2px,0); }
        }
        @keyframes jitterB {
          0%   { transform: translate(0,0); }
          35%  { transform: translate(-3px,1px); }
          70%  { transform: translate(2px,-1px); }
          100% { transform: translate(-2px,0); }
        }

        /* ambient scanlines, always gently present, stronger during a burst */
        .scanlines {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0,0,0,0.18) 0px,
            rgba(0,0,0,0.18) 1px,
            transparent 2px,
            transparent 4px
          );
          mix-blend-mode: multiply;
          opacity: 0.35;
          animation: scanDrift 5s linear infinite;
        }
        .burst .scanlines { opacity: 0.7; }
        @keyframes scanDrift {
          from { background-position-y: 0; }
          to   { background-position-y: 120px; }
        }

        /* rolling horizontal tear bar, screen-only */
        .tear { opacity: 0; position: absolute; inset: 0; }
        .burst .tear {
          opacity: 0.85;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: tearMove 0.55s linear infinite;
        }
        @keyframes tearMove {
          0%   { clip-path: inset(8% 0 88% 0); }
          45%  { clip-path: inset(55% 0 40% 0); }
          100% { clip-path: inset(92% 0 4% 0); }
        }

        /* static noise flash, screen-only */
        .noise { opacity: 0; mix-blend-mode: overlay; position: absolute; inset: 0; }
        .burst .noise {
          opacity: 0.5;
          animation: noiseFlicker 0.1s steps(1,end) infinite;
        }
        @keyframes noiseFlicker {
          0%,100% { opacity: 0.25; }
          50%     { opacity: 0.55; }
        }
      `}</style>

      {/* Main SVG Art */}
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 640 480">
        <defs>
          <filter id="sketchy" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>

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

          {/* exact screen shape, used to keep glitching content confined to the screen */}
          <clipPath id="screenClip" clipPathUnits="userSpaceOnUse">
            <path d="M215,96 C213,90 219,86 228,86 L410,87 C420,87 426,92 426,99 L430,258 C430,268 422,274 411,274 L226,275 C216,275 210,268 211,258 Z" />
          </clipPath>
        </defs>

        {/* ===== monitor shell: static, never glitches ===== */}
        <g id="frame" filter="url(#sketchy)" fill="none" stroke="var(--ink, #f2ece2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M195,300 C160,315 145,335 150,352 C155,370 178,372 182,356 C186,340 168,332 158,344 C150,354 158,368 172,366" strokeWidth="3.5" />
          <path d="M182,78 C182,64 196,58 214,57 L432,57 C452,58 464,66 465,80 L470,300 C470,318 456,330 436,332 L206,333 C188,332 176,320 176,302 Z" />
          <path d="M215,96 C213,90 219,86 228,86 L410,87 C420,87 426,92 426,99 L430,258 C430,268 422,274 411,274 L226,275 C216,275 210,268 211,258 Z" />
          <path d="M222,286 L378,286" />
          <path d="M222,300 L378,300" />
          <path d="M222,312 C240,308 260,308 278,312 C296,316 300,308 296,304" />
          <circle cx="352" cy="312" r="7" />
          <circle cx="378" cy="312" r="7" />
          <path d="M206,333 L188,362 M226,333 L214,364 M416,332 L430,362 M436,332 L452,362" />
          <path d="M180,364 C240,358 400,358 460,362" strokeWidth="3" />
        </g>

        {/* ===== screen content: this is the only thing that ever glitches ===== */}
        <g clipPath="url(#screenClip)">
          <g id="screenContent">
            <text x="320" y="188" textAnchor="middle" fontFamily="'Courier New', monospace" fontSize="17" fontWeight="bold" fill="#33ff66">cooking more..</text>
          </g>

          <use id="baseScreen" href="#screenContent" />
          <use id="chanR" className="chan" href="#screenContent" />
          <use id="chanB" className="chan" href="#screenContent" />
        </g>
      </svg>

      {/* glitch FX, clipped to the screen rectangle only */}
      <div className="absolute left-[32.8%] top-[17.9%] w-[34.4%] h-[39.4%] overflow-hidden rounded-[8%/10%] pointer-events-none">
        <div className="scanlines"></div>
        <div className="tear"></div>
        <div className="noise">
          <svg width="100%" height="100%">
            <filter id="staticNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="42" result="n" />
              <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#staticNoise)" />
          </svg>
        </div>
      </div>

    </div>
  );
}
