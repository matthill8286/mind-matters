import { Stack } from 'expo-router';
import { AlertModal } from '@/components/AlertModal';
import { LoadingOverlay } from '@/components/LoadingOverlay';

export default function RootLayout() {
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
