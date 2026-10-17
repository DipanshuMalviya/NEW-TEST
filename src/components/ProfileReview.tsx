import React, { useState } from 'react';

interface ProfileReviewProps {
  onCopyPunchline: (text: string) => void;
}

export const ProfileReview: React.FC<ProfileReviewProps> = ({ onCopyPunchline }) => {
  const [selectedApp, setSelectedApp] = useState<'Hinge' | 'Bumble' | 'Tinder'>('Hinge');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const promptRewrites = [
    {
      prompt: 'Together we could...',
      cliche: '“Go on long drives, watch Netflix, eat street food, and travel the world 🚗✈️”',
      flaw: 'Zero specificity. Every 3rd profile on Bumble in Bandra or South Delhi has this exact line.',
      polished:
        '“Debate whether Subko or Veronica’s has the superior espresso, then spontaneously test whether your favorite rooftop playlist holds up in real life.”',
      vibe: 'High-intent • Effortless local lifestyle anchor',
      rating: 9.7,
    },
    {
      prompt: 'Unpopular opinion...',
      cliche: '“Pineapple belongs on pizza and friends is overrated haha 🍕”',
      flaw: 'Overplayed internet debates from 2017. Signals lack of original observational humor.',
      polished:
        '“People who schedule Saturday morning calls are psychopaths, and third-wave manual pour-overs genuinely taste better than office machine coffee.”',
      vibe: 'Relatable workplace banter • Confident taste',
      rating: 9.4,
    },
    {
      prompt: 'A quick way to my heart...',
      cliche: '“Good vibes, loyalty, homemade butter chicken, and making me laugh 😂❤️”',
      flaw: 'Reads like an arranged marriage matrimonial checklist disguised as a modern prompt.',
      polished:
        '“Surprising me with tickets to a quiet indie jazz gig or showing me an underrated bookstore where people don’t click Instagram reels.”',
      vibe: 'Romantic • Cultured • Non-commercial taste',
      rating: 9.5,
    },
  ];

  const handleCopy = (idx: number, text: string) => {
    onCopyPunchline(text.replace(/^“|”$/g, ''));
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="flex flex-col w-full px-8 py-6 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-[#ffb95a] uppercase tracking-widest bg-[#ffb95a]/10 px-2.5 py-0.5 rounded-full font-bold">
              Algorithm Optimization
            </span>
            <span className="text-[#a98988] text-xs">•</span>
            <span className="text-[10px] text-[#ffb3b0] uppercase tracking-wider font-bold">
              Bio &amp; Photo Audit
            </span>
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold text-[#e1e1f0]">
            Profile Review <span className="italic font-normal text-[#ffb95a]">&amp; Bio Polish</span>
          </h1>
          <p className="text-xs text-[#e1bebd] max-w-2xl mt-1">
            Replace boring clichés with punchy, high-receptivity hooks designed for Tier-1 metro matchmaking.
          </p>
        </div>

        {/* App Switcher */}
        <div className="flex items-center gap-1.5 bg-[#191b26] p-1 rounded-full border border-[#282934]">
          {(['Hinge', 'Bumble', 'Tinder'] as const).map((app) => (
            <button
              key={app}
              onClick={() => setSelectedApp(app)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedApp === app
                  ? 'bg-[#ffb95a] text-[#2a1800] shadow-sm'
                  : 'text-[#a98988] hover:text-[#e1e1f0]'
              }`}
            >
              {app}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Photo Audit Scorecard + Prompt Transformations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Photo Audit Scorecard */}
        <div className="lg:col-span-4 bg-[#191b26] rounded-2xl p-6 border border-[#282934] shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#282934]">
              <span className="text-xs font-bold text-[#e1e1f0]">Photo Selection Score</span>
              <span className="text-[10px] bg-[#ffb95a]/20 text-[#ffb95a] px-2 py-0.5 rounded-full font-bold">
                Casanova 86%
              </span>
            </div>

            <div className="relative mb-5 flex justify-center">
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_XbeMxPRze0RsZkLmpnJFtuz-SCt6mWdE50qGC_YSsM1MQBb0WlNaeLmTY2pY74dn0wEk6Rqey_LBuH76Yj6dPcsPxXHA7AvJuYVxmIP4qfrVR0aq3P7lpFx-RL1oBljhDgnI46qLAS7s2_xfIurZ4AjqF2fMnFKltbhoVbgkwu6OiMDqm9eR_BTr4tnOKyVIu-O5qGBUcuhnZbP9a5qPyZp0uSuT9AKm64_jjSBDkU6esg0Hv68"
                  alt="Profile primary photo"
                  className="w-32 h-32 rounded-2xl object-cover ring-4 ring-[#282934] shadow-xl"
                />
                <span className="absolute -bottom-2 right-2 bg-[#ffb95a] text-[#2a1800] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Slot #1: Optimal
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-xs">
                <span className="material-symbols-outlined text-xs text-[#ffb95a] mt-0.5">check_circle</span>
                <div>
                  <p className="font-bold text-[#e1e1f0]">Unobstructed Face &amp; Warm Eye Contact</p>
                  <p className="text-[11px] text-[#a98988]">No dark sunglasses indoors or car selfies.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs">
                <span className="material-symbols-outlined text-xs text-[#ffb95a] mt-0.5">check_circle</span>
                <div>
                  <p className="font-bold text-[#e1e1f0]">Natural Ambient Lighting</p>
                  <p className="text-[11px] text-[#a98988]">Golden hour lighting adds organic warmth.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs">
                <span className="material-symbols-outlined text-xs text-[#ff5e62] mt-0.5">cancel</span>
                <div>
                  <p className="font-bold text-[#e1e1f0]">Avoid Generic Gym Mirror Shot</p>
                  <p className="text-[11px] text-[#a98988]">Replace with lifestyle hobby or outdoor sport.</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert('Photo analyzer active: Your current primary slot has 91% conversion efficiency.')}
            className="w-full mt-6 bg-[#282934] hover:bg-[#32343f] text-[#ffb95a] text-xs font-bold py-2.5 rounded-full transition-colors cursor-pointer border border-[#ffb95a]/30"
          >
            Upload Photos For Instant Audit
          </button>
        </div>

        {/* Polished Prompts Grid */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#e1e1f0] uppercase tracking-wider">
              High-Conversion Prompt Overhauls ({selectedApp})
            </h2>
            <span className="text-xs text-[#a98988]">3 Ready-to-Copy Upgrades</span>
          </div>

          {promptRewrites.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#191b26] rounded-xl p-5 border border-[#282934] shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#ffb3b0] bg-[#ffb3b0]/10 px-2.5 py-1 rounded-full">
                    {item.prompt}
                  </span>
                  <div className="flex items-center gap-1 bg-[#0c0e18] px-2.5 py-0.5 rounded-full border border-[#282934]">
                    <span className="material-symbols-outlined text-[#ffb95a] text-xs">local_fire_department</span>
                    <span className="text-xs font-bold text-[#e1e1f0]">{item.rating}</span>
                  </div>
                </div>

                {/* Before Cliché */}
                <div className="bg-[#11131d] p-3 rounded-xl mb-3 border border-[#282934]/60">
                  <div className="flex items-center justify-between text-[10px] text-[#ff5e62] font-bold uppercase mb-1">
                    <span>Common Cliché (Before)</span>
                    <span className="material-symbols-outlined text-xs">thumb_down</span>
                  </div>
                  <p className="text-xs text-[#a98988] line-through italic">{item.cliche}</p>
                  <p className="text-[10px] text-[#ff5e62]/80 mt-1">⚠️ {item.flaw}</p>
                </div>

                {/* After Polish */}
                <div className="bg-[#1d1f2a] p-4 rounded-xl border border-[#ffb95a]/30 mb-4">
                  <div className="flex items-center justify-between text-[10px] text-[#ffb95a] font-bold uppercase mb-1">
                    <span>Cultured Casanova Polish (After)</span>
                    <span className="material-symbols-outlined text-xs text-[#ffb95a]">verified</span>
                  </div>
                  <p className="font-['Playfair_Display'] italic text-sm text-[#e1e1f0] leading-relaxed">
                    {item.polished}
                  </p>
                  <span className="inline-block text-[10px] text-[#ffb95a] mt-2 font-medium">
                    ✨ {item.vibe}
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleCopy(idx, item.polished)}
                  className="bg-[#ffb95a] hover:brightness-110 text-[#2a1800] font-bold text-xs px-5 py-2 rounded-full transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                  <span>{copiedIdx === idx ? 'Copied Prompt! ✓' : 'Copy Polished Prompt'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
