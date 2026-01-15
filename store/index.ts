import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat';
import moodReducer from './mood';
import journalReducer from './journal';
import stressReducer from './stress';
import sleepReducer from './sleep';
import mindfulnessReducer from './mindfulness';
import userReducer from './user';
import uiReducer from './ui';

export * from './mood';
export * from './journal';
export * from './stress';
export * from './sleep';
export * from './mindfulness';
export * from './user';
export * from './ui';

export const store = configureStore({
  reducer: {
    mood: moodReducer,
    journal: journalReducer,
    stress: stressReducer,
    sleep: sleepReducer,
    mindfulness: mindfulnessReducer,
    user: userReducer,
    ui: uiReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state and actions because they contain functions (onPress)
        ignoredActions: ['ui/showAlert'],
        ignoredPaths: ['ui.alert.actions'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
