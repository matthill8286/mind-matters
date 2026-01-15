import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  JournalEntry,
  listEntries,
  upsertEntry as apiUpsertEntry,
  deleteEntry as apiDeleteEntry,
} from '@/lib/journal';

export interface JournalState {
  journalEntries: JournalEntry[];
}

const initialState: JournalState = {
  journalEntries: [],
};

export const fetchJournalEntries = createAsyncThunk('journal/fetchJournalEntries', async () => {
  return await listEntries();
});

export const upsertJournalEntry = createAsyncThunk(
  'journal/upsertJournalEntry',
  async (entry: JournalEntry, { dispatch }) => {
    await apiUpsertEntry(entry);
    dispatch(fetchJournalEntries());
  },
);

export const deleteJournalEntry = createAsyncThunk(
  'journal/deleteJournalEntry',
  async (id: string, { dispatch }) => {
    await apiDeleteEntry(id);
    dispatch(fetchJournalEntries());
  },
);

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJournalEntries.fulfilled, (state, action) => {
      state.journalEntries = action.payload;
    });
  },
});

export default journalSlice.reducer;
