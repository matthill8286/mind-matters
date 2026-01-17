import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, FlatList, Platform } from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { ISSUES, IssueKey } from '@/data/issues';
import { showAlert } from '@/lib/apollo';

import { Colors, UI } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function Settings() {
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];
  const [selected, setSelected] = useState<Set<IssueKey>>(new Set());

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('selectedIssues:v1');
      setSelected(new Set(raw ? JSON.parse(raw) : []));
    })();
  }, []);

  const selectedArray = useMemo(() => Array.from(selected), [selected]);

  async function save() {
    if (selectedArray.length === 0) {
      showAlert('Select at least one section', 'Choose one or more sections to continue.');
      return;
    }
    await AsyncStorage.setItem('selectedIssues:v1', JSON.stringify(selectedArray));
    showAlert('Saved', 'Your preferences were updated.');
    router.back();
  }

  return (
    <View
      style={{
        flex: 1,
        padding: UI.spacing.xl,
        backgroundColor: colors.background,
        paddingTop: Platform.OS === 'ios' ? 18 : 8,
      }}
    >
      <ScreenHeader title="Settings" subtitle="Choose which sections you want to see." />

      <View
        style={{
          marginTop: 14,
          backgroundColor: colors.card,
          borderRadius: 18,
          padding: 12,
          flex: 1,
        }}
      >
        <FlatList
          data={ISSUES}
          keyExtractor={(i) => i.key}
          contentContainerStyle={{ gap: 10, padding: 6 }}
          renderItem={({ item }) => {
            const isOn = selected.has(item.key);
            return (
              <Pressable
                onPress={() => {
                  setSelected((prev) => {
                    const next = new Set(prev);
                    if (next.has(item.key)) next.delete(item.key);
                    else next.add(item.key);
                    return next;
                  });
                }}
                style={{
                  padding: 14,
                  borderRadius: 18,
                  backgroundColor: isOn ? colors.divider : colors.background,
                }}
              >
                <Text style={{ fontWeight: '900', color: colors.text }}>{item.title}</Text>
                <Text style={{ color: colors.mutedText, marginTop: 4 }}>
                  {isOn ? 'Selected' : 'Tap to select'}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      <Pressable
        onPress={save}
        style={{
          marginTop: 14,
          backgroundColor: colors.primary,
          padding: 16,
          borderRadius: 18,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.onPrimary, fontWeight: '900' }}>Save</Text>
      </Pressable>
    </View>
  );
}
