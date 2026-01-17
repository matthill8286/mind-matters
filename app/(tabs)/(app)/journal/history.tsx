import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Platform } from 'react-native';
import Calendar from '@/components/Calendar';
import { useGetJournalEntriesQuery } from '@/gql/hooks';
import { showAlert } from '@/lib/state';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, UI } from '@/constants/theme';
import { router } from 'expo-router';

import ScreenHeader from '@/components/ScreenHeader';

export default function JournalHistory() {
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];
  const { data, loading, error } = useGetJournalEntriesQuery();
  const entries = data?.journalEntries || [];
  const [selectedDate, setSelectedDate] = useState(new Date());

  const markedDates = useMemo(() => {
    return Array.from(new Set(entries.map((i) => i.createdAt.split('T')[0])));
  }, [entries]);

  const filteredEntries = useMemo(() => {
    const iso = selectedDate.toISOString().split('T')[0];
    return entries.filter((i) => i.createdAt.split('T')[0] === iso);
  }, [entries, selectedDate]);

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: UI.spacing.xl,
        paddingTop: Platform.OS === 'ios' ? 18 : 8,
      }}
    >
      <ScreenHeader title="Journal History" showBack />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24, marginTop: 14 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 20, gap: 12 }}>
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            markedDates={markedDates}
          />

          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: UI.radius.lg,
              padding: 14,
              marginTop: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontWeight: '900', color: colors.text }}>
                {selectedDate.toLocaleDateString() === new Date().toLocaleDateString()
                  ? 'Recent entries'
                  : `Entries for ${selectedDate.toLocaleDateString()}`}
              </Text>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/(app)/journal/new',
                    params: { date: selectedDate.toISOString() },
                  })
                }
                style={{
                  backgroundColor: colors.primary,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: UI.radius.pill,
                }}
              >
                <Text style={{ color: colors.onPrimary, fontWeight: '800', fontSize: 12 }}>
                  Add Entry
                </Text>
              </Pressable>
            </View>
            <Text style={{ color: colors.mutedText, marginTop: 6 }}>
              {filteredEntries.length === 0
                ? 'No entries for this day.'
                : 'Tap an entry to view or edit.'}
            </Text>

            {filteredEntries.length > 0 && (
              <View style={{ marginTop: 10, gap: 10 }}>
                {filteredEntries.map((item) => (
                  <Pressable
                    key={item.id}
                    onPress={() =>
                      router.push({
                        pathname: '/(tabs)/(app)/journal/[id]',
                        params: { id: item.id },
                      })
                    }
                    style={{
                      padding: 14,
                      borderRadius: UI.radius.lg,
                      backgroundColor: colors.background,
                    }}
                  >
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}
                    >
                      <Text
                        style={{ fontSize: 16, fontWeight: '900', flex: 1, color: colors.text }}
                      >
                        {item.title || 'Untitled'}
                      </Text>
                      {item.mood ? (
                        <View
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            borderRadius: UI.radius.pill,
                            backgroundColor: colors.inputBg,
                          }}
                        >
                          <Text style={{ fontWeight: '800', color: colors.mutedText }}>
                            {item.mood}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    <Text style={{ color: colors.subtleText, marginTop: 6 }}>
                      {formatDate(item.createdAt)}
                    </Text>
                    <Text style={{ color: colors.mutedText, marginTop: 6 }} numberOfLines={2}>
                      {item.content}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
