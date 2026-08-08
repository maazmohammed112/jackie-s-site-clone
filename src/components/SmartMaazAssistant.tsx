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

    // Auto-pop speech bubble ONLY on mobile devices after 1.5s if not dismissed this session
    const hasSeen = sessionStorage.getItem("maaz_mobile_prompt_seen");
    if (window.innerWidth < 768 && !hasSeen) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-close speech bubble when user scrolls
  useEffect(() => {
    if (!open) return;
    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const handleDismiss = () => {
    setOpen(false);
    if (isMobile) {
      sessionStorage.setItem("maaz_mobile_prompt_seen", "true");
    }
  };

  return (
    <>
      {/* Fixed Top Header Maaz Avatar Icon (Clear of 70px right stamp rail on desktop md:right-20, top-right on mobile right-4) */}
      <div className="fixed top-3 right-4 sm:top-4 sm:right-6 md:right-20 lg:right-24 z-50">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle Maaz AI assistant message"
          className="group relative flex items-center justify-center p-1 transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer bg-transparent border-0 outline-none"
        >
          {/* Pure Helmet Image - No Cream Background Circle */}
          <img
            src="/maaz-helmet.png"
            alt="Maaz Mecha Helmet Avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] transition-transform group-hover:rotate-6"
          />

          {/* Pulse notification dot on mobile if unread */}
          {!open && isMobile && (
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
          )}

          {/* Floating Tooltip Label */}
          <span className="pointer-events-none absolute -bottom-7 right-0 hidden group-hover:block whitespace-nowrap font-['Caveat',cursive] text-sm text-chalk bg-[#181616] px-2 py-0.5 rounded-[4px] border border-white/20 shadow-md">
            Talk to Maaz
          </span>
        </button>
      </div>

      {/* Maaz Speech Bubble Popup (Clear of 70px right stamp rail on desktop md:right-20) */}
      {open && (
        <div className="fixed top-14 right-4 sm:top-16 sm:right-6 md:right-20 lg:right-24 w-[280px] xs:w-[310px] sm:w-[340px] max-w-[85vw] z-50 animate-scale-in">
          <div className="relative paper-grid torn-paper bg-[#f4ead6] text-[#201c16] p-4 sm:p-5 shadow-[0_20px_40px_rgba(0,0,0,0.7)] border-2 border-[#201c16]/20 rounded-[18px]">
            
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
            <div className="absolute -top-2.5 right-5 w-4 h-4 bg-[#f4ead6] border-t-2 border-l-2 border-[#201c16]/20 rotate-45" />

            {/* Avatar Header Row */}
            <div className="flex items-center gap-2.5 mb-2">
              <img
                src="/maaz-helmet.png"
                alt=""
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain shrink-0 filter drop-shadow-sm"
              />
              <span className="font-['Gloria_Hallelujah',cursive] text-sm sm:text-base font-bold text-primary">
                Maaz says:
              </span>
            </div>

            {/* Professional Speech Messages in Handwritten Font (No Emojis) */}
            {isMobile ? (
              <div className="font-['Caveat',cursive] text-base sm:text-lg leading-snug text-[#201c16] space-y-2 mb-3">
                <p>
                  You are currently viewing this portfolio on a mobile device or small screen. For the complete interactive paper studio experience, feel free to switch to a desktop or laptop display.
                </p>
                <p className="font-bold text-primary">
                  Note: I am also a dedicated tea enthusiast.
                </p>
              </div>
            ) : (
              <div className="font-['Caveat',cursive] text-base sm:text-lg leading-snug text-[#201c16] space-y-2 mb-3">
                <p>
                  Welcome to the interactive studio. You can flip through the work experience tags, inspect the education tickets, or view the portfolio film.
                </p>
                <p className="font-bold text-primary">
                  Note: I am also a dedicated tea enthusiast.
                </p>
              </div>
            )}

            {/* Dismiss Button (No Emojis) */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleDismiss}
                className="font-['Caveat',cursive] text-base sm:text-lg font-bold bg-primary text-primary-foreground px-4 py-1 sm:px-5 sm:py-1.5 rounded-[12px] border-2 border-primary-foreground/20 shadow-md transition-transform hover:-rotate-2 active:scale-95 cursor-pointer"
              >
                {isMobile ? "I understand" : "Got it"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
