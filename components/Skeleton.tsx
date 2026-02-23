import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton = ({ width, height, borderRadius, style }: SkeletonProps) => {
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  const skeletonColor = theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';

  return (
    <Animated.View
      style={[
        {
          width: width || '100%',
          height: height || 20,
          borderRadius: borderRadius || 4,
          backgroundColor: skeletonColor,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const SkeletonCircle = ({ size, style }: { size: number; style?: ViewStyle }) => (
  <Skeleton width={size} height={size} borderRadius={size / 2} style={style} />
);

export const SkeletonRect = ({ width, height, borderRadius, style }: SkeletonProps) => (
  <Skeleton width={width} height={height} borderRadius={borderRadius || 12} style={style} />
);
