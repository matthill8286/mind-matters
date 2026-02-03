export type SleepEntry = {
  id: string;
  startISO: string; // bedtime ISO
  endISO: string; // wake time ISO
  quality?: 1 | 2 | 3 | 4 | 5;
  awakenings?: number;
  notes?: string;
  createdAtISO: string;
};
