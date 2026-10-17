import { useState } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { ScreenshotDecoder } from './components/ScreenshotDecoder.tsx';
import { WingmanChat } from './components/WingmanChat.tsx';
import { ProfileReview } from './components/ProfileReview.tsx';
import { DatePlanner } from './components/DatePlanner.tsx';
import { GuruConsultation } from './components/GuruConsultation.tsx';
import { ConsentPlaybook } from './components/ConsentPlaybook.tsx';
import { WingmanEditorModal } from './components/WingmanEditorModal.tsx';
import { ExpertCallModal } from './components/ExpertCallModal.tsx';
import { RizzModal } from './components/RizzModal.tsx';
import { Footer } from './components/Footer.tsx';
import { ReplyPunchline, DecodedScenario } from './types.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('screenshot-decoder-and-reply-generator');
  const [currentCity, setCurrentCity] = useState<string>('mumbai');
  const [rizzPoints, setRizzPoints] = useState<number>(480);
  const [isExpertCallOpen, setIsExpertCallOpen] = useState<boolean>(false);
  const [isRizzModalOpen, setIsRizzModalOpen] = useState<boolean>(false);
  const [editorState, setEditorState] = useState<{
    isOpen: boolean;
    punchline: ReplyPunchline | null;
    scenario: DecodedScenario | null;
  }>({
    isOpen: false,
    punchline: null,
    scenario: null,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopyPunchline = (text: string) => {
    setRizzPoints((prev) => prev + 10);
    showToast(`Copied to Clipboard! (+10 Rizz)`);
  };

  const handleOpenEditor = (punchline: ReplyPunchline, scenario: DecodedScenario) => {
    setEditorState({
      isOpen: true,
      punchline,
      scenario,
    });
  };

  const handleSaveEditor = (_text: string) => {
    setRizzPoints((prev) => prev + 15);
    showToast(`Punchline Saved & Copied! (+15 Rizz)`);
  };

  const handleSessionComplete = (pointsAdded: number) => {
    setRizzPoints((prev) => prev + pointsAdded);
    showToast(`Guru Session Concluded (+${pointsAdded} Rizz)`);
  };

  return (
    <div className="min-h-screen bg-[#11131d] text-[#e1e1f0] flex relative font-['Plus_Jakarta_Sans']">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191b26] border border-[#ff5e62]/40 text-[#e1e1f0] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined text-[#ffb95a] text-lg">verified</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace Frame */}
      <div className="pl-72 flex flex-col min-h-screen w-full">
        <Header
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
          rizzPoints={rizzPoints}
          onOpenExpertCall={() => setIsExpertCallOpen(true)}
          onOpenRizzModal={() => setIsRizzModalOpen(true)}
        />

        <main className="w-full pt-20 flex-1 bg-[#11131d]">
          {activeTab === 'screenshot-decoder-and-reply-generator' && (
            <ScreenshotDecoder
              currentCity={currentCity}
              onOpenExpertCall={() => setIsExpertCallOpen(true)}
              onOpenEditor={handleOpenEditor}
              onCopyPunchline={handleCopyPunchline}
            />
          )}

          {activeTab === 'ai-wingman-chat' && (
            <WingmanChat
              currentCity={currentCity}
              onCopyPunchline={handleCopyPunchline}
            />
          )}

          {activeTab === 'profile-review-and-bio-polish' && (
            <ProfileReview onCopyPunchline={handleCopyPunchline} />
          )}

          {activeTab === 'city-smart-date-planner' && (
            <DatePlanner
              currentCity={currentCity}
              onCopyPunchline={handleCopyPunchline}
            />
          )}

          {activeTab === 'dating-gurus-human-experts' && (
            <GuruConsultation onOpenExpertCall={() => setIsExpertCallOpen(true)} />
          )}

          {activeTab === 'respect-and-consent-playbook' && (
            <ConsentPlaybook />
          )}
        </main>

        <Footer />
      </div>

      {/* Modals */}
      <WingmanEditorModal
        isOpen={editorState.isOpen}
        onClose={() => setEditorState({ isOpen: false, punchline: null, scenario: null })}
        initialPunchline={editorState.punchline}
        scenario={editorState.scenario}
        onSave={handleSaveEditor}
      />

      <ExpertCallModal
        isOpen={isExpertCallOpen}
        onClose={() => setIsExpertCallOpen(false)}
        onSessionComplete={handleSessionComplete}
      />

      <RizzModal
        isOpen={isRizzModalOpen}
        onClose={() => setIsRizzModalOpen(false)}
        rizzPoints={rizzPoints}
      />
    </div>
  );
}
