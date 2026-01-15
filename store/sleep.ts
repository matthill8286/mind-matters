import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SleepEntry, listSleepEntries, saveSleepEntries } from '@/lib/sleep';

export interface SleepState {
  sleepEntries: SleepEntry[];
  sleepModeStartISO: string | null;
  suggestedWakeISO: string | null;
}

const initialState: SleepState = {
  sleepEntries: [],
  sleepModeStartISO: null,
  suggestedWakeISO: null,
};

export const fetchSleepEntries = createAsyncThunk('sleep/fetchSleepEntries', async () => {
  return await listSleepEntries();
});

export const addSleepEntry = createAsyncThunk(
  'sleep/addSleepEntry',
  async (entry: SleepEntry, { dispatch, getState }) => {
    const state = getState() as { sleep: SleepState };
    const next = [entry, ...state.sleep.sleepEntries].sort((a, b) => (a.endISO < b.endISO ? 1 : -1));
    await saveSleepEntries(next);
    dispatch(fetchSleepEntries());
  },
);

const sleepSlice = createSlice({
  name: 'sleep',
  initialState,
  reducers: {
    startSleepMode: (state, action: PayloadAction<{ startISO?: string }>) => {
      state.sleepModeStartISO = action.payload.startISO ?? new Date().toISOString();
      state.suggestedWakeISO = null;
    },
    setSuggestedWake: (state, action: PayloadAction<{ wakeISO: string }>) => {
      state.suggestedWakeISO = action.payload.wakeISO;
    },
    clearSuggestedWake: (state) => {
      state.suggestedWakeISO = null;
    },
    endSleepMode: (state) => {
      state.sleepModeStartISO = null;
      state.suggestedWakeISO = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSleepEntries.fulfilled, (state, action) => {
      state.sleepEntries = action.payload;
    });
  },
});

export const {
  startSleepMode,
  setSuggestedWake,
  clearSuggestedWake,
  endSleepMode,
} = sleepSlice.actions;

export default sleepSlice.reducer;
