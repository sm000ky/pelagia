import React from 'react';
import { Compass, Volume2, VolumeX, Waves, ChevronDown, BookOpen, Sparkles } from 'lucide-react';
import { ZoneData } from '../types';
import { ZONES } from '../data/oceanData';

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
}) => {
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

  return (
    <>
      {/* Top Status Header Rail */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-3 sm:px-8 py-2.5 transition-colors duration-500 border-b select-none backdrop-blur-md ${
          isDarkZone
            ? 'bg-[#0B0F14]/90 border-[#232F3E] text-[#F9F7F1]'
            : 'bg-[#FAF6EE]/95 border-[#EBDDCB] text-[#1E252B]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 font-mono text-xs">
          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D95A47] inline-block animate-ping" />
            <span className="font-bold tracking-widest uppercase text-[11px] sm:text-xs">
              PELAGIA // EXPEDITION
            </span>
            <span className="hidden md:inline text-current opacity-30 text-[10px]">·</span>
            <span className="hidden md:inline text-[10px] opacity-60">
              50 BIOTA BATHYMETRIC CATALOGUE
            </span>
          </div>

          {/* Quick Zone Navigator & Audio Button & Logbook */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Logbook Counter Pill */}
            {onToggleLogbookDrawer && (
              <button
                onClick={onToggleLogbookDrawer}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-[10px] font-bold tracking-wider uppercase transition-all shadow-paper-sm active:translate-y-0.5 cursor-pointer ${
                  isDarkZone
                    ? 'bg-[#142433] border-[#3B5366] text-[#38BDF8] hover:bg-[#1E3345]'
                    : 'bg-[#FAF6EE] border-[#DEC6AE] text-[#D95A47] hover:bg-[#EBDDCB]'
                }`}
                title="Open Expedition Field Logbook (50 Species)"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LOGBOOK:</span>
                <span>{discoveredCount}/{totalSpecimens}</span>
              </button>
            )}

            {/* Zone Selector Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-[10px] sm:text-[11px] tracking-wider transition-colors shadow-paper-sm ${
                  isDarkZone
                    ? 'bg-[#192430] border-[#3B5366] text-[#EAA838] hover:bg-[#243342]'
                    : 'bg-[#F4ECE1] border-[#DEC6AE] text-[#2F6D68] hover:bg-[#EBDDCB]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ZONE:</span>
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
                    className={`w-full text-left px-2.5 py-1.5 rounded text-[10px] font-mono flex items-center justify-between transition-colors ${
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

            {/* Audio Toggle Button with Live Wave Visualizer */}
            <button
              onClick={onToggleMute}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-mono font-bold tracking-wider transition-all shadow-paper-sm active:translate-y-0.5 cursor-pointer ${
                isMuted
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-300 hover:bg-rose-900/40'
                  : 'bg-emerald-950/30 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/40'
              }`}
              title={isMuted ? 'Turn on Ocean Ambient Audio' : 'Mute Ambient Audio'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span>SOUND OFF</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-2 bg-emerald-400 animate-pulse" />
                    <span className="w-0.5 h-3 bg-emerald-400 animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-emerald-400 animate-pulse delay-150" />
                  </div>
                  <span>OCEAN SOUND</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mechanical Depth Meter (Sticky Top-Right) */}
      <div
        className={`fixed top-14 right-3 sm:right-6 z-40 p-2.5 sm:p-3 rounded-xl border shadow-paper transition-all duration-500 font-mono select-none ${
          isDarkZone
            ? 'bg-[#141C24]/90 border-[#3B5366] text-[#F9F7F1]'
            : 'bg-[#FAF6EE]/95 border-[#DEC6AE] text-[#1E252B]'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <Waves className={`w-3.5 h-3.5 ${isDarkZone ? 'text-[#EAA838]' : 'text-[#2F6D68]'}`} />
          <span className="text-[9px] tracking-widest uppercase opacity-60">
            DEPTH GAUGE
          </span>
        </div>

        {/* Roller Odometer Numbers */}
        <div className="flex items-baseline gap-1">
          <span className="text-xl sm:text-2xl font-bold font-serif text-[#D95A47]">
            {sign}
          </span>
          <span className="text-xl sm:text-2xl font-bold tracking-tight">
            {formattedMeters}
          </span>
          <span className="text-[10px] font-bold opacity-70">METERS</span>
        </div>

        {/* Environmental Indicators */}
        <div className="mt-2 pt-2 border-t border-current/15 flex items-center justify-between text-[10px] opacity-75">
          <span>{pressureDisplay} ATM</span>
          <span>·</span>
          <span>{tempC}°C</span>
        </div>

        {/* Depth Progress Wire */}
        <div className="w-full bg-current/10 h-1 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-[#D95A47] h-full transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </>
  );
};
