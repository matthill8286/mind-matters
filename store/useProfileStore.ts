import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '@/lib/types';
import { apiFetch } from '@/lib/api';

import { createLoadingSlice, LoadingState, SliceCreator } from '@/lib/zustand-helpers';

interface ProfileState {
  profile: UserProfile | null;
  assessment: any | null;
  error: string | null;
}

interface ProfileActions {
  fetchProfile: () => Promise<void>;
  saveProfile: (profile: UserProfile) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  fetchAssessment: () => Promise<void>;
  saveAssessment: (assessment: any) => Promise<void>;
  clearProfile: () => void;
}

type ProfileStore = ProfileState & ProfileActions & LoadingState;

const createProfileSlice: SliceCreator<ProfileState & ProfileActions, LoadingState> = (
  set,
  get,
  api,
) => ({
  profile: null,
  assessment: null,
  error: null,

  fetchProfile: async () => {
    const { startLoading, stopLoading } = api.getState();
    startLoading('fetchProfile');
    set({ error: null });
    try {
      const profile = await apiFetch<UserProfile>('/profile');
      set({ profile });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      stopLoading('fetchProfile');
    }
  },

  saveProfile: async (profile: UserProfile) => {
    const { startLoading, stopLoading } = api.getState();
    startLoading('saveProfile');
    set({ error: null });
    try {
      const updatedProfile = await apiFetch<UserProfile>('/profile', {
        method: 'POST',
        body: JSON.stringify(profile),
      });
      set({ profile: updatedProfile });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      stopLoading('saveProfile');
    }
  },

  updateProfile: async (updates: Partial<UserProfile>) => {
    const { startLoading, stopLoading } = api.getState();
    startLoading('updateProfile');
    set({ error: null });
    try {
      const updatedProfile = await apiFetch<UserProfile>('/profile', {
        method: 'POST',
        body: JSON.stringify(updates),
      });
      set({ profile: updatedProfile });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      stopLoading('updateProfile');
    }
  },

  fetchAssessment: async () => {
    const { startLoading, stopLoading } = api.getState();
    startLoading('fetchAssessment');
    set({ error: null });
    try {
      const assessment = await apiFetch<any>('/assessment');
      set({ assessment });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      stopLoading('fetchAssessment');
    }
  },

  saveAssessment: async (assessment: any) => {
    const { startLoading, stopLoading } = api.getState();
    startLoading('saveAssessment');
    set({ error: null });
    try {
      await apiFetch<void>('/assessment', {
        method: 'POST',
        body: JSON.stringify(assessment),
      });
      set({ assessment });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      stopLoading('saveAssessment');
    }
  },

  clearProfile: () => set({ profile: null, assessment: null }),
});

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get, api) => ({
      ...createProfileSlice(set, get, api),
      ...createLoadingSlice(set, get, api),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        profile: state.profile,
        assessment: state.assessment,
      }),
    },
  ),
);
