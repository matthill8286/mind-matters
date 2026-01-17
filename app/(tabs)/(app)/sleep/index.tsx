import React from 'react';
import { View, Text, Pressable, Platform, ScrollView, StyleSheet } from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, UI } from '@/constants/theme';
import { useSleepMode, sleepModeVar, showAlert } from '@/lib/state';
import { useGetSleepEntriesQuery } from '@/gql/generated';
import { MaterialIcons } from '@expo/vector-icons';

export default function SleepScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];
  const { sleepModeStartISO } = useSleepMode();

  const { data, isPending } = useGetSleepEntriesQuery();
  const entries = data?.sleepEntries || [];
  const lastEntry = entries[0];

  const toggleSleepMode = () => {
    if (sleepModeStartISO) {
      const start = new Date(sleepModeStartISO);
      const end = new Date();
      const diffMs = end.getTime() - start.getTime();
      const diffHrs = Math.round((diffMs / (1000 * 60 * 60)) * 10) / 10;

      showAlert(
        'Sleep Mode Ended',
        `You slept for ${diffHrs} hours. Would you like to log this entry?`,
        [
          {
            text: 'No',
            style: 'cancel',
            onPress: () => sleepModeVar({ ...sleepModeVar(), sleepModeStartISO: null }),
          },
          {
            text: 'Log Sleep',
            onPress: () => {
              sleepModeVar({ ...sleepModeVar(), sleepModeStartISO: null });
              router.push({
                pathname: '/(tabs)/(app)/sleep/log',
                params: { duration: diffHrs.toString() },
              });
            },
          },
        ],
      );
    } else {
      sleepModeVar({ ...sleepModeVar(), sleepModeStartISO: new Date().toISOString() });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Sleep Tracking" subtitle="Track your rest and optimize your recovery." />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="nightlight-round" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Sleep Mode</Text>
          </View>
          <Text style={[styles.cardDescription, { color: colors.mutedText }]}>
            {sleepModeStartISO
              ? `Started at ${new Date(sleepModeStartISO).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : 'Switch on when you go to bed to track your duration automatically.'}
          </Text>
          <Pressable
            onPress={toggleSleepMode}
            style={[
              styles.modeButton,
              { backgroundColor: sleepModeStartISO ? '#ff4b4b' : colors.primary },
            ]}
          >
            <Text style={styles.modeButtonText}>
              {sleepModeStartISO ? 'Stop Sleep Mode' : 'Start Sleep Mode'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.grid}>
          <Pressable
            onPress={() => router.push('/(tabs)/(app)/sleep/log')}
            style={[styles.gridItem, { backgroundColor: colors.card }]}
          >
            <MaterialIcons name="add-circle-outline" size={32} color={colors.primary} />
            <Text style={[styles.gridLabel, { color: colors.text }]}>Log Sleep</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(tabs)/(app)/sleep/history')}
            style={[styles.gridItem, { backgroundColor: colors.card }]}
          >
            <MaterialIcons name="history" size={32} color={colors.primary} />
            <Text style={[styles.gridLabel, { color: colors.text }]}>History</Text>
          </Pressable>
        </View>

        {lastEntry && (
          <View style={[styles.card, { backgroundColor: colors.card, marginTop: 12 }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Last Night</Text>
            <View style={styles.statsRow}>
              <View>
                <Text style={[styles.statLabel, { color: colors.mutedText }]}>Duration</Text>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {lastEntry.duration} hrs
                </Text>
              </View>
              <View>
                <Text style={[styles.statLabel, { color: colors.mutedText }]}>Quality</Text>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {getQualityLabel(lastEntry.quality)}
                </Text>
              </View>
            </View>
          </View>
        )}

        <Pressable
          onPress={() => router.push('/(tabs)/(app)/mindful-hours')}
          style={[styles.mindfulLink, { backgroundColor: colors.card }]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <MaterialIcons name="self-improvement" size={24} color="#6bbf8e" />
            <Text style={{ fontWeight: '900', color: colors.text }}>View Mindful Hours</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.mutedText} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

function getQualityLabel(quality?: number) {
  switch (quality) {
    case 5:
      return 'Excellent';
    case 4:
      return 'Good';
    case 3:
      return 'Fair';
    case 2:
      return 'Poor';
    case 1:
      return 'Very Poor';
    default:
      return 'N/A';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: UI.spacing.xl,
    paddingTop: Platform.OS === 'ios' ? 18 : 8,
  },
  scrollContent: {
    paddingBottom: 40,
    marginTop: 14,
    gap: 12,
  },
  card: {
    padding: 20,
    borderRadius: UI.radius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  modeButton: {
    padding: 16,
    borderRadius: UI.radius.lg,
    alignItems: 'center',
  },
  modeButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridItem: {
    flex: 1,
    padding: 20,
    borderRadius: UI.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  gridLabel: {
    fontWeight: '900',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  mindfulLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: UI.radius.lg,
    marginTop: 12,
  },
});
