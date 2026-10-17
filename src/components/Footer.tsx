import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0c0e18]/80 backdrop-blur-md py-4 border-t border-[#1d1f2a]/80 mt-auto">
      <div className="w-full px-8 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#a98988] text-base">verified_user</span>
          <span className="text-xs text-[#e1bebd]">
            Zero-Creep Policy Guaranteed • 100% Consent-First Culture • Hyper-Local Indian Dating Intelligence
          </span>
        </div>
        <span className="text-xs text-[#a98988]">
          © 2025 Mr. Casanova Inc. Crafting effortless charm across India.
        </span>
      </div>
    </footer>
  );
};
