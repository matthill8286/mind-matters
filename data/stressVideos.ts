export interface StressVideo {
  id: string;
  title: string;
  subtitle: string;
  url: any;
  thumbnail?: string;
  category: 'body' | 'mind';
}

export const STRESS_VIDEOS: StressVideo[] = [
  {
    id: 'body-1',
    title: 'Full Body Relaxation',
    subtitle: 'Relieve tension from head to toe.',
    url: require('../assets/videos/body-relaxation.mov'),
    category: 'body',
  },
  {
    id: 'body-2',
    title: 'Neck & Shoulder Release',
    subtitle: 'Quick exercises for desk workers.',
    url: require('../assets/videos/yoga-breathing.mov'),
    category: 'body',
  },
  {
    id: 'body-3',
    title: 'Gentle Stretching',
    subtitle: 'Flowing movements to open up the body.',
    url: require('../assets/videos/meditation-class.mov'),
    category: 'body',
  },
  {
    id: 'mind-1',
    title: 'Deep Breathing Guide',
    subtitle: 'Slow down and find your center.',
    url: require('../assets/videos/yoga-breathing.mov'),
    category: 'mind',
  },
  {
    id: 'mind-2',
    title: 'Mental Clarity',
    subtitle: 'Focus on your breath and clear your thoughts.',
    url: require('../assets/videos/woman-meditation.mov'),
    category: 'mind',
  },
  {
    id: 'mind-3',
    title: 'Inner Peace',
    subtitle: 'Visualizing a calm and safe space.',
    url: require('../assets/videos/meditation-class.mov'),
    category: 'mind',
  },
];
