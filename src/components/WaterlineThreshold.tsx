import React from 'react';
import { ChevronDown, Sparkles, Waves } from 'lucide-react';

interface WaterlineThresholdProps {
  onScrollToSunlight: () => void;
}

export const WaterlineThreshold: React.FC<WaterlineThresholdProps> = ({
  onScrollToSunlight,
}) => {
  return (
    <div className="relative w-full py-16 sm:py-24 flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Upper Sand Shoreline Horizon Line */}
      <div className="w-full max-w-4xl border-t-2 border-dashed border-[#1E252B]/30 mb-8" />

      {/* Stepped Paper Wave Cutouts */}
      <div className="w-full flex flex-col items-center space-y-1">
        {/* Wave Layer 1 */}
        <div className="w-[120%] h-6 bg-[#DDECE5] border-t-2 border-[#1E252B] -rotate-1 animate-wave-ripple" />
        {/* Wave Layer 2 (Opposite) */}
        <div className="w-[120%] h-8 bg-[#8EAEA2] border-t-2 border-[#1E252B] rotate-1 animate-wave-ripple [animation-delay:-1s]" />
        {/* Wave Layer 3 (Deep Sea Entry) */}
        <div className="w-[120%] h-12 bg-[#2F6D68] border-t-2 border-[#1E252B] -rotate-0.5" />
      </div>

      {/* Center 0 M Seal & Callout */}
      <div className="relative -mt-16 z-10 flex flex-col items-center text-center px-4">
        {/* Circular Stamp */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FAF6EE] border-4 border-[#1E252B] shadow-paper flex flex-col items-center justify-center animate-paper-sway">
          <div className="text-[10px] font-mono font-bold tracking-widest text-[#D95A47] uppercase">
            WATERLINE
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold tracking-tighter text-[#1E252B]">
            0000 M
          </div>
          <div className="text-[9px] font-mono text-[#626863]">
            SEA LEVEL
          </div>
        </div>

        {/* Narrative Call to Action */}
        <div className="mt-6 max-w-md bg-[#FAF6EE] p-4 rounded-xl border-2 border-[#1E252B] shadow-paper space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#2F6D68] uppercase">
            <Waves className="w-4 h-4" />
            <span>ATMOSPHERIC PLUNGE</span>
          </div>
          <p className="font-serif text-sm leading-relaxed text-[#2D312E] italic">
            "You have departed dry soil. Above you lies the sunlit sky; beneath you, eleven vertical kilometers of cold saltwater."
          </p>
          <button
            onClick={onScrollToSunlight}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#2F6D68] text-[#FAF6EE] hover:bg-[#1E252B] font-mono text-xs font-bold transition-all shadow-paper-sm active:translate-y-0.5"
          >
            <span>DESCEND FURTHER</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  );
};
