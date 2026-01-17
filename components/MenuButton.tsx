import React from 'react';
import { Pressable } from 'react-native';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function MenuButton() {
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  return (
    <Pressable
      onPress={() => router.push('/menu')}
      style={({ pressed }) => ({
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 14,
        opacity: pressed ? 0.7 : 1,
      })}
      accessibilityRole="button"
      accessibilityLabel="Open menu"
    >
      <MaterialIcons name="menu" size={26} color={colors.text} />
    </Pressable>
  );
}
