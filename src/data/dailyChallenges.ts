export interface DailyChallengeItem {
  id: string;
  title: string;
  author: string;
  theme: string;
  text: string;
  durationSeconds: number;
}

export const DAILY_CHALLENGES: DailyChallengeItem[] = [
  {
    id: "dc-1",
    title: "The Architecture of Discipline",
    author: "James Clear",
    theme: "Habits & Consistency",
    text: "You do not rise to the level of your goals. You fall to the level of your systems. Your goal is your desired outcome, but your system is the collection of daily habits that will actually get you there. Consistent small steps lead to extraordinary compound interest.",
    durationSeconds: 60
  },
  {
    id: "dc-2",
    title: "Flow and Focused Velocity",
    author: "Mihaly Csikszentmihalyi",
    theme: "Deep Work",
    text: "The best moments in our lives are not the passive, receptive, relaxing times. The best moments usually occur if a person's body or mind is stretched to its limits in a voluntary effort to accomplish something difficult and worthwhile.",
    durationSeconds: 60
  },
  {
    id: "dc-3",
    title: "The Power of Starting",
    author: "Marcus Aurelius",
    theme: "Stoic Wisdom",
    text: "At dawn, when you have trouble getting out of bed, tell yourself: I have to go to work as a human being. What do I have to complain of, if I am going to do what I was born for, the very things I was brought into the world to do?",
    durationSeconds: 60
  },
  {
    id: "dc-4",
    title: "The Symphony of Keystrokes",
    author: "Digital Craftsmanship",
    theme: "Speed & Fluidity",
    text: "Every key you press is a bridge between intuition and execution. When fingers dance across the keyboard with rhythmic precision, thinking and writing merge into a single continuous stream of creative output.",
    durationSeconds: 60
  },
  {
    id: "dc-5",
    title: "Mastery Through Deliberate Effort",
    author: "Robert Greene",
    theme: "Mastery",
    text: "The future belongs to those who learn more skills and combine them in creative ways. When you practice deliberately with patience and focus, what once appeared impossibly complex transforms into second nature.",
    durationSeconds: 60
  },
  {
    id: "dc-6",
    title: "Curiosity and Exploration",
    author: "Richard Feynman",
    theme: "Curiosity",
    text: "I have approximate answers and possible beliefs and different degrees of certainty about different things, but I am not absolutely sure of anything. There are many things I do not know, and it doesn't frighten me to be in a mysterious universe.",
    durationSeconds: 60
  },
  {
    id: "dc-7",
    title: "Urdu Wisdom: شاہین کا جہاں",
    author: "علامہ محمد اقبال",
    theme: "Poetic Vision",
    text: "محبت مجھے ان جوانوں سے ہے، ستاروں پہ جو ڈالتے ہیں کمند۔ نہیں تیرا نشیمن قصر سلطانی کے گنبد پر، تو شاہیں ہے بسیرا کر پہاڑوں کی چٹانوں میں۔",
    durationSeconds: 60
  }
];

export function getTodayChallenge(date: Date = new Date()): { item: DailyChallengeItem; dateKey: string; dayNumber: number } {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;
  
  // Calculate day of year
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayNumber = Math.floor(diff / oneDay);
  
  const index = Math.abs(dayNumber) % DAILY_CHALLENGES.length;
  return {
    item: DAILY_CHALLENGES[index],
    dateKey,
    dayNumber
  };
}
