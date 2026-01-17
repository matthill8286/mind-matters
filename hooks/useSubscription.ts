import { useQuery } from '@apollo/client/react';
import { GET_USER_DATA } from '@/lib/apollo';

export function useSubscription() {
  const { data } = useQuery(GET_USER_DATA);
  const subscription = data?.subscription;

  const isExpired =
    subscription?.type === 'trial' &&
    subscription.expiryDate &&
    new Date(subscription.expiryDate) < new Date();

  const isLifetime = subscription?.type === 'lifetime';

  // A user has full access if they are lifetime OR in an active trial
  const hasFullAccess = isLifetime || (subscription?.type === 'trial' && !isExpired);

  return {
    subscription,
    isExpired,
    isLifetime,
    hasFullAccess,
  };
}
