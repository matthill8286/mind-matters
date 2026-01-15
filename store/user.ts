import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserState {
  assessment: any;
  profile: any;
  subscription: {
    type: 'trial' | 'monthly' | 'lifetime' | 'none';
    expiryDate: string | null; // ISO string
  } | null;
}

const initialState: UserState = {
  assessment: null,
  profile: null,
  subscription: null,
};

export const fetchSubscription = createAsyncThunk('user/fetchSubscription', async () => {
  const raw = await AsyncStorage.getItem('auth:subscription:v1');
  return raw ? JSON.parse(raw) : null;
});

export const setSubscription = createAsyncThunk(
  'user/setSubscription',
  async (sub: UserState['subscription']) => {
    await AsyncStorage.setItem('auth:subscription:v1', JSON.stringify(sub));
    return sub;
  },
);

export const fetchAssessment = createAsyncThunk('user/fetchAssessment', async () => {
  const raw = await AsyncStorage.getItem('assessment:v1');
  return raw ? JSON.parse(raw) : null;
});

export const fetchProfile = createAsyncThunk('user/fetchProfile', async () => {
  const raw = await AsyncStorage.getItem('profile:v1');
  return raw ? JSON.parse(raw) : null;
});

export const setAssessment = createAsyncThunk('user/setAssessment', async (assessment: any) => {
  await AsyncStorage.setItem('assessment:v1', JSON.stringify(assessment));
  return assessment;
});

export const setProfile = createAsyncThunk('user/setProfile', async (profile: any) => {
  await AsyncStorage.setItem('profile:v1', JSON.stringify(profile));
  return profile;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssessment.fulfilled, (state, action) => {
        state.assessment = action.payload;
      })
      .addCase(setAssessment.fulfilled, (state, action) => {
        state.assessment = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(setProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchSubscription.fulfilled, (state, action) => {
        state.subscription = action.payload;
      })
      .addCase(setSubscription.fulfilled, (state, action) => {
        state.subscription = action.payload;
      });
  },
});

export default userSlice.reducer;
