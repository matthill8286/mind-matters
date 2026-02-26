import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { apiFetch } from '@/lib/api';
import { authTokenVar } from '@/lib/state';
import { writeSession } from '@/lib/storage';

export default function SignUp() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCreate() {
    if (!email || !pass) {
      setError(t('auth.emailPasswordRequired'));
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
        <Text style={{ fontSize: 26, fontWeight: '900' }}>{t('auth.signUp')}</Text>
        {error && <Text style={{ color: 'red', marginTop: 12, fontWeight: '600' }}>{error}</Text>}
        <Text style={{ marginTop: 18, fontWeight: '900' }}>{t('auth.email')}</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={t('auth.emailPlaceholder')}
          style={input}
          autoCapitalize="none"
        />
        <Text style={{ marginTop: 14, fontWeight: '900' }}>{t('auth.password')}</Text>
        <TextInput
          value={pass}
          onChangeText={setPass}
          placeholder={t('auth.createPasswordPlaceholder')}
          style={input}
          secureTextEntry
        />
        <Pressable
          onPress={onCreate}
          style={[primaryBtn, loading && { opacity: 0.7 }]}
          disabled={loading}
        >
          <Text style={primaryBtnText}>
            {loading ? t('auth.creatingAccount') : t('auth.createAccountBtn')}
          </Text>
        </Pressable>
        <Pressable onPress={() => router.navigate('/(auth)/sign-in')} style={{ marginTop: 12 }}>
          <Text style={{ textAlign: 'center', fontWeight: '800', opacity: 0.75 }}>
            {t('auth.backToSignIn')}
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
