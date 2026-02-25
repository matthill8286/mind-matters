import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/icon-symbol';

export default function TabsLayout() {
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
      }}
    >
      {/* Visible tabs */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="text.bubble" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="magnifyingglass.circle.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="note.text" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.2.fill" color={color} />,
        }}
      />

      {/* Hidden from tab bar but present for tab layout persistence */}
      <Tabs.Screen name="stress" options={{ href: null }} />
      <Tabs.Screen name="mood" options={{ href: null }} />
      <Tabs.Screen name="sleep" options={{ href: null }} />
      <Tabs.Screen name="chat/history" options={{ href: null }} />
      <Tabs.Screen name="chat/[issueKey]" options={{ href: null }} />
      <Tabs.Screen name="mindful-hours" options={{ href: null }} />
      <Tabs.Screen name="community" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
      <Tabs.Screen name="profile-edit" options={{ href: null }} />
      <Tabs.Screen name="profile-overview" options={{ href: null }} />
    </Tabs>
  );
}
