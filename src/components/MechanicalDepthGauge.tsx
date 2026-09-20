import React from 'react';
import { Compass, Volume2, VolumeX, Waves, ChevronDown } from 'lucide-react';
import { ZoneData } from '../types';
import { ZONES } from '../data/oceanData';

interface MechanicalDepthGaugeProps {
  currentDepth: number;
  currentZone: ZoneData;
  isMuted: boolean;
  onToggleMute: () => void;
  onJumpToZone: (zoneId: string) => void;
  scrollProgress: number; // 0 to 1
}

export const MechanicalDepthGauge: React.FC<MechanicalDepthGaugeProps> = ({
  currentDepth,
  currentZone,
  isMuted,
  onToggleMute,
  onJumpToZone,
  scrollProgress,
}) => {
  const rawAtm = Math.max(1, 1.0 + Math.max(0, currentDepth) * 0.0987);
  const pressureDisplay = rawAtm > 999 ? rawAtm.toFixed(0) : rawAtm.toFixed(1);

  const fraction = Math.min(1, Math.max(0, currentDepth / 10994));
  const tempC = currentDepth <= 0 ? '28.4' : (28.4 * Math.pow(0.04, fraction)).toFixed(1);

  const isAboveWater = currentDepth <= 0;
  const sign = isAboveWater ? '+' : '-';
  const formattedMeters = Math.abs(Math.round(currentDepth)).toString().padStart(5, '0');

  const isDarkZone = currentZone.id === 'midnight' || currentZone.id === 'abyss' || currentZone.id === 'hadal';

  return (
    <>
      {/* Top Status Header Rail */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 transition-colors duration-500 border-b select-none backdrop-blur-md ${
          isDarkZone
            ? 'bg-[#0B0F14]/85 border-[#232F3E] text-[#F9F7F1]'
            : 'bg-[#FAF6EE]/90 border-[#EBDDCB] text-[#1E252B]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-mono text-xs">
          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D95A47] inline-block animate-ping" />
            <span className="font-bold tracking-widest uppercase text-[11px] sm:text-xs">
              PELAGIA // EXPEDITION 002
            </span>
            <span className="hidden md:inline text-current opacity-30 text-[10px]">·</span>
            <span className="hidden md:inline text-[10px] opacity-60">
              PACIFIC BATHYMETRIC DESCENT
            </span>
          </div>

          {/* Quick Zone Navigator & Audio Button */}
          <div className="flex items-center gap-3">
            {/* Zone Selector */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-[11px] tracking-wider transition-colors shadow-paper-sm ${
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
                className={`absolute right-0 top-full mt-1.5 w-56 p-1.5 rounded-lg border shadow-paper-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 ${
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

            {/* Clear, Prominent Audio Toggle Pill */}
            <button
              onClick={onToggleMute}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-mono font-bold tracking-wider transition-all shadow-paper-sm active:translate-y-0.5 cursor-pointer ${
                isMuted
                  ? 'bg-red-950/40 border-red-500/50 text-red-300 hover:bg-red-900/40'
                  : 'bg-[#EAA838]/20 border-[#EAA838] text-[#EAA838] hover:bg-[#EAA838]/30 animate-pulse'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-400" />
                  <span>SOUND: MUTED</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#EAA838]" />
                  <span>SOUND: ON</span>
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

        {/* Stepped Ticker Digits */}
        <div className="flex items-baseline gap-1 bg-[#1E252B] text-[#FAF6EE] px-2.5 py-1 rounded-lg border border-[#3B5366] shadow-inner font-bold tracking-widest text-lg sm:text-2xl">
          <span className="text-[#EAA838]">{sign}</span>
          <span>{formattedMeters}</span>
          <span className="text-[10px] text-white/50 ml-0.5">M</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-dashed border-current/20 text-[9px]">
          <div>
            <div className="opacity-50">PRESSURE</div>
            <div className="font-bold">{pressureDisplay} ATM</div>
          </div>
          <div className="text-right">
            <div className="opacity-50">WATER TEMP</div>
            <div className="font-bold">{tempC}°C</div>
          </div>
        </div>
      </div>

      {/* Left Vertical Progress Track */}
      <div className="fixed left-3 sm:left-6 top-24 bottom-12 w-2.5 sm:w-3 z-30 flex flex-col items-center select-none pointer-events-none">
        <div
          className={`relative w-1 flex-1 rounded-full transition-colors ${
            isDarkZone ? 'bg-white/10' : 'bg-black/10'
          }`}
        >
          <div
            className="absolute top-0 left-0 right-0 bg-[#D95A47] rounded-full transition-all duration-150"
            style={{ height: `${scrollProgress * 100}%` }}
          />
          <div
            className="absolute -left-2 w-5 h-5 rounded-full bg-[#FAF6EE] border-2 border-[#1E252B] shadow-paper-sm flex items-center justify-center transition-all duration-150 -translate-y-1/2"
            style={{ top: `${scrollProgress * 100}%` }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#D95A47]" />
          </div>
        </div>
        <span className="text-[8px] font-mono opacity-50 mt-2">11km</span>
      </div>
    </>
  );
};
