import React, { useState, useEffect } from 'react';
import { Flame, Calendar, Award, CheckCircle2, Trophy, Clock, Zap } from 'lucide-react';
import { PageId, TestResult } from '../types';
import { TypingEngine } from '../components/TypingEngine';
import { getTodayChallenge } from '../data/dailyChallenges';
import { getStoredDaily, saveDailyRecord } from '../utils/storage';

interface DailyChallengeViewProps {
  onNavigate: (page: PageId) => void;
  onSetCertificateData: (result: TestResult) => void;
  soundEnabled: boolean;
}

export const DailyChallengeView: React.FC<DailyChallengeViewProps> = ({
  onNavigate,
  onSetCertificateData,
  soundEnabled,
}) => {
  const today = new Date();
  const { item, dateKey, dayNumber } = getTodayChallenge(today);
  const [dailyRecord, setDailyRecord] = useState(getStoredDaily(dateKey));

  const handleTestComplete = (result: TestResult) => {
    const isUrdu = item.id === 'dc-7';
    const updated = {
      dateKey,
      title: item.title,
      quote: item.text,
      author: item.author,
      bestWpm: Math.max(dailyRecord?.bestWpm || 0, result.wpm),
      bestAccuracy: Math.max(dailyRecord?.bestAccuracy || 0, result.accuracy),
      completed: true,
    };
    saveDailyRecord(updated);
    setDailyRecord(updated);
  };

  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6 py-2">
      {/* Daily Challenge Banner */}
      <div className="bg-gradient-to-r from-[#0d1c3a] via-[#10244c] to-[#0d1c3a] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Daily Typing Sprint • Challenge #{dayNumber}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {item.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="text-amber-300 font-medium">By {item.author}</span>
            </p>
          </div>

          {/* Today's Record Badge */}
          <div className="bg-[#091226]/80 backdrop-blur border border-amber-500/20 rounded-2xl p-4 min-w-[220px] text-center space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Today's High Score
            </div>
            {dailyRecord?.completed ? (
              <div className="space-y-1">
                <div className="text-3xl font-extrabold font-mono text-amber-400">
                  {dailyRecord.bestWpm} <span className="text-sm font-sans text-slate-400">WPM</span>
                </div>
                <div className="text-xs text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {dailyRecord.bestAccuracy}% Accuracy Completed!
                </div>
              </div>
            ) : (
              <div className="py-2 text-xs text-slate-400">
                Not yet attempted today.<br />
                <span className="text-amber-300 font-semibold">Type the challenge below!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Typing Engine for Today's Quote */}
      <TypingEngine
        key={`daily-${dateKey}`}
        targetText={item.text}
        language={item.id === 'dc-7' ? 'urdu' : 'english'}
        durationSeconds={item.durationSeconds}
        mode="daily"
        onComplete={handleTestComplete}
        onNavigateToCertificate={(res) => {
          onSetCertificateData(res);
          onNavigate('certificate');
        }}
        soundEnabled={soundEnabled}
        title="Today's Timed Challenge (60 Seconds)"
        subtitle={`Theme: ${item.theme}. Type fast and cleanly to achieve a high score!`}
      />
    </div>
  );
};
