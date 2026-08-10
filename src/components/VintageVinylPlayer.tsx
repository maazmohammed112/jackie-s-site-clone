import { useState, useRef, useEffect } from "react";

export default function VintageVinylPlayer() {
  const [playerState, setPlayerState] = useState<"resting" | "cueing" | "playing" | "lifting">("resting");
  
  const vinylGroupRef = useRef<SVGGElement | null>(null);
  const tonearmGroupRef = useRef<SVGGElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const spinRAF = useRef<number | null>(null);
  const armTweenRAF = useRef<number | null>(null);
  const lastSpinTime = useRef<number | null>(null);
  const songEndTimer = useRef<NodeJS.Timeout | null>(null);

  const vinylAngle = useRef(0);
  const armAngle = useRef(0);

  // Web Audio Context refs for synthesized vintage jazz + crackle (fallback)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const crackleSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const activeOscillatorsRef = useRef<OscillatorNode[]>([]);

  // Geometry Constants
  const PIVOT = { x: 262, y: 40 };
  const VINYL_CENTER = { x: 140, y: 154 };
  const REST_ANGLE = 0;
  const PLAY_ANGLE = -38;
  const ARM_TWEEN_MS = 850;
  const MS_PER_REVOLUTION = 1800; // ~33 1/3 RPM

  const setVinylTransform = (angle: number) => {
    if (vinylGroupRef.current) {
      vinylGroupRef.current.setAttribute(
        "transform",
        `rotate(${angle} ${VINYL_CENTER.x} ${VINYL_CENTER.y})`
      );
    }
  };

  const setArmTransform = (angle: number) => {
    if (tonearmGroupRef.current) {
      tonearmGroupRef.current.setAttribute(
        "transform",
        `rotate(${angle} ${PIVOT.x} ${PIVOT.y})`
      );
    }
  };

  // Easing function
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const tweenArm = (from: number, to: number, duration: number, onDone?: () => void) => {
    if (armTweenRAF.current) cancelAnimationFrame(armTweenRAF.current);
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(t);
      armAngle.current = from + (to - from) * eased;
      setArmTransform(armAngle.current);

      if (t < 1) {
        armTweenRAF.current = requestAnimationFrame(step);
      } else {
        armAngle.current = to;
        setArmTransform(armAngle.current);
        armTweenRAF.current = null;
        if (onDone) onDone();
      }
    };
    armTweenRAF.current = requestAnimationFrame(step);
  };

  const startSpin = () => {
    lastSpinTime.current = null;
    const frame = (now: number) => {
      if (lastSpinTime.current !== null) {
        const dt = now - lastSpinTime.current;
        vinylAngle.current = (vinylAngle.current + (dt / MS_PER_REVOLUTION) * 360) % 360;
        setVinylTransform(vinylAngle.current);
      }
      lastSpinTime.current = now;
      spinRAF.current = requestAnimationFrame(frame);
    };
    spinRAF.current = requestAnimationFrame(frame);
  };

  const stopSpin = () => {
    if (spinRAF.current) {
      cancelAnimationFrame(spinRAF.current);
      spinRAF.current = null;
    }
    lastSpinTime.current = null;
  };

  // Web Audio Synth setup (Fallback)
  const initAudio = () => {
    if (audioCtxRef.current) return;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtxRef.current = new AC();
    masterGainRef.current = audioCtxRef.current.createGain();
    masterGainRef.current.gain.value = 0;
    masterGainRef.current.connect(audioCtxRef.current.destination);
  };

  const makeNoiseBuffer = (ctx: AudioContext, seconds: number) => {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.6;
    }
    return buffer;
  };

  const startCrackle = () => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const buf = makeNoiseBuffer(audioCtxRef.current, 2);
    crackleSourceRef.current = audioCtxRef.current.createBufferSource();
    crackleSourceRef.current.buffer = buf;
    crackleSourceRef.current.loop = true;
    const bp = audioCtxRef.current.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2800;
    bp.Q.value = 0.6;
    const g = audioCtxRef.current.createGain();
    g.gain.value = 0.028;
    crackleSourceRef.current.connect(bp).connect(g).connect(masterGainRef.current);
    crackleSourceRef.current.start();
  };

  const stopCrackle = () => {
    if (crackleSourceRef.current) {
      try {
        crackleSourceRef.current.stop();
      } catch (e) {
        console.error(e);
      }
      crackleSourceRef.current.disconnect();
      crackleSourceRef.current = null;
    }
  };

  const pluckNote = (freq: number, startTime: number, dur: number, vol: number) => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const g = audioCtxRef.current.createGain();
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(vol, startTime + 0.015);
    g.gain.exponentialRampToValueAtTime(Math.max(vol * 0.18, 0.0008), startTime + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0005, startTime + dur);
    const lp = audioCtxRef.current.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2200;
    osc.connect(lp).connect(g).connect(masterGainRef.current);
    osc.start(startTime);
    osc.stop(startTime + dur + 0.05);
    activeOscillatorsRef.current.push(osc);
  };

  const bassNote = (freq: number, startTime: number, dur: number, vol: number) => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const g = audioCtxRef.current.createGain();
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(vol, startTime + 0.08);
    g.gain.linearRampToValueAtTime(vol * 0.75, startTime + dur * 0.6);
    g.gain.linearRampToValueAtTime(0.0005, startTime + dur);
    osc.connect(g).connect(masterGainRef.current);
    osc.start(startTime);
    osc.stop(startTime + dur + 0.05);
    activeOscillatorsRef.current.push(osc);
  };

  const scheduleSong = (startTime: number) => {
    const chords = [
      { top: [261.63, 329.63, 392.00, 493.88], bass: 130.81 },
      { top: [220.00, 261.63, 329.63, 392.00], bass: 110.00 },
      { top: [174.61, 220.00, 261.63, 329.63], bass: 87.31 },
      { top: [196.00, 246.94, 293.66, 349.23], bass: 98.00 },
    ];
    const beat = 0.5;
    const chordDur = beat * 4;
    const loops = 3;
    let t = startTime;
    for (let loop = 0; loop < loops; loop++) {
      for (const chord of chords) {
        bassNote(chord.bass, t, chordDur * 0.95, 0.11);
        chord.top.forEach((freq, i) => {
          pluckNote(freq, t + i * beat, beat * 1.6, 0.085);
        });
        t += chordDur;
      }
    }
    bassNote(130.81, t, 2.4, 0.08);
    [261.63, 329.63, 392.00].forEach((freq, i) => pluckNote(freq, t + i * 0.12, 2.2, 0.06));
    return t + 2.6;
  };

  const startAudio = () => {
    // 1. Play/resume custom MP3 audio file at exact timestamp
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        // Custom MP3 audio playing/resuming smoothly at currentTime
      }).catch(() => {
        // Fall back to Web Audio API synthesis
        initAudio();
        if (audioCtxRef.current) {
          if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
          activeOscillatorsRef.current = [];
          const now = audioCtxRef.current.currentTime + 0.05;
          if (masterGainRef.current) {
            masterGainRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
            masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, audioCtxRef.current.currentTime);
            masterGainRef.current.gain.linearRampToValueAtTime(0.9, audioCtxRef.current.currentTime + 0.35);
          }
          startCrackle();
          const totalEnd = scheduleSong(now);
          const durationRemaining = (totalEnd - now) * 1000;
          if (songEndTimer.current) clearTimeout(songEndTimer.current);
          songEndTimer.current = setTimeout(() => {
            endPlay();
          }, durationRemaining);
        }
      });
    }
  };

  const stopAudio = () => {
    // Pauses HTML5 audio element at exact currentTime so it can resume from exact same point
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (audioCtxRef.current && masterGainRef.current) {
      const now = audioCtxRef.current.currentTime;
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, now);
      masterGainRef.current.gain.linearRampToValueAtTime(0, now + 0.45);
      setTimeout(() => {
        activeOscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
          } catch (e) {
            console.error(e);
          }
        });
        activeOscillatorsRef.current = [];
        stopCrackle();
      }, 480);
    }
  };

  const beginPlay = () => {
    setPlayerState("cueing");
    tweenArm(REST_ANGLE, PLAY_ANGLE, ARM_TWEEN_MS, () => {
      setPlayerState("playing");
      startSpin();
      startAudio();
    });
  };

  const endPlay = () => {
    setPlayerState("lifting");
    if (songEndTimer.current) {
      clearTimeout(songEndTimer.current);
      songEndTimer.current = null;
    }
    stopSpin();
    stopAudio();
    tweenArm(armAngle.current, REST_ANGLE, ARM_TWEEN_MS, () => {
      setPlayerState("resting");
    });
  };

  const toggle = () => {
    if (playerState === "resting") {
      beginPlay();
    } else if (playerState === "playing") {
      endPlay();
    }
  };

  // Clean up RAFs and timers on unmount
  useEffect(() => {
    setVinylTransform(0);
    setArmTransform(0);
    return () => {
      stopSpin();
      if (armTweenRAF.current) cancelAnimationFrame(armTweenRAF.current);
      if (songEndTimer.current) clearTimeout(songEndTimer.current);
      stopAudio();
    };
  }, []);

  return (
    <section className="relative my-20 px-4 sm:px-6 max-w-4xl mx-auto select-none">
      
      {/* HTML5 Audio Element for custom MP3 (e.g., 04:30 duration) */}
      <audio
        ref={audioRef}
        src="/vintage-music.mp3"
        onEnded={endPlay}
        preload="auto"
      />

      {/* Header Banner */}
      <div className="relative mb-6 text-center">
        <div className="inline-block relative">
          <div className="relative paper-grid torn-paper bg-[#f4ead6] text-[#201c16] px-8 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-2 border-[#201c16]/20 rounded-[4px] rotate-[-1deg]">
            <h2 className="font-['Silkscreen',monospace] text-xl sm:text-2xl font-bold tracking-wider uppercase text-[#201c16]">
              VINTAGE VINYL TURNTABLE
            </h2>
            <p className="font-['Caveat',cursive] text-lg sm:text-xl font-bold text-primary italic mt-0.5">
              Click tonearm to lower needle & spin vinyl
            </p>
          </div>
          <span className="absolute -top-3 -left-5 w-16 h-5 bg-primary/40 rotate-[-12deg] shadow-sm pointer-events-none" />
          <span className="absolute -bottom-3 -right-5 w-16 h-5 bg-primary/40 rotate-[8deg] shadow-sm pointer-events-none" />
        </div>
      </div>

      {/* Funny Paper Note Banner */}
      <div className="relative mb-8 max-w-md mx-auto bg-[#f4ead6] text-[#201c16] p-3.5 sm:p-4 rounded-[8px] shadow-md border-2 border-[#201c16]/20 rotate-[-1deg] text-center">
        <span className="absolute -top-2 left-5 w-3.5 h-3.5 rounded-full bg-sky-600 shadow-md border border-white" />
        <p className="font-['Caveat',cursive] text-lg sm:text-xl font-bold leading-snug text-[#201c16]">
          My song, my lyrics, my beats... but sung by AI (my real singing voice was declared a security hazard)! Hahahha!
        </p>
      </div>

      {/* Main Turntable SVG Container */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-[300px] sm:w-[370px] md:w-[410px] filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
          <svg
            id="turntable"
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Vintage vinyl record player"
            className="w-full h-auto block"
          >
            <defs>
              <radialGradient id="vinylShade" cx="42%" cy="38%" r="75%">
                <stop offset="0%" stopColor="#2c2c2c" />
                <stop offset="55%" stopColor="#101010" />
                <stop offset="100%" stopColor="#020202" />
              </radialGradient>
              <radialGradient id="labelShade" cx="38%" cy="34%" r="75%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="55%" stopColor="#0369a1" />
                <stop offset="100%" stopColor="#075985" />
              </radialGradient>
              <linearGradient id="cardShade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f2e2c2" />
                <stop offset="100%" stopColor="#e2c99b" />
              </linearGradient>
              <linearGradient id="armMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbfbfb" />
                <stop offset="45%" stopColor="#cdd0d3" />
                <stop offset="55%" stopColor="#9fa2a6" />
                <stop offset="100%" stopColor="#ecedee" />
              </linearGradient>
              <radialGradient id="pivotMetal" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#cdd0d3" />
                <stop offset="70%" stopColor="#8b8e92" />
                <stop offset="100%" stopColor="#5c5f63" />
              </radialGradient>
              <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="42%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.16" />
                <stop offset="58%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.35" />
              </filter>
              <filter id="armShadow" x="-80%" y="-80%" width="260%" height="260%">
                <feDropShadow dx="2" dy="4" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.35" />
              </filter>
              <clipPath id="vinylClip">
                <circle cx="140" cy="154" r="114" />
              </clipPath>
            </defs>

            {/* Plinth Card Body */}
            <rect x="6" y="6" width="288" height="288" rx="20" fill="url(#cardShade)" stroke="#c9a969" strokeWidth="1.5" />

            {/* Metallic Corner Screws */}
            <g>
              <circle cx="28" cy="28" r="5.5" fill="#413020" />
              <circle cx="26.7" cy="26.7" r="1.7" fill="#7a6444" />
              <circle cx="272" cy="28" r="5.5" fill="#413020" />
              <circle cx="270.7" cy="26.7" r="1.7" fill="#7a6444" />
              <circle cx="28" cy="272" r="5.5" fill="#413020" />
              <circle cx="26.7" cy="270.7" r="1.7" fill="#7a6444" />
              <circle cx="272" cy="272" r="5.5" fill="#413020" />
              <circle cx="270.7" cy="270.7" r="1.7" fill="#7a6444" />
            </g>

            {/* Static Drop Shadow Disc beneath Vinyl */}
            <g filter="url(#softShadow)">
              <circle cx="140" cy="154" r="114" fill="#050505" />
            </g>

            {/* VINYL GROUP (Rotates as one unit: body, grooves, label, reflections) */}
            <g id="vinylGroup" ref={vinylGroupRef} onClick={toggle} className="cursor-pointer">
              <circle cx="140" cy="154" r="114" fill="url(#vinylShade)" />

              <g id="grooves" clipPath="url(#vinylClip)" fill="none">
                <circle cx="140" cy="154" r="112.0" stroke="#000" strokeOpacity="0.41" strokeWidth="0.6" />
                <circle cx="140" cy="154" r="111.4" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="108.1" stroke="#000" strokeOpacity="0.50" strokeWidth="0.6" />
                <circle cx="140" cy="154" r="107.5" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="104.7" stroke="#000" strokeOpacity="0.35" strokeWidth="1.1" />
                <circle cx="140" cy="154" r="104.1" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="101.0" stroke="#000" strokeOpacity="0.41" strokeWidth="1.1" />
                <circle cx="140" cy="154" r="100.4" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="96.9" stroke="#000" strokeOpacity="0.56" strokeWidth="0.6" />
                <circle cx="140" cy="154" r="96.3" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="92.4" stroke="#000" strokeOpacity="0.39" strokeWidth="0.6" />
                <circle cx="140" cy="154" r="91.8" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="87.5" stroke="#000" strokeOpacity="0.48" strokeWidth="1.1" />
                <circle cx="140" cy="154" r="86.9" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="82.9" stroke="#000" strokeOpacity="0.37" strokeWidth="1.1" />
                <circle cx="140" cy="154" r="82.3" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="78.5" stroke="#000" strokeOpacity="0.43" strokeWidth="0.6" />
                <circle cx="140" cy="154" r="77.9" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="73.6" stroke="#000" strokeOpacity="0.47" strokeWidth="1.1" />
                <circle cx="140" cy="154" r="73.0" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="68.6" stroke="#000" strokeOpacity="0.53" strokeWidth="1.1" />
                <circle cx="140" cy="154" r="68.0" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="64.7" stroke="#000" strokeOpacity="0.55" strokeWidth="0.6" />
                <circle cx="140" cy="154" r="64.1" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="59.6" stroke="#000" strokeOpacity="0.57" strokeWidth="0.6" />
                <circle cx="140" cy="154" r="59.0" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="56.1" stroke="#000" strokeOpacity="0.40" strokeWidth="1.1" />
                <circle cx="140" cy="154" r="55.5" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="52.0" stroke="#000" strokeOpacity="0.51" strokeWidth="0.6" />
                <circle cx="140" cy="154" r="51.4" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
                <circle cx="140" cy="154" r="47.8" stroke="#000" strokeOpacity="0.45" strokeWidth="0.6" />
                <circle cx="140" cy="154" r="47.2" stroke="#4a4a4a" strokeOpacity="0.25" strokeWidth="0.5" />
              </g>

              <g clipPath="url(#vinylClip)">
                <rect x="26" y="40" width="228" height="228" fill="url(#sheen)" />
              </g>
              <g clipPath="url(#vinylClip)" opacity="0.5">
                <ellipse cx="95" cy="95" rx="10" ry="60" fill="#ffffff" opacity="0.06" transform="rotate(28 95 95)" />
              </g>

              {/* Cyan-Blue Center Label */}
              <circle cx="140" cy="154" r="41" fill="url(#labelShade)" stroke="#0369a1" strokeWidth="1" />
              <circle cx="140" cy="154" r="41" fill="none" stroke="#000" strokeOpacity="0.15" strokeWidth="1.5" />
              <circle cx="140" cy="154" r="27" fill="none" stroke="#ffffff33" strokeWidth="0.6" />
              
              {/* Monogram Text on Label (MAAZ above hole, STEREO below hole) */}
              <text x="140" y="140" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="Silkscreen, monospace" fontWeight="bold">MAAZ</text>
              <text x="140" y="170" textAnchor="middle" fill="#e0f2fe" fontSize="5" fontFamily="Space Mono, monospace" fontWeight="bold">STEREO</text>

              <circle cx="140" cy="154" r="4.3" fill="#232323" />
              <circle cx="138.8" cy="152.8" r="1.5" fill="#6b6b6b" />
            </g>

            {/* Pivot Mount (Does not rotate) */}
            <circle cx="248" cy="16" r="3.6" fill="url(#pivotMetal)" stroke="#8b8e92" strokeWidth="0.5" />
            <circle cx="262" cy="40" r="14" fill="#d8c9a0" stroke="#b39c66" strokeWidth="1" />
            <circle cx="262" cy="40" r="9.5" fill="url(#pivotMetal)" />
            <circle cx="259.3" cy="37.3" r="1.8" fill="#ffffff" opacity="0.85" />

            {/* TONEARM GROUP (Rotates about pivot 262,40) */}
            <g id="tonearmGroup" ref={tonearmGroupRef}>
              <g filter="url(#armShadow)">
                <path d="M 262 40 C 250 28, 226 16, 205.7 24.9" fill="none" stroke="url(#armMetal)" strokeWidth="4" strokeLinecap="round" />
                <path d="M 262 40 C 250 28, 226 16, 205.7 24.9" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
                <g transform="translate(205.7,24.9) rotate(-24)">
                  <rect x="-2" y="-4" width="24" height="9.5" rx="1.8" fill="#2b2b2e" />
                  <rect x="-2" y="-4" width="24" height="2.6" rx="1.3" fill="#0284c7" />
                  <circle cx="21" cy="0.7" r="1.4" fill="#c9c9c9" />
                </g>
              </g>

              {/* Hit Area for clicking tonearm */}
              <circle
                id="tonearmHit"
                cx="234"
                cy="32"
                r="44"
                fill="transparent"
                role="button"
                tabIndex={0}
                aria-pressed={playerState === "playing"}
                aria-label="Play the record: click to lower the tonearm"
                onClick={toggle}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle();
                  }
                }}
                className="cursor-pointer focus:outline-none"
              />
            </g>
          </svg>
        </div>
      </div>

    </section>
  );
}
