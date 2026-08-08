import { useState, useEffect } from "react";

export default function SmartMaazAssistant() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Auto-pop speech bubble on mobile devices after 1.5 seconds if not dismissed this session
    const hasSeen = sessionStorage.getItem("maaz_mobile_prompt_seen");
    if (window.innerWidth < 768 && !hasSeen) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDismiss = () => {
    setOpen(false);
    sessionStorage.setItem("maaz_mobile_prompt_seen", "true");
  };

  return (
    <>
      {/* Fixed Top Header Maaz Avatar Icon */}
      <div className="fixed top-3 right-4 sm:top-5 sm:right-8 z-50">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle Maaz AI assistant message"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#f4ead6] border-2 border-primary shadow-[0_4px_12px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          {/* Avatar Image */}
          <img
            src="/maaz-helmet.png"
            alt="Maaz Mecha Helmet Avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-transform group-hover:rotate-6"
          />

          {/* Pulse notification dot if closed on mobile */}
          {!open && isMobile && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary" />
            </span>
          )}

          {/* Floating Tooltip Label */}
          <span className="pointer-events-none absolute -bottom-7 right-0 hidden group-hover:block whitespace-nowrap font-['Caveat',cursive] text-sm text-chalk bg-[#181616] px-2 py-0.5 rounded-[4px] border border-white/20 shadow-md">
            Talk to Maaz
          </span>
        </button>
      </div>

      {/* Maaz Speech Bubble Popup */}
      {open && (
        <div className="fixed top-16 right-4 sm:top-20 sm:right-8 w-[290px] xs:w-[320px] sm:w-[360px] max-w-[90vw] z-50 animate-scale-in">
          <div className="relative paper-grid torn-paper bg-[#f4ead6] text-[#201c16] p-5 sm:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border-2 border-[#201c16]/20 rounded-[18px]">
            
            {/* Washi Tape Accent */}
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-20 rotate-[-2deg] bg-primary/40 shadow-sm"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,.35) 0 2px, transparent 2px 6px)",
              }}
            />

            {/* Speech Pointer Tail */}
            <div className="absolute -top-2.5 right-6 w-5 h-5 bg-[#f4ead6] border-t-2 border-l-2 border-[#201c16]/20 rotate-45" />

            {/* Avatar Header Row */}
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/maaz-helmet.png"
                alt=""
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0"
              />
              <span className="font-['Gloria_Hallelujah',cursive] text-base font-bold text-primary">
                Maaz says:
              </span>
            </div>

            {/* Speech Message in Handwritten Font */}
            <p className="font-['Caveat',cursive] text-lg sm:text-xl leading-snug text-[#201c16] mb-4">
              Ohhhhh! You're using mobile or a small screen? 📱
              <br />
              It looks so cozy and small here! You can try opening this on a desktop or laptop to see my big paper studio for the best view! 🚀
            </p>

            {/* Dismiss Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleDismiss}
                className="font-['Caveat',cursive] text-lg font-bold bg-primary text-primary-foreground px-5 py-1.5 rounded-[12px] border-2 border-primary-foreground/20 shadow-md transition-transform hover:-rotate-2 active:scale-95 cursor-pointer"
              >
                I know! 👍
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
