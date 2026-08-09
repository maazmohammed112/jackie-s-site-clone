import { useState, useEffect } from "react";

export default function GlitchCrtBuddy() {
  const [isBurst, setIsBurst] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let nextTimeoutId: ReturnType<typeof setTimeout>;

    const triggerRandomBurst = () => {
      setIsBurst(true);
      const duration = 150 + Math.random() * 250;
      timeoutId = setTimeout(() => {
        setIsBurst(false);
        const nextInterval = 1800 + Math.random() * 3500;
        nextTimeoutId = setTimeout(triggerRandomBurst, nextInterval);
      }, duration);
    };

    const initialTimer = setTimeout(triggerRandomBurst, 1000);

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
      onClick={handleManualBurst}
      title="Click text to trigger CRT glitch burst!"
      className={`relative inline-flex items-center justify-center my-6 px-3 py-2 cursor-pointer select-none transition-transform active:scale-95 ${
        isBurst ? "glitch-burst-active" : ""
      }`}
    >
      {/* Glitch & Chromatic Aberration Animations */}
      <style>{`
        .glitch-burst-active .glitch-text-base { opacity: 0.25; }
        .glitch-burst-active .glitch-chan { opacity: 0.85; }
        .glitch-burst-active .glitch-chan-red { animation: jitterRed 0.25s steps(2,end) infinite; }
        .glitch-burst-active .glitch-chan-cyan { animation: jitterCyan 0.22s steps(2,end) infinite; }
        .glitch-burst-active { animation: textTremor 0.15s steps(1,end) infinite; }

        @keyframes jitterRed {
          0%   { transform: translate(0,0); }
          30%  { transform: translate(6px,-2px); }
          60%  { transform: translate(-4px,1px); }
          100% { transform: translate(3px,0); }
        }
        @keyframes jitterCyan {
          0%   { transform: translate(0,0); }
          35%  { transform: translate(-5px,2px); }
          70%  { transform: translate(4px,-1px); }
          100% { transform: translate(-3px,0); }
        }
        @keyframes textTremor {
          0%   { transform: translate(0,0) skewX(0deg); }
          25%  { transform: translate(-3px,1px) skewX(0.5deg); }
          50%  { transform: translate(2px,-1px) skewX(-0.5deg); }
          75%  { transform: translate(-1px,1px) skewX(0.3deg); }
          100% { transform: translate(0,0) skewX(0deg); }
        }
      `}</style>

      {/* Standalone Glitch Text - Fully Visible Across All Screen Sizes */}
      <div className="relative font-['Silkscreen',monospace] text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[0.18em] uppercase text-[#4DFF9A] whitespace-nowrap max-w-full overflow-hidden">
        
        {/* Base Neon Green Text */}
        <span
          className="glitch-text-base block transition-opacity duration-150"
          style={{ textShadow: "0 0 16px rgba(77,255,154,0.95), 0 0 32px rgba(77,255,154,0.5)" }}
        >
          COOKING MORE...
        </span>

        {/* Chromatic Red Channel Overlay */}
        <span
          aria-hidden="true"
          className="glitch-chan glitch-chan-red absolute inset-0 text-[#ff2e88] opacity-0 pointer-events-none mix-blend-screen"
          style={{ textShadow: "0 0 12px #ff2e88" }}
        >
          COOKING MORE...
        </span>

        {/* Chromatic Cyan Channel Overlay */}
        <span
          aria-hidden="true"
          className="glitch-chan glitch-chan-cyan absolute inset-0 text-[#21e6d6] opacity-0 pointer-events-none mix-blend-screen"
          style={{ textShadow: "0 0 12px #21e6d6" }}
        >
          COOKING MORE...
        </span>

      </div>

    </div>
  );
}
