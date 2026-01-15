import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../app/(tabs)/home';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { router } from 'expo-router';

import { useSubscription } from '../hooks/useSubscription';

// Mock selectors and store
const mockWellnessScore = {
  score: 85,
  breakdown: { mood: 80, sleep: 90, stress: 10, mindful: 100, consistency: 100 },
};

jest.mock('../store/selectors', () => ({
  selectMindMateWellnessScore: () => mockWellnessScore,
}));

jest.mock('../hooks/useSubscription');

// Mock ScreenHeader to avoid deeper complexity
jest.mock('../components/ScreenHeader', () => {
  const { View, Text } = require('react-native');
  return (props: any) => (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
});

describe('Home Screen', () => {
  let store: any;

  beforeEach(() => {
    (useSubscription as jest.Mock).mockReturnValue({ isExpired: false, hasFullAccess: true });
    store = configureStore({
      reducer: {
        mood: (state = { moodCheckIns: [] }) => state,
        journal: (state = { journalEntries: [] }) => state,
        user: (state = { assessment: {}, profile: {} }) => state,
      },
    });
    jest.clearAllMocks();
  });

  it('renders wellness scores and quick actions', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Wellness Snapshot')).toBeTruthy();
    expect(getByText('85')).toBeTruthy(); // MindMate Wellness Score
    expect(getByText('90')).toBeTruthy(); // Stress Load (100 - 10)
    expect(getByText('10')).toBeTruthy(); // Sleep Quality (100 - 90) - Wait, in home.tsx it says 100 - wellness.breakdown.sleep
    // In home.tsx: score={100 - wellness.breakdown.sleep}
    // If breakdown.sleep is 90, score is 10. Correct.

    expect(getByText('Quick actions')).toBeTruthy();
    expect(getByText('Stress toolkit')).toBeTruthy();
    expect(getByText('Mood check-in')).toBeTruthy();
  });

  it('navigates to stress toolkit when pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    fireEvent.press(getByText('Stress toolkit'));
    expect(router.push).toHaveBeenCalledWith('/(tabs)/(app)/stress');
  });

  it('shows trial expired banner when expired', () => {
    (useSubscription as jest.Mock).mockReturnValue({ isExpired: true, hasFullAccess: false });

    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    expect(getByText('Trial Expired')).toBeTruthy();
    fireEvent.press(getByText('Upgrade to lifetime access to unlock all features.'));
    expect(router.push).toHaveBeenCalledWith('/(auth)/trial-upgrade');
  });
});
