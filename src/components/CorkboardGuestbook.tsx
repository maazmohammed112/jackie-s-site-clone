import { useState, useEffect, useRef } from "react";
import DistressedStamp from "./DistressedStamp";
import { db, ref, onValue, push, runTransaction } from "../lib/firebase";

export interface GuestbookNote {
  id: string;
  name: string;
  message: string;
  stampKey: string;
  date: string;
  likes: number;
  rotation: number;
  bgClass: string;
  pinColor: string;
  borderRadius: string;
  createdAt: number;
}

export interface StampPreset {
  id: string;
  label: string;
  text: string | string[];
  color: string;
}

export const STAMP_PRESETS: Record<string, StampPreset> = {
  chaiApproved: { id: "chaiApproved", label: "CHAI APPROVED", text: ["CHAI", "APPROVED"], color: "#B3261E" },
  genius: { id: "genius", label: "GENIUS", text: "GENIUS", color: "#24398C" },
  loveIt: { id: "loveIt", label: "LOVE IT!", text: "LOVE IT!", color: "#2F7A44" },
  legend: { id: "legend", label: "LEGEND", text: "LEGEND", color: "#C1650F" },
  needToImprove: { id: "needToImprove", label: "NEED TO IMPROVE", text: ["NEED TO", "IMPROVE"], color: "#5C3A99" },
  jealous: { id: "jealous", label: "JEALOUS", text: "JEALOUS", color: "#6B4A2E" },
  needToTalk: { id: "needToTalk", label: "NEED TO TALK", text: "NEED TO TALK", color: "#1F2937" },
  iWillStamp: { id: "iWillStamp", label: "I WILL STAMP", text: ["I WILL", "STAMP"], color: "#0284c7" },
};

const NOTE_THEMES = [
  { bgClass: "bg-[#fff7d1] text-[#332b00] border-[#e6dc9c]", pinColor: "bg-red-600", borderRadius: "14px 4px 12px 6px" },
  { bgClass: "bg-[#e2f7d1] text-[#1c3300] border-[#c4e6a5]", pinColor: "bg-emerald-600", borderRadius: "4px 16px 6px 14px" },
  { bgClass: "bg-[#ffd1dc] text-[#33000d] border-[#f0b0c0]", pinColor: "bg-blue-600", borderRadius: "12px 6px 16px 4px" },
  { bgClass: "bg-[#d1e8ff] text-[#001f33] border-[#a5d0f0]", pinColor: "bg-zinc-100", borderRadius: "6px 14px 4px 16px" },
  { bgClass: "bg-[#f7edd1] text-[#332500] border-[#e6d7a5]", pinColor: "bg-amber-500", borderRadius: "16px 4px 14px 8px" },
  { bgClass: "bg-[#fbf7ee] text-[#2c281e] border-[#e4dccb]", pinColor: "bg-red-500", borderRadius: "8px 14px 6px 16px" },
];

export default function CorkboardGuestbook() {
  const [notes, setNotes] = useState<GuestbookNote[]>([]);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);

  const [leverPullCount, setLeverPullCount] = useState(0);
  const [isLeverPulled, setIsLeverPulled] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedStampKey, setSelectedStampKey] = useState("chaiApproved");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHelmetShaking, setIsHelmetShaking] = useState(false);
  const [showAllStamps, setShowAllStamps] = useState(false);

  // Confirmation Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Local user likes tracking per note
  const [userLikedNotes, setUserLikedNotes] = useState<Record<string, number>>({});

  const corkboardRef = useRef<HTMLDivElement>(null);

  // 1. Real-time sync for Guestbook Notes from Firebase Realtime Database
  useEffect(() => {
    const notesRef = ref(db, "guestbook_notes");

    const unsubscribe = onValue(
      notesRef,
      (snapshot) => {
        setIsLoadingNotes(false);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const loadedNotes: GuestbookNote[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          // Sort notes newest first by createdAt
          loadedNotes.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          setNotes(loadedNotes);
        } else {
          setNotes([]);
        }
      },
      (error) => {
        console.error("Firebase notes fetch error:", error);
        setIsLoadingNotes(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // 2. Real-time sync for Visitor Counter from Firebase Realtime Database
  useEffect(() => {
    const visitorRef = ref(db, "visitor_count");

    const unsubscribe = onValue(visitorRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        setVisitorCount(typeof val === "number" ? val : 0);
      } else {
        // Initialize Firebase visitor counter to 0 if database is empty
        runTransaction(visitorRef, () => 0);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleHelmetClick = () => {
    setIsHelmetShaking(true);
    setTimeout(() => setIsHelmetShaking(false), 800);
  };

  const handlePullLever = () => {
    setIsLeverPulled(true);

    // Atomically increment visitor count in Firebase Realtime Database
    const visitorRef = ref(db, "visitor_count");
    runTransaction(visitorRef, (currentVal) => (currentVal || 0) + 1);

    const nextCount = leverPullCount + 1;
    setLeverPullCount(nextCount);

    if (nextCount === 2) {
      window.dispatchEvent(new CustomEvent("maaz_lever_pulled_twice"));
    }

    setTimeout(() => setIsLeverPulled(false), 300);
  };

  const handleScrollToOlderNotes = () => {
    if (corkboardRef.current) {
      corkboardRef.current.scrollTo({
        top: corkboardRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Step 1: Open Paper Confirmation Modal
  const handleOpenConfirmModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setShowConfirmModal(true);
  };

  // Step 2: Final Confirmed Post to Firebase Realtime Database
  const handleConfirmPostNote = () => {
    if (!message.trim()) return;

    setIsSubmitting(true);
    setShowConfirmModal(false);

    const theme = NOTE_THEMES[notes.length % NOTE_THEMES.length]!;
    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' }).toUpperCase()} ${today.getFullYear()}`;

    const newNote = {
      name: name.trim() || "Visitor",
      message: message.trim(),
      stampKey: selectedStampKey,
      date: formattedDate,
      likes: 1,
      rotation: Math.random() * 6 - 3,
      bgClass: theme.bgClass,
      pinColor: theme.pinColor,
      borderRadius: theme.borderRadius,
      createdAt: Date.now(),
    };

    // Push new note to Firebase Realtime Database
    const notesRef = ref(db, "guestbook_notes");
    push(notesRef, newNote)
      .then(() => {
        setName("");
        setMessage("");
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error("Failed to pin note to Firebase:", err);
        setIsSubmitting(false);
      });
  };

  // Liking a note & triggering funny Maaz reaction if liked twice
  const handleLike = (id: string) => {
    const currentClicks = userLikedNotes[id] || 0;
    setUserLikedNotes((prev) => ({ ...prev, [id]: currentClicks + 1 }));

    if (currentClicks >= 1) {
      window.dispatchEvent(new CustomEvent("maaz_liked_twice"));
    }

    const noteLikesRef = ref(db, `guestbook_notes/${id}/likes`);
    runTransaction(noteLikesRef, (currentLikes) => (currentLikes || 0) + 1);
  };

  const latestSixNotes = notes.slice(0, 6);
  const olderNotes = notes.slice(6);
  const hasMoreThanSix = olderNotes.length > 0;
  const olderNotesCount = olderNotes.length;

  const allStampList = Object.values(STAMP_PRESETS);
  const visibleStamps = showAllStamps ? allStampList : allStampList.slice(0, 6);

  // Format visitor counter to 5 digits (e.g. 0 0 0 0 0)
  const countDigits = String(visitorCount).padStart(5, "0").split("");

  const currentPreviewStamp = STAMP_PRESETS[selectedStampKey] ?? STAMP_PRESETS["chaiApproved"]!;

  return (
    <section id="guestbook" className="relative my-20 px-3 sm:px-6 max-w-7xl mx-auto select-none">
      
      {/* PUBLIC POST CONFIRMATION PAPER MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative paper-grid torn-paper bg-[#f4ead6] text-[#201c16] p-6 sm:p-7 max-w-md w-full rounded-[14px] border-2 border-[#201c16]/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] rotate-[-1deg]">
            
            {/* Washi Tape Accent */}
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-24 rotate-[-2deg] bg-primary/40 shadow-sm" />

            <h3 className="font-['Silkscreen',monospace] text-base sm:text-lg font-bold text-[#201c16] mb-2 uppercase flex items-center gap-2">
              <span>⚠️</span>
              <span>PUBLIC POST CONFIRMATION</span>
            </h3>

            <p className="font-['Caveat',cursive] text-base sm:text-lg text-[#201c16]/90 leading-snug mb-4">
              This note will be <strong>publicly visible to all visitors worldwide</strong> on the studio corkboard. Please double-check that you haven't included any private personal info (phone, address, passwords, etc.).
            </p>

            {/* Note Preview Box */}
            <div className="bg-[#fff7d1] text-[#332b00] p-4 rounded-[6px] border border-[#e6dc9c] shadow-md my-4 rotate-[1deg]">
              <div className="font-['Caveat',cursive] text-xs font-bold text-right text-[#201c16]/70">
                {name.trim() || "Visitor"}
              </div>
              <p className="font-['Caveat',cursive] text-lg font-bold my-1">
                "{message.trim()}"
              </p>
              <div className="mt-2 flex items-center justify-start">
                <DistressedStamp text={currentPreviewStamp.text} color={currentPreviewStamp.color} width={120} height={46} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 font-['Silkscreen',monospace] text-xs py-2.5 px-3 rounded-[4px] border border-[#201c16]/40 bg-[#e8dec8] text-[#201c16] hover:bg-white active:scale-95 transition-transform cursor-pointer"
              >
                CANCEL
              </button>

              <button
                type="button"
                onClick={handleConfirmPostNote}
                className="flex-1 font-['Silkscreen',monospace] text-xs font-bold py-2.5 px-3 rounded-[4px] border-2 border-primary bg-primary text-primary-foreground shadow-md hover:-rotate-1 active:scale-95 transition-transform cursor-pointer"
              >
                POST NOTE
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Wooden Framed Outer Container */}
      <div className="relative bg-[#1c1815] p-3 sm:p-6 lg:p-7 rounded-[18px] border-[6px] sm:border-[8px] border-[#382a1d] shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
        
        {/* Pinned Paper Note Indicator for Older Notes */}
        {hasMoreThanSix && (
          <div
            onClick={handleScrollToOlderNotes}
            title="Click to scroll to older notes"
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-40 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <div className="relative paper-grid torn-paper bg-[#f4ead6] text-[#201c16] px-5 py-2.5 rounded-[4px] shadow-[0_12px_28px_rgba(0,0,0,0.85)] border-2 border-[#201c16]/30 rotate-[-1deg] flex items-center gap-3">
              <span className="absolute -top-3 left-6 h-5 w-16 rotate-[-4deg] bg-primary/40 shadow-sm" />
              <p className="font-['Caveat',cursive] text-base sm:text-lg font-bold text-[#201c16] whitespace-nowrap">
                📌 There are {olderNotesCount} older notes below — click or scroll board down to view ↴
              </p>
              <span className="font-['Silkscreen',monospace] text-[9px] bg-amber-800 text-white px-2 py-0.5 rounded-[3px] shrink-0 font-bold">
                +{olderNotesCount} OLDER
              </span>
            </div>
          </div>
        )}

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT COLUMN: Wooden Corkboard Wall */}
          <div
            ref={corkboardRef}
            className="lg:col-span-7 relative h-full min-h-[640px] max-h-[660px] bg-[#9e6f47] p-4 sm:p-6 rounded-[12px] border-4 border-[#523820] shadow-[inset_0_4px_20px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-y-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            
            {/* Real Corkboard Surface Grain Texture */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none rounded-[8px]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 50% 50%, #472d16 1.5px, transparent 1.5px),
                  radial-gradient(circle at 20% 80%, #7a512c 2px, transparent 2px),
                  radial-gradient(circle at 80% 20%, #38200b 1px, transparent 1px)
                `,
                backgroundSize: "12px 12px, 16px 16px, 8px 8px",
              }}
            />

            {/* Top Area Container: Shakable Helmet Polaroid + Header Banner + Mechanical Counter with Pull Lever */}
            <div className="relative z-10 mb-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              
              {/* SHAKABLE Polaroid Mecha Helmet Photo */}
              <div
                onClick={handleHelmetClick}
                title="Click me to shake!"
                className={`relative shrink-0 w-24 sm:w-26 bg-white p-2 shadow-xl border border-zinc-200 rotate-[-5deg] cursor-pointer transition-transform duration-300 hover:rotate-[-10deg] ${
                  isHelmetShaking ? "animate-bounce" : ""
                }`}
              >
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#b5a38a] rounded-sm opacity-70 border border-black/10" />
                <img src="/maaz-helmet.png" alt="Techwazzy Studio" className="w-full h-16 object-contain bg-zinc-900 rounded-[2px]" />
                <div className="font-['Silkscreen',monospace] text-[7px] text-center mt-1 text-zinc-700 font-bold">TECHWAZZY STUDIO</div>
              </div>

              {/* Header Title Banner */}
              <div className="flex-1 bg-[#f4ead6] text-[#201c16] p-3.5 sm:p-4 rounded-[6px] shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-[#201c16]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h2 className="font-['Gloria_Hallelujah',cursive] text-xl sm:text-2xl font-bold text-[#201c16] leading-tight">
                    Techwazzy Life World
                  </h2>
                  <p className="font-['Caveat',cursive] text-sm sm:text-base text-[#201c16]/80 mt-0.5">
                    Real visitors. Real vibes. Real stamps. ♡
                  </p>
                </div>

                {/* 3D MECHANICAL TALLY COUNTER WITH PULL LEVER & HANDWRITTEN WHITE HINT */}
                <div className="relative shrink-0 pt-5">
                  
                  {/* Pure White Handwritten Hint with Drawn Arrow (No Background Container) */}
                  <div className="absolute -top-1.5 right-0 pointer-events-none flex items-center gap-1 font-['Caveat',cursive] text-white text-xs sm:text-sm font-bold whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] animate-bounce">
                    <span>pull down to add your count!</span>
                    <svg className="w-4 h-4 text-white rotate-[90deg] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="relative bg-gradient-to-b from-[#d1d5db] via-[#9ca3af] to-[#4b5563] p-2 rounded-[8px] border-2 border-zinc-600 shadow-[0_6px_16px_rgba(0,0,0,0.6)] flex items-center gap-2">
                    
                    <div>
                      <div className="font-['Silkscreen',monospace] text-[8px] text-zinc-900 uppercase font-bold tracking-wider mb-0.5 text-center">
                        VISITORS
                      </div>
                      {/* Metallic Flip Reels */}
                      <div className="flex items-center gap-1 bg-black p-1 rounded-[4px] border border-zinc-700 shadow-inner">
                        {countDigits.map((digit, i) => (
                          <span
                            key={i}
                            className="bg-gradient-to-b from-zinc-800 to-zinc-950 text-white font-['Space_Mono',monospace] text-xs sm:text-sm px-1.5 py-0.5 rounded-[2px] font-bold border border-white/20 shadow-md"
                          >
                            {digit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pull Lever Handle (T-Bar) */}
                    <div
                      onClick={handlePullLever}
                      title="Pull lever to increment visitor count!"
                      className={`group relative cursor-pointer transition-transform duration-200 ${
                        isLeverPulled ? "translate-y-2 rotate-12 scale-95" : "hover:translate-y-0.5"
                      }`}
                    >
                      {/* Metallic Rod */}
                      <div className="w-2.5 h-10 bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-600 rounded-full border border-zinc-700 shadow-md flex flex-col items-center justify-start pt-1">
                        {/* Red Rubber T-Grip Handle Top */}
                        <span className="w-5 h-3.5 bg-red-600 rounded-sm border border-red-800 shadow-md group-hover:brightness-125" />
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Empty State / Loading State */}
            {isLoadingNotes ? (
              <div className="relative z-10 text-center my-12 text-[#201c16] font-['Caveat',cursive] text-2xl font-bold">
                Loading corkboard notes from live database... 📌
              </div>
            ) : notes.length === 0 ? (
              <div className="relative z-10 text-center my-12 bg-[#f4ead6] p-6 rounded-[8px] border-2 border-dashed border-[#201c16]/30 max-w-md mx-auto">
                <p className="font-['Caveat',cursive] text-2xl font-bold text-[#201c16] mb-1">
                  Be the very first to pin a note! 📌
                </p>
                <p className="font-['Caveat',cursive] text-lg text-[#201c16]/80">
                  Write something cool on the right panel and stamp it!
                </p>
              </div>
            ) : (
              <>
                {/* Top 6 Latest Sticky Notes Grid */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
                  {latestSixNotes.map((note) => {
                    const stampObj = STAMP_PRESETS[note.stampKey] ?? STAMP_PRESETS["chaiApproved"]!;

                    return (
                      <div
                        key={note.id}
                        style={{
                          transform: `rotate(${note.rotation}deg)`,
                          borderRadius: note.borderRadius,
                        }}
                        className={`relative p-3.5 shadow-[0_12px_24px_rgba(0,0,0,0.5)] border ${note.bgClass} transition-transform duration-300 hover:rotate-0 hover:z-30 hover:scale-[1.03] flex flex-col justify-between min-h-[195px] overflow-hidden`}
                      >
                        {/* Pushpin Header */}
                        <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full ${note.pinColor} shadow-[0_2px_5px_rgba(0,0,0,0.6)] border border-white`} />

                        {/* Author Name */}
                        <div className="font-['Caveat',cursive] text-xs text-[#201c16]/70 font-bold text-right">
                          {note.name}
                        </div>

                        {/* Note Body Message */}
                        <p className="font-['Caveat',cursive] text-base sm:text-lg leading-snug font-bold my-1.5 break-words">
                          "{note.message}"
                        </p>

                        {/* SVG Distressed Rubber Stamp */}
                        <div className="mt-1 flex items-center justify-start overflow-hidden max-w-full">
                          <DistressedStamp
                            text={stampObj.text}
                            color={stampObj.color}
                            width={135}
                            height={55}
                          />
                        </div>

                        {/* Date & Like Button */}
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#201c16]/10">
                          <span className="font-['Space_Mono',monospace] text-[8px] text-[#201c16]/60">
                            {note.date}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleLike(note.id)}
                            className="flex items-center gap-1 font-['Silkscreen',monospace] text-[9px] px-1.5 py-0.5 rounded-[3px] bg-white/60 border border-[#201c16]/20 hover:bg-white active:scale-90 transition-transform cursor-pointer"
                          >
                            <span>❤️</span>
                            <span>{note.likes}</span>
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Older Notes Grid (Rendered if notes > 6) */}
                {hasMoreThanSix && (
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 mb-6">
                    {olderNotes.map((note) => {
                      const stampObj = STAMP_PRESETS[note.stampKey] ?? STAMP_PRESETS["chaiApproved"]!;

                      return (
                        <div
                          key={note.id}
                          style={{
                            transform: `rotate(${note.rotation}deg)`,
                            borderRadius: note.borderRadius,
                          }}
                          className={`relative p-3.5 shadow-[0_12px_24px_rgba(0,0,0,0.5)] border ${note.bgClass} transition-transform duration-300 hover:rotate-0 hover:z-30 hover:scale-[1.03] flex flex-col justify-between min-h-[195px] overflow-hidden`}
                        >
                          {/* Pushpin Header */}
                          <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full ${note.pinColor} shadow-[0_2px_5px_rgba(0,0,0,0.6)] border border-white`} />

                          {/* Author Name */}
                          <div className="font-['Caveat',cursive] text-xs text-[#201c16]/70 font-bold text-right">
                            {note.name}
                          </div>

                          {/* Note Body Message */}
                          <p className="font-['Caveat',cursive] text-base sm:text-lg leading-snug font-bold my-1.5 break-words">
                            "{note.message}"
                          </p>

                          {/* SVG Distressed Rubber Stamp */}
                          <div className="mt-1 flex items-center justify-start overflow-hidden max-w-full">
                            <DistressedStamp
                              text={stampObj.text}
                              color={stampObj.color}
                              width={135}
                              height={55}
                            />
                          </div>

                          {/* Date & Like Button */}
                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#201c16]/10">
                            <span className="font-['Space_Mono',monospace] text-[8px] text-[#201c16]/60">
                              {note.date}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleLike(note.id)}
                              className="flex items-center gap-1 font-['Silkscreen',monospace] text-[9px] px-1.5 py-0.5 rounded-[3px] bg-white/60 border border-[#201c16]/20 hover:bg-white active:scale-90 transition-transform cursor-pointer"
                            >
                              <span>❤️</span>
                              <span>{note.likes}</span>
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* Bottom Right Torn Note Paper Scrap */}
            <div className="relative z-10 mt-4 self-end max-w-[240px] bg-[#f4ead6] text-[#201c16] px-4 py-2.5 rounded-[4px] shadow-lg border border-[#201c16]/20 rotate-[2deg]">
              <span className="absolute -top-2.5 left-4 w-3.5 h-3.5 bg-red-600 rounded-full shadow-sm border border-white" />
              <p className="font-['Caveat',cursive] text-sm leading-tight text-center font-bold">
                Every stamp tells a story. Thanks for being a part of mine! ♡
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Leave Note Form & Pick Reaction Stamp Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Top Tape Vibe Scrap */}
            <div className="relative bg-[#f4ead6] text-[#201c16] px-4 py-2 rounded-[4px] shadow-md border border-[#201c16]/20 rotate-[-1deg] text-center">
              <span className="absolute -top-2 left-6 w-12 h-4 bg-primary/40 rotate-[-5deg]" />
              <p className="font-['Caveat',cursive] text-lg font-bold">
                Drop your vibe. Leave your mark. 😊
              </p>
            </div>

            {/* LEAVE A QUICK NOTE Form Card */}
            <div className="relative bg-[#f4ead6] text-[#201c16] p-5 rounded-[8px] shadow-[0_16px_36px_rgba(0,0,0,0.7)] border-2 border-[#201c16]/20 rotate-[1deg]">
              
              {/* Spiral Rings */}
              <div className="absolute right-2 top-4 bottom-4 flex flex-col justify-between opacity-40">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span key={i} className="w-2.5 h-2.5 rounded-full bg-zinc-800 shadow-inner" />
                ))}
              </div>

              <h3 className="font-['Silkscreen',monospace] text-sm sm:text-base font-bold text-[#201c16] mb-3 uppercase">
                LEAVE A QUICK NOTE
              </h3>

              <form onSubmit={handleOpenConfirmModal} className="space-y-3.5 pr-4">
                
                {/* Message Textarea */}
                <div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write something awesome..."
                    rows={3}
                    required
                    maxLength={120}
                    className="w-full bg-[#e8dec8] text-[#201c16] p-3 rounded-[4px] border border-[#201c16]/30 font-['Caveat',cursive] text-xl focus:outline-none focus:border-primary shadow-inner resize-none leading-snug"
                  />
                  <div className="text-right font-['Space_Mono',monospace] text-[10px] text-[#201c16]/60 mt-0.5">
                    {message.length} / 120
                  </div>
                </div>

                {/* Name Input */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={30}
                  className="w-full bg-[#e8dec8] text-[#201c16] px-3 py-2 rounded-[4px] border border-[#201c16]/30 font-['Space_Mono',monospace] text-xs focus:outline-none focus:border-primary shadow-inner"
                />

                {/* Pin Note Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full font-['Silkscreen',monospace] text-xs font-bold bg-[#d9c39c] text-[#201c16] py-3 rounded-[4px] border-2 border-[#201c16]/30 shadow-md transition-transform hover:-rotate-1 active:scale-95 disabled:opacity-50 cursor-pointer uppercase tracking-wider"
                >
                  {isSubmitting ? "PINNING TO FIREBASE..." : "PIN NOTE TO BOARD"}
                </button>

              </form>

            </div>

            {/* PICK A REACTION STAMP Card */}
            <div className="relative bg-[#f4ead6] text-[#201c16] p-4 sm:p-5 rounded-[8px] shadow-[0_16px_36px_rgba(0,0,0,0.7)] border-2 border-[#201c16]/20 rotate-[-1deg]">
              
              <h4 className="font-['Silkscreen',monospace] text-xs font-bold text-[#201c16] mb-3 uppercase flex items-center justify-between">
                <span>PICK A REACTION STAMP</span>
                <span> stamp</span>
              </h4>

              {/* Grid of Rubber Stamps */}
              <div className="grid grid-cols-2 gap-2">
                {visibleStamps.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedStampKey(s.id)}
                    className={`p-1.5 rounded-[4px] border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      selectedStampKey === s.id
                        ? "border-[#201c16] bg-white scale-105 shadow-md"
                        : "border-[#201c16]/20 bg-[#e8dec8] hover:border-[#201c16]/60 hover:bg-white/60"
                    }`}
                  >
                    <DistressedStamp
                      text={s.text}
                      color={s.color}
                      width={120}
                      height={46}
                    />
                  </button>
                ))}
              </div>

              {/* View More / Show Less Arrow Toggle Button */}
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAllStamps((prev) => !prev)}
                  className="font-['Caveat',cursive] text-sm font-bold text-[#201c16] bg-[#e8dec8] px-3 py-1 rounded-[4px] border border-[#201c16]/30 hover:bg-white active:scale-95 transition-transform cursor-pointer flex items-center gap-1 shadow-sm"
                >
                  <span>{showAllStamps ? "Show less ✕" : "More stamps ➔"}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
