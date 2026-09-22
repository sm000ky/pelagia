import React, { useState } from 'react';
import { Sparkles, X, AlertTriangle, Eye, Award, Compass, ShieldCheck, Radio, Film, SunMedium } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApocryphalRelic } from '../types';
import { APOCRYPHAL_RELICS } from '../data/relicsData';
import { pelagiaAudio } from '../lib/audioEngine';

interface RelicMarkerProps {
  relicId: string;
  isUnlocked: boolean;
  onInspect: (relic: ApocryphalRelic) => void;
  onTriggerPlankton?: () => void;
  onTriggerTitan?: () => void;
  onToggle1930s?: () => void;
  onToggleUV?: () => void;
  className?: string;
}

export const RelicMarker: React.FC<RelicMarkerProps> = ({
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

  const handleClick = () => {
    // Specific magical environmental phenomena per relic
    if (relic.id === 'relic-bottle') {
      pelagiaAudio.playCorkPop();
      if (onTriggerPlankton) onTriggerPlankton();
    } else if (relic.id === 'relic-titan') {
      pelagiaAudio.playSonarPing();
      if (onTriggerTitan) onTriggerTitan();
    } else if (relic.id === 'relic-bathysphere') {
      pelagiaAudio.playVinylCrackle();
      if (onToggle1930s) onToggle1930s();
    } else if (relic.id === 'relic-blacklight') {
      if (onToggleUV) onToggleUV();
    }

    onInspect(relic);
  };

  return (
    <div
      id={relic.id}
      className={`relative my-8 sm:my-14 flex justify-center select-none scroll-mt-32 transition-all duration-300 ${className}`}
    >
      <button
        onClick={handleClick}
        className={`group cursor-pointer px-4 py-3.5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-3.5 backdrop-blur-md active:scale-95 ${
          isUnlocked
            ? 'bg-[#FAF6EE]/95 text-[#1E252B] border-[#EAA838] shadow-[0_0_25px_rgba(234,168,56,0.35)]'
            : 'bg-[#0E1720]/85 text-[#FAF6EE] border-[#38BDF8]/40 hover:border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.2)]'
        }`}
        title={`Inspect ${relic.title}`}
      >
        {/* Papercraft Icon per Relic Type */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black/20 border border-current/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          {relic.iconType === 'albatross' && (
            <svg viewBox="0 0 60 40" className="w-8 h-6 text-[#D95A47]" fill="currentColor">
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
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 30 60" className="w-5 h-8 text-emerald-400" fill="currentColor">
                <rect x="11" y="2" width="8" height="6" rx="1" fill="#D97706" />
                <path d="M10 8 L20 8 L22 20 L26 28 L26 52 C26 56, 4 56, 4 52 L4 28 L8 20 Z" fill="#0E7490" fillOpacity="0.8" stroke="#38BDF8" strokeWidth="1.5" />
                <rect x="8" y="28" width="14" height="14" rx="1" fill="#FEF3C7" opacity="0.8" />
              </svg>
              <Sparkles className="w-3.5 h-3.5 text-emerald-300 absolute -top-1 -right-1 animate-ping" />
            </div>
          )}

          {relic.iconType === 'titan' && (
            <div className="relative flex items-center justify-center">
              <Radio className="w-6 h-6 text-[#22D3EE] animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
          )}

          {relic.iconType === 'bathysphere' && (
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-7 h-7 text-[#F59E0B]" fill="none">
                <circle cx="20" cy="20" r="14" fill="#1E293B" stroke="#D4AF37" strokeWidth="2" />
                <circle cx="20" cy="20" r="6" fill="#0EA5E9" stroke="#FAF6EE" strokeWidth="1.5" />
                <path d="M20 6 L20 2 M14 2 h12" stroke="#D4AF37" strokeWidth="2" />
              </svg>
              <Film className="w-3 h-3 text-[#D4AF37] absolute -bottom-1 -right-1" />
            </div>
          )}

          {relic.iconType === 'blacklight' && (
            <div className="relative flex items-center justify-center">
              <SunMedium className="w-6 h-6 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
            </div>
          )}

          {relic.iconType === 'mug' && (
            <svg viewBox="0 0 40 40" className="w-7 h-7 text-red-400" fill="currentColor">
              <rect x="8" y="10" width="20" height="22" rx="3" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
              <path d="M28 14 C35 14, 35 26, 28 26" fill="none" stroke="#1E252B" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 18 h12 M12 22 h8" stroke="#D95A47" strokeWidth="1.5" />
            </svg>
          )}

          {relic.iconType === 'klaxosaur' && (
            <div className="relative">
              <span className="text-2xl">👑</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            </div>
          )}
        </div>

        {/* Text & Clue Status */}
        <div className="text-left font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isUnlocked ? 'text-[#D95A47]' : 'text-cyan-400'}`}>
              {relic.relicNumber}
            </span>
            {isUnlocked ? (
              <span className="px-1.5 py-0.2 rounded bg-emerald-900/50 text-emerald-300 text-[9px] font-bold border border-emerald-500/50">
                UNCOVERED
              </span>
            ) : (
              <span className="px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 text-[9px] font-bold border border-cyan-400/50 animate-pulse">
                INTERACT TO AWAKEN
              </span>
            )}
          </div>
          <div className="font-bold font-serif text-sm sm:text-base tracking-tight truncate max-w-[240px] sm:max-w-md">
            {relic.title}
          </div>
          <div className="text-[10px] opacity-75 flex items-center gap-1.5">
            <Compass className="w-3 h-3" />
            <span>{relic.depthMeters <= 0 ? `+${Math.abs(relic.depthMeters)}M SHORE` : `-${relic.depthMeters}M DEPTH`}</span>
            <span>·</span>
            <span className="text-[#EAA838] font-bold">
              {relic.id === 'relic-bottle' && '🍾 Tap to uncork plankton aurora'}
              {relic.id === 'relic-titan' && '📡 Tap to ping 120m leviathan'}
              {relic.id === 'relic-bathysphere' && '🎞️ Tap to enter 1930s film archive'}
              {relic.id === 'relic-blacklight' && '🔮 Tap to ignite UV phosphor mode'}
              {relic.id === 'relic-albatross' && '🪶 Celestial Jian papercraft'}
              {relic.id === 'relic-cutlass' && '⚔️ Golden age corsair steel'}
              {relic.id === 'relic-mug' && '☕ Indestructible barista ceramic'}
              {relic.id === 'relic-klaxosaur' && '👑 Bedrock magma core'}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export const SkyAlbatrossRelic: React.FC<{
  isUnlocked: boolean;
  onInspect: (relic: ApocryphalRelic) => void;
}> = ({ isUnlocked, onInspect }) => {
  const relic = APOCRYPHAL_RELICS.find((r) => r.id === 'relic-albatross');
  if (!relic) return null;

  return (
    <div
      id="relic-albatross"
      onClick={() => onInspect(relic)}
      className="group cursor-pointer flex flex-col items-center select-none scroll-mt-28"
      title="The Celestial Jian Origami Albatross (+12m)"
    >
      <div className="relative p-2.5 transition-transform duration-300 group-hover:scale-125">
        <svg viewBox="0 0 60 40" className="w-12 h-9 text-[#D95A47] filter drop-shadow-md animate-bounce" fill="currentColor">
          <polygon points="5,25 55,25 45,35 15,35" />
          <polygon points="30,5 30,22 12,22" fill="#FAF6EE" stroke="#1E252B" strokeWidth="1.5" />
          <polygon points="32,8 48,22 32,22" fill="#EAA838" stroke="#1E252B" strokeWidth="1.5" />
        </svg>

        {/* Shimmer sparkle hint */}
        <Sparkles className="w-4 h-4 text-[#EAA838] absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '6s' }} />
      </div>

      {/* Floating hint pill */}
      <div className="px-2 py-0.5 rounded-full bg-[#FAF6EE] border border-[#1E252B] text-[#1E252B] font-mono text-[9px] font-bold shadow-paper-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isUnlocked ? '✓ Jian Albatross' : '✨ Touch the Paper Bird'}
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
