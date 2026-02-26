import { Stack } from 'expo-router';
import { AlertModal } from '@/components/AlertModal';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { useSleepDetection } from '@/hooks/useSleepDetection';

import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '@/lib/notifications';
import './../i18n';

export default function RootLayout() {
  const notificationListener = useRef<Notifications.Subscription>(null);
  const responseListener = useRef<Notifications.Subscription>(null);

  useEffect(() => {
    (async () => await registerForPushNotificationsAsync())();

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response);
    });
  }, []);

  useSleepDetection();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="resources" />
        <Stack.Screen name="(utils)" />
      </Stack>
      <AlertModal />
      <LoadingOverlay />
    </>
  );
}
