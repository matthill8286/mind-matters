import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Subscription = {
  type: 'trial' | 'monthly' | 'lifetime';
  expiryDate?: string | null;
};

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('auth:subscription:v1');
      if (raw) {
        try {
          setSubscription(JSON.parse(raw));
        } catch {
          setSubscription(null);
        }
      } else {
        setSubscription(null);
      }
    })();
  }, []);

  const isExpired =
    subscription?.type === 'trial' &&
    subscription?.expiryDate != null &&
    new Date(subscription.expiryDate) < new Date();

  const isLifetime = subscription?.type === 'lifetime';

  // A user has full access if they are lifetime OR in an active trial
  const hasFullAccess = !!(isLifetime || (subscription?.type === 'trial' && !isExpired));

  return {
    subscription,
    isExpired,
    isLifetime,
    hasFullAccess,
  };
}
