import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StressKit, getStressKit, saveStressKit, DEFAULT_KIT } from '@/lib/stress';

export interface StressState {
  stressKit: StressKit;
}

const initialState: StressState = {
  stressKit: DEFAULT_KIT,
};

export const fetchStressKit = createAsyncThunk('stress/fetchStressKit', async () => {
  return await getStressKit();
});

export const updateStressKit = createAsyncThunk('stress/updateStressKit', async (kit: StressKit) => {
  await saveStressKit(kit);
  return kit;
});

const stressSlice = createSlice({
  name: 'stress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStressKit.fulfilled, (state, action) => {
        state.stressKit = action.payload;
      })
      .addCase(updateStressKit.fulfilled, (state, action) => {
        state.stressKit = action.payload;
      });
  },
});

export default stressSlice.reducer;
