import { View, Text, Pressable, ScrollView, Platform } from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSubscription } from '@/hooks/useSubscription';
import { Colors, UI } from '@/constants/theme';
import { useGetStressKitQuery } from '@/gql/generated';
import { showAlert } from '@/lib/state';
import { IconSymbol } from '@/components/icon-symbol';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function StressHub() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const { hasFullAccess } = useSubscription();
  const colors = Colors[theme];
  const { data } = useGetStressKitQuery();
  const kit = data?.stressKit || { quickPhrase: '' };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: UI.spacing.xl,
        paddingTop: Platform.OS === 'ios' ? 18 : 8,
      }}
    >
      <ScreenHeader
        title="Stress Management"
        subtitle="Quick tools for calming your body and clearing your mind."
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 22, gap: 12, marginTop: 14 }}>
        <Card
          title="Breathing Coach"
          subtitle="Guided 4-7-8 breathing with animation."
          onPress={() => router.push('/(tabs)/(app)/stress/breathing')}
          icon="air"
          color="#6bbf8e"
        />
        <Card
          title="Body Relaxation"
          subtitle="Exercises to relax the body (video)."
          onPress={() =>
            router.push({ pathname: '/(tabs)/(app)/stress/videos', params: { category: 'body' } })
          }
          icon="fitness-center"
          color="#828a6a"
        />
        <Card
          title="Mind Relaxation"
          subtitle="Exercises to relax the mind (video)."
          onPress={() =>
            router.push({ pathname: '/(tabs)/(app)/stress/videos', params: { category: 'mind' } })
          }
          icon="self-improvement"
          color="#6bbf8e"
        />
        <Card
          title="Grounding 5–4–3–2–1"
          subtitle="Bring attention back to the present (guided checklist)."
          onPress={() => router.push('/(tabs)/(app)/stress/grounding')}
          isLocked={!hasFullAccess}
          icon="touch-app"
          color="#f2a65a"
        />
        <Card
          title="Your Stress Plan"
          subtitle="Build a personal ‘Stress Kit’ you can use any time."
          onPress={() => router.push('/(tabs)/(app)/stress/plan')}
          isLocked={!hasFullAccess}
          icon="assignment"
          color="#9b8df1"
        />

        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: UI.radius.xl,
            padding: 20,
            marginTop: 6,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 5,
            elevation: 2,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: colors.background,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="chat-bubble-outline" size={18} color={colors.primary} />
            </View>
            <Text style={{ fontWeight: '900', color: colors.text, fontSize: 16 }}>
              Your quick phrase
            </Text>
          </View>
          <Text
            style={{
              color: colors.mutedText,
              marginTop: 12,
              fontSize: 16,
              fontStyle: 'italic',
              lineHeight: 24,
            }}
          >
            &quot;{kit.quickPhrase || 'Take a deep breath. This too shall pass.'}&quot;
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Card({
  title,
  subtitle,
  onPress,
  isLocked = false,
  icon,
  color,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
  isLocked?: boolean;
  icon: string;
  color: string;
}) {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  return (
    <Pressable
      onPress={() => {
        if (isLocked) {
          showAlert('Premium Feature', 'Upgrade to lifetime access to unlock this tool.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Upgrade', onPress: () => router.push('/(auth)/trial-upgrade') },
          ]);
          return;
        }
        onPress();
      }}
      style={{
        backgroundColor: colors.card,
        borderRadius: UI.radius.lg,
        padding: 16,
        opacity: isLocked ? 0.7 : 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}
      >
        <MaterialIcons name={icon as any} size={24} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 16, fontWeight: '900', color: colors.text }}>{title}</Text>
          {isLocked && <IconSymbol name="bolt.fill" size={16} color={colors.primary} />}
        </View>
        <Text style={{ color: colors.mutedText, marginTop: 4 }}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}
