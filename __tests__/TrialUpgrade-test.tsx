import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TrialUpgrade from '../app/(auth)/trial-upgrade';
import { MockedProvider } from '@apollo/client/testing';
import { SetSubscriptionDocument } from '../gql/graphql';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mocks = [
  {
    request: {
      query: SetSubscriptionDocument,
      variables: {
        input: expect.anything(),
      },
    },
    result: {
      data: {
        setSubscription: {
          type: 'trial',
          expiryDate: '2026-01-23T16:48:00.000Z',
          __typename: 'Subscription',
        },
      },
    },
  },
];

describe('TrialUpgrade Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all plans', () => {
    const { getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <TrialUpgrade />
      </MockedProvider>,
    );

    expect(getByText('MindMate Premium')).toBeTruthy();
    expect(getByText('7-Day Free Trial')).toBeTruthy();
    expect(getByText('Monthly Access')).toBeTruthy();
    expect(getByText('10€/mo')).toBeTruthy();
    expect(getByText('Lifetime Access')).toBeTruthy();
  });

  it('selects 7-day trial and navigates to assessment', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TrialUpgrade />
      </MockedProvider>,
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
      <MockedProvider mocks={mocks} addTypename={false}>
        <TrialUpgrade />
      </MockedProvider>,
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
      <MockedProvider mocks={mocks} addTypename={false}>
        <TrialUpgrade />
      </MockedProvider>,
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
