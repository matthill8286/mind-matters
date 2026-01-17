import { Stack } from 'expo-router';
import { AlertModal } from '@/components/AlertModal';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '@/lib/apollo';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="search" options={{ presentation: 'modal' }} />
        <Stack.Screen name="menu" options={{ presentation: 'modal' }} />
        <Stack.Screen name="resources" />
        <Stack.Screen name="(utils)" />
      </Stack>
      <AlertModal />
    </ApolloProvider>
  );
}
