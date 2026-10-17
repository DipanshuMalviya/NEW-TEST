import React from 'react';

interface RizzModalProps {
  isOpen: boolean;
  onClose: () => void;
  rizzPoints: number;
}

export const RizzModal: React.FC<RizzModalProps> = ({ isOpen, onClose, rizzPoints }) => {
  if (!isOpen) return null;

  const currentLevel = Math.floor(rizzPoints / 100) + 1;
  const nextTarget = currentLevel * 100;
  const progressPercent = Math.min(100, Math.round(((rizzPoints % 100) / 100) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c0e18]/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#191b26] border border-[#282934] rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff5e62]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#282934]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff5e62]">local_fire_department</span>
            <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#e1e1f0]">
              Rizz Ledger &amp; Status
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#282934] flex items-center justify-center text-[#e1bebd] hover:text-[#e1e1f0] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Current Score Spotlight */}
        <div className="bg-[#11131d] rounded-xl p-5 border border-[#282934] text-center mb-5">
          <span className="text-[10px] text-[#ffb95a] uppercase font-bold tracking-widest block mb-1">
            Current Standing
          </span>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-['Playfair_Display'] text-4xl font-bold text-[#ffb3b0]">
              {rizzPoints}
            </span>
            <span className="text-xs text-[#a98988]">Pts</span>
          </div>
          <p className="text-xs font-bold text-[#e1e1f0]">
            Tier {currentLevel}: Cultured Raconteur
          </p>

          {/* Progress bar */}
          <div className="w-full bg-[#282934] h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#ff5e62] to-[#ffb95a] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#a98988] mt-1.5">
            <span>{rizzPoints % 100} / 100 XP</span>
            <span>Target: {nextTarget} Pts for Tier {currentLevel + 1}</span>
          </div>
        </div>

        {/* Perks Checklist */}
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2.5 text-xs text-[#e1e1f0]">
            <span className="material-symbols-outlined text-xs text-[#ffb95a]">check_circle</span>
            <span>Subtext OCR &amp; Vision Intelligence v2.4 (Active)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#e1e1f0]">
            <span className="material-symbols-outlined text-xs text-[#ffb95a]">check_circle</span>
            <span>Hyper-local Hinglish Wit Calibrator (Active)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#e1e1f0]">
            <span className="material-symbols-outlined text-xs text-[#ffb95a]">check_circle</span>
            <span>Priority Queue for Guru Consults (Active)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#a98988]">
            <span className="material-symbols-outlined text-xs text-[#373844]">lock</span>
            <span>Voice Note Script Generator (Unlocks at 500 Pts)</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#282934] hover:bg-[#32343f] text-[#ffb3b0] text-xs font-bold py-2.5 rounded-full transition-colors cursor-pointer border border-[#ffb3b0]/30"
        >
          Got It, Keep Crafting Wit
        </button>
      </div>
    </div>
  );
};
