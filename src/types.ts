export type Language = 'english' | 'urdu';

export type TestDuration = 30 | 60 | 180 | 300; // seconds

export type PracticeDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type PracticeFormat = 'words' | 'sentences' | 'paragraphs';

export interface TestResult {
  id: string;
  date: string;
  timestamp: number;
  language: Language;
  mode: 'test' | 'practice' | 'daily' | 'game';
  durationSeconds: number;
  elapsedSeconds: number;
  wpm: number;
  grossWpm: number;
  accuracy: number;
  totalKeystrokes: number;
  correctCharacters: number;
  incorrectCharacters: number;
  errorCount: number;
}

export interface UserStats {
  bestWpm: number;
  bestAccuracy: number;
  averageWpm: number;
  totalTests: number;
  totalTimeSeconds: number;
  history: TestResult[];
}

export interface DailyChallengeRecord {
  dateKey: string; // YYYY-MM-DD
  title: string;
  quote: string;
  author?: string;
  bestWpm?: number;
  bestAccuracy?: number;
  completed: boolean;
}

export interface TipArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
}

export type PageId =
  | 'home'
  | 'test'
  | 'practice'
  | 'english'
  | 'urdu'
  | 'daily'
  | 'games'
  | 'dashboard'
  | 'wpm-calculator'
  | 'certificate'
  | 'tips'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';
