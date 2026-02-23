export type MenuItem = {
  key: string;
  title: string;
  subtitle: string;
  path: string;
  isPremium?: boolean;
};

export const ITEMS: MenuItem[] = [
  {
    key: 'home',
    title: 'Home & Score',
    subtitle: 'Dashboard and wellbeing snapshot.',
    path: '/(tabs)/home',
  },
  {
    key: 'assessment',
    title: 'Mental Health Assessment',
    subtitle: '14-step check-in flow.',
    path: '/(onboarding)/assessment',
    isPremium: true,
  },
  {
    key: 'stress',
    title: 'Stress Management',
    subtitle: 'Breathing coach, grounding, and a personal stress plan.',
    path: '/(app)/stress',
  },
  {
    key: 'mood',
    title: 'Mood Tracker',
    subtitle: 'Track how you feel over time.',
    path: '/(app)/mood',
  },
  {
    key: 'journal',
    title: 'Mental Health Journal',
    subtitle: 'Write entries, use prompts, and track moods.',
    path: '/(tabs)/journal',
  },
  {
    key: 'sleep',
    title: 'Sleep Quality',
    subtitle: 'Sleep check-ins and routines.',
    path: '/(app)/sleep',
  },
  {
    key: 'mindful',
    title: 'Mindful Hours',
    subtitle: 'Meditations and mindful breaks.',
    path: '/(app)/mindful-hours',
  },
  {
    key: 'notifications',
    title: 'Smart Notifications',
    subtitle: 'Reminders you control.',
    path: '/(app)/notifications',
  },
  {
    key: 'community',
    title: 'Community Support',
    subtitle: 'Peer support space.',
    path: '/(app)/community',
  },
  {
    key: 'chatbot',
    title: 'AI Therapy Chatbot',
    subtitle: 'Chat by topic.',
    path: '/(tabs)/chat',
    isPremium: true,
  },
  {
    key: 'resources',
    title: 'Mindful Resources',
    subtitle: 'Crisis and helpful links.',
    path: '/resources',
  },
  {
    key: 'profile',
    title: 'Profile & Settings',
    subtitle: 'Preferences and help center.',
    path: '/(tabs)/profile',
  },
  {
    key: 'help',
    title: 'Help Center',
    subtitle: 'FAQs and support.',
    path: '/(utils)/help-center',
  },
  {
    key: 'utilities',
    title: 'Error & Utilities',
    subtitle: 'Offline, empty, error screens.',
    path: '/(utils)/utilities',
  },
];
