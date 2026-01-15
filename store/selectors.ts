import { RootState } from './index';

export function selectMindMateWellnessScore(state: RootState) {
  const { moodCheckIns } = state.mood;
  const { sleepEntries } = state.sleep;
  const { totalMinutesToday } = state.mindfulness;
  const { journalEntries } = state.journal;

  const today = new Date().toISOString().split('T')[0];

  // 1. Mood (30%) - Based on latest check-in or assessment
  let moodScore = 70; // Default baseline
  if (moodCheckIns.length > 0) {
    const latestMood = moodCheckIns[0];
    const moodMap = { Great: 100, Good: 85, Okay: 70, Low: 40, Bad: 20 };
    moodScore = moodMap[latestMood.mood] || 70;
  } else if (state.user.assessment?.mood) {
    const moodMap: Record<string, number> = {
      Amazing: 100,
      Good: 85,
      Okay: 70,
      Low: 40,
      Struggling: 20,
    };
    moodScore = moodMap[state.user.assessment.mood] || 70;
  }

  // 2. Sleep (30%) - Based on latest sleep entry quality or assessment
  let sleepScore = 70; // Default baseline
  if (sleepEntries.length > 0) {
    const latestSleep = sleepEntries[0];
    sleepScore = (latestSleep.quality || 3) * 20; // 1-5 scale to 20-100
  } else if (state.user.assessment?.sleepQuality) {
    sleepScore = state.user.assessment.sleepQuality * 20;
  }

  // 3. Stress (25%) - Based on latest check-in or assessment
  let stressScore = 70; // Default baseline (low stress is better)
  if (moodCheckIns.length > 0) {
    const latestStress = moodCheckIns[0].stress; // 0-10
    stressScore = 100 - latestStress * 10;
  } else if (
    state.user.assessment?.stressLevel !== undefined &&
    state.user.assessment?.stressLevel !== null
  ) {
    stressScore = 100 - state.user.assessment.stressLevel * 10;
  }

  // 4. Mindful minutes (10%) - Goal 10 mins/day
  const mindfulnessScore = Math.min(100, (totalMinutesToday / 10) * 100);

  // 5. Consistency (5%) - Did you check in today? (Mood or Journal)
  const hasMoodToday = moodCheckIns.some((m) => m.createdAt.startsWith(today));
  const hasJournalToday = journalEntries.some((j) => j.createdAt.startsWith(today));
  const consistencyScore = hasMoodToday || hasJournalToday ? 100 : 0;

  // Final Weighted Calculation
  const totalScore = Math.round(
    moodScore * 0.3 +
      sleepScore * 0.3 +
      stressScore * 0.25 +
      mindfulnessScore * 0.1 +
      consistencyScore * 0.05,
  );

  return {
    score: totalScore,
    breakdown: {
      mood: moodScore,
      sleep: sleepScore,
      stress: stressScore,
      mindfulness: mindfulnessScore,
      consistency: consistencyScore,
    },
  };
}
