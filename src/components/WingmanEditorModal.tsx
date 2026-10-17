import React, { useState } from 'react';
import { ReplyPunchline, DecodedScenario } from '../types.ts';
import { DATE_SPOTS } from '../data/mockData.ts';

interface WingmanEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPunchline: ReplyPunchline | null;
  scenario: DecodedScenario | null;
  onSave: (newText: string) => void;
}

export const WingmanEditorModal: React.FC<WingmanEditorModalProps> = ({
  isOpen,
  onClose,
  initialPunchline,
  scenario,
  onSave,
}) => {
  if (!isOpen || !initialPunchline) return null;

  const [text, setText] = useState(initialPunchline.text.replace(/^“|”$/g, ''));
  const [selectedSpot, setSelectedSpot] = useState<string>('');

  const injectSpot = (spotName: string) => {
    setSelectedSpot(spotName);
    setText((prev) => `${prev.trim()} Maybe check out ${spotName}?`);
  };

  const hasCreepTrigger = /urgent|answer me|why ignore|send photo|come over tonight|marry me/i.test(text);
  const auditScore = hasCreepTrigger ? 45 : text.length > 200 ? 78 : 98;

  const handleCopyAndClose = () => {
    navigator.clipboard.writeText(text);
    onSave(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c0e18]/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#191b26] border border-[#282934] rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5e62]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#282934]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb95a]">tune</span>
            <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#e1e1f0]">
              Wingman Reply Editor
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#282934] flex items-center justify-center text-[#e1bebd] hover:text-[#e1e1f0] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Target Message Recap */}
        {scenario && (
          <div className="bg-[#11131d] p-3 rounded-xl mb-4 border border-[#282934]/60">
            <span className="text-[10px] text-[#ffb3b0] uppercase font-bold tracking-wider block mb-1">
              Replying to {scenario.partnerName}:
            </span>
            <p className="text-xs text-[#e1bebd] italic">{scenario.targetMessage}</p>
          </div>
        )}

        {/* Textarea */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-[#e1e1f0] block mb-1.5 flex justify-between">
            <span>Your Punchline Draft:</span>
            <span className="text-[#a98988] text-[11px]">{text.length} chars</span>
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full bg-[#11131d] text-[#e1e1f0] border border-[#282934] focus:border-[#ff5e62] rounded-xl p-3.5 text-sm leading-relaxed outline-none transition-colors"
          />
        </div>

        {/* Quick Local Spot Injector */}
        <div className="mb-4">
          <label className="text-[11px] text-[#ffb95a] font-bold uppercase tracking-wider block mb-2">
            Inject Hyper-Local Metro Spot:
          </label>
          <div className="flex flex-wrap gap-2">
            {DATE_SPOTS.slice(0, 4).map((spot) => (
              <button
                key={spot.id}
                onClick={() => injectSpot(spot.name)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                  selectedSpot === spot.name
                    ? 'bg-[#ffb95a]/20 border-[#ffb95a] text-[#ffb95a]'
                    : 'bg-[#282934] border-[#373844] text-[#e1bebd] hover:text-[#e1e1f0]'
                }`}
              >
                <span className="material-symbols-outlined text-xs">pin_drop</span>
                <span>{spot.name}</span>
                <span className="text-[10px] text-[#a98988]">({spot.neighborhood})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Zero-Creep Audit Meter */}
        <div className="bg-[#11131d] p-3.5 rounded-xl mb-6 border border-[#282934] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                auditScore > 85 ? 'bg-[#ffb95a]/10 text-[#ffb95a]' : 'bg-[#ff5e62]/20 text-[#ff5e62]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {auditScore > 85 ? 'verified' : 'warning'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#e1e1f0]">
                  {auditScore > 85 ? 'Zero-Creep Standard Passed' : 'Potential Pressure Detected'}
                </span>
                <span className="text-[10px] bg-[#282934] text-[#a98988] px-1.5 py-0.2 rounded font-bold">
                  {auditScore}%
                </span>
              </div>
              <p className="text-[11px] text-[#a98988] mt-0.5">
                {auditScore > 85
                  ? 'Phrasing provides clear exit ramp with balanced conversational investment.'
                  : 'Avoid desperate timeline pressure or double-text urgency.'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#a98988] hover:text-[#e1e1f0] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleCopyAndClose}
            className="flex items-center gap-2 bg-[#ff5e62] hover:brightness-110 text-[#64000f] text-xs font-bold px-6 py-2.5 rounded-full shadow-lg transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">content_copy</span>
            <span>Copy &amp; Apply (+10 Rizz)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
