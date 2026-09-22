import React, { useState } from 'react';
import { Sparkles, X, AlertTriangle, Eye, Award, Compass, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApocryphalRelic } from '../types';
import { APOCRYPHAL_RELICS } from '../data/relicsData';
import { pelagiaAudio } from '../lib/audioEngine';

interface RelicMarkerProps {
  relicId: string;
  isUnlocked: boolean;
  onInspect: (relic: ApocryphalRelic) => void;
  className?: string;
}

export const RelicMarker: React.FC<RelicMarkerProps> = ({
  relicId,
  isUnlocked,
  onInspect,
  className = '',
}) => {
  const relic = APOCRYPHAL_RELICS.find((r) => r.id === relicId);
  if (!relic) return null;

  return (
    <div className={`relative my-8 sm:my-14 flex justify-center select-none ${className}`}>
      <button
        onClick={() => onInspect(relic)}
        className={`group cursor-pointer px-4 py-3 rounded-2xl border-2 transition-all duration-300 flex items-center gap-3.5 backdrop-blur-md active:scale-95 ${
          isUnlocked
            ? 'bg-[#FAF6EE]/90 text-[#1E252B] border-[#EAA838] shadow-[0_0_20px_rgba(234,168,56,0.3)]'
            : 'bg-[#0E1720]/80 text-[#FAF6EE] border-[#38BDF8]/40 hover:border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.15)]'
        }`}
        title={`Inspect ${relic.title}`}
      >
        {/* Papercraft Icon per Relic Type */}
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-black/20 border border-current/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          {relic.iconType === 'albatross' && (
            <svg viewBox="0 0 60 40" className="w-7 h-5 text-[#D95A47]" fill="currentColor">
              <polygon points="5,25 55,25 45,35 15,35" />
              <polygon points="30,5 30,22 12,22" fill="#FAF6EE" stroke="#1E252B" strokeWidth="1.5" />
              <polygon points="32,8 48,22 32,22" fill="#EAA838" stroke="#1E252B" strokeWidth="1.5" />
            </svg>
          )}

          {relic.iconType === 'cutlass' && (
            <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#EAA838]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M8 32 L28 12 M28 12 C32 8, 34 8, 32 14 L18 28" />
              <circle cx="9" cy="31" r="3" fill="#D95A47" />
              <path d="M6 34 L12 28" />
            </svg>
          )}

          {relic.iconType === 'bottle' && (
            <svg viewBox="0 0 30 60" className="w-5 h-8 text-emerald-400" fill="currentColor">
              <rect x="11" y="2" width="8" height="6" rx="1" fill="#D97706" />
              <path d="M10 8 L20 8 L22 20 L26 28 L26 52 C26 56, 4 56, 4 52 L4 28 L8 20 Z" fill="#0E7490" fillOpacity="0.8" stroke="#38BDF8" strokeWidth="1.5" />
              <rect x="8" y="28" width="14" height="14" rx="1" fill="#FEF3C7" opacity="0.8" />
            </svg>
          )}

          {relic.iconType === 'titan' && (
            <div className="relative flex items-center justify-center">
              <Eye className="w-5 h-5 text-[#F59E0B] animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>
          )}

          {relic.iconType === 'bathysphere' && (
            <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#38BDF8]" fill="none">
              <circle cx="20" cy="20" r="14" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
              <circle cx="20" cy="20" r="6" fill="#0EA5E9" stroke="#FAF6EE" strokeWidth="1.5" />
              <path d="M20 6 L20 2 M14 2 h12" stroke="#38BDF8" strokeWidth="2" />
            </svg>
          )}

          {relic.iconType === 'blacklight' && (
            <Sparkles className="w-5 h-5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
          )}

          {relic.iconType === 'mug' && (
            <svg viewBox="0 0 40 40" className="w-6 h-6 text-red-400" fill="currentColor">
              <rect x="8" y="10" width="20" height="22" rx="3" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
              <path d="M28 14 C35 14, 35 26, 28 26" fill="none" stroke="#1E252B" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 18 h12 M12 22 h8" stroke="#D95A47" strokeWidth="1.5" />
            </svg>
          )}

          {relic.iconType === 'klaxosaur' && (
            <div className="relative">
              <span className="text-xl">👑</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>
          )}
        </div>

        {/* Text & Clue Status */}
        <div className="text-left font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isUnlocked ? 'text-[#D95A47]' : 'text-cyan-400'}`}>
              {relic.relicNumber}
            </span>
            {isUnlocked && (
              <span className="px-1.5 py-0.2 rounded bg-emerald-900/40 text-emerald-300 text-[9px] font-bold border border-emerald-500/50">
                UNCOVERED
              </span>
            )}
          </div>
          <div className="font-bold font-serif text-sm sm:text-base tracking-tight truncate max-w-[240px] sm:max-w-md">
            {relic.title}
          </div>
          <div className="text-[10px] opacity-70 flex items-center gap-1.5">
            <Compass className="w-3 h-3" />
            <span>{relic.depthMeters <= 0 ? `+${Math.abs(relic.depthMeters)}M SHORE` : `-${relic.depthMeters}M DEPTH`}</span>
            <span>·</span>
            <span>{isUnlocked ? 'Click to inspect archive' : 'Tap to uncover secret anomaly!'}</span>
          </div>
        </div>
      </button>
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
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-[#1E252B]/30 pb-3">
          <div className="space-y-0.5 font-mono">
            <span className="text-[10px] font-bold text-[#D95A47] tracking-widest uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CLASSIFIED APOCRYPHAL RELIC</span>
            </span>
            <div className="text-xs text-[#626863]">
              {relic.relicNumber} · {relic.depthMeters <= 0 ? `+${Math.abs(relic.depthMeters)}M SHORE` : `-${relic.depthMeters}M DEPTH`}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border-2 border-[#1E252B] bg-[#FAF6EE] hover:bg-[#D95A47] hover:text-white transition-colors cursor-pointer shadow-paper-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E252B] tracking-tight">
            {relic.title}
          </h3>
          <p className="font-mono text-xs text-[#D95A47] font-semibold mt-1">
            {relic.subtitle}
          </p>
        </div>

        {/* Narrative Lore */}
        <div className="space-y-2 bg-[#F4ECE1] p-4 sm:p-5 rounded-xl border-2 border-[#DEC6AE] shadow-inner">
          <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#2F6D68]">
            ARCHIVAL DISPATCH & TESTIMONY
          </div>
          <p className="font-serif text-sm sm:text-base text-[#2D312E] leading-relaxed italic whitespace-pre-line">
            "{relic.lore}"
          </p>
        </div>

        {/* Provenance Stamp */}
        <div className="pt-2 flex items-center justify-between font-mono text-xs text-[#626863] border-t border-dashed border-[#1E252B]/20">
          <div className="flex items-center gap-1.5 text-[#2F6D68] font-bold text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>AUTHENTICATED IN EXPEDITION DIPLOMA</span>
          </div>
          <button
            onClick={onClose}
            className="font-bold text-[#1E252B] hover:text-[#D95A47] underline cursor-pointer"
          >
            [CLOSE LOG]
          </button>
        </div>
      </div>
    </div>
  );
};
