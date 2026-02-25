import { View, Text, Pressable, ScrollView, Platform, StyleSheet } from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSubscription } from '@/hooks/useSubscription';
import { Colors, UI } from '@/constants/theme';
import { useStressStore } from '@/store/useStressStore';
import { useStressHistoryStore } from '@/store/useStressHistoryStore';
import { showAlert } from '@/lib/state';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SkeletonRect } from '@/components/Skeleton';
import React, { useEffect } from 'react';

export default function StressHub() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const { hasFullAccess } = useSubscription();
  const colors = Colors[theme];

  const { stressKit: kit, fetchStressKit, isLoading: kitLoading } = useStressStore();
  const { stressHistory, fetchStressHistory, isLoading: historyLoading } = useStressHistoryStore();

  const loading = kitLoading || historyLoading;

  useEffect(() => {
    (async () => {
      if (kitLoading) return;
      if (!kit) await fetchStressKit();
      if (historyLoading) return;
      if (!stressHistory.length) await fetchStressHistory();
    })();
  }, [fetchStressKit, fetchStressHistory, kitLoading, kit, historyLoading, stressHistory.length]);

  const lastExercise = stressHistory[0];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Stress Management"
        subtitle="Quick tools for calming your body and clearing your mind."
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={{ gap: 12 }}>
            <SkeletonRect height={160} borderRadius={UI.radius.xl} />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <SkeletonRect height={120} borderRadius={UI.radius.xl} style={{ flex: 1 }} />
              <SkeletonRect height={120} borderRadius={UI.radius.xl} style={{ flex: 1 }} />
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <SkeletonRect height={120} borderRadius={UI.radius.xl} style={{ flex: 1 }} />
              <SkeletonRect height={120} borderRadius={UI.radius.xl} style={{ flex: 1 }} />
            </View>
            <SkeletonRect height={100} borderRadius={UI.radius.xl} style={{ marginTop: 6 }} />
          </View>
        ) : (
          <>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="psychology" size={24} color={colors.primary} />
                <Text style={[styles.cardTitle, { color: colors.text }]}>Quick Phrase</Text>
              </View>
              <Text
                style={[styles.cardDescription, { color: colors.mutedText, fontStyle: 'italic' }]}
              >
                &quot;{kit?.quickPhrase || 'Take a deep breath. This too shall pass.'}&quot;
              </Text>
              <Pressable
                onPress={() => {
                  if (!hasFullAccess) {
                    showAlert(
                      'Premium Feature',
                      'Upgrade to lifetime access to unlock your stress plan.',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Upgrade', onPress: () => router.push('/(auth)/trial-upgrade') },
                      ],
                    );
                    return;
                  }
                  router.push('/(tabs)/stress/plan');
                }}
                style={[
                  styles.modeButton,
                  { backgroundColor: colors.primary, opacity: hasFullAccess ? 1 : 0.7 },
                ]}
              >
                <Text style={styles.modeButtonText}>Manage Stress Plan</Text>
              </Pressable>
            </View>

            <View style={styles.grid}>
              <GridCard
                title="Breathing"
                icon="air"
                color="#6bbf8e"
                onPress={() => router.push('/(tabs)/stress/breathing')}
              />
              <GridCard
                title="Grounding"
                icon="touch-app"
                color="#f2a65a"
                onPress={() => {
                  if (!hasFullAccess) {
                    showAlert(
                      'Premium Feature',
                      'Upgrade to lifetime access to unlock the grounding tool.',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Upgrade', onPress: () => router.push('/(auth)/trial-upgrade') },
                      ],
                    );
                    return;
                  }
                  router.push('/(tabs)/stress/grounding');
                }}
                isLocked={!hasFullAccess}
              />
              <GridCard
                title="Relaxation"
                icon="spa"
                color="#9b8df1"
                onPress={() => router.push('/(tabs)/stress/relax')}
              />
              <GridCard
                title="Watch"
                icon="play-circle-outline"
                color="#a07b55"
                onPress={() => router.push('/(tabs)/stress/watch')}
              />
            </View>

            {lastExercise && (
              <View style={[styles.card, { backgroundColor: colors.card, marginTop: 12 }]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 0 }]}>
                    Recent Activity
                  </Text>
                  <MaterialIcons name="history" size={20} color={colors.mutedText} />
                </View>
                <View style={styles.statsRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.statLabel, { color: colors.mutedText }]}>
                      Last Exercise
                    </Text>
                    <Text style={[styles.statValue, { color: colors.text }]} numberOfLines={1}>
                      {lastExercise.title}
                    </Text>
                  </View>
                  <View style={{ width: 12 }} />
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[styles.statLabel, { color: colors.mutedText }]}>Date</Text>
                    <Text style={[styles.statValue, { color: colors.text }]}>
                      {new Date(lastExercise.date).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <Pressable
              onPress={() => router.push('/(tabs)/mindful-hours')}
              style={[styles.mindfulLink, { backgroundColor: colors.card }]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <MaterialIcons name="self-improvement" size={24} color="#6bbf8e" />
                <Text style={{ fontWeight: '900', color: colors.text }}>View Mindful Hours</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.mutedText} />
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
}

function GridCard({
  title,
  icon,
  color,
  onPress,
  isLocked = false,
}: {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
  isLocked?: boolean;
}) {
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.gridItem,
        { backgroundColor: colors.card, opacity: pressed || isLocked ? 0.7 : 1 },
      ]}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 16,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        <MaterialIcons name={icon as any} size={28} color={isLocked ? colors.mutedText : color} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Text style={[styles.gridLabel, { color: isLocked ? colors.mutedText : colors.text }]}>
          {title}
        </Text>
        {isLocked && <MaterialIcons name="lock" size={12} color={colors.mutedText} />}
      </View>
    </Pressable>
  );
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
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  modeButton: {
    paddingVertical: 14,
    borderRadius: UI.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    flex: 1,
    minWidth: '45%',
    padding: 20,
    borderRadius: UI.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  gridLabel: {
    fontWeight: '800',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  mindfulLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: UI.radius.xl,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
});
