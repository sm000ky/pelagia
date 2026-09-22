import React, { useState } from 'react';
import {
  Compass,
  Volume2,
  VolumeX,
  Waves,
  ChevronDown,
  BookOpen,
  Radio,
  Lightbulb,
  Award,
  Sparkles,
} from 'lucide-react';
import { ZoneData } from '../types';
import { ZONES } from '../data/oceanData';
import { Language, Translations } from '../lib/i18n';
import { pelagiaAudio } from '../lib/audioEngine';

interface MechanicalDepthGaugeProps {
  currentDepth: number;
  currentZone: ZoneData;
  isMuted: boolean;
  onToggleMute: () => void;
  onJumpToZone: (zoneId: string) => void;
  scrollProgress: number; // 0 to 1
  discoveredCount?: number;
  totalSpecimens?: number;
  onToggleLogbookDrawer?: () => void;
  currentLang: Language;
  onSelectLanguage: (lang: Language) => void;
  t: Translations;
  nextSpecimenName?: string;
  nextSpecimenDist?: number;
  nearbyRelicHint?: string;
  isPOVActive?: boolean;
  onTogglePOV?: () => void;
  onOpenCertificate?: () => void;
}

export const MechanicalDepthGauge: React.FC<MechanicalDepthGaugeProps> = ({
  currentDepth,
  currentZone,
  isMuted,
  onToggleMute,
  onJumpToZone,
  scrollProgress,
  discoveredCount = 0,
  totalSpecimens = 50,
  onToggleLogbookDrawer,
  currentLang,
  onSelectLanguage,
  t,
  nextSpecimenName,
  nextSpecimenDist,
  nearbyRelicHint,
  isPOVActive = false,
  onTogglePOV,
  onOpenCertificate,
}) => {
  const [isMobileZoneMenuOpen, setIsMobileZoneMenuOpen] = useState<boolean>(false);

  const rawAtm = Math.max(1, 1.0 + Math.max(0, currentDepth) * 0.0987);
  const pressureDisplay = rawAtm > 999 ? rawAtm.toFixed(0) : rawAtm.toFixed(1);

  const fraction = Math.min(1, Math.max(0, currentDepth / 10994));
  const tempC = currentDepth <= 0 ? '28.4' : (28.4 * Math.pow(0.04, fraction)).toFixed(1);

  const isAboveWater = currentDepth <= 0;
  const sign = isAboveWater ? '+' : '-';
  const formattedMeters = Math.abs(Math.round(currentDepth)).toString().padStart(5, '0');

  const isDarkZone =
    currentZone.id === 'twilight' ||
    currentZone.id === 'midnight' ||
    currentZone.id === 'abyss' ||
    currentZone.id === 'hadal';

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'id', label: 'ID' },
    { code: 'ja', label: 'JP' },
  ];

  return (
    <>
      {/* ===================================================================
       * TOP STATUS HEADER (RESPONSIVE: CLEAN & UNCLUTTERED ON ALL DEVICES)
       * =================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-3 sm:px-8 py-2.5 transition-colors duration-500 border-b select-none backdrop-blur-md ${
          isDarkZone
            ? 'bg-[#0B0F14]/90 border-[#232F3E] text-[#F9F7F1]'
            : 'bg-[#FAF6EE]/95 border-[#EBDDCB] text-[#1E252B]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 font-mono text-xs">
          {/* Brand & Steady Illuminated Beacon (Zero Kelap-Kelip) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D95A47] inline-block shadow-[0_0_8px_#D95A47]" />
            <span className="font-bold tracking-widest uppercase text-xs sm:text-sm">
              {t.brandTitle}
            </span>
            <span className="hidden lg:inline text-current opacity-30 text-[10px]">·</span>
            <span className="hidden lg:inline text-[10px] opacity-60">
              {t.brandSubtitle}
            </span>
          </div>

          {/* Right Header Action Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Language Selector Pill (ALWAYS VISIBLE & NEVER CUT OFF) */}
            <div className="inline-flex rounded border border-current/25 overflow-hidden text-[10px] font-mono shadow-paper-sm flex-shrink-0">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    pelagiaAudio.playWaterBubble();
                    onSelectLanguage(l.code);
                  }}
                  className={`px-2 py-0.5 transition-colors font-bold cursor-pointer ${
                    currentLang === l.code
                      ? 'bg-[#D95A47] text-white'
                      : 'hover:bg-white/10 opacity-75'
                  }`}
                  title={`Switch language to ${l.label}`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Desktop Only: Logbook Button */}
            {onToggleLogbookDrawer && (
              <button
                onClick={onToggleLogbookDrawer}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-[10px] font-bold tracking-wider uppercase transition-all shadow-paper-sm active:translate-y-0.5 cursor-pointer ${
                  isDarkZone
                    ? 'bg-[#142433] border-[#3B5366] text-[#38BDF8] hover:bg-[#1E3345]'
                    : 'bg-[#FAF6EE] border-[#DEC6AE] text-[#D95A47] hover:bg-[#EBDDCB]'
                }`}
                title="Open Expedition Field Logbook (50 Species)"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.logbook}:</span>
                <span>{discoveredCount}/{totalSpecimens}</span>
              </button>
            )}

            {/* Desktop Only: Diploma / Certificate Button */}
            {onOpenCertificate && (
              <button
                onClick={onOpenCertificate}
                className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-[10px] font-bold tracking-wider uppercase transition-all shadow-paper-sm active:translate-y-0.5 cursor-pointer ${
                  isDarkZone
                    ? 'bg-[#1E252B] border-[#EAA838] text-[#EAA838] hover:bg-[#2C3844]'
                    : 'bg-[#F4ECE1] border-[#EAA838] text-[#9A6715] hover:bg-[#EBDDCB]'
                }`}
                title="View & Share Official Expedition Diploma"
              >
                <Award className="w-3.5 h-3.5 text-[#EAA838]" />
                <span className="hidden lg:inline">DIPLOMA</span>
              </button>
            )}

            {/* Desktop Only: Zone Selector Dropdown */}
            <div className="relative group hidden md:block">
              <button
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-[11px] tracking-wider transition-colors shadow-paper-sm cursor-pointer ${
                  isDarkZone
                    ? 'bg-[#192430] border-[#3B5366] text-[#EAA838] hover:bg-[#243342]'
                    : 'bg-[#F4ECE1] border-[#DEC6AE] text-[#2F6D68] hover:bg-[#EBDDCB]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t.zone}:</span>
                <span className="font-bold">{currentZone.name.split('·')[0].trim()}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              <div
                className={`absolute right-0 top-full mt-1.5 w-60 p-1.5 rounded-lg border shadow-paper-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 ${
                  isDarkZone
                    ? 'bg-[#141C24] border-[#2C4251] text-[#F9F7F1]'
                    : 'bg-[#FAF6EE] border-[#DEC6AE] text-[#1E252B]'
                }`}
              >
                {ZONES.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => onJumpToZone(z.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-[10px] font-mono flex items-center justify-between transition-colors cursor-pointer ${
                      currentZone.id === z.id
                        ? 'bg-[#D95A47] text-white font-bold'
                        : isDarkZone
                        ? 'hover:bg-[#232F3E]'
                        : 'hover:bg-[#EBDDCB]'
                    }`}
                  >
                    <span>{z.name.split('·')[0].trim()}</span>
                    <span className="opacity-60 text-[9px]">{z.depthRange}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Only: POV Spotlight Button */}
            {onTogglePOV && (
              <button
                onClick={() => {
                  pelagiaAudio.playWaterBubble();
                  onTogglePOV();
                }}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-mono font-bold tracking-wider uppercase transition-all shadow-paper-sm active:translate-y-0.5 cursor-pointer ${
                  isPOVActive
                    ? 'bg-cyan-500 text-[#080E17] border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                    : isDarkZone
                    ? 'bg-[#142433] border-[#3B5366] text-cyan-300 hover:bg-[#1E3345]'
                    : 'bg-[#FAF6EE] border-[#DEC6AE] text-[#2F6D68] hover:bg-[#EBDDCB]'
                }`}
                title="Toggle Submersible POV Cockpit & Halogen Light"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>POV:</span>
                <span>{isPOVActive ? 'ON' : 'OFF'}</span>
              </button>
            )}

            {/* Audio Toggle Button (Compact on mobile, full text on desktop) */}
            <button
              onClick={onToggleMute}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded border text-[10px] font-mono font-bold tracking-wider transition-all shadow-paper-sm active:translate-y-0.5 cursor-pointer flex-shrink-0 ${
                isMuted
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-300 hover:bg-rose-900/40'
                  : 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
              }`}
              title={isMuted ? 'Turn on Ocean Ambient Audio' : 'Mute Ambient Audio'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">{t.soundOff}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">{t.soundOn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================================
       * MOBILE DEDICATED THUMB-FRIENDLY BOTTOM DOCK (NEVER OVERLAPS!)
       * Houses: POV Spotlight Toggle, Logbook Drawer, & Zone Selector
       * =================================================================== */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 md:hidden flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0B0F14]/95 text-[#F9F7F1] border-2 border-cyan-500/40 shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-md select-none font-mono text-[10px]"
      >
        {/* Mobile POV Spotlight Button (ALWAYS VISIBLE & TAP-ABLE ON ANDROID!) */}
        {onTogglePOV && (
          <button
            onClick={() => {
              pelagiaAudio.playWaterBubble();
              onTogglePOV();
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-bold uppercase transition-all active:scale-95 cursor-pointer ${
              isPOVActive
                ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                : 'bg-[#142433] border-cyan-500/40 text-cyan-300'
            }`}
            title="Toggle Submersible Viewport & Halogen Spotlight"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>POV: {isPOVActive ? 'ON' : 'OFF'}</span>
          </button>
        )}

        {/* Mobile Anomaly Alert Pill */}
        {nearbyRelicHint && (
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-amber-400 bg-amber-950/90 text-amber-300 font-bold animate-pulse">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
            <span className="text-[9px]">RELIC NEARBY!</span>
          </div>
        )}

        {/* Mobile Logbook Button */}
        {onToggleLogbookDrawer && (
          <button
            onClick={onToggleLogbookDrawer}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-amber-500/40 bg-[#1A1608] text-[#F59E0B] font-bold active:scale-95 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{discoveredCount}/{totalSpecimens}</span>
          </button>
        )}

        {/* Mobile Diploma Button */}
        {onOpenCertificate && (
          <button
            onClick={onOpenCertificate}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-yellow-500/50 bg-[#241E0F] text-[#FBBF24] font-bold active:scale-95 cursor-pointer"
            title="View & Share Diploma"
          >
            <Award className="w-3.5 h-3.5" />
            <span>DIPLOMA</span>
          </button>
        )}

        {/* Mobile Zone Selector Toggle */}
        <div className="relative">
          <button
            onClick={() => setIsMobileZoneMenuOpen(!isMobileZoneMenuOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/20 bg-white/10 text-white font-bold active:scale-95 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{currentZone.name.split('·')[0].slice(0, 8)}..</span>
          </button>

          {/* Mobile Zone Dropup Menu */}
          {isMobileZoneMenuOpen && (
            <div className="absolute bottom-full mb-2 right-0 w-52 p-1.5 rounded-xl bg-[#0B0F14] border-2 border-cyan-500/50 shadow-2xl space-y-1">
              {ZONES.map((z) => (
                <button
                  key={z.id}
                  onClick={() => {
                    setIsMobileZoneMenuOpen(false);
                    onJumpToZone(z.id);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-[10px] flex items-center justify-between ${
                    currentZone.id === z.id
                      ? 'bg-[#D95A47] text-white font-bold'
                      : 'hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <span>{z.name.split('·')[0].trim()}</span>
                  <span className="opacity-60 text-[9px]">{z.depthRange}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ===================================================================
       * MECHANICAL DEPTH GAUGE HUD (STICKY TOP-RIGHT)
       * =================================================================== */}
      <div
        className={`fixed top-12 sm:top-14 right-2.5 sm:right-6 z-40 p-2 sm:p-3 rounded-xl border shadow-paper transition-all duration-500 font-mono select-none ${
          isDarkZone
            ? 'bg-[#141C24]/90 border-[#3B5366] text-[#F9F7F1]'
            : 'bg-[#FAF6EE]/95 border-[#DEC6AE] text-[#1E252B]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1">
          <div className="flex items-center gap-1">
            <Waves className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isDarkZone ? 'text-[#EAA838]' : 'text-[#2F6D68]'}`} />
            <span className="text-[8px] sm:text-[9px] tracking-widest uppercase opacity-60">
              {t.depthGauge}
            </span>
          </div>
        </div>

        {/* Roller Odometer Numbers */}
        <div className="flex items-baseline gap-0.5 sm:gap-1">
          <span className="text-lg sm:text-2xl font-bold font-serif text-[#D95A47]">
            {sign}
          </span>
          <span className="text-lg sm:text-2xl font-bold tracking-tight">
            {formattedMeters}
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold opacity-70">{t.meters}</span>
        </div>

        {/* Environmental Indicators */}
        <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-current/15 flex items-center justify-between text-[9px] sm:text-[10px] opacity-75">
          <span>{pressureDisplay} ATM</span>
          <span>·</span>
          <span>{tempC}°C</span>
        </div>

        {/* Depth Progress Wire */}
        <div className="w-full bg-current/10 h-1 rounded-full mt-1.5 sm:mt-2 overflow-hidden">
          <div
            className="bg-[#D95A47] h-full transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Sonar Proximity Radar Indicator: Relic Anomaly Alert OR Next Specimen */}
      {(nearbyRelicHint || (nextSpecimenName && nextSpecimenDist !== undefined && nextSpecimenDist > 0)) && (
        <div
          className={`fixed bottom-4 right-4 z-40 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-paper font-mono text-[11px] backdrop-blur-md select-none transition-all duration-300 ${
            nearbyRelicHint
              ? 'bg-[#2A1608]/95 border-[#F59E0B] text-[#FEF3C7] shadow-[0_0_20px_rgba(245,158,11,0.4)] animate-pulse'
              : isDarkZone
              ? 'bg-[#0E1B26]/90 border-[#38BDF8]/50 text-[#F1F5F9]'
              : 'bg-[#FAF6EE]/95 border-[#DEC6AE] text-[#1E252B]'
          }`}
        >
          {nearbyRelicHint ? (
            <>
              <Sparkles className="w-4 h-4 text-[#F59E0B] animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-bold text-[#F59E0B]">{nearbyRelicHint}</span>
              <span className="text-[10px] opacity-75 font-serif italic">— look around the currents!</span>
            </>
          ) : (
            <>
              <Radio className="w-3.5 h-3.5 text-[#D95A47]" />
              <span className="opacity-70">{t.nextSpecimenIn}</span>
              <span className="font-bold text-[#D95A47]">{nextSpecimenDist}m:</span>
              <span className="font-bold">{nextSpecimenName}</span>
            </>
          )}
        </div>
      )}
    </>
  );
};
