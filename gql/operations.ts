const gql = (strings: any, ...values: any) => strings.join('');

export const GET_ALL_DATA = gql`
  query GetAllData {
    moodCheckIns {
      id
      mood
      energy
      stress
      tags
      note
      createdAt
    }
    journalEntries {
      id
      title
      content
      mood
      tags
      createdAt
      updatedAt
    }
    assessment
    mindfulness {
      totalMinutesToday
    }
    mindfulnessHistory {
      date
      minutes
    }
    stressHistory {
      title
      exerciseId
      date
    }
    stressKit {
      level
      exercises {
        id
        title
        completed
      }
      triggers
      people
      helpfulActions
      quickPhrase
      notes
      lastCheckIn
    }
    subscription {
      type
      expiryDate
    }
    profile
  }
`;

export const GET_USER_DATA = gql`
  query GetUserData {
    profile
    subscription {
      type
      expiryDate
    }
  }
`;

export const GET_JOURNAL_ENTRIES = gql`
  query GetJournalEntries {
    journalEntries {
      id
      title
      content
      mood
      tags
      createdAt
      updatedAt
    }
  }
`;

export const GET_SLEEP_ENTRIES = gql`
  query GetSleepEntries {
    sleepEntries {
      id
      duration
      quality
      note
      date
    }
  }
`;

export const GET_STRESS_KIT = gql`
  query GetStressKit {
    stressKit {
      level
      exercises {
        id
        title
        completed
      }
      triggers
      people
      helpfulActions
      quickPhrase
      notes
      lastCheckIn
    }
  }
`;

export const SET_SUBSCRIPTION = gql`
  mutation SetSubscription($input: SubscriptionInput!) {
    setSubscription(input: $input) {
      type
      expiryDate
    }
  }
`;

export const SET_ASSESSMENT = gql`
  mutation SetAssessment($input: JSON!) {
    setAssessment(input: $input)
  }
`;

export const SET_PROFILE = gql`
  mutation SetProfile($input: JSON!) {
    setProfile(input: $input)
  }
`;

export const ADD_SLEEP_ENTRY = gql`
  mutation AddSleepEntry($input: SleepEntryInput!) {
    addSleepEntry(input: $input) {
      id
      duration
      quality
      note
      date
    }
  }
`;

export const ADD_STRESS_COMPLETION = gql`
  mutation AddStressCompletion($exerciseId: ID!, $title: String!) {
    addStressCompletion(exerciseId: $exerciseId, title: $title) {
      exerciseId
      title
      date
    }
  }
`;

export const GET_MOOD_CHECKINS = gql`
  query GetMoodCheckIns {
    moodCheckIns {
      id
      mood
      energy
      stress
      tags
      note
      createdAt
    }
  }
`;

export const DELETE_JOURNAL_ENTRY = gql`
  mutation DeleteJournalEntry($id: ID!) {
    deleteJournalEntry(id: $id)
  }
`;

export const DELETE_MOOD_CHECKIN = gql`
  mutation DeleteMoodCheckIn($id: ID!) {
    deleteMoodCheckIn(id: $id)
  }
`;

export const ADD_MINDFUL_MINUTES = gql`
  mutation AddMindfulMinutes($minutes: Int!) {
    addMindfulMinutes(minutes: $minutes) {
      totalMinutesToday
    }
  }
`;

export const GET_CHAT_MESSAGES = gql`
  query GetChatMessages($issueKey: String!) {
    chatMessages(issueKey: $issueKey) {
      id
      role
      content
      text
      createdAt
    }
  }
`;

export const ADD_MOOD_CHECKIN = gql`
  mutation AddMoodCheckIn($input: MoodCheckInInput!) {
    addMoodCheckIn(input: $input) {
      id
      mood
      energy
      stress
      tags
      note
      createdAt
    }
  }
`;

export const UPSERT_JOURNAL_ENTRY = gql`
  mutation UpsertJournalEntry($input: JournalEntryInput!) {
    upsertJournalEntry(input: $input) {
      id
      title
      content
      mood
      tags
      createdAt
      updatedAt
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($issueKey: String!, $content: String, $text: String) {
    sendMessage(issueKey: $issueKey, content: $content, text: $text) {
      id
      role
      content
      text
      createdAt
    }
  }
`;
