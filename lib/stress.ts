export type StressKit = {
  quickPhrase?: string;
  triggers: string[];
  helpfulActions: string[];
  people: string[];
  notes?: string;
};

export const DEFAULT_KIT: StressKit = {
  quickPhrase: 'This feeling will pass. I can take one small step.',
  triggers: ['Work pressure', 'Conflict', 'Uncertainty'],
  helpfulActions: ['4-7-8 breathing', 'Short walk', 'Cold water on wrists'],
  people: ['A friend', 'A family member'],
  notes: '',
};
