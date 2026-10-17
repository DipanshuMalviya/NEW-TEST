import React from 'react';
import { DATING_GURUS } from '../data/mockData.ts';

interface GuruConsultationProps {
  onOpenExpertCall: () => void;
}

export const GuruConsultation: React.FC<GuruConsultationProps> = ({ onOpenExpertCall }) => {
  return (
    <div className="flex flex-col w-full px-8 py-6 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-[#ff5e62] uppercase tracking-widest bg-[#ff5e62]/10 px-2.5 py-0.5 rounded-full font-bold">
              Human Expertise • On Demand
            </span>
            <span className="text-[#a98988] text-xs">•</span>
            <span className="text-[10px] text-[#ffb95a] uppercase tracking-wider font-bold">
              Astrotalk-Style Live Audio
            </span>
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold text-[#e1e1f0]">
            1-on-1 Dating Gurus <span className="italic font-normal text-[#ffb3b0]">&amp; Matchmakers</span>
          </h1>
          <p className="text-xs text-[#e1bebd] max-w-2xl mt-1">
            Stuck in an endless talking stage or facing mixed signals? Speak with verified human dating strategists.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#191b26] px-4 py-2 rounded-full border border-[#282934]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95a] animate-ping"></span>
          <span className="text-xs font-bold text-[#e1e1f0]">2 Experts Online Now</span>
        </div>
      </div>

      {/* Gurus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {DATING_GURUS.map((guru) => (
          <div
            key={guru.id}
            className="bg-[#191b26] rounded-2xl p-6 border border-[#282934] shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#ff5e62]/40 transition-all"
          >
            {/* Top decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff5e62] to-[#ffb95a]"></div>

            <div>
              {/* Header with Avatar & Live tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <img
                    src={guru.avatarUrl}
                    alt={guru.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-[#ffb95a]"
                  />
                  {guru.isLive && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#ffb95a] rounded-full ring-2 ring-[#191b26]"></span>
                  )}
                </div>
                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      guru.isLive
                        ? 'bg-[#ffb95a]/20 text-[#ffb95a]'
                        : 'bg-[#282934] text-[#a98988]'
                    }`}
                  >
                    {guru.isLive ? 'Live Audio' : 'Next: 6:00 PM'}
                  </span>
                  <div className="flex items-center gap-1 justify-end mt-1 text-xs">
                    <span className="material-symbols-outlined text-xs text-[#ffb95a]">star</span>
                    <span className="font-bold text-[#e1e1f0]">{guru.rating}</span>
                    <span className="text-[10px] text-[#a98988]">({guru.consultsCount})</span>
                  </div>
                </div>
              </div>

              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#e1e1f0]">
                {guru.name}
              </h3>
              <p className="text-xs text-[#ffb3b0] font-semibold mb-3">{guru.role}</p>
              <p className="text-xs text-[#e1bebd] mb-4 leading-relaxed">{guru.bio}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {guru.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-[#11131d] text-[#a98988] px-2 py-0.5 rounded-md border border-[#282934]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Price & Call Button */}
            <div className="pt-4 border-t border-[#282934] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#a98988] block">Rate</span>
                <span className="text-base font-bold text-[#ffb95a]">
                  ₹{guru.ratePerMin} <span className="text-[11px] font-normal text-[#e1bebd]">/ min</span>
                </span>
              </div>
              <button
                onClick={onOpenExpertCall}
                className="flex items-center gap-1.5 bg-[#ff5e62] hover:brightness-110 text-[#64000f] font-bold text-xs px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-lg"
              >
                <span className="material-symbols-outlined text-sm">call</span>
                <span>Connect Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="bg-[#11131d] rounded-2xl p-6 border border-[#282934] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ffb95a]/10 text-[#ffb95a] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#e1e1f0]">100% Confidential &amp; Encrypted Sessions</h4>
            <p className="text-xs text-[#a98988] mt-0.5">
              No audio logs or screenshots are shared. Real humans with verified matchmaking credentials.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenExpertCall}
          className="bg-[#282934] hover:bg-[#32343f] text-[#ffb95a] text-xs font-bold px-6 py-2.5 rounded-full border border-[#ffb95a]/30 transition-colors cursor-pointer"
        >
          View All Verified Matchmakers
        </button>
      </div>
    </div>
  );
};
