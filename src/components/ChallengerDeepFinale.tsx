import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowUp, Award, Compass, Sparkles, Flame } from 'lucide-react';
import { pelagiaAudio } from '../lib/audioEngine';

interface ChallengerDeepFinaleProps {
  onScrollToTop: () => void;
  onOpenCertificate?: () => void;
  isKlaxosaurUnlocked?: boolean;
  onUnlockKlaxosaur?: () => void;
}

export const ChallengerDeepFinale: React.FC<ChallengerDeepFinaleProps> = ({
  onScrollToTop,
  onOpenCertificate,
  isKlaxosaurUnlocked = false,
  onUnlockKlaxosaur,
}) => {
  const [fissureTaps, setFissureTaps] = useState<number>(0);

  const triggerCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#D95A47', '#EAA838', '#2F6D68', '#FAF6EE'],
    });
  };

  const handleTapFissure = () => {
    if (isKlaxosaurUnlocked) {
      pelagiaAudio.playLeviathanRumble();
      return;
    }

    const next = fissureTaps + 1;
    setFissureTaps(next);
    pelagiaAudio.playWaterBubble();

    if (next >= 3) {
      pelagiaAudio.playLeviathanRumble();
      pelagiaAudio.playRelicUnlock();
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#EF4444', '#DC2626', '#EAA838', '#FAF6EE'],
      });
      if (onUnlockKlaxosaur) {
        onUnlockKlaxosaur();
      }
    }
  };

  return (
    <div className="relative w-full py-20 sm:py-32 px-4 flex flex-col items-center justify-center text-center select-none bg-[#05080C] text-[#F9F7F1]">
      {/* Tectonic Trench Fracture Lines */}
      <div className="w-full max-w-4xl border-t-2 border-dashed border-red-500/30 mb-12" />

      {/* Challenger Deep Expedition Seal Card */}
      <div className="w-full max-w-2xl p-6 sm:p-10 rounded-2xl border-2 border-[#E06D53] bg-[#0E151C] shadow-paper-lg space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 font-mono text-xs tracking-widest uppercase">
          <Award className="w-4 h-4 text-red-400" />
          <span>EXPEDITION PROTOCOL COMPLETED</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white">
            CHALLENGER DEEP
          </h2>
          <div className="font-mono text-xl sm:text-2xl text-[#EAA838] font-bold">
            -10,994.0 METERS // 1,086 ATM
          </div>
        </div>

        {/* Expedition Reflection */}
        <p className="font-serif text-base sm:text-lg leading-relaxed text-[#CBD5E1] max-w-xl mx-auto italic">
          "You have descended past the limits of human perception, through eleven vertical kilometers of the Pacific Ocean. Where Mount Everest would sit submerged beneath two kilometers of water, the living earth is still breathing."
        </p>

        {/* Signatures Certificate Box */}
        <div className="p-4 rounded-xl border border-white/10 bg-black/40 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-0.5">
            <div className="text-[10px] text-white/40">SURVEYORS & ARCHITECTS</div>
            <div className="font-bold text-white text-sm">sm000ky × Zero Two</div>
          </div>
          <div className="text-right space-y-0.5">
            <div className="text-[10px] text-white/40">SURFACE LOCATION</div>
            <div className="font-bold text-[#EAA838]">11°22'N · 142°35'E</div>
          </div>
        </div>

        {/* Secret Apocryphal Relic VIII: Bedrock Magma Fissure */}
        <div className="pt-2">
          <button
            onClick={handleTapFissure}
            className={`w-full p-3.5 rounded-xl border-2 transition-all flex items-center justify-between gap-3 text-left font-mono cursor-pointer active:scale-98 ${
              isKlaxosaurUnlocked
                ? 'bg-red-950/40 border-red-500 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                : 'bg-black/60 border-dashed border-red-500/40 text-red-300 hover:border-red-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-500 flex items-center justify-center text-red-400">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] text-red-400/80 font-bold uppercase tracking-wider">
                  APOCRYPHA 08 // MANTLE FISSURE
                </div>
                <div className="font-bold text-xs sm:text-sm text-white">
                  {isKlaxosaurUnlocked ? 'Protocol 002: Klaxosaur Core Awakened' : 'Tap Bedrock Fissure (3x to Awaken)'}
                </div>
              </div>
            </div>

            <span className="px-2 py-1 rounded bg-red-950 border border-red-500/60 text-[10px] text-red-300 font-bold">
              {isKlaxosaurUnlocked ? '✓ AWAKENED' : `${fissureTaps}/3 TAPS`}
            </span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              triggerCelebration();
              onScrollToTop();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#D95A47] hover:bg-[#E06D53] text-white font-mono text-xs font-bold transition-all shadow-paper active:translate-y-0.5 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>RETURN TO THE SUNLIT SHORE</span>
          </button>

          {onOpenCertificate && (
            <button
              onClick={onOpenCertificate}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-[#EAA838] bg-[#1E252B] hover:bg-[#2C3844] text-[#EAA838] font-mono text-xs font-bold transition-all shadow-paper cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>VIEW EXPEDITION DIPLOMA</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
