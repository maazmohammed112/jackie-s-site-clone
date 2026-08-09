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
        
        {/* Animated Flying Origami Paper Airplane Container */}
        <div className="relative w-52 h-40 sm:w-64 sm:h-48 flex items-center justify-center">
          
          {/* Dashed Flight Path Curve */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 240 180">
            <path
              d="M 15 135 Q 65 25, 135 95 T 225 35"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="opacity-75 animate-pulse"
            />
          </svg>

          {/* 3D Flying White Dart Paper Plane matching 2nd reference image 1:1 */}
          <div className="relative animate-bounce duration-1000 transform hover:scale-110 transition-transform">
            <svg
              viewBox="0 0 200 140"
              className="w-36 h-28 sm:w-48 sm:h-36 filter drop-shadow-[0_16px_28px_rgba(114,242,217,0.4)]"
            >
              <g stroke="var(--color-primary)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                {/* Underwing Keel Fold */}
                <polygon points="55,75 55,108 102,72" fill="#cbd5e1" />
                {/* Main Left Wing */}
                <polygon points="18,52 182,22 102,72" fill="#ffffff" />
                {/* Center Top Crease/Spine Surface */}
                <polygon points="18,52 182,22 55,75" fill="#f8fafc" opacity="0.95" />
                {/* Main Right Wing */}
                <polygon points="55,75 182,22 102,72" fill="#ffffff" />
                {/* Right Wing Fold Flap */}
                <polygon points="102,72 182,22 142,82" fill="#e2e8f0" />
                {/* Center Crease Line */}
                <line x1="18" y1="52" x2="182" y2="22" stroke="var(--color-primary)" strokeWidth="2" opacity="0.75" />
              </g>
            </svg>
          </div>

        </div>

        {/* Pure White Handwritten Text Message — NO Background Box */}
        <div className="mt-6 h-16 flex items-center justify-center">
          <p className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-white tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] animate-fade-in">
            {FUNNY_MESSAGES[msgIdx]}
          </p>
        </div>

      </div>
    </div>
  );
}

export default PageLoader;