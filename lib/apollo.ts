import { ApolloClient, InMemoryCache, HttpLink, makeVar } from '@apollo/client';
import { gql } from '../gql';

// You can move this to an environment variable later
const GRAPHQL_ENDPOINT =
  process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT || 'https://your-api-endpoint.com/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

export const GET_MOOD_CHECKINS = gql`
  query GetMoodCheckIns {
    moodCheckIns {
      id
      createdAt
      mood
      energy
      stress
      note
      tags
    }
  }
`;

export const ADD_MOOD_CHECKIN = gql`
  mutation AddMoodCheckIn($input: MoodCheckInInput!) {
    addMoodCheckIn(input: $input) {
      id
      createdAt
      mood
      energy
      stress
      note
      tags
    }
  }
`;

export const DELETE_MOOD_CHECKIN = gql`
  mutation DeleteMoodCheckIn($id: ID!) {
    deleteMoodCheckIn(id: $id)
  }
`;

export const GET_JOURNAL_ENTRIES = gql`
  query GetJournalEntries {
    journalEntries {
      id
      title
      content
      createdAt
      updatedAt
      mood
      tags
    }
  }
`;

export const UPSERT_JOURNAL_ENTRY = gql`
  mutation UpsertJournalEntry($input: JournalEntryInput!) {
    upsertJournalEntry(input: $input) {
      id
      title
      content
      createdAt
      updatedAt
      mood
      tags
    }
  }
`;

export const DELETE_JOURNAL_ENTRY = gql`
  mutation DeleteJournalEntry($id: ID!) {
    deleteJournalEntry(id: $id)
  }
`;

export const GET_STRESS_KIT = gql`
  query GetStressKit {
    stressKit {
      level
      lastCheckIn
      quickPhrase
      triggers
      helpfulActions
      people
      notes
      exercises {
        id
        title
        completed
      }
    }
    stressHistory {
      date
      exerciseId
      title
    }
  }
`;

export const UPDATE_STRESS_KIT = gql`
  mutation UpdateStressKit($input: StressKitInput!) {
    updateStressKit(input: $input) {
      level
      lastCheckIn
      exercises {
        id
        title
        completed
      }
    }
  }
`;

export const ADD_STRESS_COMPLETION = gql`
  mutation AddStressCompletion($exerciseId: ID!, $title: String!) {
    addStressCompletion(exerciseId: $exerciseId, title: $title) {
      date
      exerciseId
      title
    }
  }
`;

export const GET_USER_DATA = gql`
  query GetUserData {
    assessment
    profile
    subscription {
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

export const SET_SUBSCRIPTION = gql`
  mutation SetSubscription($input: SubscriptionInput!) {
    setSubscription(input: $input) {
      type
      expiryDate
    }
  }
`;

export const GET_ALL_DATA = gql`
  query GetAllData {
    moodCheckIns {
      id
      createdAt
      mood
      energy
      stress
      note
      tags
    }
    journalEntries {
      id
      title
      content
      createdAt
      updatedAt
      mood
      tags
    }
    stressKit {
      level
      lastCheckIn
      exercises {
        id
        title
        completed
      }
    }
    stressHistory {
      date
      exerciseId
      title
    }
    assessment
    profile
    subscription {
      type
      expiryDate
    }
    sleepEntries {
      id
      date
      quality
      duration
    }
    mindfulness {
      totalMinutesToday
    }
  }
`;

export const GET_CHAT_MESSAGES = gql`
  query GetChatMessages($issueKey: String!) {
    chatMessages(issueKey: $issueKey) {
      id
      text
      role
      createdAt
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($issueKey: String!, $text: String!) {
    sendMessage(issueKey: $issueKey, text: $text) {
      id
      text
      role
      createdAt
    }
  }
`;

export const CLEAR_CHAT = gql`
  mutation ClearChat($issueKey: String!) {
    clearChat(issueKey: $issueKey)
  }
`;

export interface AlertAction {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
}

export interface AlertState {
  visible: boolean;
  title: string;
  message: string;
  actions: AlertAction[];
}

export const alertVar = makeVar<AlertState>({
  visible: false,
  title: '',
  message: '',
  actions: [],
});

export const isLoadingVar = makeVar<boolean>(false);

export const showAlert = (title: string, message: string, actions?: AlertAction[]) => {
  alertVar({
    visible: true,
    title,
    message,
    actions: actions || [{ text: 'OK' }],
  });
};

export const hideAlert = () => {
  alertVar({
    ...alertVar(),
    visible: false,
  });
};

export const sleepModeVar = makeVar<{
  sleepModeStartISO: string | null;
  suggestedWakeISO: string | null;
}>({
  sleepModeStartISO: null,
  suggestedWakeISO: null,
});

export const setSuggestedWake = (wakeISO: string) => {
  sleepModeVar({
    ...sleepModeVar(),
    suggestedWakeISO: wakeISO,
  });
};

export const GET_SLEEP_ENTRIES = gql`
  query GetSleepEntries {
    sleepEntries {
      id
      date
      quality
      duration
      note
    }
  }
`;

export const ADD_SLEEP_ENTRY = gql`
  mutation AddSleepEntry($input: SleepEntryInput!) {
    addSleepEntry(input: $input) {
      id
      date
      quality
      duration
      note
    }
  }
`;

export const DELETE_SLEEP_ENTRY = gql`
  mutation DeleteSleepEntry($id: ID!) {
    deleteSleepEntry(id: $id)
  }
`;

export const ADD_MINDFUL_MINUTES = gql`
  mutation AddMindfulMinutes($minutes: Int!) {
    addMindfulMinutes(minutes: $minutes) {
      totalMinutesToday
    }
  }
`;

export const GET_MINDFULNESS_HISTORY = gql`
  query GetMindfulnessHistory {
    mindfulnessHistory {
      date
      minutes
    }
  }
`;

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          alert: {
            read() {
              return alertVar();
            },
          },
          isLoading: {
            read() {
              return isLoadingVar();
            },
          },
          sleepMode: {
            read() {
              return sleepModeVar();
            },
          },
        },
      },
    },
  }),
});
