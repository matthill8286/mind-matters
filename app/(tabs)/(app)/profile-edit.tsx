import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setProfile, showAlert } from '@/store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, UI } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';

function RadioOption({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: selected ? '#828a6a' : colors.card,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: selected ? 'white' : colors.text,
          flex: 1,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: selected ? 'white' : colors.text,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: selected ? 1 : 0.3,
        }}
      >
        {selected && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: 'white',
            }}
          />
        )}
      </View>
    </Pressable>
  );
}

export default function ProfileEdit() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];
  const profile = useSelector((s: RootState) => s.user.profile);

  const [name, setName] = useState(profile?.name || '');
  const [intention, setIntention] = useState(profile?.intention || '');
  const [routine, setRoutine] = useState(profile?.routine || '');

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setIntention(profile.intention || '');
      setRoutine(profile.routine || '');
    }
  }, [profile]);

  async function handleSave() {
    const updatedProfile = {
      ...profile,
      name: name.trim() || null,
      intention: intention || null,
      routine: routine || null,
      updatedAt: new Date().toISOString(),
    };

    await dispatch(setProfile(updatedProfile));
    dispatch(showAlert({ title: 'Success', message: 'Profile updated successfully.' }));
    router.back();
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 24, paddingTop: 60, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 }}>
          <Pressable
            onPress={() => router.back()}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.card,
            }}
          >
            <Text style={{ color: colors.text, fontSize: 24 }}>←</Text>
          </Pressable>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>Edit Profile</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name or nickname"
            placeholderTextColor={colors.placeholder}
            style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
          />

          <Text style={[styles.label, { marginTop: 24 }]}>Primary Goal</Text>
          <View style={{ marginTop: 12 }}>
            {['Calm', 'Focus', 'Sleep', 'Stress', 'Confidence', 'Balance'].map((opt) => (
              <RadioOption
                key={opt}
                label={opt}
                selected={intention === opt}
                onPress={() => setIntention(opt)}
              />
            ))}
          </View>

          <Text style={[styles.label, { marginTop: 24 }]}>Preferred Check-in Time</Text>
          <View style={{ marginTop: 12 }}>
            {['Morning', 'Evening', 'Anytime'].map((opt) => (
              <RadioOption
                key={opt}
                label={opt}
                selected={routine === opt}
                onPress={() => setRoutine(opt)}
              />
            ))}
          </View>

          <Pressable
            onPress={handleSave}
            style={{
              marginTop: 32,
              paddingVertical: 18,
              borderRadius: 30,
              backgroundColor: '#828a6a',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 16 }}>Save Changes</Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '900',
    color: '#6a5e55',
    marginLeft: 4,
  },
  input: {
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    fontSize: 16,
    fontWeight: '600',
  },
});
