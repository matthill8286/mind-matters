import { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { setupWakeDetection } from '@/lib/wakeDetection';
import { setSuggestedWake, sleepModeVar } from '@/lib/apollo';

export default function Index() {
  useEffect(() => {
    (async () => {
      try {
        const onboardingSeen = await AsyncStorage.getItem('onboarding:seen:v1');
        if (!onboardingSeen) return router.replace('/(onboarding)/splash-loading');

        const authed = await AsyncStorage.getItem('auth:session:v1');
        if (!authed) return router.replace('/(auth)/sign-in');

        const subRaw = await AsyncStorage.getItem('auth:subscription:v1');
        const subscription = subRaw ? JSON.parse(subRaw) : null;

        if (!subscription) {
          return router.replace('/(auth)/trial-upgrade');
        }

        const assessment = await AsyncStorage.getItem('assessment:v1');
        const profile = await AsyncStorage.getItem('profile:v1');
        const selectedIssues = await AsyncStorage.getItem('selectedIssues:v1');

        if (!assessment) return router.replace('/(onboarding)/assessment');
        if (!profile) return router.replace('/(onboarding)/profile-setup');
        if (!selectedIssues) return router.replace('/(onboarding)/suggested-categories');

        return router.replace('/(tabs)/home');
      } catch (e) {
        console.error('Routing error:', e);
        // Fallback to home if something fails, or sign-in if no session
        router.replace('/(auth)/sign-in');
      }
    })();
  }, []);

  useEffect(() => {
    return setupWakeDetection({
      getSleepStartISO: () => sleepModeVar().sleepModeStartISO,
      setSuggestedWake: setSuggestedWake,
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  );
}
