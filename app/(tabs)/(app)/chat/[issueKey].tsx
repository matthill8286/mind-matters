import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import { useLocalSearchParams } from 'expo-router';
import {
  useGetChatMessagesQuery,
  useSendMessageMutation,
  useClearChatMutation,
} from '@/gql/generated';
import { ISSUES } from '@/data/issues';
import { showAlert } from '@/lib/state';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, UI } from '@/constants/theme';
import { IconSymbol } from '@/components/icon-symbol';

export default function Chat() {
  const { issueKey } = useLocalSearchParams<{ issueKey: string }>();
  const issue = useMemo(() => ISSUES.find((i) => i.key === issueKey), [issueKey]);

  const {
    data,
    isPending: queryLoading,
    error,
  } = useGetChatMessagesQuery({ issueKey: issueKey ?? 'general' });
  const { mutateAsync: sendMessageMutation, isPending: sendLoading } = useSendMessageMutation({
    onSuccess: () => {
      // Handle refetch if needed, but TanStack Query usually handles this via cache keys or explicit invalidation
    },
  });
  const { mutateAsync: clearChatMutation } = useClearChatMutation();

  const messages = data?.chatMessages || [];
  const loading = queryLoading || sendLoading;

  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  useEffect(() => {
    if (error) {
      const msg = (error as any)?.message || 'Something went wrong';
      console.error('Chat error:', msg);
    }
  }, [error]);

  async function handleSend() {
    if (!inputText.trim() || loading) return;

    const text = inputText.trim();
    setInputText('');

    await sendMessageMutation({
      issueKey: issue?.key ?? 'general',
      text,
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View style={{ flex: 1, padding: UI.spacing.xl, paddingTop: Platform.OS === 'ios' ? 18 : 8 }}>
        <ScreenHeader
          title={issue?.title ?? 'Chat'}
          subtitle="AI COACHING ASSISTANT"
          showBack
          rightElement={
            messages.length > 0 ? (
              <Pressable
                onPress={() => {
                  showAlert(
                    'Clear conversation?',
                    'This will delete all messages for this topic.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Clear',
                        style: 'destructive',
                        onPress: async () => {
                          await clearChatMutation({ issueKey: issueKey ?? 'general' });
                        },
                      },
                    ],
                  );
                }}
                style={({ pressed }) => ({
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: theme === 'light' ? '#fee2e2' : '#442222',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <IconSymbol name="trash" size={22} color={theme === 'light' ? '#ef4444' : '#f88'} />
              </Pressable>
            ) : null
          }
        />

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, idx) => String(idx)}
          contentContainerStyle={{ paddingVertical: 20, gap: 16 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={
            <View
              style={{
                padding: 24,
                backgroundColor: colors.card,
                borderRadius: 24,
                marginTop: 20,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '800',
                  color: colors.text,
                  fontSize: 16,
                }}
              >
                Start a conversation
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: colors.mutedText,
                  marginTop: 8,
                  lineHeight: 20,
                }}
              >
                How can I help you with {issue?.title.toLowerCase() ?? 'this'} today? It’s a safe,
                private space to explore your thoughts.
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const isUser = item.role === 'user';
            return (
              <View
                style={{
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  backgroundColor: isUser ? colors.primary : colors.card,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 20,
                  borderBottomRightRadius: isUser ? 4 : 20,
                  borderBottomLeftRadius: isUser ? 20 : 4,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <Text
                  style={{
                    color: isUser ? colors.onPrimary : colors.text,
                    fontSize: 16,
                    lineHeight: 22,
                  }}
                >
                  {item.content}
                </Text>
              </View>
            );
          }}
        />

        {!!error && (
          <View
            style={{
              padding: 10,
              backgroundColor: theme === 'light' ? '#fee2e2' : '#442222',
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: theme === 'light' ? '#ef4444' : '#f88',
                fontSize: 14,
                textAlign: 'center',
              }}
            >
              {(error as any)?.message || 'Something went wrong'}
            </Text>
          </View>
        )}

        {loading && (
          <View
            style={{
              alignSelf: 'flex-start',
              padding: 14,
              backgroundColor: colors.card,
              borderRadius: 18,
              borderBottomLeftRadius: 4,
              marginBottom: 12,
            }}
          >
            <ActivityIndicator color={colors.primary} />
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'flex-end',
            marginBottom: Platform.OS === 'ios' ? 20 : 0,
          }}
        >
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message…"
            placeholderTextColor={colors.placeholder}
            multiline
            style={{
              flex: 1,
              backgroundColor: colors.card,
              borderRadius: 24,
              paddingHorizontal: 18,
              paddingVertical: 12,
              maxHeight: 120,
              color: colors.text,
              fontSize: 16,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          />
          <Pressable
            onPress={handleSend}
            disabled={!inputText.trim() || loading}
            style={({ pressed }) => ({
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: inputText.trim() && !loading ? colors.primary : colors.divider,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <IconSymbol
              name="paperplane.fill"
              size={24}
              color={inputText.trim() && !loading ? colors.onPrimary : colors.mutedText}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
