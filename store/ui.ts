import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchMoodCheckIns } from './mood';
import { fetchJournalEntries } from './journal';
import { fetchStressKit } from './stress';
import { fetchSleepEntries } from './sleep';
import { fetchAssessment, fetchProfile } from './user';

export interface AlertAction {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
}

export interface AlertState {
  visible: boolean;
  title: string;
  message: string;
  actions: AlertAction[];
}

export interface UIState {
  isLoading: boolean;
  alert: AlertState;
}

const initialState: UIState = {
  isLoading: false,
  alert: {
    visible: false,
    title: '',
    message: '',
    actions: [],
  },
};

export const fetchAll = createAsyncThunk('ui/fetchAll', async (_, { dispatch }) => {
  await Promise.all([
    dispatch(fetchMoodCheckIns()),
    dispatch(fetchJournalEntries()),
    dispatch(fetchAssessment()),
    dispatch(fetchProfile()),
    dispatch(fetchStressKit()),
    dispatch(fetchSleepEntries()),
  ]);
});

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{ title: string; message: string; actions?: AlertAction[] }>,
    ) => {
      state.alert = {
        visible: true,
        title: action.payload.title,
        message: action.payload.message,
        actions: action.payload.actions || [{ text: 'OK' }],
      };
    },
    hideAlert: (state) => {
      state.alert.visible = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAll.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAll.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { showAlert, hideAlert } = uiSlice.actions;
export default uiSlice.reducer;
