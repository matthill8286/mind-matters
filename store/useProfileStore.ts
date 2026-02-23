import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '@/lib/types';
import { apiFetch } from '@/lib/api';

interface ProfileState {
  profile: UserProfile | null;
  assessment: any | null;
  isLoading: boolean;
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

const PROFILE_KEY = 'profile:v1';
const ASSESSMENT_KEY = 'assessment:v1';

export const useProfileStore = create<ProfileState & ProfileActions>()(
  persist(
    (set, get) => ({
      profile: null,
      assessment: null,
      isLoading: false,
      error: null,

      fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const profile = await apiFetch<UserProfile>('/profile');
          set({ profile, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },

      saveProfile: async (profile: UserProfile) => {
        set({ isLoading: true, error: null });
        try {
          const updatedProfile = await apiFetch<UserProfile>('/profile', {
            method: 'POST',
            body: JSON.stringify(profile),
          });
          set({ profile: updatedProfile, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },

      updateProfile: async (updates: Partial<UserProfile>) => {
        set({ isLoading: true, error: null });
        try {
          const updatedProfile = await apiFetch<UserProfile>('/profile', {
            method: 'POST',
            body: JSON.stringify(updates),
          });
          set({ profile: updatedProfile, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },

      fetchAssessment: async () => {
        set({ isLoading: true, error: null });
        try {
          const assessment = await apiFetch<any>('/assessment');
          set({ assessment, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },

      saveAssessment: async (assessment: any) => {
        set({ isLoading: true, error: null });
        try {
          await apiFetch<void>('/assessment', {
            method: 'POST',
            body: JSON.stringify(assessment),
          });
          set({ assessment, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },

      clearProfile: () => set({ profile: null, assessment: null }),
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
