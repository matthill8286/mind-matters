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
