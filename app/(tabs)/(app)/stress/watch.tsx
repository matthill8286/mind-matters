import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, UI } from '@/constants/theme';
import { STRESS_VIDEOS } from '@/data/stressVideos';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const QUOTES = [
  'Take a deep breath and let go of what you cannot control.',
  'Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.',
  'Breathe in peace, breathe out tension.',
  'You are doing enough. You are enough.',
  'In the middle of every difficulty lies opportunity.',
  'Be kind to your mind.',
  'Quiet the mind, and the soul will speak.',
  'Peace comes from within. Do not seek it without.',
];

export default function WatchVideoScreen() {
  const { videoId } = useLocalSearchParams<{ videoId: string }>();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  const video = STRESS_VIDEOS.find((v) => v.id === videoId);

  const player = useVideoPlayer(video?.url, (p) => {
    p.loop = true;
    p.play();
  });

  const randomQuote = useMemo(() => {
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }, []);

  if (!video) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text style={{ color: colors.text }}>Video not found.</Text>
        <Pressable onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: colors.primary, fontWeight: '900' }}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: colors.card }]}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={[styles.title, { color: colors.text }]}>{video.title}</Text>
        </View>

        <View style={styles.videoContainer}>
          <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
        </View>

        <View style={[styles.quoteCard, { backgroundColor: colors.card }]}>
          <MaterialIcons
            name="format-quote"
            size={32}
            color={colors.primary}
            style={{ opacity: 0.3 }}
          />
          <Text style={[styles.quoteText, { color: colors.text }]}>{randomQuote}</Text>
          <Text style={[styles.videoSubtitle, { color: colors.mutedText }]}>{video.subtitle}</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: UI.spacing.xl,
    gap: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    flex: 1,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  quoteCard: {
    margin: UI.spacing.xl,
    padding: 24,
    borderRadius: UI.radius.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  quoteText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 26,
    marginBottom: 16,
  },
  videoSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
});
