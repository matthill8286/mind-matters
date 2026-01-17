import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT as string, {
    method: "POST",
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  text?: Maybe<Scalars['String']['output']>;
};

export type Exercise = {
  __typename?: 'Exercise';
  completed: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type JournalEntry = {
  __typename?: 'JournalEntry';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  mood?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type JournalEntryInput = {
  content: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  mood?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type Mindfulness = {
  __typename?: 'Mindfulness';
  totalMinutesToday: Scalars['Int']['output'];
};

export type MindfulnessEntry = {
  __typename?: 'MindfulnessEntry';
  date: Scalars['DateTime']['output'];
  minutes: Scalars['Int']['output'];
};

export type MoodCheckIn = {
  __typename?: 'MoodCheckIn';
  createdAt: Scalars['DateTime']['output'];
  energy: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  mood: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  stress: Scalars['Int']['output'];
  tags: Array<Scalars['String']['output']>;
};

export type MoodCheckInInput = {
  energy: Scalars['Int']['input'];
  mood: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  stress: Scalars['Int']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMindfulMinutes: Mindfulness;
  addMoodCheckIn: MoodCheckIn;
  addSleepEntry: SleepEntry;
  addStressCompletion: StressHistory;
  clearChat: Scalars['Boolean']['output'];
  deleteJournalEntry: Scalars['Boolean']['output'];
  deleteMoodCheckIn: Scalars['Boolean']['output'];
  deleteSleepEntry: Scalars['Boolean']['output'];
  sendMessage: ChatMessage;
  setAssessment?: Maybe<Scalars['JSON']['output']>;
  setProfile?: Maybe<Scalars['JSON']['output']>;
  setSubscription: Subscription;
  updateStressKit: StressKit;
  upsertJournalEntry: JournalEntry;
};


export type MutationAddMindfulMinutesArgs = {
  minutes: Scalars['Int']['input'];
};


export type MutationAddMoodCheckInArgs = {
  input: MoodCheckInInput;
};


export type MutationAddSleepEntryArgs = {
  input: SleepEntryInput;
};


export type MutationAddStressCompletionArgs = {
  exerciseId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationClearChatArgs = {
  issueKey: Scalars['String']['input'];
};


export type MutationDeleteJournalEntryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMoodCheckInArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSleepEntryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSendMessageArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  issueKey: Scalars['String']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetAssessmentArgs = {
  input: Scalars['JSON']['input'];
};


export type MutationSetProfileArgs = {
  input: Scalars['JSON']['input'];
};


export type MutationSetSubscriptionArgs = {
  input: SubscriptionInput;
};


export type MutationUpdateStressKitArgs = {
  input: StressKitInput;
};


export type MutationUpsertJournalEntryArgs = {
  input: JournalEntryInput;
};

export type Query = {
  __typename?: 'Query';
  assessment?: Maybe<Scalars['JSON']['output']>;
  chatMessages: Array<ChatMessage>;
  journalEntries: Array<JournalEntry>;
  mindfulness: Mindfulness;
  mindfulnessHistory: Array<MindfulnessEntry>;
  moodCheckIns: Array<MoodCheckIn>;
  profile?: Maybe<Scalars['JSON']['output']>;
  sleepEntries: Array<SleepEntry>;
  stressHistory: Array<StressHistory>;
  stressKit: StressKit;
  subscription?: Maybe<Subscription>;
};


export type QueryChatMessagesArgs = {
  issueKey: Scalars['String']['input'];
};

export type SleepEntry = {
  __typename?: 'SleepEntry';
  date: Scalars['DateTime']['output'];
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  quality: Scalars['Int']['output'];
};

export type SleepEntryInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  duration: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  quality: Scalars['Int']['input'];
};

export type StressHistory = {
  __typename?: 'StressHistory';
  date: Scalars['DateTime']['output'];
  exerciseId: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type StressKit = {
  __typename?: 'StressKit';
  exercises: Array<Exercise>;
  helpfulActions?: Maybe<Array<Scalars['String']['output']>>;
  lastCheckIn?: Maybe<Scalars['DateTime']['output']>;
  level: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  people?: Maybe<Array<Scalars['String']['output']>>;
  quickPhrase?: Maybe<Scalars['String']['output']>;
  triggers?: Maybe<Array<Scalars['String']['output']>>;
};

export type StressKitInput = {
  helpfulActions?: InputMaybe<Array<Scalars['String']['input']>>;
  level?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  people?: InputMaybe<Array<Scalars['String']['input']>>;
  quickPhrase?: InputMaybe<Scalars['String']['input']>;
  triggers?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  type: Scalars['String']['output'];
};

export type SubscriptionInput = {
  expiryDate?: InputMaybe<Scalars['DateTime']['input']>;
  type: Scalars['String']['input'];
};

export type GetAllDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDataQuery = { __typename?: 'Query', assessment?: any | null, profile?: any | null, moodCheckIns: Array<{ __typename?: 'MoodCheckIn', id: string, mood: string, energy: number, stress: number, tags: Array<string>, note?: string | null, createdAt: any }>, journalEntries: Array<{ __typename?: 'JournalEntry', id: string, title: string, content: string, mood?: string | null, tags?: Array<string> | null, createdAt: any, updatedAt: any }>, mindfulness: { __typename?: 'Mindfulness', totalMinutesToday: number }, mindfulnessHistory: Array<{ __typename?: 'MindfulnessEntry', date: any, minutes: number }>, stressHistory: Array<{ __typename?: 'StressHistory', title: string, exerciseId: string, date: any }>, stressKit: { __typename?: 'StressKit', level: number, triggers?: Array<string> | null, people?: Array<string> | null, helpfulActions?: Array<string> | null, quickPhrase?: string | null, notes?: string | null, lastCheckIn?: any | null, exercises: Array<{ __typename?: 'Exercise', id: string, title: string, completed: boolean }> }, subscription?: { __typename?: 'Subscription', type: string, expiryDate?: any | null } | null };

export type GetUserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDataQuery = { __typename?: 'Query', profile?: any | null, subscription?: { __typename?: 'Subscription', type: string, expiryDate?: any | null } | null };

export type GetJournalEntriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJournalEntriesQuery = { __typename?: 'Query', journalEntries: Array<{ __typename?: 'JournalEntry', id: string, title: string, content: string, mood?: string | null, tags?: Array<string> | null, createdAt: any, updatedAt: any }> };

export type GetSleepEntriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSleepEntriesQuery = { __typename?: 'Query', sleepEntries: Array<{ __typename?: 'SleepEntry', id: string, duration: number, quality: number, note?: string | null, date: any }> };

export type GetStressKitQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStressKitQuery = { __typename?: 'Query', stressKit: { __typename?: 'StressKit', level: number, triggers?: Array<string> | null, people?: Array<string> | null, helpfulActions?: Array<string> | null, quickPhrase?: string | null, notes?: string | null, lastCheckIn?: any | null, exercises: Array<{ __typename?: 'Exercise', id: string, title: string, completed: boolean }> } };

export type SetSubscriptionMutationVariables = Exact<{
  input: SubscriptionInput;
}>;


export type SetSubscriptionMutation = { __typename?: 'Mutation', setSubscription: { __typename?: 'Subscription', type: string, expiryDate?: any | null } };

export type SetAssessmentMutationVariables = Exact<{
  input: Scalars['JSON']['input'];
}>;


export type SetAssessmentMutation = { __typename?: 'Mutation', setAssessment?: any | null };

export type SetProfileMutationVariables = Exact<{
  input: Scalars['JSON']['input'];
}>;


export type SetProfileMutation = { __typename?: 'Mutation', setProfile?: any | null };

export type AddSleepEntryMutationVariables = Exact<{
  input: SleepEntryInput;
}>;


export type AddSleepEntryMutation = { __typename?: 'Mutation', addSleepEntry: { __typename?: 'SleepEntry', id: string, duration: number, quality: number, note?: string | null, date: any } };

export type AddStressCompletionMutationVariables = Exact<{
  exerciseId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}>;


export type AddStressCompletionMutation = { __typename?: 'Mutation', addStressCompletion: { __typename?: 'StressHistory', exerciseId: string, title: string, date: any } };

export type GetMoodCheckInsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMoodCheckInsQuery = { __typename?: 'Query', moodCheckIns: Array<{ __typename?: 'MoodCheckIn', id: string, mood: string, energy: number, stress: number, tags: Array<string>, note?: string | null, createdAt: any }> };

export type DeleteJournalEntryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteJournalEntryMutation = { __typename?: 'Mutation', deleteJournalEntry: boolean };

export type DeleteMoodCheckInMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteMoodCheckInMutation = { __typename?: 'Mutation', deleteMoodCheckIn: boolean };

export type AddMindfulMinutesMutationVariables = Exact<{
  minutes: Scalars['Int']['input'];
}>;


export type AddMindfulMinutesMutation = { __typename?: 'Mutation', addMindfulMinutes: { __typename?: 'Mindfulness', totalMinutesToday: number } };

export type GetChatMessagesQueryVariables = Exact<{
  issueKey: Scalars['String']['input'];
}>;


export type GetChatMessagesQuery = { __typename?: 'Query', chatMessages: Array<{ __typename?: 'ChatMessage', id: string, role: string, content?: string | null, text?: string | null, createdAt: any }> };

export type AddMoodCheckInMutationVariables = Exact<{
  input: MoodCheckInInput;
}>;


export type AddMoodCheckInMutation = { __typename?: 'Mutation', addMoodCheckIn: { __typename?: 'MoodCheckIn', id: string, mood: string, energy: number, stress: number, tags: Array<string>, note?: string | null, createdAt: any } };

export type UpsertJournalEntryMutationVariables = Exact<{
  input: JournalEntryInput;
}>;


export type UpsertJournalEntryMutation = { __typename?: 'Mutation', upsertJournalEntry: { __typename?: 'JournalEntry', id: string, title: string, content: string, mood?: string | null, tags?: Array<string> | null, createdAt: any, updatedAt: any } };

export type SendMessageMutationVariables = Exact<{
  issueKey: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'ChatMessage', id: string, role: string, content?: string | null, text?: string | null, createdAt: any } };

export type ClearChatMutationVariables = Exact<{
  issueKey: Scalars['String']['input'];
}>;


export type ClearChatMutation = { __typename?: 'Mutation', clearChat: boolean };

export type UpdateStressKitMutationVariables = Exact<{
  input: StressKitInput;
}>;


export type UpdateStressKitMutation = { __typename?: 'Mutation', updateStressKit: { __typename?: 'StressKit', level: number, triggers?: Array<string> | null, people?: Array<string> | null, helpfulActions?: Array<string> | null, quickPhrase?: string | null, notes?: string | null } };

export type GetMindfulnessHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMindfulnessHistoryQuery = { __typename?: 'Query', mindfulnessHistory: Array<{ __typename?: 'MindfulnessEntry', date: any, minutes: number }> };



export const GetAllDataDocument = `
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

export const useGetAllDataQuery = <
      TData = GetAllDataQuery,
      TError = unknown
    >(
      variables?: GetAllDataQueryVariables,
      options?: UseQueryOptions<GetAllDataQuery, TError, TData>
    ) => {
    
    return useQuery<GetAllDataQuery, TError, TData>(
      variables === undefined ? ['GetAllData'] : ['GetAllData', variables],
      fetcher<GetAllDataQuery, GetAllDataQueryVariables>(GetAllDataDocument, variables),
      options
    )};

export const GetUserDataDocument = `
    query GetUserData {
  profile
  subscription {
    type
    expiryDate
  }
}
    `;

export const useGetUserDataQuery = <
      TData = GetUserDataQuery,
      TError = unknown
    >(
      variables?: GetUserDataQueryVariables,
      options?: UseQueryOptions<GetUserDataQuery, TError, TData>
    ) => {
    
    return useQuery<GetUserDataQuery, TError, TData>(
      variables === undefined ? ['GetUserData'] : ['GetUserData', variables],
      fetcher<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, variables),
      options
    )};

export const GetJournalEntriesDocument = `
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

export const useGetJournalEntriesQuery = <
      TData = GetJournalEntriesQuery,
      TError = unknown
    >(
      variables?: GetJournalEntriesQueryVariables,
      options?: UseQueryOptions<GetJournalEntriesQuery, TError, TData>
    ) => {
    
    return useQuery<GetJournalEntriesQuery, TError, TData>(
      variables === undefined ? ['GetJournalEntries'] : ['GetJournalEntries', variables],
      fetcher<GetJournalEntriesQuery, GetJournalEntriesQueryVariables>(GetJournalEntriesDocument, variables),
      options
    )};

export const GetSleepEntriesDocument = `
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

export const useGetSleepEntriesQuery = <
      TData = GetSleepEntriesQuery,
      TError = unknown
    >(
      variables?: GetSleepEntriesQueryVariables,
      options?: UseQueryOptions<GetSleepEntriesQuery, TError, TData>
    ) => {
    
    return useQuery<GetSleepEntriesQuery, TError, TData>(
      variables === undefined ? ['GetSleepEntries'] : ['GetSleepEntries', variables],
      fetcher<GetSleepEntriesQuery, GetSleepEntriesQueryVariables>(GetSleepEntriesDocument, variables),
      options
    )};

export const GetStressKitDocument = `
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

export const useGetStressKitQuery = <
      TData = GetStressKitQuery,
      TError = unknown
    >(
      variables?: GetStressKitQueryVariables,
      options?: UseQueryOptions<GetStressKitQuery, TError, TData>
    ) => {
    
    return useQuery<GetStressKitQuery, TError, TData>(
      variables === undefined ? ['GetStressKit'] : ['GetStressKit', variables],
      fetcher<GetStressKitQuery, GetStressKitQueryVariables>(GetStressKitDocument, variables),
      options
    )};

export const SetSubscriptionDocument = `
    mutation SetSubscription($input: SubscriptionInput!) {
  setSubscription(input: $input) {
    type
    expiryDate
  }
}
    `;

export const useSetSubscriptionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SetSubscriptionMutation, TError, SetSubscriptionMutationVariables, TContext>) => {
    
    return useMutation<SetSubscriptionMutation, TError, SetSubscriptionMutationVariables, TContext>(
      ['SetSubscription'],
      (variables?: SetSubscriptionMutationVariables) => fetcher<SetSubscriptionMutation, SetSubscriptionMutationVariables>(SetSubscriptionDocument, variables)(),
      options
    )};

export const SetAssessmentDocument = `
    mutation SetAssessment($input: JSON!) {
  setAssessment(input: $input)
}
    `;

export const useSetAssessmentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SetAssessmentMutation, TError, SetAssessmentMutationVariables, TContext>) => {
    
    return useMutation<SetAssessmentMutation, TError, SetAssessmentMutationVariables, TContext>(
      ['SetAssessment'],
      (variables?: SetAssessmentMutationVariables) => fetcher<SetAssessmentMutation, SetAssessmentMutationVariables>(SetAssessmentDocument, variables)(),
      options
    )};

export const SetProfileDocument = `
    mutation SetProfile($input: JSON!) {
  setProfile(input: $input)
}
    `;

export const useSetProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SetProfileMutation, TError, SetProfileMutationVariables, TContext>) => {
    
    return useMutation<SetProfileMutation, TError, SetProfileMutationVariables, TContext>(
      ['SetProfile'],
      (variables?: SetProfileMutationVariables) => fetcher<SetProfileMutation, SetProfileMutationVariables>(SetProfileDocument, variables)(),
      options
    )};

export const AddSleepEntryDocument = `
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

export const useAddSleepEntryMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddSleepEntryMutation, TError, AddSleepEntryMutationVariables, TContext>) => {
    
    return useMutation<AddSleepEntryMutation, TError, AddSleepEntryMutationVariables, TContext>(
      ['AddSleepEntry'],
      (variables?: AddSleepEntryMutationVariables) => fetcher<AddSleepEntryMutation, AddSleepEntryMutationVariables>(AddSleepEntryDocument, variables)(),
      options
    )};

export const AddStressCompletionDocument = `
    mutation AddStressCompletion($exerciseId: ID!, $title: String!) {
  addStressCompletion(exerciseId: $exerciseId, title: $title) {
    exerciseId
    title
    date
  }
}
    `;

export const useAddStressCompletionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddStressCompletionMutation, TError, AddStressCompletionMutationVariables, TContext>) => {
    
    return useMutation<AddStressCompletionMutation, TError, AddStressCompletionMutationVariables, TContext>(
      ['AddStressCompletion'],
      (variables?: AddStressCompletionMutationVariables) => fetcher<AddStressCompletionMutation, AddStressCompletionMutationVariables>(AddStressCompletionDocument, variables)(),
      options
    )};

export const GetMoodCheckInsDocument = `
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

export const useGetMoodCheckInsQuery = <
      TData = GetMoodCheckInsQuery,
      TError = unknown
    >(
      variables?: GetMoodCheckInsQueryVariables,
      options?: UseQueryOptions<GetMoodCheckInsQuery, TError, TData>
    ) => {
    
    return useQuery<GetMoodCheckInsQuery, TError, TData>(
      variables === undefined ? ['GetMoodCheckIns'] : ['GetMoodCheckIns', variables],
      fetcher<GetMoodCheckInsQuery, GetMoodCheckInsQueryVariables>(GetMoodCheckInsDocument, variables),
      options
    )};

export const DeleteJournalEntryDocument = `
    mutation DeleteJournalEntry($id: ID!) {
  deleteJournalEntry(id: $id)
}
    `;

export const useDeleteJournalEntryMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteJournalEntryMutation, TError, DeleteJournalEntryMutationVariables, TContext>) => {
    
    return useMutation<DeleteJournalEntryMutation, TError, DeleteJournalEntryMutationVariables, TContext>(
      ['DeleteJournalEntry'],
      (variables?: DeleteJournalEntryMutationVariables) => fetcher<DeleteJournalEntryMutation, DeleteJournalEntryMutationVariables>(DeleteJournalEntryDocument, variables)(),
      options
    )};

export const DeleteMoodCheckInDocument = `
    mutation DeleteMoodCheckIn($id: ID!) {
  deleteMoodCheckIn(id: $id)
}
    `;

export const useDeleteMoodCheckInMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteMoodCheckInMutation, TError, DeleteMoodCheckInMutationVariables, TContext>) => {
    
    return useMutation<DeleteMoodCheckInMutation, TError, DeleteMoodCheckInMutationVariables, TContext>(
      ['DeleteMoodCheckIn'],
      (variables?: DeleteMoodCheckInMutationVariables) => fetcher<DeleteMoodCheckInMutation, DeleteMoodCheckInMutationVariables>(DeleteMoodCheckInDocument, variables)(),
      options
    )};

export const AddMindfulMinutesDocument = `
    mutation AddMindfulMinutes($minutes: Int!) {
  addMindfulMinutes(minutes: $minutes) {
    totalMinutesToday
  }
}
    `;

export const useAddMindfulMinutesMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddMindfulMinutesMutation, TError, AddMindfulMinutesMutationVariables, TContext>) => {
    
    return useMutation<AddMindfulMinutesMutation, TError, AddMindfulMinutesMutationVariables, TContext>(
      ['AddMindfulMinutes'],
      (variables?: AddMindfulMinutesMutationVariables) => fetcher<AddMindfulMinutesMutation, AddMindfulMinutesMutationVariables>(AddMindfulMinutesDocument, variables)(),
      options
    )};

export const GetChatMessagesDocument = `
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

export const useGetChatMessagesQuery = <
      TData = GetChatMessagesQuery,
      TError = unknown
    >(
      variables: GetChatMessagesQueryVariables,
      options?: UseQueryOptions<GetChatMessagesQuery, TError, TData>
    ) => {
    
    return useQuery<GetChatMessagesQuery, TError, TData>(
      ['GetChatMessages', variables],
      fetcher<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, variables),
      options
    )};

export const AddMoodCheckInDocument = `
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

export const useAddMoodCheckInMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddMoodCheckInMutation, TError, AddMoodCheckInMutationVariables, TContext>) => {
    
    return useMutation<AddMoodCheckInMutation, TError, AddMoodCheckInMutationVariables, TContext>(
      ['AddMoodCheckIn'],
      (variables?: AddMoodCheckInMutationVariables) => fetcher<AddMoodCheckInMutation, AddMoodCheckInMutationVariables>(AddMoodCheckInDocument, variables)(),
      options
    )};

export const UpsertJournalEntryDocument = `
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

export const useUpsertJournalEntryMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpsertJournalEntryMutation, TError, UpsertJournalEntryMutationVariables, TContext>) => {
    
    return useMutation<UpsertJournalEntryMutation, TError, UpsertJournalEntryMutationVariables, TContext>(
      ['UpsertJournalEntry'],
      (variables?: UpsertJournalEntryMutationVariables) => fetcher<UpsertJournalEntryMutation, UpsertJournalEntryMutationVariables>(UpsertJournalEntryDocument, variables)(),
      options
    )};

export const SendMessageDocument = `
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

export const useSendMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SendMessageMutation, TError, SendMessageMutationVariables, TContext>) => {
    
    return useMutation<SendMessageMutation, TError, SendMessageMutationVariables, TContext>(
      ['SendMessage'],
      (variables?: SendMessageMutationVariables) => fetcher<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, variables)(),
      options
    )};

export const ClearChatDocument = `
    mutation ClearChat($issueKey: String!) {
  clearChat(issueKey: $issueKey)
}
    `;

export const useClearChatMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ClearChatMutation, TError, ClearChatMutationVariables, TContext>) => {
    
    return useMutation<ClearChatMutation, TError, ClearChatMutationVariables, TContext>(
      ['ClearChat'],
      (variables?: ClearChatMutationVariables) => fetcher<ClearChatMutation, ClearChatMutationVariables>(ClearChatDocument, variables)(),
      options
    )};

export const UpdateStressKitDocument = `
    mutation UpdateStressKit($input: StressKitInput!) {
  updateStressKit(input: $input) {
    level
    triggers
    people
    helpfulActions
    quickPhrase
    notes
  }
}
    `;

export const useUpdateStressKitMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateStressKitMutation, TError, UpdateStressKitMutationVariables, TContext>) => {
    
    return useMutation<UpdateStressKitMutation, TError, UpdateStressKitMutationVariables, TContext>(
      ['UpdateStressKit'],
      (variables?: UpdateStressKitMutationVariables) => fetcher<UpdateStressKitMutation, UpdateStressKitMutationVariables>(UpdateStressKitDocument, variables)(),
      options
    )};

export const GetMindfulnessHistoryDocument = `
    query GetMindfulnessHistory {
  mindfulnessHistory {
    date
    minutes
  }
}
    `;

export const useGetMindfulnessHistoryQuery = <
      TData = GetMindfulnessHistoryQuery,
      TError = unknown
    >(
      variables?: GetMindfulnessHistoryQueryVariables,
      options?: UseQueryOptions<GetMindfulnessHistoryQuery, TError, TData>
    ) => {
    
    return useQuery<GetMindfulnessHistoryQuery, TError, TData>(
      variables === undefined ? ['GetMindfulnessHistory'] : ['GetMindfulnessHistory', variables],
      fetcher<GetMindfulnessHistoryQuery, GetMindfulnessHistoryQueryVariables>(GetMindfulnessHistoryDocument, variables),
      options
    )};
