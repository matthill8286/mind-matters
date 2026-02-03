import { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { setupWakeDetection } from '@/lib/wakeDetection';
import { setSuggestedWake, sleepModeVar, authTokenVar } from '@/lib/state';
import { useGraphQLQuery } from '@/lib/graphql';
import { GET_ALL_DATA } from '@/gql/operations';
import { GetAllDataQuery } from '@/gql/generated';

export default function Index() {
  useGraphQLQuery<GetAllDataQuery>(['GetAllData'], GET_ALL_DATA, {
    enabled: false, // We'll trigger it manually if needed or just use the hook
  });

  useEffect(() => {
    (async () => {
      try {
        const onboardingSeen = await AsyncStorage.getItem('onboarding:seen:v1');
        if (!onboardingSeen) return router.replace('/(onboarding)/splash-loading');

        const authed = await AsyncStorage.getItem('auth:session:v1');
        const session = authed ? JSON.parse(authed) : null;
        if (!session || !session.token) return router.replace('/(auth)/sign-in');

        // Load token into state
        authTokenVar(session.token);

        const subRaw = await AsyncStorage.getItem('auth:subscription:v1');
        const subscription = subRaw ? JSON.parse(subRaw) : null;

        if (!subscription) {
          return router.replace('/(auth)/trial-upgrade');
        }

        // Instead of reading everything from AsyncStorage, we should ideally fetch from GQL
        // But since we are at the entry point, maybe we check if they exist in the DB
        // For now, I'll keep the routing logic but know that the data should be in GQL.
        // Actually, if I want to FULLY move away from local storage for these,
        // I should fetch GET_ALL_DATA here and decide.

        const assessment = await AsyncStorage.getItem('assessment:v1');
        const profile = await AsyncStorage.getItem('profile:v1');
        const selectedIssues = await AsyncStorage.getItem('selectedIssues:v1');

        if (!assessment) return router.replace('/(onboarding)/assessment');
        if (!profile) return router.replace('/(onboarding)/profile-setup');
        if (!selectedIssues) return router.replace('/(onboarding)/suggested-categories');

        return router.replace('/(tabs)/home');
      } catch (e) {
        console.error('Routing error:', e);
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
