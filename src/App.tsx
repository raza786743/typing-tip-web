import React, { useState, useEffect } from 'react';
import { PageId, TestResult, UserStats } from './types';
import { getStoredSettings, getStoredStats, saveStoredSettings } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Views
import { HomeView } from './views/HomeView';
import { TypingTestView } from './views/TypingTestView';
import { PracticeView } from './views/PracticeView';
import { EnglishTypingView } from './views/EnglishTypingView';
import { UrduTypingView } from './views/UrduTypingView';
import { DailyChallengeView } from './views/DailyChallengeView';
import { TypingGamesView } from './views/TypingGamesView';
import { DashboardView } from './views/DashboardView';
import { WpmCalculatorView } from './views/WpmCalculatorView';
import { CertificateView } from './views/CertificateView';
import { TypingTipsView } from './views/TypingTipsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { PrivacyView } from './views/PrivacyView';
import { TermsView } from './views/TermsView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const settings = getStoredSettings();
    return settings.soundEnabled;
  });
  const [stats, setStats] = useState<UserStats>(() => getStoredStats());
  const [certificateData, setCertificateData] = useState<TestResult | null>(null);

  // Sync with window.location.hash for shareable URLs and Cloudflare Pages SPA navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home', 'test', 'practice', 'english', 'urdu',
        'daily', 'games', 'dashboard', 'wpm-calculator',
        'certificate', 'tips', 'about', 'contact', 'privacy', 'terms'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const updated = !soundEnabled;
    setSoundEnabled(updated);
    saveStoredSettings({ soundEnabled: updated });
  };

  const refreshStats = () => {
    setStats(getStoredStats());
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070d1d] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {currentPage === 'home' && (
          <HomeView onNavigate={handleNavigate} stats={stats} />
        )}

        {currentPage === 'test' && (
          <TypingTestView
            onNavigate={handleNavigate}
            onSetCertificateData={setCertificateData}
            soundEnabled={soundEnabled}
          />
        )}

        {currentPage === 'practice' && (
          <PracticeView
            onNavigate={handleNavigate}
            soundEnabled={soundEnabled}
          />
        )}

        {currentPage === 'english' && (
          <EnglishTypingView
            onNavigate={handleNavigate}
            onSetCertificateData={setCertificateData}
            soundEnabled={soundEnabled}
          />
        )}

        {currentPage === 'urdu' && (
          <UrduTypingView
            onNavigate={handleNavigate}
            onSetCertificateData={setCertificateData}
            soundEnabled={soundEnabled}
          />
        )}

        {currentPage === 'daily' && (
          <DailyChallengeView
            onNavigate={handleNavigate}
            onSetCertificateData={setCertificateData}
            soundEnabled={soundEnabled}
          />
        )}

        {currentPage === 'games' && (
          <TypingGamesView
            onNavigate={handleNavigate}
            onSetCertificateData={setCertificateData}
            soundEnabled={soundEnabled}
          />
        )}

        {currentPage === 'wpm-calculator' && (
          <WpmCalculatorView onNavigate={handleNavigate} />
        )}

        {currentPage === 'certificate' && (
          <CertificateView
            initialResult={certificateData}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'tips' && (
          <TypingTipsView onNavigate={handleNavigate} />
        )}

        {currentPage === 'dashboard' && (
          <DashboardView
            stats={stats}
            onRefreshStats={refreshStats}
            onNavigate={handleNavigate}
            onSetCertificateData={setCertificateData}
          />
        )}

        {currentPage === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactView onNavigate={handleNavigate} />
        )}

        {currentPage === 'privacy' && (
          <PrivacyView onNavigate={handleNavigate} />
        )}

        {currentPage === 'terms' && (
          <TermsView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
