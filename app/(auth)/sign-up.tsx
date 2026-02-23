import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { router } from 'expo-router';
import { apiFetch } from '@/lib/api';
import { authTokenVar } from '@/lib/state';
import { writeSession } from '@/lib/storage';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCreate() {
    if (!email || !pass) {
      setError('Email and password are required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password: pass }),
      });

      const { token, user } = response;
      await writeSession({ email, token, userId: user.id });
      authTokenVar(token);
      router.replace('/(auth)/trial-upgrade');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#6f6660', padding: 24, justifyContent: 'center' }}>
      <View style={{ backgroundColor: 'white', borderRadius: 28, padding: 26 }}>
        <Text style={{ fontSize: 26, fontWeight: '900' }}>Sign up</Text>
        {error && <Text style={{ color: 'red', marginTop: 12, fontWeight: '600' }}>{error}</Text>}
        <Text style={{ marginTop: 18, fontWeight: '900' }}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          style={input}
          autoCapitalize="none"
        />
        <Text style={{ marginTop: 14, fontWeight: '900' }}>Password</Text>
        <TextInput
          value={pass}
          onChangeText={setPass}
          placeholder="Create a password"
          style={input}
          secureTextEntry
        />
        <Pressable
          onPress={onCreate}
          style={[primaryBtn, loading && { opacity: 0.7 }]}
          disabled={loading}
        >
          <Text style={primaryBtnText}>{loading ? 'Creating...' : 'Create account'}</Text>
        </Pressable>
        <Pressable onPress={() => router.navigate('/(auth)/sign-in')} style={{ marginTop: 12 }}>
          <Text style={{ textAlign: 'center', fontWeight: '800', opacity: 0.75 }}>
            Back to sign in
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const input = { marginTop: 8, padding: 12, borderRadius: 16, backgroundColor: '#f2f2f2' };
const primaryBtn = {
  marginTop: 18,
  backgroundColor: '#a07b55',
  padding: 16,
  borderRadius: 18,
};
const primaryBtnText = { color: 'white' };
