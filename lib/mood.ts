export type MoodCheckIn = {
  id: string;
  createdAt: string; // ISO
  mood: 'Great' | 'Good' | 'Okay' | 'Low' | 'Bad';
  energy: 1 | 2 | 3 | 4 | 5;
  stress: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  note?: string;
  tags?: string[];
};
