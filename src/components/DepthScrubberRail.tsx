import React from 'react';
import { Anchor, Compass, ChevronRight, Waves } from 'lucide-react';
import { pelagiaAudio } from '../lib/audioEngine';

interface DepthScrubberRailProps {
  currentDepth: number;
  scrollProgress: number; // 0 to 1
  onJumpToZone: (zoneId: string) => void;
}

export const DepthScrubberRail: React.FC<DepthScrubberRailProps> = ({
  currentDepth,
  scrollProgress,
  onJumpToZone,
}) => {
  const bookmarks = [
    { id: 'coastal', depth: '+10m', label: 'Shore' },
    { id: 'sunlight', depth: '-200m', label: 'Sunlight' },
    { id: 'twilight', depth: '-1km', label: 'Twilight' },
    { id: 'midnight', depth: '-4km', label: 'Midnight' },
    { id: 'abyss', depth: '-6km', label: 'Abyss' },
    { id: 'hadal', depth: '-11km', label: 'Hadal' },
    { id: 'celestial-core', depth: '-13km', label: 'Star Sea' },
  ];

  const handleJump = (id: string) => {
    pelagiaAudio.playWaterBubble();
    onJumpToZone(id);
  };

  return (
    <aside
      aria-label="Bathymetric Depth Scrubber"
      className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center select-none"
    >
      <div className="p-1.5 rounded-full bg-[#FAF6EE]/90 text-[#1E252B] border border-[#DEC6AE] shadow-paper-md backdrop-blur-xs flex flex-col items-center gap-2 paper-grain font-mono text-[9px]">
        {/* Scrubber Header Icon */}
        <div className="w-5 h-5 rounded-full bg-[#EAA838] flex items-center justify-center text-[#1E252B] shadow-paper-sm">
          <Anchor className="w-3 h-3" />
        </div>

        {/* Rail Markers */}
        <div className="flex flex-col items-center gap-1.5 py-1">
          {bookmarks.map((bm) => (
            <button
              key={bm.id}
              onClick={() => handleJump(bm.id)}
              className="group relative flex items-center justify-center p-1 rounded hover:bg-[#EBDDCB] transition-colors cursor-pointer"
              title={`Jump to ${bm.label} (${bm.depth})`}
            >
              {/* Dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#1E252B]/50 group-hover:bg-[#D95A47] group-hover:scale-150 transition-all" />

              {/* Hover Floating Tooltip */}
              <div className="absolute right-full mr-2.5 px-2 py-0.5 rounded bg-[#1E252B] text-white font-mono text-[10px] font-bold tracking-wider uppercase opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-paper-sm">
                <span>{bm.label}</span>
                <span className="opacity-60 ml-1 text-[#EAA838]">{bm.depth}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Current Depth Tracker indicator */}
        <div className="w-full border-t border-[#1E252B]/15 pt-1 flex flex-col items-center text-[8px] opacity-75">
          <span>{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>
    </aside>
  );
};
