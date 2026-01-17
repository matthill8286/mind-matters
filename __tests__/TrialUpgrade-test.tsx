import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TrialUpgrade from '../app/(auth)/trial-upgrade';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSetSubscriptionMutation } from '../gql/generated';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

jest.mock('../gql/generated', () => ({
  useSetSubscriptionMutation: jest.fn(),
}));

describe('TrialUpgrade Screen', () => {
  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    (useSetSubscriptionMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isLoading: false,
    });
    mockMutateAsync.mockResolvedValue({
      setSubscription: {
        type: 'trial',
        expiryDate: '2026-01-23T16:48:00.000Z',
        __typename: 'Subscription',
      },
    });
    jest.clearAllMocks();
  });

  it('renders correctly with all plans', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TrialUpgrade />
      </QueryClientProvider>,
    );

    expect(getByText('MindMate Premium')).toBeTruthy();
    expect(getByText('7-Day Free Trial')).toBeTruthy();
    expect(getByText('Monthly Access')).toBeTruthy();
    expect(getByText('10€/mo')).toBeTruthy();
    expect(getByText('Lifetime Access')).toBeTruthy();
  });

  it('selects 7-day trial and navigates to assessment', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TrialUpgrade />
      </QueryClientProvider>,
    );

    fireEvent.press(getByText('Start Free Trial'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'auth:subscription:v1',
        expect.stringContaining('"type":"trial"'),
      );
      expect(router.replace).toHaveBeenCalledWith('/(onboarding)/assessment');
    });
  });

  it('selects monthly plan and navigates to assessment', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TrialUpgrade />
      </QueryClientProvider>,
    );

    fireEvent.press(getByText('Pay with Card or Mobile'));

    await waitFor(
      () => {
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          'auth:subscription:v1',
          expect.stringContaining('"type":"monthly"'),
        );
        expect(router.replace).toHaveBeenCalledWith('/(onboarding)/assessment');
      },
      { timeout: 3000 },
    );
  });

  it('selects lifetime plan and navigates to assessment', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TrialUpgrade />
      </QueryClientProvider>,
    );

    fireEvent.press(getByText('Lifetime Access'));

    await waitFor(
      () => {
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          'auth:subscription:v1',
          expect.stringContaining('"type":"lifetime"'),
        );
        expect(router.replace).toHaveBeenCalledWith('/(onboarding)/assessment');
      },
      { timeout: 3000 },
    );
  });
});
