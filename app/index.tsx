import { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { authTokenVar } from '@/lib/state';
import { readSession } from '@/lib/storage';
import { useProfileStore } from '@/store/useProfileStore';

export default function Index() {
  useEffect(() => {
    (async () => {
      try {
        const onboardingSeen = await AsyncStorage.getItem('onboarding:seen:v1');
        if (!onboardingSeen) return router.replace('/(onboarding)/splash-loading');

        const session = await readSession();
        if (!session?.token) return router.replace('/(auth)/sign-in');

        // Load token into state
        authTokenVar(session.token);

        const subRaw = await AsyncStorage.getItem('auth:subscription:v1');
        const subscription = subRaw ? JSON.parse(subRaw) : null;

        if (!subscription) {
          return router.replace('/(auth)/trial-upgrade');
        }

        // Use the store to fetch the latest profile and assessment
        const { profile, assessment } = useProfileStore.getState();

        console.log('profile data:', profile);
        console.log('assessment data:', assessment);

        // Check for missing data
        if (!Object.keys(assessment).length) return router.replace('/(onboarding)/assessment');
        if (!profile) return router.replace('/(onboarding)/profile-setup');

        // selectedIssues is still in AsyncStorage for now as it doesn't have a dedicated store field yet,
        // or it might be part of the assessment.
        const selectedIssues = await AsyncStorage.getItem('selectedIssues:v1');
        if (!selectedIssues) return router.replace('/(onboarding)/suggested-categories');

        return router.replace('/(tabs)/home');
      } catch (e) {
        console.error('Routing error:', e);
        router.replace('/(auth)/sign-in');
      }
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6f6660',
      }}
    >
      <ActivityIndicator color="white" />
    </View>
  );
}
