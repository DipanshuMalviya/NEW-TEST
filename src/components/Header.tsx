import React, { useState } from 'react';
import { CITIES } from '../data/mockData.ts';

interface HeaderProps {
  currentCity: string;
  setCurrentCity: (cityId: string) => void;
  rizzPoints: number;
  onOpenExpertCall: () => void;
  onOpenRizzModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  setCurrentCity,
  rizzPoints,
  onOpenExpertCall,
  onOpenRizzModal,
}) => {
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const activeCityObj = CITIES.find((c) => c.id === currentCity) || CITIES[0];

  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-[#11131d]/85 backdrop-blur-xl z-40 border-b border-[#1d1f2a]/80 shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
      <div className="w-full h-full px-8 flex items-center justify-between gap-4">
        {/* Left Section: City Selector & Rizz Points */}
        <div className="flex items-center gap-4">
          {/* City Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="flex items-center gap-2 bg-[#282934] hover:bg-[#32343f] px-4 py-1.5 rounded-full cursor-pointer transition-colors border border-[#373844]/60"
            >
              <span className="material-symbols-outlined text-[#ffb95a] text-sm">location_on</span>
              <span className="text-xs font-semibold text-[#e1e1f0]">{activeCityObj.name}</span>
              <span className="material-symbols-outlined text-[#e1bebd] text-sm">
                {showCityDropdown ? 'arrow_drop_up' : 'arrow_drop_down'}
              </span>
            </button>

            {showCityDropdown && (
              <div className="absolute top-full mt-2 left-0 w-64 bg-[#191b26] border border-[#282934] rounded-xl shadow-2xl p-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-[#a98988] uppercase tracking-wider">
                  Calibrate City Nuance
                </div>
                {CITIES.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setCurrentCity(city.id);
                      setShowCityDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                      currentCity === city.id
                        ? 'bg-[#ff5e62]/20 text-[#ffb3b0] font-semibold'
                        : 'text-[#e1e1f0] hover:bg-[#282934]'
                    }`}
                  >
                    <span>{city.name}</span>
                    {currentCity === city.id && (
                      <span className="material-symbols-outlined text-xs text-[#ff5e62]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Rizz Points Indicator */}
          <button
            onClick={onOpenRizzModal}
            className="flex items-center gap-1.5 bg-[#1d1f2a] hover:bg-[#282934] px-4 py-1.5 rounded-full border border-[#282934] transition-colors cursor-pointer group"
            title="View Rizz Level and unlocked perks"
          >
            <span className="material-symbols-outlined text-[#ff5e62] text-sm group-hover:scale-110 transition-transform">
              local_fire_department
            </span>
            <span className="text-xs font-bold text-[#e1e1f0]">{rizzPoints} Rizz Points</span>
            <span className="text-[10px] bg-[#ffb95a]/20 text-[#ffb95a] px-1.5 py-0.2 rounded font-bold ml-1">
              PRO
            </span>
          </button>
        </div>

        {/* Right Section: Guru Call & Profile */}
        <div className="flex items-center gap-4">
          {/* Talk to Human Expert Button */}
          <button
            onClick={onOpenExpertCall}
            className="flex items-center gap-2 bg-[#282934] hover:bg-[#32343f] px-4 py-1.5 rounded-full transition-all border border-[#373844]/60 cursor-pointer group shadow-sm hover:border-[#ffb95a]/40"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb95a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffb95a]"></span>
            </span>
            <span className="material-symbols-outlined text-[#ffb95a] text-base group-hover:rotate-12 transition-transform">
              support_agent
            </span>
            <span className="text-xs text-[#ffb95a] font-bold">Talk to Human Expert</span>
            <span className="text-[11px] text-[#e1bebd]">₹29/min</span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 border-l border-[#282934]">
            <div className="relative">
              <img
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#282934]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_XbeMxPRze0RsZkLmpnJFtuz-SCt6mWdE50qGC_YSsM1MQBb0WlNaeLmTY2pY74dn0wEk6Rqey_LBuH76Yj6dPcsPxXHA7AvJuYVxmIP4qfrVR0aq3P7lpFx-RL1oBljhDgnI46qLAS7s2_xfIurZ4AjqF2fMnFKltbhoVbgkwu6OiMDqm9eR_BTr4tnOKyVIu-O5qGBUcuhnZbP9a5qPyZp0uSuT9AKm64_jjSBDkU6esg0Hv68"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#ffb95a] rounded-full ring-2 ring-[#11131d]"></span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-[#e1e1f0] font-bold leading-none">Kabir M.</span>
              <span className="text-[11px] text-[#a98988] leading-none mt-1">
                {activeCityObj.defaultNeighborhood}, {activeCityObj.short}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
