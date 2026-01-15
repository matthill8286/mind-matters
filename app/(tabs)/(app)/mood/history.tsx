import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, ScrollView } from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import Calendar from '@/components/Calendar';
import { MoodCheckIn } from '@/lib/mood';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, fetchMoodCheckIns, deleteMoodCheckIn, showAlert } from '@/store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, UI } from '@/constants/theme';
import { router } from 'expo-router';

export default function MoodHistory() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];
  const items = useSelector((s: RootState) => s.mood.moodCheckIns);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchMoodCheckIns());
  }, []);

  const markedDates = useMemo(() => {
    return Array.from(new Set(items.map((i) => i.createdAt.split('T')[0])));
  }, [items]);

  const filteredItems = useMemo(() => {
    const iso = selectedDate.toISOString().split('T')[0];
    return items.filter((i) => i.createdAt.split('T')[0] === iso);
  }, [items, selectedDate]);

  async function remove(id: string) {
    dispatch(
      showAlert({
        title: 'Delete check-in?',
        message: 'This can’t be undone.',
        actions: [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              await dispatch(deleteMoodCheckIn(id));
            },
          },
        ],
      }),
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: UI.spacing.xl,
        paddingTop: 18,
      }}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 10 }}>
          <Pressable
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.text, fontSize: 20 }}>←</Text>
          </Pressable>
          <Text style={{ fontSize: 24, fontWeight: '900', color: colors.text }}>Mood History</Text>
        </View>

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
            <Text style={{ fontWeight: '900', color: colors.text }}>
              {selectedDate.toLocaleDateString() === new Date().toLocaleDateString()
                ? 'Recent check-ins'
                : `Check-ins for ${selectedDate.toLocaleDateString()}`}
            </Text>
            <Text style={{ color: colors.mutedText, marginTop: 6 }}>
              {filteredItems.length === 0 ? 'No entries for this day.' : 'Tap one to delete.'}
            </Text>

            {filteredItems.length > 0 && (
              <View style={{ marginTop: 10 }}>
                {filteredItems.map((item) => (
                  <Pressable
                    key={item.id}
                    onPress={() => remove(item.id)}
                    style={{
                      padding: 12,
                      borderRadius: UI.radius.md,
                      backgroundColor: colors.background,
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}
                    >
                      <Text style={{ fontWeight: '900', color: colors.text }}>{item.mood}</Text>
                      <Text style={{ color: colors.mutedText }}>
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </Text>
                    </View>
                    <Text style={{ color: colors.mutedText, marginTop: 6 }}>
                      Energy {item.energy}/5 • Stress {item.stress}/10
                    </Text>
                    {item.note ? (
                      <Text style={{ color: colors.mutedText, marginTop: 6 }} numberOfLines={2}>
                        {item.note}
                      </Text>
                    ) : null}
                    {(item.tags ?? []).length ? (
                      <Text style={{ color: colors.subtleText, marginTop: 6, fontWeight: '800' }}>
                        {(item.tags ?? [])
                          .slice(0, 6)
                          .map((t) => `#${t}`)
                          .join(' ')}
                      </Text>
                    ) : null}
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
