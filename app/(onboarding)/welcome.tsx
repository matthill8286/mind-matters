import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeComp from '@/components/Welcome';

const SLIDES = [
  {
    step: 'Welcome',
    title: 'Welcome to MindMate!',
    text: 'Your AI companion for mental wellbeing. Supportive conversations, thoughtful guidance, anytime, anywhere.',
  },
  {
    step: 'Step One',
    title: 'Gently personalised support, just for you',
    text: 'Tailored mindfulness and emotional support designed specifically for your unique needs.',
  },
  {
    step: 'Step Two',
    title: "Notice How You're Feeling",
    text: 'Track your moods and emotions over time to better understand your mental health patterns.',
  },
  {
    step: 'Step Three',
    title: 'Talk, Reflect, and Unwind',
    text: 'Engage in meaningful conversations with your AI companion to process your thoughts and feelings.',
  },
  {
    step: 'Step Four',
    title: 'Moments of Calm and Clarity',
    text: 'Discover personalized mindfulness exercises and techniques to help you stay grounded.',
  },
  {
    step: 'Step Five',
    title: "You're Not Alone Here",
    text: 'Join a community of support and find comfort in knowing that others share similar journeys.',
  },
];

const ILLUSTRATIONS = [
  require('@/assets/images/1.png'),
  require('@/assets/images/2.png'),
  require('@/assets/images/3.png'),
  require('@/assets/images/4.png'),
  require('@/assets/images/5.png'),
  require('@/assets/images/6.png'),
];

export default function Welcome() {
  const router = useRouter();
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNext = async () => {
    if (slideIndex < SLIDES.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      await AsyncStorage.setItem('onboarding:seen:v1', 'true');
      router.replace('/(auth)/sign-up');
    }
  };

  const handleBack = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  return (
    <WelcomeComp
      slideIndex={slideIndex}
      slides={SLIDES}
      illustration={ILLUSTRATIONS[slideIndex]}
      onNext={handleNext}
      onBack={slideIndex > 0 ? handleBack : undefined}
    />
  );
}
