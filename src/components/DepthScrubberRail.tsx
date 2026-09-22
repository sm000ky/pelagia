import React from 'react';
import { Anchor, Compass, Sparkles, Waves } from 'lucide-react';
import { pelagiaAudio } from '../lib/audioEngine';

interface DepthScrubberRailProps {
  currentDepth: number;
  scrollProgress: number; // 0 to 1
  onJumpToZone: (zoneId: string) => void;
  hasNearbyAnomaly?: boolean;
}

export const DepthScrubberRail: React.FC<DepthScrubberRailProps> = ({
  currentDepth,
  scrollProgress,
  onJumpToZone,
  hasNearbyAnomaly = false,
}) => {
  const bookmarks = [
    { id: 'coastal', depth: '+10m', label: 'Shore', posPercent: 0 },
    { id: 'sunlight', depth: '-200m', label: 'Sunlight', posPercent: 15 },
    { id: 'twilight', depth: '-1km', label: 'Twilight', posPercent: 30 },
    { id: 'midnight', depth: '-4km', label: 'Midnight', posPercent: 50 },
    { id: 'abyss', depth: '-6km', label: 'Abyss', posPercent: 70 },
    { id: 'hadal', depth: '-11km', label: 'Hadal', posPercent: 85 },
    { id: 'challenger', depth: '-10,994m', label: 'Deep', posPercent: 92 },
    { id: 'celestial-core', depth: '-13km', label: 'Star Sea', posPercent: 100 },
  ];

  const handleJump = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    pelagiaAudio.playWaterBubble();
    onJumpToZone(id);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, clickY / rect.height));
    const targetScroll = ratio * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    pelagiaAudio.playWaterBubble();
  };

  const formattedDepth =
    currentDepth <= 0
      ? `+${Math.abs(Math.round(currentDepth))}m`
      : `-${Math.round(currentDepth).toLocaleString()}m`;

  return (
    <aside
      aria-label="Bathymetric Depth Scrubber Rail"
      className="fixed right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center select-none"
    >
      <div className="relative p-1.5 rounded-2xl bg-[#FAF6EE]/95 text-[#1E252B] border-2 border-[#1E252B] shadow-paper-md backdrop-blur-md flex flex-col items-center gap-2 paper-grain font-mono text-[9px]">
        {/* Top Anchor Emblem */}
        <div className="w-6 h-6 rounded-full bg-[#EAA838] border border-[#1E252B] flex items-center justify-center text-[#1E252B] shadow-paper-sm">
          <Anchor className="w-3.5 h-3.5" />
        </div>

        {/* Vertical Rail Track with Sliding Elevator Thumb */}
        <div
          onClick={handleTrackClick}
          className="relative w-7 h-64 bg-[#EBDDCB] border border-[#DEC6AE] rounded-full flex flex-col items-center justify-between py-2 cursor-pointer group shadow-inner"
          title="Click to scrub bathymetric depth"
        >
          {/* Subtle center guide line */}
          <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[2px] bg-[#1E252B]/20 pointer-events-none" />

          {/* Bookmarks Dots along the rail */}
          {bookmarks.map((bm) => (
            <button
              key={bm.id}
              onClick={(e) => handleJump(e, bm.id)}
              className="relative z-10 group/btn flex items-center justify-center p-0.5 cursor-pointer"
              title={`Jump to ${bm.label} (${bm.depth})`}
            >
              <div className="w-2 h-2 rounded-full bg-[#1E252B]/60 group-hover/btn:bg-[#D95A47] group-hover/btn:scale-150 transition-all border border-[#FAF6EE]" />

              {/* Hover Floating Tooltip */}
              <div className="absolute right-full mr-3 px-2 py-0.5 rounded bg-[#1E252B] text-white font-mono text-[10px] font-bold tracking-wider uppercase opacity-0 pointer-events-none group-hover/btn:opacity-100 transition-opacity whitespace-nowrap shadow-paper-sm z-50">
                <span>{bm.label}</span>
                <span className="opacity-60 ml-1 text-[#EAA838]">{bm.depth}</span>
              </div>
            </button>
          ))}

          {/* Sliding Bathyscaphe Capsule Thumb Indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-6 h-4 rounded-full bg-[#D95A47] border border-[#1E252B] shadow-paper-sm flex items-center justify-center transition-all duration-75 pointer-events-none z-20"
            style={{
              top: `calc(${Math.min(0.94, Math.max(0.04, scrollProgress)) * 100}% - 8px)`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />

            {/* Live Depth Tooltip beside Capsule */}
            <div className="absolute right-full mr-2 px-2 py-0.5 rounded bg-[#D95A47] text-white font-mono text-[10px] font-bold whitespace-nowrap shadow-paper-sm">
              {formattedDepth}
            </div>
          </div>
        </div>

        {/* Bottom Percent / Anomaly Warning Icon */}
        <div className="w-full border-t border-[#1E252B]/15 pt-1 flex flex-col items-center text-[8px] font-bold opacity-80">
          {hasNearbyAnomaly ? (
            <span className="text-[#D95A47] animate-bounce flex items-center gap-0.5" title="Acoustic Anomaly Nearby!">
              <Sparkles className="w-3 h-3 text-[#EAA838]" />
              <span>RELIC!</span>
            </span>
          ) : (
            <span>{Math.round(scrollProgress * 100)}%</span>
          )}
        </div>
      </div>
    </aside>
  );
};
