export type MoodCheckIn = {
  id: string;
  createdAt: string; // ISO
  mood: 'Great' | 'Good' | 'Okay' | 'Low' | 'Bad';
  energy: 1 | 2 | 3 | 4 | 5;
  stress: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  note?: string;
  tags?: string[];
};

export type JournalEntry = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  mood?: string | null;
  tags?: string[];
  promptId?: string | null;
};

export type StressKit = {
  quickPhrase?: string;
  triggers: string[];
  helpfulActions: string[];
  people: string[];
  notes?: string;
  level?: number;
  lastCheckIn?: string;
};

export const DEFAULT_KIT: StressKit = {
  quickPhrase: 'This feeling will pass. I can take one small step.',
  triggers: ['Work pressure', 'Conflict', 'Uncertainty'],
  helpfulActions: ['4-7-8 breathing', 'Short walk', 'Cold water on wrists'],
  people: ['A friend', 'A family member'],
  notes: '',
  level: 5,
};

export type StressCompletion = {
  exerciseId: string;
  title: string;
  date: string;
};

export type MindfulEntry = {
  id: string;
  seconds: number; // duration in seconds
  dateISO: string;
  note?: string;
};

export type SleepEntry = {
  id: string;
  startISO: string; // bedtime ISO
  endISO: string; // wake time ISO
  quality?: 1 | 2 | 3 | 4 | 5;
  awakenings?: number;
  notes?: string;
  createdAtISO: string;
};

export type UserProfile = {
  name?: string | null;
  intention?: string | null;
  routine?: string | null;
  selectedIssues?: string[];
  updatedAt: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  text?: string;
  createdAt: string;
};
