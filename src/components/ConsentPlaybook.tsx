import React, { useState } from 'react';

export const ConsentPlaybook: React.FC = () => {
  const [testLine, setTestLine] = useState('');
  const [auditResult, setAuditResult] = useState<{
    score: number;
    verdict: string;
    explanation: string;
  } | null>(null);

  const checkLine = () => {
    if (!testLine.trim()) return;
    const lower = testLine.toLowerCase();

    if (
      lower.includes('why ignore') ||
      lower.includes('busy?') ||
      lower.includes('reply please') ||
      lower.includes('send pic') ||
      lower.includes('where are you')
    ) {
      setAuditResult({
        score: 30,
        verdict: 'FAIL: Anxious Urgency & Entitlement',
        explanation:
          'Demanding replies or questioning someone’s response time creates psychological pressure. A high-value individual never chases silence.',
      });
    } else if (lower.includes('no worries') || lower.includes('if you’re around') || lower.includes('either way')) {
      setAuditResult({
        score: 98,
        verdict: 'PASS: Flawless Casanova Standard',
        explanation:
          'Contains high psychological safety and an effortless exit ramp. It demonstrates maturity, confidence, and respect for her schedule.',
      });
    } else {
      setAuditResult({
        score: 85,
        verdict: 'CALIBRATED: Healthy Pacing',
        explanation:
          'Clean tone with natural investment. Ensure you don’t follow up if left on read—allow conversational gravity to work naturally.',
      });
    }
  };

  const protocols = [
    {
      title: 'The 24-Hour Cadence Standard',
      badge: 'Zero Desperation',
      description:
        'Never send consecutive unprompted follow-ups within 24 hours. Silence is not an invitation to bargain or double-text; it is a cue to refocus on your own priorities.',
      rule: 'If left on read after a date proposal: Let 48 hours elapse, then share an unrelated cultural recommendation once. If no reply, close gracefully.',
    },
    {
      title: 'Built-in Exit Ramps in Proposals',
      badge: 'Psychological Safety',
      description:
        'Every romantic invitation must provide an effortless, gracious way out so saying “no” or “not this weekend” feels comfortable without social guilt.',
      rule: 'Always include: “If your calendar is packed, zero worries at all! Have a great week.”',
    },
    {
      title: 'Decoding the Metro "Soft No"',
      badge: 'Indian Dating Nuance',
      description:
        'In Indian cultural norms, women often avoid blunt rejections to prevent uncomfortable male defensiveness. Phrases like “A bit tied up lately” or “I’ll let you know” are soft nos.',
      rule: 'Take the soft no with complete warmth: “Totally understand! Good luck with the work sprint.” Never interrogate.',
    },
    {
      title: 'Platform Escalation Ladder',
      badge: 'Comfort & Trust',
      description:
        'Respect privacy boundaries. Never demand a personal phone number or WhatsApp before establishing 2–3 days of comfortable banter on the dating app.',
      rule: 'Standard progression: Dating App (Hinge/Bumble) ➔ Instagram DM (mutual lifestyle check) ➔ WhatsApp ➔ In-person daytime coffee.',
    },
  ];

  return (
    <div className="flex flex-col w-full px-8 py-6 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-[#ffb3b0] uppercase tracking-widest bg-[#ffb3b0]/10 px-2.5 py-0.5 rounded-full font-bold">
              The Casanova Code
            </span>
            <span className="text-[#a98988] text-xs">•</span>
            <span className="text-[10px] text-[#ffb95a] uppercase tracking-wider font-bold">
              100% Consent &amp; Respect Standard
            </span>
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold text-[#e1e1f0]">
            Consent &amp; Pacing <span className="italic font-normal text-[#ffb3b0]">Playbook</span>
          </h1>
          <p className="text-xs text-[#e1bebd] max-w-2xl mt-1">
            True charm is rooted in mutual respect, emotional maturity, and complete freedom from clingy entitlement.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#191b26] px-4 py-2 rounded-full border border-[#282934]">
          <span className="material-symbols-outlined text-[#ffb3b0] text-sm">verified</span>
          <span className="text-xs font-bold text-[#e1e1f0]">Audited by Matchmaker Ethics Board</span>
        </div>
      </div>

      {/* Interactive Line Tester */}
      <div className="bg-[#191b26] rounded-2xl p-6 border border-[#282934] shadow-xl mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[#ffb95a]">verified_user</span>
          <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#e1e1f0]">
            Test Any Text Before Hitting Send
          </h3>
        </div>
        <p className="text-xs text-[#a98988] mb-4">
          Type or paste your drafted text message to check whether it contains clingy pressure, passive aggressiveness, or respectful exit ramps.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={testLine}
            onChange={(e) => setTestLine(e.target.value)}
            placeholder="e.g., 'Freeing up Sunday if you’re around, but no worries if your weekend is packed!'"
            className="flex-1 bg-[#11131d] text-xs text-[#e1e1f0] border border-[#282934] focus:border-[#ff5e62] px-4 py-3 rounded-xl outline-none"
          />
          <button
            onClick={checkLine}
            className="bg-[#ff5e62] hover:brightness-110 text-[#64000f] text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md flex-shrink-0"
          >
            Run Casanova Audit
          </button>
        </div>

        {auditResult && (
          <div className="bg-[#11131d] p-4 rounded-xl border border-[#282934] flex items-start gap-4 animate-in fade-in">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                auditResult.score > 80
                  ? 'bg-[#ffb95a]/20 text-[#ffb95a]'
                  : 'bg-[#ff5e62]/20 text-[#ff5e62]'
              }`}
            >
              <span className="material-symbols-outlined">
                {auditResult.score > 80 ? 'check_circle' : 'warning'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#e1e1f0]">{auditResult.verdict}</span>
                <span className="text-[10px] bg-[#282934] text-[#a98988] px-2 py-0.5 rounded-full font-bold">
                  Score: {auditResult.score}/100
                </span>
              </div>
              <p className="text-xs text-[#e1bebd] leading-relaxed">{auditResult.explanation}</p>
            </div>
          </div>
        )}
      </div>

      {/* Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {protocols.map((p, idx) => (
          <div
            key={idx}
            className="bg-[#191b26] rounded-2xl p-6 border border-[#282934] shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-[#ffb95a] bg-[#ffb95a]/10 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {p.badge}
                </span>
                <span className="material-symbols-outlined text-[#a98988] text-base">shield</span>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#e1e1f0] mb-2">
                {p.title}
              </h3>
              <p className="text-xs text-[#e1bebd] mb-4 leading-relaxed">{p.description}</p>
            </div>

            <div className="bg-[#11131d] p-3.5 rounded-xl border border-[#282934]">
              <span className="text-[10px] text-[#ffb3b0] font-bold uppercase tracking-wider block mb-1">
                The Casanova Rule:
              </span>
              <p className="text-xs text-[#e1e1f0] leading-relaxed font-medium">{p.rule}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
