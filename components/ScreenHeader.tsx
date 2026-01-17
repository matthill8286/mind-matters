import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import MenuButton from './MenuButton';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';

export default function ScreenHeader({
  title,
  subtitle,
  rightElement,
  showBack = false,
}: Readonly<{
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  showBack?: boolean;
}>) {
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  return (
    <View style={{ marginTop: Platform.OS === 'ios' ? 26 : 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
          {showBack ? (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                padding: 4,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <MaterialIcons
                name={Platform.OS === 'ios' ? "arrow-back-ios" : "arrow-back"}
                size={24}
                color={colors.text}
              />
            </Pressable>
          ) : (
            <MenuButton />
          )}
          <Text
            style={{
              fontSize: Platform.OS === 'ios' ? 26 : 22,
              fontWeight: Platform.OS === 'ios' ? '900' : '700',
              color: colors.text,
              flexShrink: 1
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {rightElement}
          {!rightElement && !showBack && (
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable
                onPress={() => router.push('/search')}
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <MaterialIcons name="search" size={26} color={colors.text} />
              </Pressable>
              <Pressable
                onPress={() => router.push('/(tabs)/profile')}
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <MaterialIcons name="account-circle" size={26} color={colors.text} />
              </Pressable>
            </View>
          )}
          {showBack && <MenuButton />}
        </View>
      </View>
      {subtitle ? <Text style={{ color: colors.mutedText, marginTop: 8 }}>{subtitle}</Text> : null}
    </View>
  );
}
