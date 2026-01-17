import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Animated,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { router } from 'expo-router';
import { useSetAssessmentMutation } from '@/gql/generated';
import { showAlert } from '@/lib/state';

import Chips from '@/components/Chips';
import SoundPulse from '@/components/SoundPulse';
import { useRecorder, usePlayer, computeVoiceMetrics } from '@/lib/recorder';
import { MoodCheckIn } from '@/lib/mood';

const TICK_SPACING = 20;

function UnitToggle({
  value,
  onChange,
}: {
  value: 'kg' | 'lbs';
  onChange: (v: 'kg' | 'lbs') => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 4,
        width: 200,
        alignSelf: 'center',
        marginBottom: 40,
      }}
    >
      <Pressable
        onPress={() => onChange('kg')}
        style={{
          flex: 1,
          paddingVertical: 10,
          borderRadius: 22,
          backgroundColor: value === 'kg' ? '#828a6a' : 'transparent',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: value === 'kg' ? 'white' : '#6a5e55', fontWeight: '700' }}>kg</Text>
      </Pressable>
      <Pressable
        onPress={() => onChange('lbs')}
        style={{
          flex: 1,
          paddingVertical: 10,
          borderRadius: 22,
          backgroundColor: value === 'lbs' ? '#828a6a' : 'transparent',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: value === 'lbs' ? 'white' : '#6a5e55', fontWeight: '700' }}>lbs</Text>
      </Pressable>
    </View>
  );
}

function HorizontalRuler({
  min,
  max,
  value,
  onChange,
  step = 1,
  unit = '',
}: {
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
  step?: number;
  unit?: string;
}) {
  const flatListRef = React.useRef<FlatList>(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);

  const data = useMemo(() => {
    const items: number[] = [];
    for (let i = min; i <= max; i += step) {
      items.push(i);
    }
    return [null, ...items, null];
  }, [min, max, step]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / TICK_SPACING);
    const actualIndex = index + 1;
    if (actualIndex >= 1 && actualIndex < data.length - 1) {
      const selected = data[actualIndex];
      if (selected !== null && selected !== value) {
        onChange(selected);
      }
    }
  };

  React.useEffect(() => {
    if (width > 0 && flatListRef.current) {
      const index = Math.max(0, (value - min) / step);
      flatListRef.current.scrollToOffset({ offset: index * TICK_SPACING, animated: false });
    }
  }, [width, min, max, step]);

  return (
    <View
      style={{ alignItems: 'center', width: '100%' }}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 20 }}>
        <Text style={{ fontSize: 80, fontWeight: '900', color: '#6a5e55' }}>{value}</Text>
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#6a5e55', marginLeft: 4 }}>
          {unit}
        </Text>
      </View>

      <View style={{ height: 120, width: '100%', justifyContent: 'center' }}>
        <View
          style={{
            position: 'absolute',
            left: '50%',
            width: 6,
            height: 80,
            backgroundColor: '#828a6a',
            borderRadius: 3,
            zIndex: 10,
            marginLeft: -3,
            top: 0,
          }}
        />

        {width > 0 && (
          <FlatList
            ref={flatListRef}
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={TICK_SPACING}
            decelerationRate="fast"
            onScroll={(e) => {
              scrollX.setValue(e.nativeEvent.contentOffset.x);
              onScroll(e);
            }}
            scrollEventThrottle={16}
            keyExtractor={(_, i) => i.toString()}
            getItemLayout={(_, index) => {
              const paddingWidth = width / 2 - TICK_SPACING / 2;
              let offset = 0;
              let length = TICK_SPACING;

              if (index === 0) {
                length = paddingWidth;
                offset = 0;
              } else if (index === data.length - 1) {
                length = paddingWidth;
                offset = paddingWidth + (data.length - 2) * TICK_SPACING;
              } else {
                length = TICK_SPACING;
                offset = paddingWidth + (index - 1) * TICK_SPACING;
              }

              return { length, offset, index };
            }}
            initialScrollIndex={0}
            renderItem={({ item }) => {
              if (item === null) {
                return <View style={{ width: width / 2 - TICK_SPACING / 2 }} />;
              }
              const isMajor = item % 5 === 0;
              return (
                <View
                  style={{
                    width: TICK_SPACING,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <View
                    style={{
                      width: isMajor ? 3 : 1,
                      height: isMajor ? 40 : 25,
                      backgroundColor: '#6a5e5533',
                      borderRadius: 2,
                    }}
                  />
                  {isMajor && (
                    <Text
                      style={{
                        position: 'absolute',
                        top: 50,
                        fontSize: 12,
                        color: '#6a5e5566',
                        fontWeight: '600',
                        textAlign: 'center',
                        width: 40,
                      }}
                    >
                      {item}
                    </Text>
                  )}
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

function AgePicker({ value, onChange }: { value: string | null; onChange: (val: string) => void }) {
  return (
    <HorizontalRuler
      min={13}
      max={100}
      value={parseInt(value || '13', 10)}
      onChange={(v) => onChange(String(v))}
    />
  );
}

type Assessment = {
  goal?: string | null;
  gender?: string | null;
  age?: string | null;
  weight?: number | null;
  weightUnit?: 'kg' | 'lbs' | null;
  mood?: string | null;
  soughtHelpBefore?: string | null;
  physicalDistress?: string | null;
  physicalDistressNotes?: string | null;
  sleepQuality?: number | null; // 1..5
  takingMeds?: string | null;
  meds?: string | null;
  otherSymptoms?: string | null;
  stressLevel?: number | null; // 0..10
  soundCheck?: {
    uri: string;
    durationMs: number;
    transcript: string;
    metrics: { words: number; wpm: number; fillerCount: number };
  } | null;
  expressionCheck?: {
    uri: string;
    durationMs: number;
    transcript: string;
    metrics: { words: number; wpm: number; fillerCount: number };
    matchScore: number;
  } | null;
  createdAt: string;
};

const YESNO = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
  { label: 'Not sure', value: 'Not sure' },
];

const GENDER = [
  { label: 'Woman', value: 'Woman' },
  { label: 'Man', value: 'Man' },
  { label: 'Non-binary', value: 'Non-binary' },
  { label: 'Prefer not to say', value: 'Prefer not to say' },
];

const AGE = Array.from({ length: 88 }).map((_, i) => {
  const n = 13 + i;
  return { label: String(n), value: String(n) };
});

const WEIGHT = Array.from({ length: 23 }).map((_, i) => {
  const kg = 40 + i * 5;
  return { label: `${kg} kg`, value: `${kg}` };
});

const SOUND_PHRASES = ['I am here, taking a moment for myself.'];

const EXPRESSION_PHRASE = 'I am here, taking a moment for myself.';

type StepKey =
  | 'goal'
  | 'gender'
  | 'age'
  | 'weight'
  | 'mood'
  | 'help'
  | 'physical'
  | 'sleep'
  | 'meds'
  | 'medsSpecify'
  | 'symptoms'
  | 'stress'
  | 'sound'
  | 'expression';

const STEPS: StepKey[] = [
  'goal',
  'gender',
  'age',
  'weight',
  'mood',
  'help',
  'physical',
  'sleep',
  'meds',
  'medsSpecify',
  'symptoms',
  'stress',
  'sound',
  'expression',
];

function RadioOption({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: selected ? '#828a6a' : 'white',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: selected ? 'white' : '#6a5e55',
          flex: 1,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: selected ? 'white' : '#6a5e55',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: selected ? 1 : 0.3,
        }}
      >
        {selected && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: 'white',
            }}
          />
        )}
      </View>
    </Pressable>
  );
}

function PlaybackButton({ uri }: { uri: string }) {
  const { play, pause, isPlaying } = usePlayer(uri);
  return (
    <Pressable
      onPress={() => (isPlaying ? pause() : play())}
      style={{
        marginTop: 20,
        backgroundColor: '#828a6a',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>
        {isPlaying ? 'PAUSE' : 'PLAY RECORDING'}
      </Text>
    </Pressable>
  );
}

export default function AssessmentScreen() {
  const { mutateAsync: saveAssessment } = useSetAssessmentMutation();
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Assessment>({
    createdAt: new Date().toISOString(),
    weight: 70,
    weightUnit: 'kg',
  });

  const { startRecording, stopRecording, isRecording } = useRecorder();
  const [recordingFor, setRecordingFor] = useState<null | 'sound' | 'expression'>(null);
  const [draftTranscript, setDraftTranscript] = useState('');
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);

  useEffect(() => {
    let interval: number;
    if (isRecording && recordingFor === 'sound') {
      const words = SOUND_PHRASES[0].split(/\s+/);
      let currentWordIndex = 0;
      setHighlightedWordIndex(0);

      // Roughly estimate word timing.
      // 7 words in SOUND_PHRASES[0].
      // Let's say 600ms per word to be a bit slower and natural.
      interval = setInterval(() => {
        currentWordIndex++;
        if (currentWordIndex < words.length) {
          setHighlightedWordIndex(currentWordIndex);
        } else {
          // Keep the last word highlighted until recording stops or just clear it?
          // User might still be talking.
          setHighlightedWordIndex(words.length - 1);
          clearInterval(interval);
        }
      }, 600);
    } else {
      setHighlightedWordIndex(-1);
    }
    return () => clearInterval(interval);
  }, [isRecording, recordingFor]);

  const key = STEPS[step];
  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  const canContinue = useMemo(() => {
    if (key === 'goal') return Boolean(a.goal?.trim());
    if (key === 'mood') return Boolean(a.mood?.trim());
    if (key === 'medsSpecify') return a.takingMeds !== 'Yes' || Boolean(a.meds?.trim());
    if (key === 'sound') return Boolean(a.soundCheck);
    if (key === 'expression') return Boolean(a.expressionCheck);
    return true;
  }, [key, a]);

  async function next() {
    if (!canContinue) {
      showAlert('Just one more thing', 'Please fill in this step to continue.');
      return;
    }
    if (step === STEPS.length - 1) {
      await saveAssessment({ input: a });
      router.replace('/(onboarding)/assessment-summary');
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    setDraftTranscript('');
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    setDraftTranscript('');
  }

  async function startRec(kind: 'sound' | 'expression') {
    try {
      setRecordingFor(kind);
      await startRecording();
      // Start a listener or something?
      // Actually expo-audio should be updating the state.
    } catch (e) {
      setRecordingFor(null);
      showAlert('Microphone needed', 'Please allow microphone access to record.');
      console.error('Recording start error:', e);
    }
  }

  async function stopRec() {
    if (!isRecording) return;
    try {
      const { uri, durationMs } = await stopRecording();
      console.log('Recording stopped:', uri, durationMs);
      const transcript = draftTranscript.trim() || SOUND_PHRASES[0].replace(',', ''); // fallback to phrase if empty
      const metrics = computeVoiceMetrics(durationMs, transcript);
      if (recordingFor === 'sound') {
        setA((prev) => ({ ...prev, soundCheck: { uri, durationMs, transcript, metrics } }));
      } else {
        const phrase = EXPRESSION_PHRASE.toLowerCase().replaceAll(/[^a-z\s]/g, '');
        const said = transcript.toLowerCase().replaceAll(/[^a-z\s]/g, '');
        const phraseWords = new Set(phrase.split(/\s+/).filter(Boolean));
        const saidWords = new Set(said.split(/\s+/).filter(Boolean));
        let hit = 0;
        phraseWords.forEach((w) => {
          if (saidWords.has(w)) hit += 1;
        });
        const matchScore = phraseWords.size ? Math.round((hit / phraseWords.size) * 100) : 0;
        setA((prev) => ({
          ...prev,
          expressionCheck: { uri, durationMs, transcript, metrics, matchScore },
        }));
      }
      setRecordingFor(null); // Clear recordingFor after successful stop
      setDraftTranscript(''); // Clear transcript after saving
    } catch (e) {
      setRecordingFor(null);
      showAlert('Recording error', 'Could not save the recording. Please try again.');
      console.error('Recording stop error:', e);
    }
  }

  function renderStep() {
    switch (key) {
      case 'goal':
        return (
          <>
            <Text style={styles.h2}>What would you like support with today?</Text>
            <View style={{ marginTop: 24 }}>
              {[
                'Reduce daily stress',
                'Try guided AI support',
                'Work through difficult experiences',
                'Grow and understand myself better',
                'Just checking things out',
              ].map((opt) => (
                <RadioOption
                  key={opt}
                  label={opt}
                  selected={a.goal === opt}
                  onPress={() => setA((p) => ({ ...p, goal: opt }))}
                />
              ))}
            </View>
            <TextInput
              value={
                [
                  'Reduce daily stress',
                  'Try guided AI support',
                  'Work through difficult experiences',
                  'Grow and understand myself better',
                  'Just checking things out',
                ].includes(a.goal ?? '')
                  ? ''
                  : (a.goal ?? '')
              }
              onChangeText={(t) => setA((p) => ({ ...p, goal: t }))}
              placeholder="Or type your goal…"
              style={styles.input}
            />
          </>
        );
      case 'gender':
        return (
          <>
            <Text style={styles.h2}>What’s your gender?</Text>
            <View style={{ marginTop: 24 }}>
              {GENDER.map((opt) => (
                <RadioOption
                  key={opt.value}
                  label={opt.label}
                  selected={a.gender === opt.value}
                  onPress={() => setA((p) => ({ ...p, gender: opt.value }))}
                />
              ))}
            </View>
          </>
        );
      case 'age':
        return (
          <>
            <Text style={styles.h1}>What’s your age?</Text>
            <View style={{ marginTop: 24 }}>
              <AgePicker value={a.age ?? '13'} onChange={(v) => setA((p) => ({ ...p, age: v }))} />
            </View>
          </>
        );
      case 'weight':
        return (
          <>
            <Text style={styles.h1}>What’s your weight?</Text>
            <View style={{ marginTop: 24 }}>
              <UnitToggle
                value={a.weightUnit ?? 'kg'}
                onChange={(v) => setA((p) => ({ ...p, weightUnit: v }))}
              />
              <HorizontalRuler
                min={a.weightUnit === 'lbs' ? 80 : 40}
                max={a.weightUnit === 'lbs' ? 400 : 200}
                value={a.weight ?? 70}
                unit={a.weightUnit ?? 'kg'}
                onChange={(v) => setA((p) => ({ ...p, weight: v }))}
              />
            </View>
          </>
        );
      case 'mood':
        return (
          <>
            <Text style={styles.h1}>Describe your mood</Text>
            <Text style={styles.sub}>A sentence or two is enough.</Text>
            <TextInput
              value={a.mood ?? ''}
              onChangeText={(t) => setA((p) => ({ ...p, mood: t }))}
              placeholder="e.g., anxious, tired, overwhelmed…"
              multiline
              style={[styles.input, { height: 110 }]}
            />
            <Chips
              options={['Anxious', 'Overwhelmed', 'Low', 'Irritable', 'Numb', 'Okay']}
              value={undefined}
              onChange={(v) =>
                setA((p) => ({
                  ...p,
                  mood: ((p.mood ?? '').trim() + ' ' + (v as string)).trim(),
                }))
              }
            />
          </>
        );
      case 'help':
        return (
          <>
            <Text style={styles.h2}>Have you sought help before?</Text>
            <View style={{ marginTop: 24 }}>
              {YESNO.map((opt) => (
                <RadioOption
                  key={opt.value}
                  label={opt.label}
                  selected={a.soughtHelpBefore === opt.value}
                  onPress={() => setA((p) => ({ ...p, soughtHelpBefore: opt.value }))}
                />
              ))}
            </View>
          </>
        );
      case 'physical':
        return (
          <>
            <Text style={styles.h2}>Experiencing physical distress?</Text>
            <View style={{ marginTop: 24 }}>
              {YESNO.map((opt) => (
                <RadioOption
                  key={opt.value}
                  label={opt.label}
                  selected={a.physicalDistress === opt.value}
                  onPress={() => setA((p) => ({ ...p, physicalDistress: opt.value }))}
                />
              ))}
            </View>
            <TextInput
              value={a.physicalDistressNotes ?? ''}
              onChangeText={(t) => setA((p) => ({ ...p, physicalDistressNotes: t }))}
              placeholder="Optional notes (headache, chest tightness, nausea, etc.)"
              style={styles.input}
            />
          </>
        );
      case 'sleep':
        return (
          <>
            <Text style={styles.h1}>Rate your sleep quality</Text>
            <Text style={styles.sub}>1 = poor, 5 = great</Text>
            <View style={{ marginTop: 24 }}>
              <HorizontalRuler
                min={1}
                max={5}
                value={a.sleepQuality ?? 3}
                onChange={(v) => setA((p) => ({ ...p, sleepQuality: v as 1 | 2 | 3 | 4 | 5 }))}
                step={1}
              />
            </View>
          </>
        );
      case 'meds':
        return (
          <>
            <Text style={styles.h2}>Are you taking meds?</Text>
            <View style={{ marginTop: 24 }}>
              {YESNO.map((opt) => (
                <RadioOption
                  key={opt.value}
                  label={opt.label}
                  selected={a.takingMeds === opt.value}
                  onPress={() =>
                    setA((p) => ({
                      ...p,
                      takingMeds: opt.value,
                      meds: opt.value === 'Yes' ? (p.meds ?? '') : null,
                    }))
                  }
                />
              ))}
            </View>
          </>
        );
      case 'medsSpecify':
        return (
          <>
            <Text style={styles.h1}>Specify meds (if any)</Text>
            <Text style={styles.sub}>If you selected “Yes”, please list them.</Text>
            <TextInput
              value={a.meds ?? ''}
              onChangeText={(t) => setA((p) => ({ ...p, meds: t }))}
              placeholder="Medication names"
              style={styles.input}
            />
          </>
        );
      case 'symptoms':
        return (
          <>
            <Text style={styles.h1}>Other mental health symptoms</Text>
            <Text style={styles.sub}>Anything else you’ve noticed?</Text>
            <TextInput
              value={a.otherSymptoms ?? ''}
              onChangeText={(t) => setA((p) => ({ ...p, otherSymptoms: t }))}
              placeholder="e.g., rumination, panic, low appetite…"
              multiline
              style={[styles.input, { height: 110 }]}
            />
          </>
        );
      case 'stress':
        return (
          <>
            <Text style={styles.h1}>Rate your stress level</Text>
            <Text style={styles.sub}>0 = none, 10 = extreme</Text>
            <View style={{ marginTop: 24 }}>
              <HorizontalRuler
                min={0}
                max={10}
                value={a.stressLevel ?? 5}
                onChange={(v) => setA((p) => ({ ...p, stressLevel: v as MoodCheckIn['stress'] }))}
                step={1}
              />
            </View>
          </>
        );
      case 'sound':
        return (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[styles.h2, { marginBottom: 12 }]}>Voice Check-In</Text>
            <Text style={[styles.sub, { marginBottom: 40 }]}>
              This helps us better understand how you&#39;re feeling today.
            </Text>

            <Pressable
              onPress={() =>
                recordingFor === 'sound' || isRecording ? stopRec() : startRec('sound')
              }
            >
              <SoundPulse active={recordingFor === 'sound' || isRecording} />
              {!isRecording && !a.soundCheck && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>TAP TO START</Text>
                </View>
              )}
            </Pressable>

            {a.soundCheck && !isRecording && <PlaybackButton uri={a.soundCheck.uri} />}

            <View
              style={{
                marginTop: 40,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {SOUND_PHRASES[0].split(/\s+/).map((word, i) => {
                const isHighlighted = i === highlightedWordIndex;
                return (
                  <View
                    key={`${word}-${i}`}
                    style={{
                      backgroundColor: isHighlighted ? '#828a6a' : 'transparent',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 28,
                        fontWeight: '700',
                        color: isHighlighted ? 'white' : '#6a5e55',
                      }}
                    >
                      {word}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        );
      case 'expression':
        return (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[styles.h2, { marginBottom: 12 }]}>Expression Check-In</Text>
            <Text style={[styles.sub, { marginBottom: 40 }]}>
              Read this out loud to help us analyze your tone.
            </Text>

            <Pressable
              onPress={() =>
                recordingFor === 'expression' || isRecording ? stopRec() : startRec('expression')
              }
            >
              <SoundPulse active={recordingFor === 'expression' || isRecording} />
              {!isRecording && !a.expressionCheck && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>TAP TO START</Text>
                </View>
              )}
            </Pressable>

            {a.expressionCheck && !isRecording && <PlaybackButton uri={a.expressionCheck.uri} />}

            <View
              style={{
                marginTop: 40,
                padding: 24,
                borderRadius: 24,
                backgroundColor: '#f2ece6',
                width: '100%',
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: '#6a5e55',
                  textAlign: 'center',
                  lineHeight: 32,
                }}
              >
                {EXPRESSION_PHRASE}
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#6f6660', paddingHorizontal: 24, paddingTop: 60 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable
            onPress={back}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <Text style={{ color: 'white', fontSize: 24 }}>←</Text>
          </Pressable>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Assessment</Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: 'white', fontSize: 13, fontWeight: '700' }}>
            {step + 1} of {STEPS.length}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingVertical: 24,
            paddingHorizontal: 20,
            backgroundColor: 'white',
            borderRadius: 32,
            minHeight: 400,
          }}
        >
          {renderStep()}
        </View>

        <View style={{ marginTop: 30 }}>
          <Pressable
            onPress={next}
            style={{
              paddingVertical: 20,
              borderRadius: 35,
              backgroundColor: canContinue ? '#a07b55' : 'rgba(160,123,85,0.5)',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 4,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 18 }}>
              {step === STEPS.length - 1 ? 'Finish' : 'Continue'}
            </Text>
            <Text style={{ color: 'white', fontSize: 20 }}>→</Text>
          </Pressable>
        </View>

        {step < 5 && (
          <Pressable
            onPress={() => router.replace('/(onboarding)/assessment-summary')}
            style={{ marginTop: 20 }}
          >
            <Text
              style={{ color: '#a07b55', opacity: 0.65, textAlign: 'center', fontWeight: '700' }}
            >
              Skip assessment
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles: any = {
  h1: { fontSize: 32, fontWeight: '900', marginTop: 4, textAlign: 'center', color: '#6a5e55' },
  h2: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
    textAlign: 'center',
    color: '#6a5e55',
    lineHeight: 34,
  },
  sub: { opacity: 0.7, marginTop: 8, textAlign: 'center', color: '#6a5e55', fontSize: 15 },
  input: { marginTop: 14, padding: 12, borderRadius: 16, backgroundColor: '#f2f2f2' },
  primaryBtn: { padding: 16, borderRadius: 18, alignItems: 'center' },
  primaryBtnText: { color: 'white', fontWeight: '900' },
};
