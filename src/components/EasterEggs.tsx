import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  X,
  Compass,
  ShieldCheck,
  Radio,
  Film,
  SunMedium,
  CheckCircle2,
  Hand,
  Layers,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApocryphalRelic } from '../types';
import { APOCRYPHAL_RELICS } from '../data/relicsData';
import { pelagiaAudio } from '../lib/audioEngine';

interface TactileAnomalyProps {
  relicId: string;
  isUnlocked: boolean;
  onInspect: (relic: ApocryphalRelic) => void;
  onTriggerPlankton?: () => void;
  onTriggerTitan?: () => void;
  onToggle1930s?: () => void;
  onToggleUV?: () => void;
  className?: string;
}

export const TactileAnomalySpot: React.FC<TactileAnomalyProps> = ({
  relicId,
  isUnlocked,
  onInspect,
  onTriggerPlankton,
  onTriggerTitan,
  onToggle1930s,
  onToggleUV,
  className = '',
}) => {
  const relic = APOCRYPHAL_RELICS.find((r) => r.id === relicId);
  if (!relic) return null;

  // Local storage state for whether the covering obstacle has been physically moved/opened
  const [isOpened, setIsOpened] = useState<boolean>(() => {
    if (isUnlocked) return true;
    try {
      return localStorage.getItem(`pelagia_anomaly_opened_${relicId}`) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isUnlocked && !isOpened) {
      setIsOpened(true);
    }
  }, [isUnlocked, isOpened]);

  const handleOpenCover = (e: React.MouseEvent) => {
    e.stopPropagation();
    pelagiaAudio.playWaxSquash();
    setIsOpened(true);
    try {
      localStorage.setItem(`pelagia_anomaly_opened_${relicId}`, 'true');
    } catch {
      // ignore
    }

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#EAA838', '#D95A47', '#38BDF8', '#FAF6EE'],
    });

    // Environmental triggers
    if (relic.id === 'relic-bottle' && onTriggerPlankton) {
      pelagiaAudio.playCorkPop();
      onTriggerPlankton();
    } else if (relic.id === 'relic-titan' && onTriggerTitan) {
      pelagiaAudio.playSonarPing();
      onTriggerTitan();
    } else if (relic.id === 'relic-bathysphere' && onToggle1930s) {
      pelagiaAudio.playVinylCrackle();
      onToggle1930s();
    } else if (relic.id === 'relic-blacklight' && onToggleUV) {
      onToggleUV();
    }
  };

  const handleInspect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onInspect(relic);
  };

  // Obstacle Visuals & Text Definitions per Relic
  const obstacleMeta = {
    'relic-albatross': {
      label: '☁️ DENSE PAPERCRAFT CIRRUS CLOUD',
      depthText: '+12M AERIAL SKY',
      actionText: 'TAP TO PART CLOUD',
      desc: 'A suspicious paper cloud is hovering stationary in the sea breeze...',
      bgStyle: 'bg-[#FAF6EE] text-[#1E252B] border-[#DEC6AE]',
    },
    'relic-cutlass': {
      label: '🪸 ANCIENT STAGHORN CORAL SHELF',
      depthText: '-110M SUNLIGHT REEF',
      actionText: 'TAP TO PRY OPEN CORAL',
      desc: 'Thick branching coral covers a deep crevice in the seabed...',
      bgStyle: 'bg-[#EDF7F5] text-[#0F332B] border-[#50857D]',
    },
    'relic-bottle': {
      label: '🪨 HEAVY VOLCANIC BASALT BOULDER',
      depthText: '-680M TWILIGHT GLOOM',
      actionText: 'TAP TO LIFT STONE',
      desc: 'A barnacle-encrusted basalt stone rests here. Something glows faintly beneath its edge...',
      bgStyle: 'bg-[#152B3C] text-[#F8FAFC] border-[#38BDF8]/60',
    },
    'relic-titan': {
      label: '⚙️ SEALED NAVAL PRESSURE HATCH',
      depthText: '-2,400M MIDNIGHT ABYSS',
      actionText: 'TAP TO CRANK BRASS VALVE',
      desc: 'An ominous cylindrical transponder hatch is locked tight with a circular handwheel...',
      bgStyle: 'bg-[#0D1622] text-[#FFFBEB] border-[#EAA838]/70',
    },
    'relic-bathysphere': {
      label: '🌿 TANGLE OF ABYSSAL GLASS SPONGES',
      depthText: '-3,850M ABYSSAL THRESHOLD',
      actionText: 'TAP TO CLEAR SPONGES',
      desc: 'A thick curtain of deep-sea glass sponges hides a heavy spherical shape...',
      bgStyle: 'bg-[#0E0C18] text-[#FAF5FF] border-[#A855F7]/70',
    },
    'relic-blacklight': {
      label: '📜 FOSSILIZED SEDIMENT SILT CRUST',
      depthText: '-5,100M ABYSSAL BED',
      actionText: 'TAP TO BRUSH AWAY SILT',
      desc: 'Centuries of marine snow have encrusted this basalt wall. Strange markings lie underneath...',
      bgStyle: 'bg-[#0A0812] text-[#F3E8FF] border-[#C084FC]/70',
    },
    'relic-mug': {
      label: '🛢️ CRUSHED HIGH-PRESSURE OIL BARREL',
      depthText: '-10,250M HADAL TRENCH',
      actionText: 'TAP TO MOVE CRUSHED DRUM',
      desc: 'A crumpled steel drum imploded by 1,000 ATM of water sits here. Something is tucked under it...',
      bgStyle: 'bg-[#06080C] text-[#FFFFFF] border-[#EF4444]/70',
    },
  }[relicId] || {
    label: '🏺 ENIGMATIC ANOMALY COVER',
    depthText: `${relic.depthMeters <= 0 ? `+${Math.abs(relic.depthMeters)}M` : `-${relic.depthMeters}M`}`,
    actionText: 'TAP TO UNCOVER',
    desc: 'An anomalous seabed landmark hides a forgotten relic...',
    bgStyle: 'bg-[#1E252B] text-white border-[#EAA838]',
  };

  return (
    <div
      id={relic.id}
      className={`relative my-12 sm:my-20 max-w-xl mx-auto px-4 select-none scroll-mt-32 transition-all duration-300 ${className}`}
    >
      <div
        className={`relative p-5 sm:p-7 rounded-2xl border-2 shadow-paper-lg paper-grain transition-all duration-300 ${obstacleMeta.bgStyle} ${
          !isOpened ? 'hover:scale-[1.02] cursor-pointer' : ''
        }`}
        onClick={!isOpened ? handleOpenCover : undefined}
      >
        {/* Top Header Tag */}
        <div className="flex items-center justify-between gap-2 border-b border-current/20 pb-3 mb-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D95A47] inline-block animate-pulse shadow-[0_0_8px_#D95A47]" />
            <span className="font-bold tracking-widest uppercase text-[11px]">
              {obstacleMeta.label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 opacity-80 text-[10px] font-bold">
            <Compass className="w-3 h-3" />
            <span>{obstacleMeta.depthText}</span>
          </div>
        </div>

        {/* STATE A: THE OBSTACLE IS CLOSED (PROMINENT PHYSICAL COVER!) */}
        {!isOpened ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Obstacle Icon Illustration */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-black/20 border-2 border-current/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                {relicId === 'relic-albatross' && (
                  <span className="text-4xl sm:text-5xl animate-bounce">☁️</span>
                )}
                {relicId === 'relic-cutlass' && (
                  <span className="text-4xl sm:text-5xl animate-pulse">🪸</span>
                )}
                {relicId === 'relic-bottle' && (
                  <span className="text-4xl sm:text-5xl animate-bounce">🪨</span>
                )}
                {relicId === 'relic-titan' && (
                  <span className="text-4xl sm:text-5xl animate-spin" style={{ animationDuration: '10s' }}>⚙️</span>
                )}
                {relicId === 'relic-bathysphere' && (
                  <span className="text-4xl sm:text-5xl animate-pulse">🌿</span>
                )}
                {relicId === 'relic-blacklight' && (
                  <span className="text-4xl sm:text-5xl animate-pulse">📜</span>
                )}
                {relicId === 'relic-mug' && (
                  <span className="text-4xl sm:text-5xl animate-bounce">🛢️</span>
                )}
              </div>

              {/* Description & Action Cue */}
              <div className="space-y-2 text-center sm:text-left flex-1">
                <p className="font-serif italic text-xs sm:text-sm opacity-90 leading-relaxed">
                  "{obstacleMeta.desc}"
                </p>

                <div className="pt-1">
                  <button
                    onClick={handleOpenCover}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D95A47] hover:bg-[#E06D53] text-white font-mono text-xs font-bold transition-all shadow-paper active:scale-95 cursor-pointer animate-pulse"
                  >
                    <Hand className="w-4 h-4" />
                    <span>{obstacleMeta.actionText}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-dashed border-current/20 flex items-center justify-between text-[10px] font-mono opacity-70">
              <span>EASTER EGG ANOMALY HIDING SPOT</span>
              <span className="text-[#EAA838] font-bold">INTERACTIVE PUZZLE</span>
            </div>
          </div>
        ) : (
          /* STATE B: THE OBSTACLE HAS BEEN LIFTED/OPENED! REVEALING THE ARTIFACT! */
          <div className="space-y-4 animate-in zoom-in-95 duration-300">
            <div className="p-3 rounded-xl bg-black/25 border border-current/20 flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] font-bold text-[#EAA838] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>OBSTACLE CLEARED // ARTIFACT UNCOVERED!</span>
              </span>

              <span className="font-mono text-[9px] opacity-75">
                {relic.relicNumber}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Uncovered Relic Artifact Graphic */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#FAF6EE] text-[#1E252B] border-2 border-[#EAA838] flex items-center justify-center flex-shrink-0 shadow-[0_0_25px_rgba(234,168,56,0.4)] animate-bounce">
                {relic.iconType === 'albatross' && (
                  <svg viewBox="0 0 60 40" className="w-12 h-9 text-[#D95A47]" fill="currentColor">
                    <polygon points="5,25 55,25 45,35 15,35" />
                    <polygon points="30,5 30,22 12,22" fill="#FAF6EE" stroke="#1E252B" strokeWidth="1.5" />
                    <polygon points="32,8 48,22 32,22" fill="#EAA838" stroke="#1E252B" strokeWidth="1.5" />
                  </svg>
                )}

                {relic.iconType === 'cutlass' && (
                  <svg viewBox="0 0 40 40" className="w-10 h-10 text-[#EAA838]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M8 32 L28 12 M28 12 C32 8, 34 8, 32 14 L18 28" />
                    <circle cx="9" cy="31" r="3" fill="#D95A47" />
                    <path d="M6 34 L12 28" />
                  </svg>
                )}

                {relic.iconType === 'bottle' && (
                  <svg viewBox="0 0 30 60" className="w-7 h-12 text-emerald-500" fill="currentColor">
                    <rect x="11" y="2" width="8" height="6" rx="1" fill="#D97706" />
                    <path d="M10 8 L20 8 L22 20 L26 28 L26 52 C26 56, 4 56, 4 52 L4 28 L8 20 Z" fill="#0E7490" fillOpacity="0.9" stroke="#38BDF8" strokeWidth="1.5" />
                    <rect x="8" y="28" width="14" height="14" rx="1" fill="#FEF3C7" />
                  </svg>
                )}

                {relic.iconType === 'titan' && (
                  <div className="relative flex items-center justify-center">
                    <Radio className="w-10 h-10 text-[#0891B2] animate-pulse" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                  </div>
                )}

                {relic.iconType === 'bathysphere' && (
                  <svg viewBox="0 0 40 40" className="w-10 h-10 text-[#F59E0B]" fill="none">
                    <circle cx="20" cy="20" r="14" fill="#1E293B" stroke="#D4AF37" strokeWidth="2" />
                    <circle cx="20" cy="20" r="6" fill="#0EA5E9" stroke="#FAF6EE" strokeWidth="1.5" />
                    <path d="M20 6 L20 2 M14 2 h12" stroke="#D4AF37" strokeWidth="2" />
                  </svg>
                )}

                {relic.iconType === 'blacklight' && (
                  <SunMedium className="w-10 h-10 text-purple-600 animate-spin" style={{ animationDuration: '8s' }} />
                )}

                {relic.iconType === 'mug' && (
                  <svg viewBox="0 0 40 40" className="w-10 h-10 text-red-500" fill="currentColor">
                    <rect x="8" y="10" width="20" height="22" rx="3" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
                    <path d="M28 14 C35 14, 35 26, 28 26" fill="none" stroke="#1E252B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 18 h12 M12 22 h8" stroke="#D95A47" strokeWidth="1.5" />
                  </svg>
                )}
              </div>

              {/* Title & Lore preview */}
              <div className="space-y-1 text-center sm:text-left flex-1">
                <div className="font-serif font-bold text-lg sm:text-xl leading-tight">
                  {relic.title}
                </div>
                <p className="font-serif italic text-xs opacity-80 line-clamp-2">
                  "{relic.subtitle}"
                </p>

                <div className="pt-2">
                  <button
                    onClick={handleInspect}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-[#EAA838] hover:bg-[#F59E0B] text-[#1E252B] font-mono text-xs font-bold transition-all shadow-paper active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>INSPECT ARCHAEOLOGY DOSSIER</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface RelicModalProps {
  relic: ApocryphalRelic | null;
  onClose: () => void;
}

export const RelicModal: React.FC<RelicModalProps> = ({ relic, onClose }) => {
  if (!relic) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md select-none animate-in fade-in-0 duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FAF3E0] text-[#1E252B] border-4 border-[#1E252B] rounded-2xl p-6 sm:p-8 shadow-paper-lg paper-grain space-y-5 animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#F4ECE1] border-2 border-[#1E252B] hover:bg-[#D95A47] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#D95A47] tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>{relic.relicNumber}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E252B] tracking-tight">
            {relic.title}
          </h2>
          <div className="text-xs font-mono text-[#626863]">
            {relic.subtitle}
          </div>
        </div>

        {/* Lore / Story Parchment Box */}
        <div className="p-4 rounded-xl bg-[#F4ECE1] border-2 border-[#DEC6AE] font-serif italic text-sm sm:text-base leading-relaxed text-[#2D312E] shadow-inner">
          "{relic.lore}"
        </div>

        {/* Provenance & Depth Data Grid */}
        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-[#FAF6EE] border border-[#DEC6AE]">
            <div className="text-[10px] text-[#626863] font-bold">DISCOVERY DEPTH</div>
            <div className="text-sm font-bold text-[#D95A47]">
              {relic.depthMeters <= 0 ? `+${Math.abs(relic.depthMeters)}M SHORE` : `-${relic.depthMeters}M PALUNG`}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#FAF6EE] border border-[#DEC6AE]">
            <div className="text-[10px] text-[#626863] font-bold">EXPEDITION ARCHIVE</div>
            <div className="text-sm font-bold text-[#1E252B] truncate">
              {relic.provenance}
            </div>
          </div>
        </div>

        {/* Verification Rubber Stamp */}
        <div className="pt-2 flex items-center justify-between border-t-2 border-[#1E252B]/20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100 border border-emerald-500 text-emerald-800 font-mono text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>RECORDED IN PACIFIC EXPEDITION ARCHIVE</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1E252B] text-white font-mono text-xs font-bold hover:bg-[#D95A47] transition-colors cursor-pointer"
          >
            RETURN TO EXPLORATION
          </button>
        </div>
      </div>
    </div>
  );
};
