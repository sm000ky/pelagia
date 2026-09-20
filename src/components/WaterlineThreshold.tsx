import React from 'react';
import { Waves } from 'lucide-react';

export const WaterlineThreshold: React.FC = () => {
  return (
    <div className="relative w-full py-12 sm:py-20 flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Stepped Paper Wave Cuts (Layered Foam) */}
      <div className="w-full flex flex-col items-center space-y-1.5 opacity-90">
        <div className="w-[125%] h-6 bg-[#E0ECE4] border-t-2 border-[#1E252B] -rotate-1 animate-wave-ripple" />
        <div className="w-[125%] h-8 bg-[#A2C7B8] border-t-2 border-[#1E252B] rotate-1 animate-wave-ripple [animation-delay:-1.2s]" />
        <div className="w-[125%] h-12 bg-[#6CAE9E] border-t-2 border-[#1E252B] -rotate-0.5" />
      </div>

      {/* Center Waterline Seal Marker */}
      <div className="relative -mt-16 z-10 flex flex-col items-center text-center px-4">
        <div className="w-24 h-24 rounded-full bg-[#FAF6EE] border-4 border-[#1E252B] shadow-paper flex flex-col items-center justify-center animate-paper-sway">
          <div className="text-[9px] font-mono font-bold tracking-widest text-[#D95A47] uppercase">
            WATERLINE
          </div>
          <div className="text-2xl font-mono font-bold tracking-tighter text-[#1E252B]">
            0000 M
          </div>
          <div className="text-[8px] font-mono text-[#626863]">
            PACIFIC OCEAN
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-white/90 uppercase drop-shadow">
          <Waves className="w-4 h-4" />
          <span>ENTERING THE SUNLIGHT ZONE</span>
        </div>
      </div>
    </div>
  );
};
