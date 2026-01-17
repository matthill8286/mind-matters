import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
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

export type GetMoodCheckInsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMoodCheckInsQuery = { __typename?: 'Query', moodCheckIns: Array<{ __typename?: 'MoodCheckIn', id: string, createdAt: any, mood: string, energy: number, stress: number, note?: string | null, tags: Array<string> }> };

export type AddMoodCheckInMutationVariables = Exact<{
  input: MoodCheckInInput;
}>;


export type AddMoodCheckInMutation = { __typename?: 'Mutation', addMoodCheckIn: { __typename?: 'MoodCheckIn', id: string, createdAt: any, mood: string, energy: number, stress: number, note?: string | null, tags: Array<string> } };

export type DeleteMoodCheckInMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteMoodCheckInMutation = { __typename?: 'Mutation', deleteMoodCheckIn: boolean };

export type GetJournalEntriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJournalEntriesQuery = { __typename?: 'Query', journalEntries: Array<{ __typename?: 'JournalEntry', id: string, title: string, content: string, createdAt: any, updatedAt: any, mood?: string | null, tags?: Array<string> | null }> };

export type UpsertJournalEntryMutationVariables = Exact<{
  input: JournalEntryInput;
}>;


export type UpsertJournalEntryMutation = { __typename?: 'Mutation', upsertJournalEntry: { __typename?: 'JournalEntry', id: string, title: string, content: string, createdAt: any, updatedAt: any, mood?: string | null, tags?: Array<string> | null } };

export type DeleteJournalEntryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteJournalEntryMutation = { __typename?: 'Mutation', deleteJournalEntry: boolean };

export type GetStressKitQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStressKitQuery = { __typename?: 'Query', stressKit: { __typename?: 'StressKit', level: number, lastCheckIn?: any | null, quickPhrase?: string | null, triggers?: Array<string> | null, helpfulActions?: Array<string> | null, people?: Array<string> | null, notes?: string | null, exercises: Array<{ __typename?: 'Exercise', id: string, title: string, completed: boolean }> }, stressHistory: Array<{ __typename?: 'StressHistory', date: any, exerciseId: string, title: string }> };

export type UpdateStressKitMutationVariables = Exact<{
  input: StressKitInput;
}>;


export type UpdateStressKitMutation = { __typename?: 'Mutation', updateStressKit: { __typename?: 'StressKit', level: number, lastCheckIn?: any | null, exercises: Array<{ __typename?: 'Exercise', id: string, title: string, completed: boolean }> } };

export type AddStressCompletionMutationVariables = Exact<{
  exerciseId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}>;


export type AddStressCompletionMutation = { __typename?: 'Mutation', addStressCompletion: { __typename?: 'StressHistory', date: any, exerciseId: string, title: string } };

export type GetUserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDataQuery = { __typename?: 'Query', assessment?: any | null, profile?: any | null, subscription?: { __typename?: 'Subscription', type: string, expiryDate?: any | null } | null };

export type SetAssessmentMutationVariables = Exact<{
  input: Scalars['JSON']['input'];
}>;


export type SetAssessmentMutation = { __typename?: 'Mutation', setAssessment?: any | null };

export type SetProfileMutationVariables = Exact<{
  input: Scalars['JSON']['input'];
}>;


export type SetProfileMutation = { __typename?: 'Mutation', setProfile?: any | null };

export type SetSubscriptionMutationVariables = Exact<{
  input: SubscriptionInput;
}>;


export type SetSubscriptionMutation = { __typename?: 'Mutation', setSubscription: { __typename?: 'Subscription', type: string, expiryDate?: any | null } };

export type GetAllDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDataQuery = { __typename?: 'Query', assessment?: any | null, profile?: any | null, moodCheckIns: Array<{ __typename?: 'MoodCheckIn', id: string, createdAt: any, mood: string, energy: number, stress: number, note?: string | null, tags: Array<string> }>, journalEntries: Array<{ __typename?: 'JournalEntry', id: string, title: string, content: string, createdAt: any, updatedAt: any, mood?: string | null, tags?: Array<string> | null }>, stressKit: { __typename?: 'StressKit', level: number, lastCheckIn?: any | null, exercises: Array<{ __typename?: 'Exercise', id: string, title: string, completed: boolean }> }, stressHistory: Array<{ __typename?: 'StressHistory', date: any, exerciseId: string, title: string }>, subscription?: { __typename?: 'Subscription', type: string, expiryDate?: any | null } | null, sleepEntries: Array<{ __typename?: 'SleepEntry', id: string, date: any, quality: number, duration: number }>, mindfulness: { __typename?: 'Mindfulness', totalMinutesToday: number } };

export type GetChatMessagesQueryVariables = Exact<{
  issueKey: Scalars['String']['input'];
}>;


export type GetChatMessagesQuery = { __typename?: 'Query', chatMessages: Array<{ __typename?: 'ChatMessage', id: string, text?: string | null, role: string, createdAt: any }> };

export type SendMessageMutationVariables = Exact<{
  issueKey: Scalars['String']['input'];
  text: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'ChatMessage', id: string, text?: string | null, role: string, createdAt: any } };

export type ClearChatMutationVariables = Exact<{
  issueKey: Scalars['String']['input'];
}>;


export type ClearChatMutation = { __typename?: 'Mutation', clearChat: boolean };

export type GetSleepEntriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSleepEntriesQuery = { __typename?: 'Query', sleepEntries: Array<{ __typename?: 'SleepEntry', id: string, date: any, quality: number, duration: number, note?: string | null }> };

export type AddSleepEntryMutationVariables = Exact<{
  input: SleepEntryInput;
}>;


export type AddSleepEntryMutation = { __typename?: 'Mutation', addSleepEntry: { __typename?: 'SleepEntry', id: string, date: any, quality: number, duration: number, note?: string | null } };

export type DeleteSleepEntryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSleepEntryMutation = { __typename?: 'Mutation', deleteSleepEntry: boolean };

export type AddMindfulMinutesMutationVariables = Exact<{
  minutes: Scalars['Int']['input'];
}>;


export type AddMindfulMinutesMutation = { __typename?: 'Mutation', addMindfulMinutes: { __typename?: 'Mindfulness', totalMinutesToday: number } };

export type GetMindfulnessHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMindfulnessHistoryQuery = { __typename?: 'Query', mindfulnessHistory: Array<{ __typename?: 'MindfulnessEntry', date: any, minutes: number }> };


export const GetMoodCheckInsDocument = gql`
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

/**
 * __useGetMoodCheckInsQuery__
 *
 * To run a query within a React component, call `useGetMoodCheckInsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoodCheckInsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMoodCheckInsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMoodCheckInsQuery(baseOptions?: Apollo.QueryHookOptions<GetMoodCheckInsQuery, GetMoodCheckInsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMoodCheckInsQuery, GetMoodCheckInsQueryVariables>(GetMoodCheckInsDocument, options);
      }
export function useGetMoodCheckInsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMoodCheckInsQuery, GetMoodCheckInsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMoodCheckInsQuery, GetMoodCheckInsQueryVariables>(GetMoodCheckInsDocument, options);
        }
// @ts-ignore
export function useGetMoodCheckInsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMoodCheckInsQuery, GetMoodCheckInsQueryVariables>): Apollo.UseSuspenseQueryResult<GetMoodCheckInsQuery, GetMoodCheckInsQueryVariables>;
export function useGetMoodCheckInsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMoodCheckInsQuery, GetMoodCheckInsQueryVariables>): Apollo.UseSuspenseQueryResult<GetMoodCheckInsQuery | undefined, GetMoodCheckInsQueryVariables>;
export function useGetMoodCheckInsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMoodCheckInsQuery, GetMoodCheckInsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMoodCheckInsQuery, GetMoodCheckInsQueryVariables>(GetMoodCheckInsDocument, options);
        }
export type GetMoodCheckInsQueryHookResult = ReturnType<typeof useGetMoodCheckInsQuery>;
export type GetMoodCheckInsLazyQueryHookResult = ReturnType<typeof useGetMoodCheckInsLazyQuery>;
export type GetMoodCheckInsSuspenseQueryHookResult = ReturnType<typeof useGetMoodCheckInsSuspenseQuery>;
export type GetMoodCheckInsQueryResult = Apollo.QueryResult<GetMoodCheckInsQuery, GetMoodCheckInsQueryVariables>;
export const AddMoodCheckInDocument = gql`
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
export type AddMoodCheckInMutationFn = Apollo.MutationFunction<AddMoodCheckInMutation, AddMoodCheckInMutationVariables>;

/**
 * __useAddMoodCheckInMutation__
 *
 * To run a mutation, you first call `useAddMoodCheckInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMoodCheckInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMoodCheckInMutation, { data, loading, error }] = useAddMoodCheckInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMoodCheckInMutation(baseOptions?: Apollo.MutationHookOptions<AddMoodCheckInMutation, AddMoodCheckInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMoodCheckInMutation, AddMoodCheckInMutationVariables>(AddMoodCheckInDocument, options);
      }
export type AddMoodCheckInMutationHookResult = ReturnType<typeof useAddMoodCheckInMutation>;
export type AddMoodCheckInMutationResult = Apollo.MutationResult<AddMoodCheckInMutation>;
export type AddMoodCheckInMutationOptions = Apollo.BaseMutationOptions<AddMoodCheckInMutation, AddMoodCheckInMutationVariables>;
export const DeleteMoodCheckInDocument = gql`
    mutation DeleteMoodCheckIn($id: ID!) {
  deleteMoodCheckIn(id: $id)
}
    `;
export type DeleteMoodCheckInMutationFn = Apollo.MutationFunction<DeleteMoodCheckInMutation, DeleteMoodCheckInMutationVariables>;

/**
 * __useDeleteMoodCheckInMutation__
 *
 * To run a mutation, you first call `useDeleteMoodCheckInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMoodCheckInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMoodCheckInMutation, { data, loading, error }] = useDeleteMoodCheckInMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMoodCheckInMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMoodCheckInMutation, DeleteMoodCheckInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMoodCheckInMutation, DeleteMoodCheckInMutationVariables>(DeleteMoodCheckInDocument, options);
      }
export type DeleteMoodCheckInMutationHookResult = ReturnType<typeof useDeleteMoodCheckInMutation>;
export type DeleteMoodCheckInMutationResult = Apollo.MutationResult<DeleteMoodCheckInMutation>;
export type DeleteMoodCheckInMutationOptions = Apollo.BaseMutationOptions<DeleteMoodCheckInMutation, DeleteMoodCheckInMutationVariables>;
export const GetJournalEntriesDocument = gql`
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

/**
 * __useGetJournalEntriesQuery__
 *
 * To run a query within a React component, call `useGetJournalEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJournalEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJournalEntriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetJournalEntriesQuery(baseOptions?: Apollo.QueryHookOptions<GetJournalEntriesQuery, GetJournalEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJournalEntriesQuery, GetJournalEntriesQueryVariables>(GetJournalEntriesDocument, options);
      }
export function useGetJournalEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJournalEntriesQuery, GetJournalEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJournalEntriesQuery, GetJournalEntriesQueryVariables>(GetJournalEntriesDocument, options);
        }
// @ts-ignore
export function useGetJournalEntriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetJournalEntriesQuery, GetJournalEntriesQueryVariables>): Apollo.UseSuspenseQueryResult<GetJournalEntriesQuery, GetJournalEntriesQueryVariables>;
export function useGetJournalEntriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetJournalEntriesQuery, GetJournalEntriesQueryVariables>): Apollo.UseSuspenseQueryResult<GetJournalEntriesQuery | undefined, GetJournalEntriesQueryVariables>;
export function useGetJournalEntriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetJournalEntriesQuery, GetJournalEntriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetJournalEntriesQuery, GetJournalEntriesQueryVariables>(GetJournalEntriesDocument, options);
        }
export type GetJournalEntriesQueryHookResult = ReturnType<typeof useGetJournalEntriesQuery>;
export type GetJournalEntriesLazyQueryHookResult = ReturnType<typeof useGetJournalEntriesLazyQuery>;
export type GetJournalEntriesSuspenseQueryHookResult = ReturnType<typeof useGetJournalEntriesSuspenseQuery>;
export type GetJournalEntriesQueryResult = Apollo.QueryResult<GetJournalEntriesQuery, GetJournalEntriesQueryVariables>;
export const UpsertJournalEntryDocument = gql`
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
export type UpsertJournalEntryMutationFn = Apollo.MutationFunction<UpsertJournalEntryMutation, UpsertJournalEntryMutationVariables>;

/**
 * __useUpsertJournalEntryMutation__
 *
 * To run a mutation, you first call `useUpsertJournalEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertJournalEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertJournalEntryMutation, { data, loading, error }] = useUpsertJournalEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertJournalEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpsertJournalEntryMutation, UpsertJournalEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertJournalEntryMutation, UpsertJournalEntryMutationVariables>(UpsertJournalEntryDocument, options);
      }
export type UpsertJournalEntryMutationHookResult = ReturnType<typeof useUpsertJournalEntryMutation>;
export type UpsertJournalEntryMutationResult = Apollo.MutationResult<UpsertJournalEntryMutation>;
export type UpsertJournalEntryMutationOptions = Apollo.BaseMutationOptions<UpsertJournalEntryMutation, UpsertJournalEntryMutationVariables>;
export const DeleteJournalEntryDocument = gql`
    mutation DeleteJournalEntry($id: ID!) {
  deleteJournalEntry(id: $id)
}
    `;
export type DeleteJournalEntryMutationFn = Apollo.MutationFunction<DeleteJournalEntryMutation, DeleteJournalEntryMutationVariables>;

/**
 * __useDeleteJournalEntryMutation__
 *
 * To run a mutation, you first call `useDeleteJournalEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJournalEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJournalEntryMutation, { data, loading, error }] = useDeleteJournalEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteJournalEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteJournalEntryMutation, DeleteJournalEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteJournalEntryMutation, DeleteJournalEntryMutationVariables>(DeleteJournalEntryDocument, options);
      }
export type DeleteJournalEntryMutationHookResult = ReturnType<typeof useDeleteJournalEntryMutation>;
export type DeleteJournalEntryMutationResult = Apollo.MutationResult<DeleteJournalEntryMutation>;
export type DeleteJournalEntryMutationOptions = Apollo.BaseMutationOptions<DeleteJournalEntryMutation, DeleteJournalEntryMutationVariables>;
export const GetStressKitDocument = gql`
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

/**
 * __useGetStressKitQuery__
 *
 * To run a query within a React component, call `useGetStressKitQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStressKitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStressKitQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStressKitQuery(baseOptions?: Apollo.QueryHookOptions<GetStressKitQuery, GetStressKitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStressKitQuery, GetStressKitQueryVariables>(GetStressKitDocument, options);
      }
export function useGetStressKitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStressKitQuery, GetStressKitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStressKitQuery, GetStressKitQueryVariables>(GetStressKitDocument, options);
        }
// @ts-ignore
export function useGetStressKitSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetStressKitQuery, GetStressKitQueryVariables>): Apollo.UseSuspenseQueryResult<GetStressKitQuery, GetStressKitQueryVariables>;
export function useGetStressKitSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStressKitQuery, GetStressKitQueryVariables>): Apollo.UseSuspenseQueryResult<GetStressKitQuery | undefined, GetStressKitQueryVariables>;
export function useGetStressKitSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStressKitQuery, GetStressKitQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStressKitQuery, GetStressKitQueryVariables>(GetStressKitDocument, options);
        }
export type GetStressKitQueryHookResult = ReturnType<typeof useGetStressKitQuery>;
export type GetStressKitLazyQueryHookResult = ReturnType<typeof useGetStressKitLazyQuery>;
export type GetStressKitSuspenseQueryHookResult = ReturnType<typeof useGetStressKitSuspenseQuery>;
export type GetStressKitQueryResult = Apollo.QueryResult<GetStressKitQuery, GetStressKitQueryVariables>;
export const UpdateStressKitDocument = gql`
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
export type UpdateStressKitMutationFn = Apollo.MutationFunction<UpdateStressKitMutation, UpdateStressKitMutationVariables>;

/**
 * __useUpdateStressKitMutation__
 *
 * To run a mutation, you first call `useUpdateStressKitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStressKitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStressKitMutation, { data, loading, error }] = useUpdateStressKitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStressKitMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStressKitMutation, UpdateStressKitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStressKitMutation, UpdateStressKitMutationVariables>(UpdateStressKitDocument, options);
      }
export type UpdateStressKitMutationHookResult = ReturnType<typeof useUpdateStressKitMutation>;
export type UpdateStressKitMutationResult = Apollo.MutationResult<UpdateStressKitMutation>;
export type UpdateStressKitMutationOptions = Apollo.BaseMutationOptions<UpdateStressKitMutation, UpdateStressKitMutationVariables>;
export const AddStressCompletionDocument = gql`
    mutation AddStressCompletion($exerciseId: ID!, $title: String!) {
  addStressCompletion(exerciseId: $exerciseId, title: $title) {
    date
    exerciseId
    title
  }
}
    `;
export type AddStressCompletionMutationFn = Apollo.MutationFunction<AddStressCompletionMutation, AddStressCompletionMutationVariables>;

/**
 * __useAddStressCompletionMutation__
 *
 * To run a mutation, you first call `useAddStressCompletionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStressCompletionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStressCompletionMutation, { data, loading, error }] = useAddStressCompletionMutation({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddStressCompletionMutation(baseOptions?: Apollo.MutationHookOptions<AddStressCompletionMutation, AddStressCompletionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddStressCompletionMutation, AddStressCompletionMutationVariables>(AddStressCompletionDocument, options);
      }
export type AddStressCompletionMutationHookResult = ReturnType<typeof useAddStressCompletionMutation>;
export type AddStressCompletionMutationResult = Apollo.MutationResult<AddStressCompletionMutation>;
export type AddStressCompletionMutationOptions = Apollo.BaseMutationOptions<AddStressCompletionMutation, AddStressCompletionMutationVariables>;
export const GetUserDataDocument = gql`
    query GetUserData {
  assessment
  profile
  subscription {
    type
    expiryDate
  }
}
    `;

/**
 * __useGetUserDataQuery__
 *
 * To run a query within a React component, call `useGetUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserDataQuery(baseOptions?: Apollo.QueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
      }
export function useGetUserDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
        }
// @ts-ignore
export function useGetUserDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>): Apollo.UseSuspenseQueryResult<GetUserDataQuery, GetUserDataQueryVariables>;
export function useGetUserDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>): Apollo.UseSuspenseQueryResult<GetUserDataQuery | undefined, GetUserDataQueryVariables>;
export function useGetUserDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
        }
export type GetUserDataQueryHookResult = ReturnType<typeof useGetUserDataQuery>;
export type GetUserDataLazyQueryHookResult = ReturnType<typeof useGetUserDataLazyQuery>;
export type GetUserDataSuspenseQueryHookResult = ReturnType<typeof useGetUserDataSuspenseQuery>;
export type GetUserDataQueryResult = Apollo.QueryResult<GetUserDataQuery, GetUserDataQueryVariables>;
export const SetAssessmentDocument = gql`
    mutation SetAssessment($input: JSON!) {
  setAssessment(input: $input)
}
    `;
export type SetAssessmentMutationFn = Apollo.MutationFunction<SetAssessmentMutation, SetAssessmentMutationVariables>;

/**
 * __useSetAssessmentMutation__
 *
 * To run a mutation, you first call `useSetAssessmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAssessmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAssessmentMutation, { data, loading, error }] = useSetAssessmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetAssessmentMutation(baseOptions?: Apollo.MutationHookOptions<SetAssessmentMutation, SetAssessmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetAssessmentMutation, SetAssessmentMutationVariables>(SetAssessmentDocument, options);
      }
export type SetAssessmentMutationHookResult = ReturnType<typeof useSetAssessmentMutation>;
export type SetAssessmentMutationResult = Apollo.MutationResult<SetAssessmentMutation>;
export type SetAssessmentMutationOptions = Apollo.BaseMutationOptions<SetAssessmentMutation, SetAssessmentMutationVariables>;
export const SetProfileDocument = gql`
    mutation SetProfile($input: JSON!) {
  setProfile(input: $input)
}
    `;
export type SetProfileMutationFn = Apollo.MutationFunction<SetProfileMutation, SetProfileMutationVariables>;

/**
 * __useSetProfileMutation__
 *
 * To run a mutation, you first call `useSetProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setProfileMutation, { data, loading, error }] = useSetProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetProfileMutation(baseOptions?: Apollo.MutationHookOptions<SetProfileMutation, SetProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetProfileMutation, SetProfileMutationVariables>(SetProfileDocument, options);
      }
export type SetProfileMutationHookResult = ReturnType<typeof useSetProfileMutation>;
export type SetProfileMutationResult = Apollo.MutationResult<SetProfileMutation>;
export type SetProfileMutationOptions = Apollo.BaseMutationOptions<SetProfileMutation, SetProfileMutationVariables>;
export const SetSubscriptionDocument = gql`
    mutation SetSubscription($input: SubscriptionInput!) {
  setSubscription(input: $input) {
    type
    expiryDate
  }
}
    `;
export type SetSubscriptionMutationFn = Apollo.MutationFunction<SetSubscriptionMutation, SetSubscriptionMutationVariables>;

/**
 * __useSetSubscriptionMutation__
 *
 * To run a mutation, you first call `useSetSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSubscriptionMutation, { data, loading, error }] = useSetSubscriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<SetSubscriptionMutation, SetSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetSubscriptionMutation, SetSubscriptionMutationVariables>(SetSubscriptionDocument, options);
      }
export type SetSubscriptionMutationHookResult = ReturnType<typeof useSetSubscriptionMutation>;
export type SetSubscriptionMutationResult = Apollo.MutationResult<SetSubscriptionMutation>;
export type SetSubscriptionMutationOptions = Apollo.BaseMutationOptions<SetSubscriptionMutation, SetSubscriptionMutationVariables>;
export const GetAllDataDocument = gql`
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

/**
 * __useGetAllDataQuery__
 *
 * To run a query within a React component, call `useGetAllDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDataQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDataQuery, GetAllDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDataQuery, GetAllDataQueryVariables>(GetAllDataDocument, options);
      }
export function useGetAllDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDataQuery, GetAllDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDataQuery, GetAllDataQueryVariables>(GetAllDataDocument, options);
        }
// @ts-ignore
export function useGetAllDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllDataQuery, GetAllDataQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllDataQuery, GetAllDataQueryVariables>;
export function useGetAllDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllDataQuery, GetAllDataQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllDataQuery | undefined, GetAllDataQueryVariables>;
export function useGetAllDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllDataQuery, GetAllDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllDataQuery, GetAllDataQueryVariables>(GetAllDataDocument, options);
        }
export type GetAllDataQueryHookResult = ReturnType<typeof useGetAllDataQuery>;
export type GetAllDataLazyQueryHookResult = ReturnType<typeof useGetAllDataLazyQuery>;
export type GetAllDataSuspenseQueryHookResult = ReturnType<typeof useGetAllDataSuspenseQuery>;
export type GetAllDataQueryResult = Apollo.QueryResult<GetAllDataQuery, GetAllDataQueryVariables>;
export const GetChatMessagesDocument = gql`
    query GetChatMessages($issueKey: String!) {
  chatMessages(issueKey: $issueKey) {
    id
    text
    role
    createdAt
  }
}
    `;

/**
 * __useGetChatMessagesQuery__
 *
 * To run a query within a React component, call `useGetChatMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatMessagesQuery({
 *   variables: {
 *      issueKey: // value for 'issueKey'
 *   },
 * });
 */
export function useGetChatMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables> & ({ variables: GetChatMessagesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, options);
      }
export function useGetChatMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, options);
        }
// @ts-ignore
export function useGetChatMessagesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>): Apollo.UseSuspenseQueryResult<GetChatMessagesQuery, GetChatMessagesQueryVariables>;
export function useGetChatMessagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>): Apollo.UseSuspenseQueryResult<GetChatMessagesQuery | undefined, GetChatMessagesQueryVariables>;
export function useGetChatMessagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, options);
        }
export type GetChatMessagesQueryHookResult = ReturnType<typeof useGetChatMessagesQuery>;
export type GetChatMessagesLazyQueryHookResult = ReturnType<typeof useGetChatMessagesLazyQuery>;
export type GetChatMessagesSuspenseQueryHookResult = ReturnType<typeof useGetChatMessagesSuspenseQuery>;
export type GetChatMessagesQueryResult = Apollo.QueryResult<GetChatMessagesQuery, GetChatMessagesQueryVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($issueKey: String!, $text: String!) {
  sendMessage(issueKey: $issueKey, text: $text) {
    id
    text
    role
    createdAt
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      issueKey: // value for 'issueKey'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const ClearChatDocument = gql`
    mutation ClearChat($issueKey: String!) {
  clearChat(issueKey: $issueKey)
}
    `;
export type ClearChatMutationFn = Apollo.MutationFunction<ClearChatMutation, ClearChatMutationVariables>;

/**
 * __useClearChatMutation__
 *
 * To run a mutation, you first call `useClearChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearChatMutation, { data, loading, error }] = useClearChatMutation({
 *   variables: {
 *      issueKey: // value for 'issueKey'
 *   },
 * });
 */
export function useClearChatMutation(baseOptions?: Apollo.MutationHookOptions<ClearChatMutation, ClearChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearChatMutation, ClearChatMutationVariables>(ClearChatDocument, options);
      }
export type ClearChatMutationHookResult = ReturnType<typeof useClearChatMutation>;
export type ClearChatMutationResult = Apollo.MutationResult<ClearChatMutation>;
export type ClearChatMutationOptions = Apollo.BaseMutationOptions<ClearChatMutation, ClearChatMutationVariables>;
export const GetSleepEntriesDocument = gql`
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

/**
 * __useGetSleepEntriesQuery__
 *
 * To run a query within a React component, call `useGetSleepEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSleepEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSleepEntriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSleepEntriesQuery(baseOptions?: Apollo.QueryHookOptions<GetSleepEntriesQuery, GetSleepEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSleepEntriesQuery, GetSleepEntriesQueryVariables>(GetSleepEntriesDocument, options);
      }
export function useGetSleepEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSleepEntriesQuery, GetSleepEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSleepEntriesQuery, GetSleepEntriesQueryVariables>(GetSleepEntriesDocument, options);
        }
// @ts-ignore
export function useGetSleepEntriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSleepEntriesQuery, GetSleepEntriesQueryVariables>): Apollo.UseSuspenseQueryResult<GetSleepEntriesQuery, GetSleepEntriesQueryVariables>;
export function useGetSleepEntriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSleepEntriesQuery, GetSleepEntriesQueryVariables>): Apollo.UseSuspenseQueryResult<GetSleepEntriesQuery | undefined, GetSleepEntriesQueryVariables>;
export function useGetSleepEntriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSleepEntriesQuery, GetSleepEntriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSleepEntriesQuery, GetSleepEntriesQueryVariables>(GetSleepEntriesDocument, options);
        }
export type GetSleepEntriesQueryHookResult = ReturnType<typeof useGetSleepEntriesQuery>;
export type GetSleepEntriesLazyQueryHookResult = ReturnType<typeof useGetSleepEntriesLazyQuery>;
export type GetSleepEntriesSuspenseQueryHookResult = ReturnType<typeof useGetSleepEntriesSuspenseQuery>;
export type GetSleepEntriesQueryResult = Apollo.QueryResult<GetSleepEntriesQuery, GetSleepEntriesQueryVariables>;
export const AddSleepEntryDocument = gql`
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
export type AddSleepEntryMutationFn = Apollo.MutationFunction<AddSleepEntryMutation, AddSleepEntryMutationVariables>;

/**
 * __useAddSleepEntryMutation__
 *
 * To run a mutation, you first call `useAddSleepEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSleepEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSleepEntryMutation, { data, loading, error }] = useAddSleepEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSleepEntryMutation(baseOptions?: Apollo.MutationHookOptions<AddSleepEntryMutation, AddSleepEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSleepEntryMutation, AddSleepEntryMutationVariables>(AddSleepEntryDocument, options);
      }
export type AddSleepEntryMutationHookResult = ReturnType<typeof useAddSleepEntryMutation>;
export type AddSleepEntryMutationResult = Apollo.MutationResult<AddSleepEntryMutation>;
export type AddSleepEntryMutationOptions = Apollo.BaseMutationOptions<AddSleepEntryMutation, AddSleepEntryMutationVariables>;
export const DeleteSleepEntryDocument = gql`
    mutation DeleteSleepEntry($id: ID!) {
  deleteSleepEntry(id: $id)
}
    `;
export type DeleteSleepEntryMutationFn = Apollo.MutationFunction<DeleteSleepEntryMutation, DeleteSleepEntryMutationVariables>;

/**
 * __useDeleteSleepEntryMutation__
 *
 * To run a mutation, you first call `useDeleteSleepEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSleepEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSleepEntryMutation, { data, loading, error }] = useDeleteSleepEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSleepEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSleepEntryMutation, DeleteSleepEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSleepEntryMutation, DeleteSleepEntryMutationVariables>(DeleteSleepEntryDocument, options);
      }
export type DeleteSleepEntryMutationHookResult = ReturnType<typeof useDeleteSleepEntryMutation>;
export type DeleteSleepEntryMutationResult = Apollo.MutationResult<DeleteSleepEntryMutation>;
export type DeleteSleepEntryMutationOptions = Apollo.BaseMutationOptions<DeleteSleepEntryMutation, DeleteSleepEntryMutationVariables>;
export const AddMindfulMinutesDocument = gql`
    mutation AddMindfulMinutes($minutes: Int!) {
  addMindfulMinutes(minutes: $minutes) {
    totalMinutesToday
  }
}
    `;
export type AddMindfulMinutesMutationFn = Apollo.MutationFunction<AddMindfulMinutesMutation, AddMindfulMinutesMutationVariables>;

/**
 * __useAddMindfulMinutesMutation__
 *
 * To run a mutation, you first call `useAddMindfulMinutesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMindfulMinutesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMindfulMinutesMutation, { data, loading, error }] = useAddMindfulMinutesMutation({
 *   variables: {
 *      minutes: // value for 'minutes'
 *   },
 * });
 */
export function useAddMindfulMinutesMutation(baseOptions?: Apollo.MutationHookOptions<AddMindfulMinutesMutation, AddMindfulMinutesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMindfulMinutesMutation, AddMindfulMinutesMutationVariables>(AddMindfulMinutesDocument, options);
      }
export type AddMindfulMinutesMutationHookResult = ReturnType<typeof useAddMindfulMinutesMutation>;
export type AddMindfulMinutesMutationResult = Apollo.MutationResult<AddMindfulMinutesMutation>;
export type AddMindfulMinutesMutationOptions = Apollo.BaseMutationOptions<AddMindfulMinutesMutation, AddMindfulMinutesMutationVariables>;
export const GetMindfulnessHistoryDocument = gql`
    query GetMindfulnessHistory {
  mindfulnessHistory {
    date
    minutes
  }
}
    `;

/**
 * __useGetMindfulnessHistoryQuery__
 *
 * To run a query within a React component, call `useGetMindfulnessHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMindfulnessHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMindfulnessHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMindfulnessHistoryQuery(baseOptions?: Apollo.QueryHookOptions<GetMindfulnessHistoryQuery, GetMindfulnessHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMindfulnessHistoryQuery, GetMindfulnessHistoryQueryVariables>(GetMindfulnessHistoryDocument, options);
      }
export function useGetMindfulnessHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMindfulnessHistoryQuery, GetMindfulnessHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMindfulnessHistoryQuery, GetMindfulnessHistoryQueryVariables>(GetMindfulnessHistoryDocument, options);
        }
// @ts-ignore
export function useGetMindfulnessHistorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMindfulnessHistoryQuery, GetMindfulnessHistoryQueryVariables>): Apollo.UseSuspenseQueryResult<GetMindfulnessHistoryQuery, GetMindfulnessHistoryQueryVariables>;
export function useGetMindfulnessHistorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMindfulnessHistoryQuery, GetMindfulnessHistoryQueryVariables>): Apollo.UseSuspenseQueryResult<GetMindfulnessHistoryQuery | undefined, GetMindfulnessHistoryQueryVariables>;
export function useGetMindfulnessHistorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMindfulnessHistoryQuery, GetMindfulnessHistoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMindfulnessHistoryQuery, GetMindfulnessHistoryQueryVariables>(GetMindfulnessHistoryDocument, options);
        }
export type GetMindfulnessHistoryQueryHookResult = ReturnType<typeof useGetMindfulnessHistoryQuery>;
export type GetMindfulnessHistoryLazyQueryHookResult = ReturnType<typeof useGetMindfulnessHistoryLazyQuery>;
export type GetMindfulnessHistorySuspenseQueryHookResult = ReturnType<typeof useGetMindfulnessHistorySuspenseQuery>;
export type GetMindfulnessHistoryQueryResult = Apollo.QueryResult<GetMindfulnessHistoryQuery, GetMindfulnessHistoryQueryVariables>;