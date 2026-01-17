import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, Platform } from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import { router } from 'expo-router';
import { useGetAllDataQuery } from '@/gql/generated';
import { calculateWellnessScore } from '@/lib/wellness';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSubscription } from '@/hooks/useSubscription';
import { Colors, UI } from '@/constants/theme';
import { AFFIRMATIONS } from '@/constants/affirmations';

import ScoreCard from '@/components/ScoreCard';
import { IconSymbol } from '@/components/icon-symbol';

export default function Home() {
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];
  const { isExpired } = useSubscription();
  const { data } = useGetAllDataQuery();
  const moodCheckIns = data?.moodCheckIns || [];
  const journalEntries = data?.journalEntries || [];
  const assessment = data?.assessment;
  const wellness = useMemo(() => calculateWellnessScore(data), [data]);

  const moodCount = moodCheckIns.length;
  const journalCount = journalEntries.length;

  const affirmation = useMemo(() => {
    const today = new Date().toDateString();
    // Simple deterministic hash based on date string
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % AFFIRMATIONS.length;
    return AFFIRMATIONS[index];
  }, []);

  const quickCards = useMemo(
    () => [
      {
        title: 'Stress toolkit',
        subtitle: 'Breathing, grounding, and your Stress Plan.',
        onPress: () => router.push('/(tabs)/(app)/stress'),
        icon: 'bolt.fill' as const,
        color: '#f2a65a',
      },
      {
        title: 'Mood check-in',
        subtitle: 'Log mood, energy, and stress in 30 seconds.',
        onPress: () => router.push('/(tabs)/(app)/mood'),
        icon: 'text.bubble' as const,
        color: '#6bbf8e',
      },
      {
        title: 'Journal',
        subtitle: 'Write a quick entry or use a prompt.',
        onPress: () => router.push('/(tabs)/journal'),
        icon: 'note.text' as const,
        color: '#9b8df1',
      },
      {
        title: 'Chat',
        subtitle: 'Talk to the AI about a specific topic.',
        onPress: () => router.push('/(tabs)/chat'),
        icon: 'paperplane.fill' as const,
        color: '#a07b55',
      },
    ],
    [],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: UI.spacing.xl,
        paddingTop: Platform.OS === 'ios' ? 18 : 8,
      }}
    >
      <ScreenHeader title="Home" subtitle="Your wellbeing snapshot and quick actions." />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 26, marginTop: 14 }}
        showsVerticalScrollIndicator={false}
      >
        {isExpired && (
          <Pressable
            onPress={() => router.push('/(auth)/trial-upgrade')}
            style={{
              backgroundColor: '#a07b55',
              borderRadius: UI.radius.lg,
              padding: 16,
              marginTop: 14,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontWeight: '900', fontSize: 16 }}>Trial Expired</Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
                Upgrade to lifetime access to unlock all features.
              </Text>
            </View>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900', marginLeft: 10 }}>
              →
            </Text>
          </Pressable>
        )}

        <View
          style={{
            backgroundColor: '#828a6a',
            borderRadius: UI.radius.xl,
            padding: 20,
            marginTop: 14,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 4,
          }}
        >
          <Text
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontWeight: '800',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Daily Affirmation
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '700',
              marginTop: 8,
              fontStyle: 'italic',
              lineHeight: 28,
            }}
          >
            {affirmation}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: UI.radius.xl,
            padding: 16,
            marginTop: 14,
          }}
        >
          <Text style={{ fontWeight: '900', color: colors.mutedText, marginBottom: 4 }}>
            Wellness Snapshot
          </Text>

          <ScoreCard
            score={wellness.score}
            title="MindMate Wellness Score"
            subtitle="Your current wellbeing baseline."
            bg="#6bbf8e"
          />
          <ScoreCard
            score={100 - wellness.breakdown.stress}
            title="Stress Load"
            subtitle="Let’s keep your stress levels manageable."
            bg="#f2a65a"
          />
          <ScoreCard
            score={100 - wellness.breakdown.sleep}
            title="Sleep Quality"
            subtitle="Prioritize rest to boost your energy."
            bg="#9b8df1"
          />

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
            <MiniStat label="Mood check-ins" value={String(moodCount)} />
            <MiniStat label="Journal entries" value={String(journalCount)} />
          </View>

          {assessment ? null : (
            <Pressable
              onPress={() => router.push('/(onboarding)/assessment')}
              style={{
                marginTop: 14,
                backgroundColor: colors.primary,
                padding: 14,
                borderRadius: UI.radius.lg,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: colors.onPrimary, fontWeight: '900' }}>
                Complete assessment
              </Text>
            </Pressable>
          )}
        </View>

        <Text style={{ marginTop: 16, fontWeight: '900', fontSize: 16, color: colors.text }}>
          Quick actions
        </Text>

        <View style={{ marginTop: 10, gap: 12 }}>
          {quickCards.map((c) => (
            <Pressable
              key={c.title}
              onPress={c.onPress}
              style={{
                backgroundColor: colors.card,
                borderRadius: UI.radius.lg,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 2,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: colors.background,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <IconSymbol name={c.icon} size={24} color={c.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '900', color: colors.text }}>
                  {c.title}
                </Text>
                <Text style={{ color: colors.mutedText, marginTop: 4, fontSize: 14 }}>
                  {c.subtitle}
                </Text>
              </View>
              <Text
                style={{ fontSize: 20, color: colors.primary, fontWeight: '900', marginLeft: 10 }}
              >
                →
              </Text>
            </Pressable>
          ))}
        </View>

        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: UI.radius.lg,
            padding: 14,
            marginTop: 16,
          }}
        >
          <Text style={{ fontWeight: '900', color: colors.text }}>Need a quick reset?</Text>
          <Text style={{ color: colors.mutedText, marginTop: 6 }}>
            Tap to start guided breathing or grounding exercises right away.
          </Text>
          <Pressable
            onPress={() => router.push('/(tabs)/(app)/stress')}
            style={{
              marginTop: 12,
              backgroundColor: colors.divider,
              padding: 14,
              borderRadius: UI.radius.lg,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontWeight: '900', color: colors.text }}>Open Stress toolkit</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function MiniStat({ label, value }: Readonly<{ label: string; value: string }>) {
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: UI.radius.md,
        padding: 12,
      }}
    >
      <Text style={{ color: colors.mutedText, fontWeight: '800' }}>{label}</Text>
      <Text style={{ fontSize: 18, fontWeight: '900', marginTop: 6, color: colors.text }}>
        {value}
      </Text>
    </View>
  );
}
