import React, { useState, useEffect } from 'react';
import { DATING_GURUS } from '../data/mockData.ts';

interface ExpertCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionComplete?: (pointsAdded: number) => void;
}

export const ExpertCallModal: React.FC<ExpertCallModalProps> = ({
  isOpen,
  onClose,
  onSessionComplete,
}) => {
  if (!isOpen) return null;

  const guru = DATING_GURUS[0]; // Matchmaker Rohit
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [notes, setNotes] = useState<string[]>([
    'Matchmaker Rohit joined the session.',
    '“Hey Kabir, I’ve pulled up your decoded WhatsApp screenshot with Ananya.”',
    '“Notice the rolling eye emoji: she is playfully checking your real priority level.”',
  ]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    const noteTimeouts = [
      setTimeout(() => {
        setNotes((prev) => [
          ...prev,
          '“Rule 1 for Bandra/Colaba: Never give open-ended \'Whenever you\'re free\' replies. Take polite initiative.”',
        ]);
      }, 5000),
      setTimeout(() => {
        setNotes((prev) => [
          ...prev,
          '“Send the rooftop cold brew line. If she counters with cocktails, she wants an evening vibe.”',
        ]);
      }, 11000),
    ];

    return () => {
      clearInterval(timer);
      noteTimeouts.forEach(clearTimeout);
    };
  }, []);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculatedCost = Math.max(29, Math.ceil(seconds / 60) * 29);

  const handleEndCall = () => {
    if (onSessionComplete) {
      onSessionComplete(25);
    }
    onClose();
  };

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setNotes((prev) => [...prev, `You: ${userInput.trim()}`]);
    setUserInput('');
    setTimeout(() => {
      setNotes((prev) => [
        ...prev,
        '“Understood. Keep the pressure low and let her confirm Sunday before 6 PM Friday.”',
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c0e18]/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#191b26] border border-[#282934] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Glow & Header */}
        <div className="bg-gradient-to-r from-[#282934] via-[#1d1f2a] to-[#282934] p-5 border-b border-[#282934] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={guru.avatarUrl}
                alt={guru.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#ffb95a]"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#ffb95a] rounded-full ring-2 ring-[#191b26]"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#e1e1f0]">{guru.name}</h3>
                <span className="text-[10px] bg-[#ffb95a]/20 text-[#ffb95a] font-bold px-2 py-0.5 rounded-full">
                  LIVE AUDIO
                </span>
              </div>
              <p className="text-[11px] text-[#a98988]">{guru.role}</p>
            </div>
          </div>

          {/* Call Duration & Cost Meter */}
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-[#ff5e62] animate-ping"></span>
              <span className="font-mono text-sm font-bold text-[#ffb3b0]">{formatTime(seconds)}</span>
            </div>
            <span className="text-xs font-bold text-[#ffb95a]">₹{calculatedCost} total</span>
          </div>
        </div>

        {/* Audio Waveform Simulation */}
        <div className="bg-[#11131d] px-6 py-4 flex items-center justify-center gap-1.5 border-b border-[#282934]/60">
          {[16, 28, 42, 60, 32, 54, 70, 48, 30, 65, 40, 20, 50, 36, 18].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h * 0.6}px` }}
              className="w-1.5 bg-gradient-to-t from-[#ff5e62] to-[#ffb95a] rounded-full animate-pulse"
            ></div>
          ))}
        </div>

        {/* Live Tactical Notes Stream */}
        <div className="p-5 flex-1 max-h-72 overflow-y-auto flex flex-col gap-2.5 bg-[#191b26]/50">
          <div className="text-[10px] text-[#a98988] uppercase tracking-wider text-center font-bold">
            Live Wingman Audio Transcript &amp; Strategic Notes
          </div>
          {notes.map((note, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl text-xs leading-relaxed ${
                note.startsWith('You:')
                  ? 'bg-[#282934] text-[#e1e1f0] self-end max-w-[85%]'
                  : note.includes('Matchmaker Rohit joined')
                  ? 'bg-[#11131d] text-[#a98988] text-center text-[11px]'
                  : 'bg-[#1d1f2a] text-[#ffdad8] border border-[#ff5e62]/20 self-start max-w-[90%]'
              }`}
            >
              {note}
            </div>
          ))}
        </div>

        {/* Quick Question Bar */}
        <form onSubmit={handleSendPrompt} className="p-3 bg-[#11131d] border-t border-[#282934] flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask Rohit a quick question during the call..."
            className="flex-1 bg-[#191b26] border border-[#282934] focus:border-[#ffb95a] text-xs text-[#e1e1f0] px-3 py-2 rounded-xl outline-none"
          />
          <button
            type="submit"
            className="bg-[#282934] hover:bg-[#32343f] text-[#ffb95a] text-xs px-3 py-2 rounded-xl font-bold cursor-pointer transition-colors"
          >
            Send
          </button>
        </form>

        {/* Control Footer */}
        <div className="p-4 bg-[#11131d] border-t border-[#282934] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isMuted ? 'bg-[#ff5e62] text-[#64000f]' : 'bg-[#282934] text-[#e1e1f0] hover:bg-[#32343f]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{isMuted ? 'mic_off' : 'mic'}</span>
            </button>
            <span className="text-xs text-[#a98988]">
              {isMuted ? 'Muted' : 'Speaking (AI Transcribing)'}
            </span>
          </div>

          <button
            onClick={handleEndCall}
            className="flex items-center gap-2 bg-[#ff5e62] text-[#64000f] font-bold text-xs px-6 py-2.5 rounded-full hover:brightness-110 transition-all cursor-pointer shadow-lg"
          >
            <span className="material-symbols-outlined text-sm">call_end</span>
            <span>End Call &amp; Save Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
