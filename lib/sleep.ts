import AsyncStorage from "@react-native-async-storage/async-storage";

export type SleepEntry = {
  id: string;
  startISO: string; // bedtime ISO
  endISO: string; // wake time ISO
  quality?: 1 | 2 | 3 | 4 | 5;
  awakenings?: number;
  notes?: string;
  createdAtISO: string;
};

const KEY = "sleep:entries:v1";

export async function listSleepEntries(): Promise<SleepEntry[]> {
  const raw = await AsyncStorage.getItem(KEY);
  const entries = raw ? (JSON.parse(raw) as SleepEntry[]) : [];
  return entries.sort((a, b) => (a.endISO < b.endISO ? 1 : -1));
}

export async function saveSleepEntries(entries: SleepEntry[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(entries));
}
