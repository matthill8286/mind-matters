import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import { router } from 'expo-router';
import { ISSUES } from '@/data/issues';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSubscription } from '@/hooks/useSubscription';
import { useDispatch } from 'react-redux';
import { showAlert, AppDispatch } from '@/store';
import { Colors, UI } from '@/constants/theme';

export default function Chatbot() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useColorScheme() ?? 'light';
  const { hasFullAccess } = useSubscription();
  const colors = Colors[theme];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: UI.spacing.xl,
        paddingTop: 18,
      }}
    >
      <ScreenHeader title="AI Therapy Chatbot" subtitle="Pick a topic to chat about." />

      <FlatList
        style={{ marginTop: 16 }}
        data={ISSUES}
        keyExtractor={(i) => i.key}
        contentContainerStyle={{ gap: 10, paddingBottom: 18 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              if (!hasFullAccess) {
                dispatch(
                  showAlert({
                    title: 'Premium Feature',
                    message: 'Upgrade to lifetime access to chat with the AI companion.',
                    actions: [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Upgrade', onPress: () => router.push('/(auth)/trial-upgrade') },
                    ],
                  }),
                );
                return;
              }
              router.push({
                pathname: '/(tabs)/(app)/chat/[issueKey]',
                params: { issueKey: item.key },
              });
            }}
            style={{
              padding: 14,
              borderRadius: UI.radius.lg,
              backgroundColor: colors.card,
              opacity: hasFullAccess ? 1 : 0.7,
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: '900', color: colors.text }}>
              {item.title}
            </Text>
            <Text style={{ color: colors.mutedText, marginTop: 4 }}>{item.description}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
