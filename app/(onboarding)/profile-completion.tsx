import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetAllDataQuery } from '@/gql/generated';
import { calculateWellnessScore } from '@/lib/wellness';
import ScoreCard from '@/components/ScoreCard';

export default function ProfileCompletion() {
  const { data } = useGetAllDataQuery();
  const [name, setName] = useState<string | null>(null);
  const wellness = calculateWellnessScore(data);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('profile:v1');
      if (raw) {
        const p = JSON.parse(raw);
        setName(p?.name ?? null);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#6f6660', padding: 24, paddingTop: 60 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <Text style={{ color: 'white', fontSize: 24 }}>←</Text>
        </Pressable>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Completion</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={{ backgroundColor: 'white', borderRadius: 32, padding: 26, minHeight: 400 }}>
          <Text style={{ fontSize: 26, fontWeight: '900', color: '#6a5e55' }}>
            {name ? `Nice to meet you, ${name}` : 'Profile complete'}
          </Text>
          <Text style={{ opacity: 0.7, marginTop: 8, color: '#6a5e55', fontSize: 16 }}>
            Here’s a snapshot from your check-in.
          </Text>

          <View style={{ marginTop: 10 }}>
            <ScoreCard
              score={wellness.score}
              title="MindMate Wellness Score"
              subtitle="A gentle baseline of wellbeing today."
              bg="#6bbf8e"
            />
            <ScoreCard
              score={100 - wellness.breakdown.stress}
              title="Stress Load"
              subtitle="A moderate stress signal—let’s keep it manageable."
              bg="#f2a65a"
            />
            <ScoreCard
              score={100 - wellness.breakdown.sleep}
              title="Sleep Quality"
              subtitle="Low energy risk detected—prioritize rest when possible."
              bg="#9b8df1"
            />
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <Pressable
            onPress={() => router.replace('/(onboarding)/suggested-categories')}
            style={{
              paddingVertical: 20,
              borderRadius: 35,
              backgroundColor: '#a07b55',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 4,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 18 }}>Continue</Text>
            <Text style={{ color: 'white', fontSize: 20 }}>→</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
