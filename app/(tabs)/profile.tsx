import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSubscription } from '@/hooks/useSubscription';
import { Colors, UI } from '@/constants/theme';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, fetchProfile } from '@/store';
import { IconSymbol } from '@/components/icon-symbol';

async function signOut() {
  await AsyncStorage.removeItem('auth:session:v1');
  router.replace('/(auth)/sign-in');
}

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string | null>(null);
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];
  const profile = useSelector((s: RootState) => s.user.profile);
  const { subscription, isExpired, isLifetime } = useSubscription();

  useEffect(() => {
    dispatch(fetchProfile());
    (async () => {
      const raw = await AsyncStorage.getItem('auth:session:v1');
      if (raw) setEmail(JSON.parse(raw)?.email ?? null);
    })();
  }, []);

  const cardStyle = {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: UI.radius.xl,
    marginTop: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  };

  const btnStyle = {
    marginTop: 12,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: UI.radius.lg,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  };

  const subTypeLabel = isLifetime
    ? 'Lifetime Access'
    : subscription?.type === 'monthly'
      ? 'Monthly Access'
      : isExpired
        ? 'Trial Expired'
        : 'Free Trial';

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: UI.spacing.xl,
        paddingTop: 18,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Profile"
          subtitle={email ? `Signed in as ${email}` : 'Not signed in'}
        />

        <View style={cardStyle}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 20, fontWeight: '900', color: colors.text }}>
              {profile?.name || 'Your Profile'}
            </Text>
            <Pressable
              onPress={() => router.push('/(tabs)/(app)/profile-edit')}
              style={{
                backgroundColor: '#828a6a',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 12 }}>Edit</Text>
            </Pressable>
          </View>

          <View style={{ marginTop: 16, gap: 12 }}>
            <View>
              <Text
                style={{
                  color: colors.mutedText,
                  fontSize: 12,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                }}
              >
                Primary Goal
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 2 }}>
                {profile?.intention || 'Not set'}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: colors.mutedText,
                  fontSize: 12,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                }}
              >
                Check-in Routine
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 2 }}>
                {profile?.routine || 'Not set'}
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ marginTop: 24, fontSize: 16, fontWeight: '900', color: colors.text }}>
          Subscription
        </Text>

        <View style={cardStyle}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: '900', color: colors.text }}>
                {subTypeLabel}
              </Text>
              {subscription?.expiryDate && !isLifetime && (
                <Text style={{ color: colors.mutedText, fontSize: 13, marginTop: 4 }}>
                  {isExpired ? 'Expired on' : 'Renews/Expires on'}{' '}
                  {new Date(subscription.expiryDate).toLocaleDateString()}
                </Text>
              )}
            </View>
            {!isLifetime && (
              <Pressable
                onPress={() => router.push('/(auth)/trial-upgrade')}
                style={{
                  backgroundColor: colors.primary,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: UI.radius.md,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <IconSymbol name="bolt.fill" size={16} color={colors.onPrimary} />
                <Text style={{ color: colors.onPrimary, fontWeight: '900' }}>Upgrade</Text>
              </Pressable>
            )}
          </View>
        </View>

        <Text style={{ marginTop: 24, fontSize: 16, fontWeight: '900', color: colors.text }}>
          App Settings
        </Text>

        <Pressable onPress={() => router.push('/(tabs)/(app)/settings')} style={btnStyle}>
          <Text style={{ fontWeight: '800', color: colors.text }}>Manage Categories</Text>
          <Text style={{ color: colors.primary, fontWeight: '900' }}>→</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/(utils)/help-center')} style={btnStyle}>
          <Text style={{ fontWeight: '800', color: colors.text }}>Help Center</Text>
          <Text style={{ color: colors.primary, fontWeight: '900' }}>→</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/(utils)/utilities')} style={btnStyle}>
          <Text style={{ fontWeight: '800', color: colors.text }}>Error & Other Utilities</Text>
          <Text style={{ color: colors.primary, fontWeight: '900' }}>→</Text>
        </Pressable>

        <Pressable
          onPress={signOut}
          style={[
            btnStyle,
            { marginTop: 24, backgroundColor: theme === 'light' ? '#ffe8e8' : '#442222' },
          ]}
        >
          <Text style={{ fontWeight: '900', color: theme === 'light' ? '#b22' : '#f88' }}>
            Sign out
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
