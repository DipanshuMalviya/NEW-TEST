import React, { useState, useRef } from 'react';
import { SCENARIOS } from '../data/mockData.ts';
import { DecodedScenario, ReplyPunchline } from '../types.ts';

interface ScreenshotDecoderProps {
  currentCity: string;
  onOpenExpertCall: () => void;
  onOpenEditor: (punchline: ReplyPunchline, scenario: DecodedScenario) => void;
  onCopyPunchline: (text: string) => void;
}

export const ScreenshotDecoder: React.FC<ScreenshotDecoderProps> = ({
  currentCity: _currentCity,
  onOpenExpertCall,
  onOpenEditor,
  onCopyPunchline,
}) => {
  const [activePlatform, setActivePlatform] = useState<'WhatsApp' | 'Instagram DMs' | 'Hinge / Bumble'>('WhatsApp');
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [intensity, setIntensity] = useState<'Subtle' | 'Assertive' | 'Spicy'>('Assertive');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customUploadName, setCustomUploadName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showScenarioPicker, setShowScenarioPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Active scenario derived
  const currentScenario = SCENARIOS[scenarioIndex] || SCENARIOS[0];
  const activeReplies = currentScenario.replies[intensity];

  const handleCopy = (id: string, text: string) => {
    // Strip quotes for clean pasting if needed, or pass full punchline
    const cleanText = text.replace(/^“|”$/g, '');
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    onCopyPunchline(cleanText);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const handlePlatformChange = (platform: 'WhatsApp' | 'Instagram DMs' | 'Hinge / Bumble') => {
    setActivePlatform(platform);
    const foundIdx = SCENARIOS.findIndex((s) => s.platform === platform);
    if (foundIdx !== -1) {
      setScenarioIndex(foundIdx);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      setCustomUploadName(file.name);
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Dynamic Atmospheric Glows */}
      <div className="relative w-full overflow-hidden px-8 py-6">
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-[#ff5e62]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-[#ffb95a]/10 rounded-full blur-[140px] pointer-events-none"></div>

        {/* Section Header (Editorial & Compact) */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-[#ffb95a] uppercase tracking-widest bg-[#ffb95a]/10 px-2.5 py-0.5 rounded-full font-bold">
                Vision Intelligence v2.4
              </span>
              <span className="text-[#a98988] text-xs">•</span>
              <span className="text-[10px] text-[#ffb3b0] uppercase tracking-wider font-bold">
                Hinglish &amp; Context Decoder
              </span>
            </div>
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold text-[#e1e1f0] tracking-tight">
              Screenshot Decoder <span className="italic font-normal text-[#ffb3b0]">&amp; Reply Lab</span>
            </h1>
            <p className="text-sm text-[#e1bebd] max-w-2xl mt-1.5 leading-relaxed">
              Upload any conversation snippet from WhatsApp, Instagram, Bumble, or Hinge. We parse subtext, tone
              calibration, and respectful Indian dating nuance.
            </p>
          </div>

          {/* Quick Platform Filter Switcher */}
          <div className="flex items-center gap-1 bg-[#282934] p-1 rounded-full self-start md:self-auto border border-[#373844]/60">
            {(['WhatsApp', 'Instagram DMs', 'Hinge / Bumble'] as const).map((plat) => (
              <button
                key={plat}
                onClick={() => handlePlatformChange(plat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activePlatform === plat
                    ? 'bg-[#ff5e62] text-[#64000f] shadow-md'
                    : 'text-[#e1bebd] hover:text-[#e1e1f0]'
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario preset selector strip */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 bg-[#191b26]/60 p-2.5 rounded-xl border border-[#282934]/60">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#a98988] font-medium">Sample Conversation Preset:</span>
            <div className="flex gap-1.5">
              {SCENARIOS.map((sc, i) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    setScenarioIndex(i);
                    setActivePlatform(sc.platform);
                    setCustomUploadName(null);
                  }}
                  className={`text-xs px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    scenarioIndex === i && !customUploadName
                      ? 'bg-[#ffb3b0]/20 text-[#ffb3b0] font-bold border border-[#ffb3b0]/30'
                      : 'text-[#e1bebd] hover:bg-[#282934]'
                  }`}
                >
                  {sc.partnerName} ({sc.partnerLocation})
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowScenarioPicker(!showScenarioPicker)}
            className="text-xs text-[#ffb95a] hover:text-[#ffddb6] flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
            <span>Switch Scenario ({scenarioIndex + 1}/{SCENARIOS.length})</span>
          </button>
        </div>

        {/* Main Grid: Screenshot Scanner + Cognitive Sentiment Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Column 1: Simulated Chat Capture & OCR Zone (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative bg-[#191b26] rounded-xl p-4 overflow-hidden shadow-xl border border-[#282934]">
              {/* Glass Card Header */}
              <div className="flex items-center justify-between pb-2 mb-4 bg-[#1d1f2a]/60 -mx-4 -mt-4 px-4 pt-3 border-b border-[#282934]/60">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffb95a] text-base">crop_original</span>
                  <span className="text-xs font-semibold text-[#e1e1f0]">
                    Decoded Frame {currentScenario.frameNumber}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-[#ffb95a] bg-[#ffb95a]/10 px-2.5 py-0.5 rounded-full font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95a] animate-pulse"></span> OCR Synced
                </span>
              </div>

              {/* Chat Screenshot Mockup Container */}
              <div className="relative bg-[#0c0e18] rounded-xl p-5 overflow-hidden flex flex-col justify-between min-h-[380px] border border-[#1d1f2a]">
                {/* Subtle Watermark/Grid overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ffb3b0]/5 to-[#0c0e18]/80 pointer-events-none"></div>

                {isAnalyzing && (
                  <div className="absolute inset-0 bg-[#0c0e18]/90 z-30 flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 border-2 border-[#ff5e62] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs text-[#ffb3b0] font-bold tracking-wider">
                      OCR Parsing Screenshot &amp; Decoding Subtext...
                    </span>
                  </div>
                )}

                {/* Chat Meta Top */}
                <div className="relative z-10 flex items-center justify-between text-[#e1bebd] pb-4 border-b border-[#1d1f2a]/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#282934] flex items-center justify-center text-[#ffb3b0] font-bold ring-1 ring-[#ffb3b0]/30">
                      {currentScenario.partnerAvatarLetter}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#e1e1f0] leading-none">
                        {currentScenario.partnerName}
                      </p>
                      <p className="text-[11px] text-[#a98988] leading-none mt-1">
                        {currentScenario.onlineStatus} • {currentScenario.partnerLocation}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#a98988]">{currentScenario.chatTime}</span>
                </div>

                {/* Simulated Bubble Stream */}
                <div className="relative z-10 flex flex-col gap-3.5 my-auto py-3">
                  {currentScenario.bubbles.map((bubble) => {
                    if (bubble.sender === 'user') {
                      return (
                        <div
                          key={bubble.id}
                          className="self-end max-w-[85%] bg-[#282934] text-[#e1e1f0] p-3.5 rounded-2xl rounded-tr-xs shadow-sm border border-[#32343f]"
                        >
                          <p className="text-xs leading-relaxed">{bubble.text}</p>
                          <div className="flex justify-end items-center gap-1 mt-1 text-[#a98988]">
                            <span className="text-[10px]">{bubble.time}</span>
                            <span className="material-symbols-outlined text-xs text-[#ffb3b0]">done_all</span>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={bubble.id}
                        className="relative self-start max-w-[90%] bg-[#1d1f2a] text-[#e1e1f0] p-3.5 rounded-2xl rounded-tl-xs shadow-md border border-[#282934]"
                      >
                        {/* Highlight Indicator */}
                        <div className="absolute -left-2 top-3 bottom-3 w-1 bg-gradient-to-b from-[#ffb3b0] to-[#ffb95a] rounded-full"></div>
                        <div className="flex items-center gap-1.5 mb-1 text-[#ffb3b0]">
                          <span className="material-symbols-outlined text-xs">auto_awesome</span>
                          <span className="text-[10px] uppercase tracking-wider font-bold">
                            Target Message
                          </span>
                        </div>
                        <p className="text-xs font-medium text-[#e1e1f0] leading-relaxed">
                          {bubble.text}
                        </p>
                        <div className="flex justify-end mt-1">
                          <span className="text-[10px] text-[#a98988]">{bubble.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Action Bar within frame */}
                <div className="relative z-10 pt-3 flex items-center justify-between text-[#a98988] border-t border-[#1d1f2a]/80">
                  <span className="text-xs flex items-center gap-1 text-[#e1bebd]">
                    <span className="material-symbols-outlined text-xs text-[#ffb95a]">verified</span>
                    Subtext extracted
                  </span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 text-xs text-[#ffb3b0] hover:text-[#ffdad8] transition-colors font-medium cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">upload_file</span>
                    <span>Replace Screenshot</span>
                  </button>
                </div>
              </div>

              {/* Bottom upload prompt strip */}
              <div className="mt-4 p-2 bg-[#1d1f2a] rounded-xl flex items-center justify-between border border-[#282934]">
                <div className="flex items-center gap-2 pl-1">
                  <span className="material-symbols-outlined text-[#ffb3b0] text-xl">add_photo_alternate</span>
                  <span className="text-xs text-[#e1bebd]">
                    {customUploadName ? `Active: ${customUploadName}` : 'Drop fresh screenshot or drag PNG/JPG'}
                  </span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#373844] text-[#e1e1f0] hover:bg-[#32343f] text-xs font-bold px-4 py-1.5 rounded-full transition-colors cursor-pointer border border-[#594040]/40"
                >
                  Browse
                </button>
              </div>
            </div>

            {/* Metric Pulse: Heat Index */}
            <div className="bg-[#191b26] rounded-xl p-4 flex items-center justify-between shadow-sm border border-[#282934]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffb3b0]/10 flex items-center justify-center text-[#ffb3b0]">
                  <span className="material-symbols-outlined">local_fire_department</span>
                </div>
                <div>
                  <p className="text-xs text-[#e1e1f0] font-bold">Receptivity Index</p>
                  <p className="text-[11px] text-[#e1bebd]">{currentScenario.receptivityLabel}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-1 text-right">
                <span className="font-['Playfair_Display'] text-2xl font-bold text-[#ffb3b0]">
                  {currentScenario.receptivityScore}%
                </span>
                <span className="text-[10px] text-[#a98988]">/ 100</span>
              </div>
            </div>
          </div>

          {/* Column 2: Cognitive Subtext & Intent Decoders (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Breakdown Master Card */}
            <div className="bg-[#1d1f2a] rounded-xl p-6 shadow-xl relative overflow-hidden border border-[#282934]">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-[#282934]/60">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ff5e62] text-xl">psychology</span>
                  <h2 className="text-base font-bold text-[#e1e1f0]">Subtext &amp; Sentiment Decoding</h2>
                </div>
                <span className="text-[10px] bg-[#ff5e62]/20 text-[#ffb3b0] px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                  Confidence {currentScenario.confidenceScore}%
                </span>
              </div>

              {/* Deep Intent Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                {/* Tone Detected */}
                <div className="bg-[#191b26] p-4 rounded-xl flex flex-col justify-between border border-[#282934]/60">
                  <div>
                    <div className="flex items-center gap-1 text-[#ffb95a] mb-2">
                      <span className="material-symbols-outlined text-base">sentiment_very_satisfied</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Detected Tone</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#e1e1f0] mb-1.5">{currentScenario.detectedTone}</h3>
                    <p className="text-xs text-[#e1bebd] leading-relaxed">
                      {currentScenario.toneDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 flex items-center gap-2 border-t border-[#282934]/40">
                    <span className="text-[11px] text-[#a98988]">Vibe Signature:</span>
                    <span className="text-[10px] bg-[#282934] text-[#e1e1f0] px-2 py-0.5 rounded-full font-medium">
                      {currentScenario.vibeSignature}
                    </span>
                  </div>
                </div>

                {/* Underlying Motivation / Subtext */}
                <div className="bg-[#191b26] p-4 rounded-xl flex flex-col justify-between border border-[#282934]/60">
                  <div>
                    <div className="flex items-center gap-1 text-[#ffb3b6] mb-2">
                      <span className="material-symbols-outlined text-base">visibility</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Real Subtext</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#e1e1f0] mb-1.5">{currentScenario.realSubtext}</h3>
                    <p className="text-xs text-[#e1bebd] leading-relaxed">
                      {currentScenario.subtextDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 flex items-center gap-2 border-t border-[#282934]/40">
                    <span className="text-[11px] text-[#a98988]">Action Window:</span>
                    <span className="text-[10px] bg-[#ffb3b0]/20 text-[#ffb3b0] px-2 py-0.5 rounded-full font-bold">
                      {currentScenario.actionWindow}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cultural Nuance Card: Indian Metro Dating Context */}
              <div className="bg-[#282934] p-4 rounded-xl border border-[#32343f]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c68315]/20 flex-shrink-0 flex items-center justify-center text-[#ffb95a]">
                    <span className="material-symbols-outlined text-base">temple_hindu</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#ffb95a] font-bold">
                        {currentScenario.culturalCalibrationTitle}
                      </span>
                      <span className="text-[11px] text-[#a98988]">
                        • {currentScenario.culturalCalibrationTag}
                      </span>
                    </div>
                    <p className="text-xs text-[#e1e1f0] mt-1 leading-relaxed">
                      {currentScenario.culturalCalibrationText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pacing & Sentiment Timeline Mini SVG Sparkline */}
              <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#191b26] px-4 py-2.5 rounded-xl border border-[#282934]/60">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffb3b0] text-base">trending_up</span>
                  <span className="text-xs text-[#e1e1f0] font-semibold">Conversation Momentum Curve</span>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                  {/* Inline Mini Sparkline SVG */}
                  <svg
                    className="w-36 h-8 text-[#ffb3b0]"
                    fill="none"
                    viewBox="0 0 144 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 24C24 24 36 28 60 18C84 8 96 14 120 4C132 -1 138 2 144 2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    />
                    <circle cx="140" cy="2.5" fill="currentColor" r="3" />
                  </svg>
                  <span className="text-[11px] text-[#ffb95a] font-bold uppercase tracking-wider">
                    {currentScenario.momentumPeak}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Tailored Reply Generator (Pick Your Vibe) */}
        <div className="relative z-10 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-[#ffb3b0] text-xs uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-xs">tune</span> Algorithmic Responses
              </div>
              <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-semibold text-[#e1e1f0]">
                Curated Counter-Punches
              </h2>
              <p className="text-xs text-[#e1bebd] mt-0.5">
                Tap any response to immediately copy or customize inside the wingman editor.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#a98988]">Dial Intensity:</span>
              <div className="flex items-center bg-[#1d1f2a] p-1 rounded-full border border-[#282934]">
                {(['Subtle', 'Assertive', 'Spicy'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setIntensity(lvl)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      intensity === lvl
                        ? 'bg-[#ff5e62] text-[#64000f] shadow-sm'
                        : 'text-[#a98988] hover:text-[#e1e1f0]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Three Strategic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {activeReplies.map((reply, idx) => {
              const borderGradient =
                idx === 0
                  ? 'from-[#ffb3b0] to-[#ff5e62]'
                  : idx === 1
                  ? 'from-[#ffb95a] to-[#c68315]'
                  : 'from-[#ffb3b6] to-[#a98988]';

              const badgeColor =
                idx === 0
                  ? 'text-[#ffb3b0] bg-[#ffb3b0]/10'
                  : idx === 1
                  ? 'text-[#ffb95a] bg-[#ffb95a]/10'
                  : 'text-[#ffb3b6] bg-[#ffb3b6]/10';

              const isCopied = copiedId === reply.id;

              return (
                <div
                  key={reply.id}
                  className="group relative bg-[#1d1f2a] rounded-xl p-5 flex flex-col justify-between hover:bg-[#282934] transition-all shadow-lg hover:shadow-2xl border border-[#282934]"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${borderGradient} rounded-t-xl`}
                  ></div>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full ${badgeColor}`}>
                        {reply.category}
                      </span>
                      <div className="flex items-center gap-1 bg-[#0c0e18] px-2.5 py-0.5 rounded-full border border-[#282934]">
                        <span className="material-symbols-outlined text-[#ffb95a] text-sm">
                          local_fire_department
                        </span>
                        <span className="text-xs text-[#e1e1f0] font-bold">{reply.rating}</span>
                        <span className="text-[10px] text-[#a98988]">/10</span>
                      </div>
                    </div>
                    <p className="font-['Playfair_Display'] text-base md:text-lg text-[#e1e1f0] mb-4 italic leading-snug">
                      {reply.text}
                    </p>
                    <div className="bg-[#191b26] p-3 rounded-lg mb-4 border border-[#282934]/60">
                      <p className="text-[11px] text-[#e1bebd] leading-relaxed">
                        <strong className="text-[#e1e1f0]">Tactical intent:</strong> {reply.tacticalIntent}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleCopy(reply.id, reply.text)}
                      className={`flex-1 text-xs font-bold py-2.5 px-4 rounded-full shadow-md transition-all text-center cursor-pointer ${
                        idx === 0
                          ? 'bg-gradient-to-r from-[#ff5e62] to-[#ffb95a] text-[#680010] hover:brightness-110'
                          : 'bg-[#32343f] hover:bg-[#373844] text-[#e1e1f0]'
                      }`}
                    >
                      {isCopied ? 'Copied to Clipboard! ✓' : 'Copy Punchline'}
                    </button>
                    <button
                      onClick={() => onOpenEditor(reply, currentScenario)}
                      title="Customize punchline with local spots and consent audit"
                      className="w-10 h-10 rounded-full bg-[#32343f] flex items-center justify-center text-[#e1e1f0] hover:text-[#ffb3b0] hover:bg-[#373844] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">edit</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Red Flag & Respect Checker Bento Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
          {/* Verification Badge Column (1 col) */}
          <div className="bg-[#0c0e18] rounded-xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden border border-[#282934]">
            <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
              <span className="material-symbols-outlined text-8xl text-[#ffb3b0]">verified_user</span>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffb3b0]/10 text-[#ffb3b0] mb-4">
                <span className="material-symbols-outlined text-sm font-bold">verified</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Casanova Audit Pass</span>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#e1e1f0] mb-2">
                Zero-Creep Guarantee
              </h3>
              <p className="text-xs text-[#e1bebd] leading-relaxed">
                Every suggested response is strictly filtered against clingy urgency, aggressive entitlement, and
                oversexualized undertones.
              </p>
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-2 text-[#a98988] text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#ffb95a]"></span> 100% Consent-Aligned Pacing Standard
              </div>
            </div>
          </div>

          {/* Checker Pillars (2 cols) */}
          <div className="lg:col-span-2 bg-[#1d1f2a] rounded-xl p-6 shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-4 border border-[#282934]">
            {/* Pillar 1 */}
            <div className="flex flex-col gap-1.5 bg-[#191b26] p-4 rounded-xl border border-[#282934]/60">
              <div className="w-8 h-8 rounded-full bg-[#1d1f2a] flex items-center justify-center text-[#ffb3b0] mb-1">
                <span className="material-symbols-outlined text-base">mark_chat_read</span>
              </div>
              <h4 className="text-xs text-[#e1e1f0] font-bold">No Double-Text Pressure</h4>
              <p className="text-[11px] text-[#e1bebd] leading-relaxed">
                Zero desperation. Phrases maintain self-respect and eliminate anxious follow-up triggers.
              </p>
              <span className="mt-auto text-[10px] text-[#ffb95a] font-semibold flex items-center gap-1 pt-2">
                <span className="material-symbols-outlined text-xs">check_circle</span> Calibrated
              </span>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col gap-1.5 bg-[#191b26] p-4 rounded-xl border border-[#282934]/60">
              <div className="w-8 h-8 rounded-full bg-[#1d1f2a] flex items-center justify-center text-[#ffb95a] mb-1">
                <span className="material-symbols-outlined text-base">speed</span>
              </div>
              <h4 className="text-xs text-[#e1e1f0] font-bold">Organic Pacing Meter</h4>
              <p className="text-[11px] text-[#e1bebd] leading-relaxed">
                Mirrors conversational investment without appearing artificially aloof or suffocating.
              </p>
              <span className="mt-auto text-[10px] text-[#ffb95a] font-semibold flex items-center gap-1 pt-2">
                <span className="material-symbols-outlined text-xs">check_circle</span> In Cadence
              </span>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col gap-1.5 bg-[#191b26] p-4 rounded-xl border border-[#282934]/60">
              <div className="w-8 h-8 rounded-full bg-[#1d1f2a] flex items-center justify-center text-[#ffb3b6] mb-1">
                <span className="material-symbols-outlined text-base">meeting_room</span>
              </div>
              <h4 className="text-xs text-[#e1e1f0] font-bold">Clear Exit Ramps</h4>
              <p className="text-[11px] text-[#e1bebd] leading-relaxed">
                Invitations afford full psychological safety, making it comfortable for her to say no or reschedule.
              </p>
              <span className="mt-auto text-[10px] text-[#ffb95a] font-semibold flex items-center gap-1 pt-2">
                <span className="material-symbols-outlined text-xs">check_circle</span> Zero Friction
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Astrotalk-style Dating Guru Escalation Card */}
        <div className="relative z-10 bg-gradient-to-r from-[#282934] via-[#1d1f2a] to-[#282934] rounded-xl p-6 shadow-2xl overflow-hidden border border-[#32343f]">
          {/* Glow Accent */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#ffb95a]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left: Headshot & Guru Info */}
            <div className="flex items-center gap-5">
              <div className="relative flex-shrink-0">
                <img
                  className="w-20 h-20 rounded-full object-cover shadow-lg ring-2 ring-[#ffb95a]/30"
                  alt="Portrait of Guru Rohit"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzcnwf5Gmb2yNrMSoGUbrg0QowRjR8FShc-Lxze1zUVMjlugaQBb__DrJT6Rvs9QxTUulTaf7ykEC3Ch9dzlf644WlL4gT4yHL56_hTQhm2bZixlIGZzg7c5rXXcKyHlSD4bvbBxFXM0WfM7julab3o8B4uaC77KDu1bDTHqQA05t1WwUepG-pcLueWhsDmn66GRKIOU2i5y4sNL-P9SOmu8XAwWjGJ8z2GkFNezqg3OMsghJkg10"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#ffb95a] rounded-full ring-4 ring-[#282934]"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] bg-[#ffb95a]/20 text-[#ffb95a] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Elite Matchmaker • Live
                  </span>
                  <span className="text-[11px] text-[#a98988]">• 4.97 ★ (2,410+ consults)</span>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#e1e1f0]">
                  Stuck in a talking stage for 3+ months?
                </h3>
                <p className="text-xs text-[#e1bebd] max-w-xl mt-0.5 leading-relaxed">
                  Break the infinite text loop. Get an uncompromising personal game plan or mutual closure directly
                  with Matchmaker Rohit.
                </p>
              </div>
            </div>

            {/* Right: Realtime Pricing & Consultation Trigger */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="text-center sm:text-right">
                <span className="text-[10px] text-[#a98988] block uppercase tracking-wider">Introductory Rate</span>
                <span className="text-xl text-[#ffb95a] font-bold">
                  ₹29 <span className="text-xs font-normal text-[#e1bebd]">/ min</span>
                </span>
              </div>
              <button
                onClick={onOpenExpertCall}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#ff5e62] text-[#64000f] hover:brightness-110 text-xs font-bold px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span>Consult Guru Rohit Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
