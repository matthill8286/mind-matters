export interface StressVideo {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  thumbnail?: string;
  category: 'body' | 'mind';
}

export const STRESS_VIDEOS: StressVideo[] = [
  {
    id: 'body-1',
    title: 'Full Body Relaxation',
    subtitle: 'Relieve tension from head to toe.',
    url: 'https://cdn.pixabay.com/video/2021/04/05/70161-534571960_tiny.mp4',
    category: 'body',
  },
  {
    id: 'body-2',
    title: 'Neck & Shoulder Release',
    subtitle: 'Quick exercises for desk workers.',
    url: 'https://cdn.pixabay.com/video/2024/02/21/201385-915421694_tiny.mp4',
    category: 'body',
  },
  {
    id: 'body-3',
    title: 'Gentle Stretching',
    subtitle: 'Flowing movements to open up the body.',
    url: 'https://cdn.pixabay.com/video/2016/09/14/5215-183492576_tiny.mp4',
    category: 'body',
  },
  {
    id: 'mind-1',
    title: 'Deep Breathing Guide',
    subtitle: 'Slow down and find your center.',
    url: 'https://cdn.pixabay.com/video/2021/11/04/94595-645851486_tiny.mp4',
    category: 'mind',
  },
  {
    id: 'mind-2',
    title: 'Mental Clarity',
    subtitle: 'Focus on your breath and clear your thoughts.',
    url: 'https://cdn.pixabay.com/video/2020/07/20/45151-439540026_tiny.mp4',
    category: 'mind',
  },
  {
    id: 'mind-3',
    title: 'Inner Peace',
    subtitle: 'Visualizing a calm and safe space.',
    url: 'https://cdn.pixabay.com/video/2023/10/24/186357-877777174_tiny.mp4',
    category: 'mind',
  },
];
