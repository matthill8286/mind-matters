import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MindfulnessState {
  totalMinutesToday: number;
  history: { date: string; minutes: number }[];
}

const initialState: MindfulnessState = {
  totalMinutesToday: 0,
  history: [],
};

const mindfulnessSlice = createSlice({
  name: 'mindfulness',
  initialState,
  reducers: {
    addMindfulMinutes: (state, action: PayloadAction<number>) => {
      const today = new Date().toISOString().split('T')[0];
      state.totalMinutesToday += action.payload;

      const existing = state.history.find((h) => h.date === today);
      if (existing) {
        existing.minutes += action.payload;
      } else {
        state.history.push({ date: today, minutes: action.payload });
      }
    },
  },
});

export const { addMindfulMinutes } = mindfulnessSlice.actions;
export default mindfulnessSlice.reducer;
