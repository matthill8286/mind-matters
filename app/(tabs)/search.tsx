import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Platform } from 'react-native';
import { router } from 'expo-router';
import { ITEMS } from '../menu';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, UI } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { useSubscription } from '@/hooks/useSubscription';
import { showAlert } from '@/lib/state';
import { IconSymbol } from '@/components/icon-symbol';

export default function Search() {
  const [q, setQ] = useState('');
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];
  const { hasFullAccess } = useSubscription();

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ITEMS;
    return ITEMS.filter((i) => (i.title + ' ' + i.subtitle).toLowerCase().includes(s));
  }, [q]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: UI.spacing.xl,
        paddingTop: Platform.OS === 'ios' ? 18 : 8,
      }}
    >
      <ScreenHeader title="Search" subtitle="Find sections, tools, or topics." />

      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search features…"
        placeholderTextColor={colors.placeholder}
        style={{
          marginTop: 18,
          backgroundColor: colors.card,
          padding: 14,
          borderRadius: UI.radius.lg,
          color: colors.text,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      />

      <FlatList
        style={{ marginTop: 14 }}
        data={results}
        keyExtractor={(i) => i.key}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              if (item.isPremium && !hasFullAccess) {
                showAlert('Premium Feature', 'Upgrade to lifetime access to use this feature.', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Upgrade', onPress: () => router.push('/(auth)/trial-upgrade') },
                ]);
                return;
              }
              router.push(item.path as any);
            }}
            style={{
              padding: 16,
              borderRadius: UI.radius.lg,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              opacity: item.isPremium && !hasFullAccess ? 0.7 : 1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontWeight: '900', color: colors.text, fontSize: 16 }}>
                {item.title}
              </Text>
              {item.isPremium && !hasFullAccess && (
                <IconSymbol name="bolt.fill" size={16} color="#a07b55" />
              )}
            </View>
            <Text style={{ color: colors.mutedText, marginTop: 4 }}>{item.subtitle}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
