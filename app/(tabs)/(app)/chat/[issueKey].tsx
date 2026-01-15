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
import { useLocalSearchParams, router } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { ISSUES } from '@/data/issues';
import { RootState, AppDispatch, showAlert } from '@/store';
import { sendMessage, getAssistantResponse, clearChat } from '@/store/chat';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, UI } from '@/constants/theme';
import { IconSymbol } from '@/components/icon-symbol';

export default function Chat() {
  const { issueKey } = useLocalSearchParams<{ issueKey: string }>();
  const issue = useMemo(() => ISSUES.find((i) => i.key === issueKey), [issueKey]);

  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(
    (state: RootState) => state.chat.messagesByIssue[issueKey ?? 'general'] || [],
  );
  const loading = useSelector((state: RootState) => state.chat.loading);
  const error = useSelector((state: RootState) => state.chat.error);

  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  useEffect(() => {
    if (error) {
      // You could dispatch a showAlert here if you have an alert system
      console.error('Chat error:', error);
    }
  }, [error]);

  async function handleSend() {
    if (!inputText.trim() || loading) return;

    const text = inputText.trim();
    setInputText('');

    const resultAction = await dispatch(
      sendMessage({
        issueKey: issue?.key ?? 'general',
        issueTitle: issue?.title,
        issueTags: issue?.tags,
        text,
      }),
    );

    if (sendMessage.fulfilled.match(resultAction)) {
      dispatch(
        getAssistantResponse({
          issueKey: issue?.key ?? 'general',
          issueTitle: issue?.title,
          issueTags: issue?.tags,
          updatedMessages: resultAction.payload.updatedMessages,
        }),
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View style={{ flex: 1, padding: 20, paddingTop: 18 }}>
        <View
          style={{
            marginTop: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1, marginRight: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: '900', color: colors.text }}>
              {issue?.title ?? 'Chat'}
            </Text>
            <Text style={{ color: colors.mutedText, fontSize: 13, fontWeight: '700' }}>
              AI COACHING ASSISTANT
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {messages.length > 0 && (
              <Pressable
                onPress={() => {
                  dispatch(
                    showAlert({
                      title: 'Clear conversation?',
                      message: 'This will delete all messages for this topic.',
                      actions: [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Clear',
                          style: 'destructive',
                          onPress: () => dispatch(clearChat(issueKey ?? 'general')),
                        },
                      ],
                    }),
                  );
                }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: theme === 'light' ? '#fee2e2' : '#442222',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconSymbol name="trash" size={22} color={theme === 'light' ? '#ef4444' : '#f88'} />
              </Pressable>
            )}
            <Pressable
              onPress={() => router.back()}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: colors.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.text, fontSize: 20, fontWeight: '900' }}>←</Text>
            </Pressable>
          </View>
        </View>

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

        {error && (
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
              {error}
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
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: inputText.trim() && !loading ? colors.primary : colors.divider,
              alignItems: 'center',
              justifyContent: 'center',
            }}
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
