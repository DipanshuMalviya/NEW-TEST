import React, { useState } from 'react';
import { DATE_SPOTS, CITIES } from '../data/mockData.ts';

interface DatePlannerProps {
  currentCity: string;
  onCopyPunchline: (text: string) => void;
}

export const DatePlanner: React.FC<DatePlannerProps> = ({ currentCity, onCopyPunchline }) => {
  const [selectedCity, setSelectedCity] = useState(currentCity || 'mumbai');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedSpotId, setCopiedSpotId] = useState<string | null>(null);

  const categories = ['All', 'Specialty Coffee', 'Bistro', 'Intimate Speakeasy', 'Rooftop Lounge'];

  const filteredSpots = DATE_SPOTS.filter((spot) => {
    const matchesCity = spot.city === selectedCity;
    const matchesCat = selectedCategory === 'All' || spot.category === selectedCategory;
    return matchesCity && matchesCat;
  });

  const handleCopyDateInvite = (spotName: string, spotId: string) => {
    const invite = `“Freeing up some time this weekend. Have you been to ${spotName}? Would love to grab a cold brew there if your schedule aligns.”`;
    onCopyPunchline(invite.replace(/^“|”$/g, ''));
    setCopiedSpotId(spotId);
    setTimeout(() => setCopiedSpotId(null), 2000);
  };

  return (
    <div className="flex flex-col w-full px-8 py-6 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-[#ffb95a] uppercase tracking-widest bg-[#ffb95a]/10 px-2.5 py-0.5 rounded-full font-bold">
              Hyper-Local Curation
            </span>
            <span className="text-[#a98988] text-xs">•</span>
            <span className="text-[10px] text-[#ffb3b0] uppercase tracking-wider font-bold">
              Low-Friction Romantic Spots
            </span>
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold text-[#e1e1f0]">
            City-Smart Date Planner <span className="italic font-normal text-[#ffb95a]">&amp; Venue Intel</span>
          </h1>
          <p className="text-xs text-[#e1bebd] max-w-2xl mt-1">
            Top curated date spots in Indian metros with noise levels, insider seating hacks, and tailored invitation scripts.
          </p>
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-1.5 bg-[#191b26] p-1 rounded-full border border-[#282934]">
          {CITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCity(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCity === c.id
                  ? 'bg-[#ff5e62] text-[#64000f] shadow-sm'
                  : 'text-[#a98988] hover:text-[#e1e1f0]'
              }`}
            >
              {c.short}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-4 py-1.5 rounded-full border transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#282934] text-[#ffb95a] border-[#ffb95a]/40 font-bold'
                : 'bg-[#191b26] text-[#a98988] border-[#282934] hover:text-[#e1e1f0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Spot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpots.map((spot) => {
          const isCopied = copiedSpotId === spot.id;
          return (
            <div
              key={spot.id}
              className="bg-[#191b26] rounded-2xl p-5 border border-[#282934] shadow-lg flex flex-col justify-between hover:border-[#ffb95a]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffb95a] bg-[#ffb95a]/10 px-2.5 py-0.5 rounded-full">
                    {spot.category}
                  </span>
                  <span className="text-xs font-bold text-[#e1e1f0]">{spot.priceLevel}</span>
                </div>

                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#e1e1f0] mb-1">
                  {spot.name}
                </h3>
                <p className="text-xs text-[#ffb3b0] font-medium mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">location_on</span>
                  <span>{spot.neighborhood}</span>
                </p>

                <p className="text-xs text-[#e1bebd] mb-3 leading-relaxed">
                  <strong className="text-[#e1e1f0]">The Vibe:</strong> {spot.vibe}
                </p>

                {/* Insider tip */}
                <div className="bg-[#11131d] p-3 rounded-xl mb-3 border border-[#282934]/60">
                  <span className="text-[10px] text-[#ffb95a] font-bold uppercase tracking-wider block mb-1">
                    Insider Wingman Tip:
                  </span>
                  <p className="text-[11px] text-[#a98988] leading-relaxed">{spot.insiderTip}</p>
                </div>

                {/* Icebreaker */}
                <div className="bg-[#1d1f2a] p-3 rounded-xl mb-4 border border-[#282934]">
                  <span className="text-[10px] text-[#ffb3b6] font-bold uppercase tracking-wider block mb-1">
                    First Date Icebreaker:
                  </span>
                  <p className="text-[11px] text-[#e1bebd] italic">“{spot.conversationStarter}”</p>
                </div>
              </div>

              <button
                onClick={() => handleCopyDateInvite(spot.name, spot.id)}
                className="w-full bg-[#ff5e62] hover:brightness-110 text-[#64000f] font-bold text-xs py-2.5 rounded-full transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">forward_to_inbox</span>
                <span>{isCopied ? 'Copied Invitation Script! ✓' : 'Copy Date Proposal Line'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
