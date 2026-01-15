import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  MoodCheckIn,
  listMoodCheckIns,
  addMoodCheckIn as apiAddMoodCheckIn,
  deleteMoodCheckIn as apiDeleteMoodCheckIn,
} from '@/lib/mood';

export interface MoodState {
  moodCheckIns: MoodCheckIn[];
}

const initialState: MoodState = {
  moodCheckIns: [],
};

export const fetchMoodCheckIns = createAsyncThunk('mood/fetchMoodCheckIns', async () => {
  return await listMoodCheckIns();
});

export const addMoodCheckIn = createAsyncThunk(
  'mood/addMoodCheckIn',
  async (item: MoodCheckIn, { dispatch }) => {
    await apiAddMoodCheckIn(item);
    dispatch(fetchMoodCheckIns());
  },
);

export const deleteMoodCheckIn = createAsyncThunk(
  'mood/deleteMoodCheckIn',
  async (id: string, { dispatch }) => {
    await apiDeleteMoodCheckIn(id);
    dispatch(fetchMoodCheckIns());
  },
);

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMoodCheckIns.fulfilled, (state, action) => {
      state.moodCheckIns = action.payload;
    });
  },
});

export default moodSlice.reducer;
