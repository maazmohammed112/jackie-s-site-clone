import { useEffect, useState } from "react";

const FUNNY_MESSAGES = [
  "Folding origami wings for takeoff...",
  "Refuelled on chai & 0xBADCODE...",
  "Bypassing production deployment gates...",
  "Gliding over SAP automation pipelines...",
  "Deploying Agentic AI co-pilots...",
  "Fasten seatbelts, landing in Maaz's paper studio!",
];

export function PageLoader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    // Rotate funny text messages every 600ms
    const msgTimer = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % FUNNY_MESSAGES.length);
    }, 650);

    const t1 = setTimeout(() => setDone(true), 2400);
    const t2 = setTimeout(() => setHidden(true), 3000);

    return () => {
      clearInterval(msgTimer);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = hidden ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      role="status"
      aria-label="Loading portfolio studio"
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#12141a] text-white transition-opacity duration-700 select-none overflow-hidden ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Background Starry / Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px, 28px 28px, 28px 28px",
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-lg px-6 text-center">
        
        {/* Animated Flying Origami Paper Airplane */}
        <div className="relative w-48 h-36 sm:w-60 sm:h-44 flex items-center justify-center">
          
          {/* Animated Dashed Flight Path Curve */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 240 180">
            <path
              d="M 20 140 Q 70 20, 140 90 T 220 40"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="opacity-75 animate-pulse"
            />
          </svg>

          {/* 3D Flying White Paper Plane with Blue/Teal Theme Outline */}
          <div className="relative animate-bounce duration-1000 transform hover:scale-110 transition-transform">
            <svg
              viewBox="0 0 160 120"
              className="w-32 h-24 sm:w-40 sm:h-30 filter drop-shadow-[0_12px_24px_rgba(114,242,217,0.35)]"
            >
              <g stroke="var(--color-primary)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                {/* Main Upper Wing (White Fill + Blue Outline) */}
                <polygon points="10,60 150,15 90,85" fill="#ffffff" />
                {/* Lower Folding Body Flap */}
                <polygon points="10,60 90,85 70,110" fill="#f1f5f9" />
                {/* Right Side Shading Wing */}
                <polygon points="150,15 90,85 130,95" fill="#e2e8f0" />
                {/* Center Crease Fold Line */}
                <line x1="10" y1="60" x2="150" y2="15" stroke="var(--color-primary)" strokeWidth="2" opacity="0.6" />
              </g>
            </svg>
          </div>

        </div>

        {/* Pure White Handwritten Text Message — NO Background Box */}
        <div className="mt-6 h-16 flex items-center justify-center">
          <p className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-white tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] animate-fade-in">
            {FUNNY_MESSAGES[msgIdx]}
          </p>
        </div>

        {/* Minimal Theme Progress Line */}
        <div className="mt-4 w-48 sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/15">
          <div className="h-full bg-primary shadow-[0_0_12px_#72f2d9] animate-pulse transition-all duration-1000 w-full" />
        </div>

      </div>
    </div>
  );
}

export default PageLoader;