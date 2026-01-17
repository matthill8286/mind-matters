/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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


export const GetMoodCheckInsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMoodCheckIns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moodCheckIns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"energy"}},{"kind":"Field","name":{"kind":"Name","value":"stress"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<GetMoodCheckInsQuery, GetMoodCheckInsQueryVariables>;
export const AddMoodCheckInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMoodCheckIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MoodCheckInInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMoodCheckIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"energy"}},{"kind":"Field","name":{"kind":"Name","value":"stress"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<AddMoodCheckInMutation, AddMoodCheckInMutationVariables>;
export const DeleteMoodCheckInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMoodCheckIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMoodCheckIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteMoodCheckInMutation, DeleteMoodCheckInMutationVariables>;
export const GetJournalEntriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJournalEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"journalEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<GetJournalEntriesQuery, GetJournalEntriesQueryVariables>;
export const UpsertJournalEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertJournalEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertJournalEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<UpsertJournalEntryMutation, UpsertJournalEntryMutationVariables>;
export const DeleteJournalEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteJournalEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteJournalEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteJournalEntryMutation, DeleteJournalEntryMutationVariables>;
export const GetStressKitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStressKit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stressKit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"lastCheckIn"}},{"kind":"Field","name":{"kind":"Name","value":"quickPhrase"}},{"kind":"Field","name":{"kind":"Name","value":"triggers"}},{"kind":"Field","name":{"kind":"Name","value":"helpfulActions"}},{"kind":"Field","name":{"kind":"Name","value":"people"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"stressHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"exerciseId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetStressKitQuery, GetStressKitQueryVariables>;
export const UpdateStressKitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStressKit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StressKitInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStressKit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"lastCheckIn"}},{"kind":"Field","name":{"kind":"Name","value":"exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateStressKitMutation, UpdateStressKitMutationVariables>;
export const AddStressCompletionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddStressCompletion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"exerciseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addStressCompletion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"exerciseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"exerciseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"exerciseId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<AddStressCompletionMutation, AddStressCompletionMutationVariables>;
export const GetUserDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessment"}},{"kind":"Field","name":{"kind":"Name","value":"profile"}},{"kind":"Field","name":{"kind":"Name","value":"subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDate"}}]}}]}}]} as unknown as DocumentNode<GetUserDataQuery, GetUserDataQueryVariables>;
export const SetAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetAssessment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setAssessment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SetAssessmentMutation, SetAssessmentMutationVariables>;
export const SetProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SetProfileMutation, SetProfileMutationVariables>;
export const SetSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDate"}}]}}]}}]} as unknown as DocumentNode<SetSubscriptionMutation, SetSubscriptionMutationVariables>;
export const GetAllDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moodCheckIns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"energy"}},{"kind":"Field","name":{"kind":"Name","value":"stress"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"journalEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stressKit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"lastCheckIn"}},{"kind":"Field","name":{"kind":"Name","value":"exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"stressHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"exerciseId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assessment"}},{"kind":"Field","name":{"kind":"Name","value":"profile"}},{"kind":"Field","name":{"kind":"Name","value":"subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sleepEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mindfulness"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalMinutesToday"}}]}}]}}]} as unknown as DocumentNode<GetAllDataQuery, GetAllDataQueryVariables>;
export const GetChatMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChatMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"issueKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"issueKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"issueKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetChatMessagesQuery, GetChatMessagesQueryVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"issueKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"issueKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"issueKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const ClearChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"issueKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"issueKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"issueKey"}}}]}]}}]} as unknown as DocumentNode<ClearChatMutation, ClearChatMutationVariables>;
export const GetSleepEntriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSleepEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sleepEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]} as unknown as DocumentNode<GetSleepEntriesQuery, GetSleepEntriesQueryVariables>;
export const AddSleepEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSleepEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SleepEntryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSleepEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]} as unknown as DocumentNode<AddSleepEntryMutation, AddSleepEntryMutationVariables>;
export const DeleteSleepEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSleepEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSleepEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteSleepEntryMutation, DeleteSleepEntryMutationVariables>;
export const AddMindfulMinutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMindfulMinutes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minutes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMindfulMinutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"minutes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minutes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalMinutesToday"}}]}}]}}]} as unknown as DocumentNode<AddMindfulMinutesMutation, AddMindfulMinutesMutationVariables>;
export const GetMindfulnessHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMindfulnessHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mindfulnessHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}}]}}]}}]} as unknown as DocumentNode<GetMindfulnessHistoryQuery, GetMindfulnessHistoryQueryVariables>;