import React, { useState } from 'react';

interface WingmanChatProps {
  currentCity: string;
  onCopyPunchline: (text: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'wingman';
  text: string;
  punchlines?: string[];
  tacticalTip?: string;
  timestamp: string;
}

export const WingmanChat: React.FC<WingmanChatProps> = ({ currentCity: _currentCity, onCopyPunchline }) => {
  const [tone, setTone] = useState<'Bandra Banter' | 'Suave Gentleman' | 'Direct & Confident'>('Bandra Banter');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'wingman',
      text: 'Namaste Kabir! I’m your AI Wingman, calibrated for modern Indian metro dating. What situation are we resolving today? Drop a text, a screenshot dilemma, or pick a scenario below.',
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'She left me on read for 6 hours after I suggested coffee',
    'How do I pivot from talking about work to meeting in person?',
    'She said "You are definitely a Bandra boy 😂"',
    'Give me an opener for her Hinge prompt about cold brew',
  ];

  const handleSend = (textToSend?: string) => {
    const userMsg = textToSend || input;
    if (!userMsg.trim()) return;

    const newMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: userMsg,
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let punchlines: string[] = [];
      let tacticalTip = '';

      if (userMsg.toLowerCase().includes('read') || userMsg.toLowerCase().includes('hours')) {
        replyText =
          'Calm down—6 hours is standard during a busy workday in any metro. DO NOT send a follow-up interrogation like “busy?”. Instead, match her investment and respond only when you genuinely have an organic reason or let the silence reset the cadence.';
        punchlines = [
          '“Just tried that sourdough toast at Subko—honestly lived up to the hype. Hope your Tuesday is treating you kindly!”',
          '“No pressure at all, take your time! Catch you later in the week.”',
        ];
        tacticalTip = 'The 24-Hour Rule: Never double-text within 24 hours. Silence displays emotional security.';
      } else if (userMsg.toLowerCase().includes('work') || userMsg.toLowerCase().includes('pivot')) {
        replyText =
          'Work-talk is a comfort blanket. The smoothest pivot is drawing a playful contrast between corporate hustle and weekend unwinding.';
        punchlines = [
          '“We can talk deck presentations all week, but I’d much rather discover what your actual passion project is over a Sunday cold brew.”',
          '“Deal: zero client talk allowed. Just good music and espresso at Veronica’s this weekend?”',
        ];
        tacticalTip = 'Clear Frame: State a definite venue and time window so she doesn’t feel ambiguous pressure.';
      } else {
        replyText =
          `Calibrated with ${tone} mode: Here is how to maintain high status while disarming her defense with charm:`;
        punchlines = [
          '“Calling me out already? I’ll accept the accusation if you agree to let me buy the first iced latte.”',
          '“Guilty on the aesthetic, but I make up for it by knowing every quiet courtyard in town.”',
        ];
        tacticalTip = 'Maintain equal status: Never apologize for your lifestyle; tease back gently.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'wingman',
          text: replyText,
          punchlines,
          tacticalTip,
          timestamp: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full px-8 py-6 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-[#ff5e62] uppercase tracking-widest bg-[#ff5e62]/10 px-2.5 py-0.5 rounded-full font-bold">
              Autonomous Wingman AI
            </span>
            <span className="text-[#a98988] text-xs">•</span>
            <span className="text-[10px] text-[#ffb95a] uppercase tracking-wider font-bold">
              Tone &amp; Hinglish Calibrated
            </span>
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl font-semibold text-[#e1e1f0]">
            AI Wingman Chat <span className="italic font-normal text-[#ffb3b0]">&amp; Banter Simulator</span>
          </h1>
          <p className="text-xs text-[#e1bebd] mt-1">
            Practice openers, test comebacks, or ask emergency dating dilemma advice in real time.
          </p>
        </div>

        {/* Tone Selector */}
        <div className="flex items-center gap-1.5 bg-[#191b26] p-1 rounded-full border border-[#282934]">
          {(['Bandra Banter', 'Suave Gentleman', 'Direct & Confident'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                tone === t
                  ? 'bg-[#ff5e62] text-[#64000f] shadow-sm'
                  : 'text-[#a98988] hover:text-[#e1e1f0]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-xs bg-[#191b26] hover:bg-[#282934] text-[#e1bebd] hover:text-[#e1e1f0] px-3 py-1.5 rounded-full border border-[#282934] transition-colors cursor-pointer"
          >
            💡 {prompt}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-[#191b26] rounded-2xl border border-[#282934] shadow-2xl p-5 flex flex-col h-[520px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#ff5e62]/20 text-[#ff5e62] flex items-center justify-center font-bold text-xs ring-1 ring-[#ff5e62]/30 flex-shrink-0">
                    W
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-sm text-xs leading-relaxed ${
                    isUser
                      ? 'bg-[#282934] text-[#e1e1f0] border border-[#32343f] rounded-tr-xs'
                      : 'bg-[#1d1f2a] text-[#e1e1f0] border border-[#282934] rounded-tl-xs'
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Punchlines options if provided */}
                  {m.punchlines && m.punchlines.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#282934] flex flex-col gap-2">
                      <span className="text-[10px] text-[#ffb95a] uppercase font-bold tracking-wider">
                        Suggested Punchlines to Copy:
                      </span>
                      {m.punchlines.map((p, idx) => (
                        <div
                          key={idx}
                          className="bg-[#11131d] p-2.5 rounded-xl border border-[#282934] flex items-center justify-between gap-3 group"
                        >
                          <span className="font-['Playfair_Display'] italic text-[#ffdad8] text-xs">
                            {p}
                          </span>
                          <button
                            onClick={() => onCopyPunchline(p.replace(/^“|”$/g, ''))}
                            className="bg-[#282934] group-hover:bg-[#ff5e62] group-hover:text-[#64000f] text-[#e1e1f0] text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors cursor-pointer flex-shrink-0"
                          >
                            Copy
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {m.tacticalTip && (
                    <div className="mt-2 text-[11px] text-[#a98988] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-xs text-[#ffb95a]">verified</span>
                      <span>{m.tacticalTip}</span>
                    </div>
                  )}
                  <span className="block text-right text-[10px] text-[#a98988] mt-1.5">{m.timestamp}</span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-[#ff5e62]/20 text-[#ff5e62] flex items-center justify-center font-bold text-xs ring-1 ring-[#ff5e62]/30">
                W
              </div>
              <div className="bg-[#1d1f2a] p-3 rounded-2xl rounded-tl-xs text-xs text-[#a98988] flex items-center gap-1.5 border border-[#282934]">
                <span className="w-1.5 h-1.5 bg-[#ff5e62] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#ffb95a] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#ffb3b6] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-1 text-[11px]">Casanova AI calibrating Hinglish response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-3 border-t border-[#282934] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe her last message or ask for advice (e.g., 'She asked why I moved to Mumbai')..."
            className="flex-1 bg-[#11131d] text-[#e1e1f0] text-xs px-4 py-3 rounded-xl border border-[#282934] focus:border-[#ff5e62] outline-none transition-colors"
          />
          <button
            onClick={() => handleSend()}
            className="bg-[#ff5e62] hover:brightness-110 text-[#64000f] text-xs font-bold px-6 py-3 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <span>Send</span>
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
