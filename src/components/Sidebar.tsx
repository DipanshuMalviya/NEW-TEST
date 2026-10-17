import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMobileMenu?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    {
      id: 'ai-wingman-chat',
      label: 'AI Wingman Chat',
      icon: 'forum',
      colorClass: 'text-primary',
    },
    {
      id: 'profile-review-and-bio-polish',
      label: 'Profile Review & Bio Polish',
      icon: 'photo_camera',
      colorClass: 'text-secondary',
    },
    {
      id: 'screenshot-decoder-and-reply-generator',
      label: 'Screenshot Decoder',
      icon: 'document_scanner',
      colorClass: 'text-tertiary',
    },
    {
      id: 'city-smart-date-planner',
      label: 'City-Smart Date Planner',
      icon: 'local_bar',
      colorClass: 'text-secondary-fixed-dim',
    },
    {
      id: 'dating-gurus-human-experts',
      label: '1-on-1 Dating Gurus',
      icon: 'auto_awesome',
      colorClass: 'text-primary-container',
      isLive: true,
    },
    {
      id: 'respect-and-consent-playbook',
      label: 'Consent Playbook',
      icon: 'verified_user',
      colorClass: 'text-outline',
    },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-72 bg-[#0c0e18]/95 backdrop-blur-2xl z-50 flex flex-col justify-between border-r border-[#1d1f2a]/60 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center gap-3 bg-[#191b26]/40 border-b border-[#1d1f2a]/40">
          <img
            alt="Mr. Casanova Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmzqqUlfcJKxbdEHZTx_wvo8LssKgDewstAa0ElKU60wmGG9grebFGwr9Qi4SNzySapWj-LLBi_O542H2iDGay2-56lqUw17piiqp8pbBaGN-XvKPD8K9kB4UYgwB1dllbCim8nwkYnK8QHk_Q7KNkQiFFctV3zlU5B1a-MfAvE8RqcqeDEFCvTI5FXSgT0jfljKmtScwfHGWXcVSjclCEPw9uxsnUjr4mtNTAzuGfiY-GWJtCv78"
          />
          <div className="flex flex-col">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#ffb3b0] tracking-tight leading-none">
              Mr. Casanova
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#ffb95a] font-bold tracking-widest uppercase mt-0.5">
              Your Cultured Wingman
            </span>
          </div>
        </div>

        {/* Section Tag */}
        <div className="px-6 mt-4 mb-2">
          <span className="text-[10px] text-[#a98988] uppercase tracking-wider font-semibold">
            Intelligence Suites
          </span>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ff5e62] text-[#64000f] font-bold shadow-lg shadow-[#ff5e62]/20'
                    : 'text-[#e1bebd] hover:bg-[#1d1f2a] hover:text-[#e1e1f0]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl ${
                    isActive ? 'text-[#64000f]' : item.colorClass
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-sm font-medium tracking-tight flex-1">
                  {item.label}
                </span>
                {item.isLive && (
                  <span
                    className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-[#64000f]/20 text-[#64000f]'
                        : 'bg-[#ffb3b0]/20 text-[#ffb3b0]'
                    }`}
                  >
                    LIVE
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Casanova Code Footer Card */}
      <div className="p-4 m-3 rounded-xl bg-[#191b26]/70 border border-[#282934]/60 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#ffb3b0] text-base">security</span>
          <span className="text-xs text-[#ffb3b0] font-bold uppercase tracking-wider">
            Casanova Code
          </span>
        </div>
        <p className="text-xs text-[#a98988] leading-relaxed">
          Culturally calibrated wit. 100% consent-first &amp; zero-creep verified protocols.
        </p>
      </div>
    </aside>
  );
};
