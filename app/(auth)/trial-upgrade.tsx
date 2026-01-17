import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@apollo/client/react';
import { SET_SUBSCRIPTION, showAlert } from '@/lib/apollo';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

export default function TrialUpgrade() {
  const [updateSubscription] = useMutation(SET_SUBSCRIPTION);
  const [isNewUser, setIsNewUser] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const assessment = await AsyncStorage.getItem('assessment:v1');
      if (assessment) {
        setIsNewUser(false);
      }
    })();
  }, []);

  const handleFinish = () => {
    if (isNewUser) {
      router.replace('/(onboarding)/assessment');
    } else {
      router.replace('/(tabs)/home');
    }
  };

  async function selectTrial() {
    // Mocking success for trial
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      await updateSubscription({
        variables: {
          input: {
            type: 'trial',
            expiryDate: expiryDate.toISOString(),
          },
        },
      });
      router.push('/(auth)/payment-success');
    }, 1000);
  }

  // Function to call the backend API to create a Checkout Session
  const createCheckoutSession = async (
    mode: 'payment' | 'subscription',
    amount: number,
    name: string,
    currency: string,
  ) => {
    try {
      // Replace with your actual API URL
      const API_URL = 'http://localhost:3000';
      const successUrl = Linking.createURL('/(auth)/payment-success');
      const cancelUrl = Linking.createURL('/(auth)/payment-failure');

      const response = await fetch(`${API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode,
          price_data: {
            unit_amount: amount,
            name: name,
          },
          currency,
          success_url: successUrl,
          cancel_url: cancelUrl,
        }),
      });

      const data = await response.json();
      if (data.url) {
        return data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      showAlert('Error', String(error));
      return null;
    }
  };

  async function buyPlan(type: 'monthly' | 'lifetime') {
    const amount = type === 'monthly' ? 1000 : 7200; // cents
    const currency = 'eur';
    const name = type === 'monthly' ? 'Monthly Access' : 'Lifetime Access';
    const mode = type === 'monthly' ? 'subscription' : 'payment';

    setLoading(true);

    const checkoutUrl = await createCheckoutSession(mode, amount, name, currency);

    setLoading(false);

    if (checkoutUrl) {
      // Open the Stripe Checkout URL in the system browser
      await WebBrowser.openBrowserAsync(checkoutUrl);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#6f6660', padding: 24, paddingTop: 60 }}>
      {loading && (
        <View
          style={{
            ...UI.absoluteFill,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 99,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isNewUser && (
          <Pressable
            onPress={() => router.back()}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'rgba(255,255,255,0.1)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <Text style={{ color: 'white', fontSize: 24 }}>←</Text>
          </Pressable>
        )}
        <Text style={{ color: 'white', fontSize: 32, fontWeight: '900', textAlign: 'center' }}>
          MindMate Premium
        </Text>
        <Text
          style={{ color: 'white', opacity: 0.8, fontSize: 16, textAlign: 'center', marginTop: 12 }}
        >
          Choose a plan to unlock all features.
        </Text>

        <View style={{ marginTop: 40, gap: 20 }}>
          <Pressable
            onPress={selectTrial}
            style={{
              backgroundColor: 'white',
              borderRadius: 24,
              padding: 24,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '900', color: '#6a5e55' }}>
              7-Day Free Trial
            </Text>
            <Text style={{ marginTop: 8, color: '#6a5e55', opacity: 0.7 }}>
              Try all features free for one week.
            </Text>
            <View
              style={{
                marginTop: 20,
                backgroundColor: '#828a6a',
                padding: 14,
                borderRadius: 16,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '900' }}>Start Free Trial</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => buyPlan('monthly')}
            style={{
              backgroundColor: '#828a6a',
              borderRadius: 24,
              padding: 24,
              borderWidth: 2,
              borderColor: 'white',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: '900', color: 'white' }}>
                Monthly Access
              </Text>
              <Text style={{ fontSize: 18, fontWeight: '900', color: 'white' }}>10€/mo</Text>
            </View>
            <Text style={{ marginTop: 8, color: 'white', opacity: 0.9 }}>
              Full access to all AI tools, tracking, and exercises.
            </Text>
            <View
              style={{
                marginTop: 20,
                backgroundColor: 'white',
                padding: 14,
                borderRadius: 16,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Text style={{ color: '#828a6a', fontWeight: '900' }}>Pay with Card or Mobile</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => buyPlan('lifetime')}
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 24,
              padding: 24,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.2)',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>
                Lifetime Access
              </Text>
              <Text style={{ fontWeight: '900', fontSize: 16, color: 'white' }}>£60 / 72€</Text>
            </View>
            <Text style={{ marginTop: 8, color: 'white', opacity: 0.7 }}>
              Unlock everything forever. Best value.
            </Text>
          </Pressable>
        </View>

        <Text
          style={{
            color: 'white',
            opacity: 0.5,
            fontSize: 12,
            textAlign: 'center',
            marginTop: 30,
            paddingHorizontal: 20,
          }}
        >
          By continuing, you agree to our Terms of Service and Privacy Policy. Your trial will
          automatically end after 7 days unless you upgrade.
        </Text>
      </ScrollView>
    </View>
  );
}

const UI = {
  absoluteFill: {
    position: 'absolute' as const,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
};
