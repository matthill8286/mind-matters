import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = 'stress:kit:v1';

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

export async function getStressKit(): Promise<StressKit> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : DEFAULT_KIT;
}

export async function saveStressKit(kit: StressKit): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(kit));
}
