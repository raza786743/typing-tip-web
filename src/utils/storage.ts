import { DailyChallengeRecord, TestResult, UserStats } from '../types';

const STATS_KEY = 'typingtip_stats';
const LEGACY_STATS_KEY = 'typemaster_stats';
const DAILY_KEY = 'typingtip_daily';
const LEGACY_DAILY_KEY = 'typemaster_daily';
const SETTINGS_KEY = 'typingtip_settings';
const LEGACY_SETTINGS_KEY = 'typemaster_settings';

export interface UserSettings {
  soundEnabled: boolean;
  theme: 'dark' | 'light';
  userName: string;
}

const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  theme: 'dark',
  userName: '',
};

export function getStoredStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY) || localStorage.getItem(LEGACY_STATS_KEY);
    if (!raw) {
      return {
        bestWpm: 0,
        bestAccuracy: 0,
        averageWpm: 0,
        totalTests: 0,
        totalTimeSeconds: 0,
        history: [],
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      bestWpm: 0,
      bestAccuracy: 0,
      averageWpm: 0,
      totalTests: 0,
      totalTimeSeconds: 0,
      history: [],
    };
  }
}

export function saveTestResult(result: TestResult): UserStats {
  const current = getStoredStats();
  const history = [result, ...current.history].slice(0, 100); // keep last 100
  const totalTests = current.totalTests + 1;
  const bestWpm = Math.max(current.bestWpm, result.wpm);
  const bestAccuracy = Math.max(current.bestAccuracy, result.accuracy);
  const totalTimeSeconds = current.totalTimeSeconds + result.elapsedSeconds;
  
  const totalWpmSum = history.reduce((sum, item) => sum + item.wpm, 0);
  const averageWpm = Math.round(totalWpmSum / history.length);

  const updated: UserStats = {
    bestWpm,
    bestAccuracy,
    averageWpm,
    totalTests,
    totalTimeSeconds,
    history,
  };

  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save stats to localStorage', err);
  }

  return updated;
}

export function clearStoredStats(): void {
  try {
    localStorage.removeItem(STATS_KEY);
    localStorage.removeItem(LEGACY_STATS_KEY);
  } catch (err) {
    console.error('Failed to clear stats', err);
  }
}

export function getStoredDaily(dateKey: string): DailyChallengeRecord | null {
  try {
    const raw = localStorage.getItem(`${DAILY_KEY}_${dateKey}`) || localStorage.getItem(`${LEGACY_DAILY_KEY}_${dateKey}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDailyRecord(record: DailyChallengeRecord): void {
  try {
    localStorage.setItem(`${DAILY_KEY}_${record.dateKey}`, JSON.stringify(record));
  } catch (err) {
    console.error('Failed to save daily challenge', err);
  }
}

export function getStoredSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY) || localStorage.getItem(LEGACY_SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: Partial<UserSettings>): UserSettings {
  try {
    const current = getStoredSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_SETTINGS;
  }
}
