import React, { useState } from 'react';
import { 
  Keyboard, 
  Timer, 
  Flame, 
  Gamepad2, 
  Calculator, 
  Award, 
  BookOpen, 
  BarChart3, 
  Menu, 
  X, 
  Volume2, 
  VolumeX,
  Globe2,
  Languages
} from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  soundEnabled,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Keyboard className="w-4 h-4" /> },
    { id: 'test', label: 'Typing Test', icon: <Timer className="w-4 h-4" />, badge: 'Popular' },
    { id: 'practice', label: 'Practice', icon: <Keyboard className="w-4 h-4" /> },
    { id: 'english', label: 'English', icon: <Globe2 className="w-4 h-4" /> },
    { id: 'urdu', label: 'اردو Typing', icon: <Languages className="w-4 h-4" />, badge: 'RTL' },
    { id: 'daily', label: 'Daily Challenge', icon: <Flame className="w-4 h-4" /> },
    { id: 'games', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'wpm-calculator', label: 'Calculator', icon: <Calculator className="w-4 h-4" /> },
    { id: 'certificate', label: 'Certificate', icon: <Award className="w-4 h-4" /> },
    { id: 'tips', label: 'Tips & Guides', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080e1e]/90 backdrop-blur-md border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-[2px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#0b1329] rounded-[10px] flex items-center justify-center">
                <Keyboard className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                Typing <span className="text-blue-500">Tip</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                PRO
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                      isActive ? 'bg-blue-800 text-blue-100' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Secondary Quick Nav on Mid-Screens */}
          <div className="hidden md:flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('test')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                currentPage === 'test' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200'
              }`}
            >
              Test
            </button>
            <button
              onClick={() => handleNavClick('english')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                currentPage === 'english' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleNavClick('urdu')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                currentPage === 'urdu' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => handleNavClick('daily')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                currentPage === 'daily' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200'
              }`}
            >
              Daily
            </button>
          </div>

          {/* Action Tools: Sound & CTA */}
          <div className="flex items-center gap-2">
            <button
              id="sound-toggle-btn"
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute keyboard sound' : 'Enable keyboard sound'}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
              aria-label="Toggle typing sound"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            <button
              id="cta-start-test-btn"
              onClick={() => handleNavClick('test')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Timer className="w-3.5 h-3.5" />
              <span>Start Test</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a1228] border-b border-blue-900/60 px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800/80">
            <button
              onClick={() => handleNavClick('test')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-blue-600 text-white font-semibold text-xs"
            >
              <Timer className="w-4 h-4" />
              Typing Test
            </button>
            <button
              onClick={() => handleNavClick('daily')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-indigo-600/80 text-white font-semibold text-xs"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              Daily Challenge
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="text-slate-400">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 mt-3">
            <button onClick={() => handleNavClick('about')} className="hover:text-slate-200">About</button>
            <button onClick={() => handleNavClick('contact')} className="hover:text-slate-200">Contact</button>
            <button onClick={() => handleNavClick('privacy')} className="hover:text-slate-200">Privacy</button>
            <button onClick={() => handleNavClick('terms')} className="hover:text-slate-200">Terms</button>
          </div>
        </div>
      )}
    </header>
  );
};
