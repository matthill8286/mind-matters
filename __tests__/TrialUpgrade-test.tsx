import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TrialUpgrade from '../app/(auth)/trial-upgrade';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/user';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('TrialUpgrade Screen', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
    jest.clearAllMocks();
  });

  it('renders correctly with all plans', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TrialUpgrade />
      </Provider>,
    );

    expect(getByText('MindMate Premium')).toBeTruthy();
    expect(getByText('7-Day Free Trial')).toBeTruthy();
    expect(getByText('Monthly Access')).toBeTruthy();
    expect(getByText('10€/mo')).toBeTruthy();
    expect(getByText('Lifetime Access')).toBeTruthy();
  });

  it('selects 7-day trial and navigates to assessment', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <TrialUpgrade />
      </Provider>,
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
      <Provider store={store}>
        <TrialUpgrade />
      </Provider>,
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
      <Provider store={store}>
        <TrialUpgrade />
      </Provider>,
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
