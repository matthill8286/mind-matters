/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetMoodCheckIns {\n    moodCheckIns {\n      id\n      createdAt\n      mood\n      energy\n      stress\n      note\n      tags\n    }\n  }\n": typeof types.GetMoodCheckInsDocument,
    "\n  mutation AddMoodCheckIn($input: MoodCheckInInput!) {\n    addMoodCheckIn(input: $input) {\n      id\n      createdAt\n      mood\n      energy\n      stress\n      note\n      tags\n    }\n  }\n": typeof types.AddMoodCheckInDocument,
    "\n  mutation DeleteMoodCheckIn($id: ID!) {\n    deleteMoodCheckIn(id: $id)\n  }\n": typeof types.DeleteMoodCheckInDocument,
    "\n  query GetJournalEntries {\n    journalEntries {\n      id\n      title\n      content\n      createdAt\n      updatedAt\n      mood\n      tags\n    }\n  }\n": typeof types.GetJournalEntriesDocument,
    "\n  mutation UpsertJournalEntry($input: JournalEntryInput!) {\n    upsertJournalEntry(input: $input) {\n      id\n      title\n      content\n      createdAt\n      updatedAt\n      mood\n      tags\n    }\n  }\n": typeof types.UpsertJournalEntryDocument,
    "\n  mutation DeleteJournalEntry($id: ID!) {\n    deleteJournalEntry(id: $id)\n  }\n": typeof types.DeleteJournalEntryDocument,
    "\n  query GetStressKit {\n    stressKit {\n      level\n      lastCheckIn\n      quickPhrase\n      triggers\n      helpfulActions\n      people\n      notes\n      exercises {\n        id\n        title\n        completed\n      }\n    }\n    stressHistory {\n      date\n      exerciseId\n      title\n    }\n  }\n": typeof types.GetStressKitDocument,
    "\n  mutation UpdateStressKit($input: StressKitInput!) {\n    updateStressKit(input: $input) {\n      level\n      lastCheckIn\n      exercises {\n        id\n        title\n        completed\n      }\n    }\n  }\n": typeof types.UpdateStressKitDocument,
    "\n  mutation AddStressCompletion($exerciseId: ID!, $title: String!) {\n    addStressCompletion(exerciseId: $exerciseId, title: $title) {\n      date\n      exerciseId\n      title\n    }\n  }\n": typeof types.AddStressCompletionDocument,
    "\n  query GetUserData {\n    assessment\n    profile\n    subscription {\n      type\n      expiryDate\n    }\n  }\n": typeof types.GetUserDataDocument,
    "\n  mutation SetAssessment($input: JSON!) {\n    setAssessment(input: $input)\n  }\n": typeof types.SetAssessmentDocument,
    "\n  mutation SetProfile($input: JSON!) {\n    setProfile(input: $input)\n  }\n": typeof types.SetProfileDocument,
    "\n  mutation SetSubscription($input: SubscriptionInput!) {\n    setSubscription(input: $input) {\n      type\n      expiryDate\n    }\n  }\n": typeof types.SetSubscriptionDocument,
    "\n  query GetAllData {\n    moodCheckIns {\n      id\n      createdAt\n      mood\n      energy\n      stress\n      note\n      tags\n    }\n    journalEntries {\n      id\n      title\n      content\n      createdAt\n      updatedAt\n      mood\n      tags\n    }\n    stressKit {\n      level\n      lastCheckIn\n      exercises {\n        id\n        title\n        completed\n      }\n    }\n    stressHistory {\n      date\n      exerciseId\n      title\n    }\n    assessment\n    profile\n    subscription {\n      type\n      expiryDate\n    }\n    sleepEntries {\n      id\n      date\n      quality\n      duration\n    }\n    mindfulness {\n      totalMinutesToday\n    }\n  }\n": typeof types.GetAllDataDocument,
    "\n  query GetChatMessages($issueKey: String!) {\n    chatMessages(issueKey: $issueKey) {\n      id\n      text\n      role\n      createdAt\n    }\n  }\n": typeof types.GetChatMessagesDocument,
    "\n  mutation SendMessage($issueKey: String!, $text: String!) {\n    sendMessage(issueKey: $issueKey, text: $text) {\n      id\n      text\n      role\n      createdAt\n    }\n  }\n": typeof types.SendMessageDocument,
    "\n  mutation ClearChat($issueKey: String!) {\n    clearChat(issueKey: $issueKey)\n  }\n": typeof types.ClearChatDocument,
    "\n  query GetSleepEntries {\n    sleepEntries {\n      id\n      date\n      quality\n      duration\n      note\n    }\n  }\n": typeof types.GetSleepEntriesDocument,
    "\n  mutation AddSleepEntry($input: SleepEntryInput!) {\n    addSleepEntry(input: $input) {\n      id\n      date\n      quality\n      duration\n      note\n    }\n  }\n": typeof types.AddSleepEntryDocument,
    "\n  mutation DeleteSleepEntry($id: ID!) {\n    deleteSleepEntry(id: $id)\n  }\n": typeof types.DeleteSleepEntryDocument,
    "\n  mutation AddMindfulMinutes($minutes: Int!) {\n    addMindfulMinutes(minutes: $minutes) {\n      totalMinutesToday\n    }\n  }\n": typeof types.AddMindfulMinutesDocument,
    "\n  query GetMindfulnessHistory {\n    mindfulnessHistory {\n      date\n      minutes\n    }\n  }\n": typeof types.GetMindfulnessHistoryDocument,
};
const documents: Documents = {
    "\n  query GetMoodCheckIns {\n    moodCheckIns {\n      id\n      createdAt\n      mood\n      energy\n      stress\n      note\n      tags\n    }\n  }\n": types.GetMoodCheckInsDocument,
    "\n  mutation AddMoodCheckIn($input: MoodCheckInInput!) {\n    addMoodCheckIn(input: $input) {\n      id\n      createdAt\n      mood\n      energy\n      stress\n      note\n      tags\n    }\n  }\n": types.AddMoodCheckInDocument,
    "\n  mutation DeleteMoodCheckIn($id: ID!) {\n    deleteMoodCheckIn(id: $id)\n  }\n": types.DeleteMoodCheckInDocument,
    "\n  query GetJournalEntries {\n    journalEntries {\n      id\n      title\n      content\n      createdAt\n      updatedAt\n      mood\n      tags\n    }\n  }\n": types.GetJournalEntriesDocument,
    "\n  mutation UpsertJournalEntry($input: JournalEntryInput!) {\n    upsertJournalEntry(input: $input) {\n      id\n      title\n      content\n      createdAt\n      updatedAt\n      mood\n      tags\n    }\n  }\n": types.UpsertJournalEntryDocument,
    "\n  mutation DeleteJournalEntry($id: ID!) {\n    deleteJournalEntry(id: $id)\n  }\n": types.DeleteJournalEntryDocument,
    "\n  query GetStressKit {\n    stressKit {\n      level\n      lastCheckIn\n      quickPhrase\n      triggers\n      helpfulActions\n      people\n      notes\n      exercises {\n        id\n        title\n        completed\n      }\n    }\n    stressHistory {\n      date\n      exerciseId\n      title\n    }\n  }\n": types.GetStressKitDocument,
    "\n  mutation UpdateStressKit($input: StressKitInput!) {\n    updateStressKit(input: $input) {\n      level\n      lastCheckIn\n      exercises {\n        id\n        title\n        completed\n      }\n    }\n  }\n": types.UpdateStressKitDocument,
    "\n  mutation AddStressCompletion($exerciseId: ID!, $title: String!) {\n    addStressCompletion(exerciseId: $exerciseId, title: $title) {\n      date\n      exerciseId\n      title\n    }\n  }\n": types.AddStressCompletionDocument,
    "\n  query GetUserData {\n    assessment\n    profile\n    subscription {\n      type\n      expiryDate\n    }\n  }\n": types.GetUserDataDocument,
    "\n  mutation SetAssessment($input: JSON!) {\n    setAssessment(input: $input)\n  }\n": types.SetAssessmentDocument,
    "\n  mutation SetProfile($input: JSON!) {\n    setProfile(input: $input)\n  }\n": types.SetProfileDocument,
    "\n  mutation SetSubscription($input: SubscriptionInput!) {\n    setSubscription(input: $input) {\n      type\n      expiryDate\n    }\n  }\n": types.SetSubscriptionDocument,
    "\n  query GetAllData {\n    moodCheckIns {\n      id\n      createdAt\n      mood\n      energy\n      stress\n      note\n      tags\n    }\n    journalEntries {\n      id\n      title\n      content\n      createdAt\n      updatedAt\n      mood\n      tags\n    }\n    stressKit {\n      level\n      lastCheckIn\n      exercises {\n        id\n        title\n        completed\n      }\n    }\n    stressHistory {\n      date\n      exerciseId\n      title\n    }\n    assessment\n    profile\n    subscription {\n      type\n      expiryDate\n    }\n    sleepEntries {\n      id\n      date\n      quality\n      duration\n    }\n    mindfulness {\n      totalMinutesToday\n    }\n  }\n": types.GetAllDataDocument,
    "\n  query GetChatMessages($issueKey: String!) {\n    chatMessages(issueKey: $issueKey) {\n      id\n      text\n      role\n      createdAt\n    }\n  }\n": types.GetChatMessagesDocument,
    "\n  mutation SendMessage($issueKey: String!, $text: String!) {\n    sendMessage(issueKey: $issueKey, text: $text) {\n      id\n      text\n      role\n      createdAt\n    }\n  }\n": types.SendMessageDocument,
    "\n  mutation ClearChat($issueKey: String!) {\n    clearChat(issueKey: $issueKey)\n  }\n": types.ClearChatDocument,
    "\n  query GetSleepEntries {\n    sleepEntries {\n      id\n      date\n      quality\n      duration\n      note\n    }\n  }\n": types.GetSleepEntriesDocument,
    "\n  mutation AddSleepEntry($input: SleepEntryInput!) {\n    addSleepEntry(input: $input) {\n      id\n      date\n      quality\n      duration\n      note\n    }\n  }\n": types.AddSleepEntryDocument,
    "\n  mutation DeleteSleepEntry($id: ID!) {\n    deleteSleepEntry(id: $id)\n  }\n": types.DeleteSleepEntryDocument,
    "\n  mutation AddMindfulMinutes($minutes: Int!) {\n    addMindfulMinutes(minutes: $minutes) {\n      totalMinutesToday\n    }\n  }\n": types.AddMindfulMinutesDocument,
    "\n  query GetMindfulnessHistory {\n    mindfulnessHistory {\n      date\n      minutes\n    }\n  }\n": types.GetMindfulnessHistoryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMoodCheckIns {\n    moodCheckIns {\n      id\n      createdAt\n      mood\n      energy\n      stress\n      note\n      tags\n    }\n  }\n"): (typeof documents)["\n  query GetMoodCheckIns {\n    moodCheckIns {\n      id\n      createdAt\n      mood\n      energy\n      stress\n      note\n      tags\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddMoodCheckIn($input: MoodCheckInInput!) {\n    addMoodCheckIn(input: $input) {\n      id\n      createdAt\n      mood\n      energy\n      stress\n      note\n      tags\n    }\n  }\n"): (typeof documents)["\n  mutation AddMoodCheckIn($input: MoodCheckInInput!) {\n    addMoodCheckIn(input: $input) {\n      id\n      createdAt\n      mood\n      energy\n      stress\n      note\n      tags\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteMoodCheckIn($id: ID!) {\n    deleteMoodCheckIn(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteMoodCheckIn($id: ID!) {\n    deleteMoodCheckIn(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetJournalEntries {\n    journalEntries {\n      id\n      title\n      content\n      createdAt\n      updatedAt\n      mood\n      tags\n    }\n  }\n"): (typeof documents)["\n  query GetJournalEntries {\n    journalEntries {\n      id\n      title\n      content\n      createdAt\n      updatedAt\n      mood\n      tags\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpsertJournalEntry($input: JournalEntryInput!) {\n    upsertJournalEntry(input: $input) {\n      id\n      title\n      content\n      createdAt\n      updatedAt\n      mood\n      tags\n    }\n  }\n"): (typeof documents)["\n  mutation UpsertJournalEntry($input: JournalEntryInput!) {\n    upsertJournalEntry(input: $input) {\n      id\n      title\n      content\n      createdAt\n      updatedAt\n      mood\n      tags\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteJournalEntry($id: ID!) {\n    deleteJournalEntry(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteJournalEntry($id: ID!) {\n    deleteJournalEntry(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStressKit {\n    stressKit {\n      level\n      lastCheckIn\n      quickPhrase\n      triggers\n      helpfulActions\n      people\n      notes\n      exercises {\n        id\n        title\n        completed\n      }\n    }\n    stressHistory {\n      date\n      exerciseId\n      title\n    }\n  }\n"): (typeof documents)["\n  query GetStressKit {\n    stressKit {\n      level\n      lastCheckIn\n      quickPhrase\n      triggers\n      helpfulActions\n      people\n      notes\n      exercises {\n        id\n        title\n        completed\n      }\n    }\n    stressHistory {\n      date\n      exerciseId\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateStressKit($input: StressKitInput!) {\n    updateStressKit(input: $input) {\n      level\n      lastCheckIn\n      exercises {\n        id\n        title\n        completed\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateStressKit($input: StressKitInput!) {\n    updateStressKit(input: $input) {\n      level\n      lastCheckIn\n      exercises {\n        id\n        title\n        completed\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddStressCompletion($exerciseId: ID!, $title: String!) {\n    addStressCompletion(exerciseId: $exerciseId, title: $title) {\n      date\n      exerciseId\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation AddStressCompletion($exerciseId: ID!, $title: String!) {\n    addStressCompletion(exerciseId: $exerciseId, title: $title) {\n      date\n      exerciseId\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserData {\n    assessment\n    profile\n    subscription {\n      type\n      expiryDate\n    }\n  }\n"): (typeof documents)["\n  query GetUserData {\n    assessment\n    profile\n    subscription {\n      type\n      expiryDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetAssessment($input: JSON!) {\n    setAssessment(input: $input)\n  }\n"): (typeof documents)["\n  mutation SetAssessment($input: JSON!) {\n    setAssessment(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetProfile($input: JSON!) {\n    setProfile(input: $input)\n  }\n"): (typeof documents)["\n  mutation SetProfile($input: JSON!) {\n    setProfile(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetSubscription($input: SubscriptionInput!) {\n    setSubscription(input: $input) {\n      type\n      expiryDate\n    }\n  }\n"): (typeof documents)["\n  mutation SetSubscription($input: SubscriptionInput!) {\n    setSubscription(input: $input) {\n      type\n      expiryDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllData {\n    moodCheckIns {\n      id\n      createdAt\n      mood\n      energy\n      stress\n      note\n      tags\n    }\n    journalEntries {\n      id\n      title\n      content\n      createdAt\n      updatedAt\n      mood\n      tags\n    }\n    stressKit {\n      level\n      lastCheckIn\n      exercises {\n        id\n        title\n        completed\n      }\n    }\n    stressHistory {\n      date\n      exerciseId\n      title\n    }\n    assessment\n    profile\n    subscription {\n      type\n      expiryDate\n    }\n    sleepEntries {\n      id\n      date\n      quality\n      duration\n    }\n    mindfulness {\n      totalMinutesToday\n    }\n  }\n"): (typeof documents)["\n  query GetAllData {\n    moodCheckIns {\n      id\n      createdAt\n      mood\n      energy\n      stress\n      note\n      tags\n    }\n    journalEntries {\n      id\n      title\n      content\n      createdAt\n      updatedAt\n      mood\n      tags\n    }\n    stressKit {\n      level\n      lastCheckIn\n      exercises {\n        id\n        title\n        completed\n      }\n    }\n    stressHistory {\n      date\n      exerciseId\n      title\n    }\n    assessment\n    profile\n    subscription {\n      type\n      expiryDate\n    }\n    sleepEntries {\n      id\n      date\n      quality\n      duration\n    }\n    mindfulness {\n      totalMinutesToday\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChatMessages($issueKey: String!) {\n    chatMessages(issueKey: $issueKey) {\n      id\n      text\n      role\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetChatMessages($issueKey: String!) {\n    chatMessages(issueKey: $issueKey) {\n      id\n      text\n      role\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendMessage($issueKey: String!, $text: String!) {\n    sendMessage(issueKey: $issueKey, text: $text) {\n      id\n      text\n      role\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation SendMessage($issueKey: String!, $text: String!) {\n    sendMessage(issueKey: $issueKey, text: $text) {\n      id\n      text\n      role\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ClearChat($issueKey: String!) {\n    clearChat(issueKey: $issueKey)\n  }\n"): (typeof documents)["\n  mutation ClearChat($issueKey: String!) {\n    clearChat(issueKey: $issueKey)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSleepEntries {\n    sleepEntries {\n      id\n      date\n      quality\n      duration\n      note\n    }\n  }\n"): (typeof documents)["\n  query GetSleepEntries {\n    sleepEntries {\n      id\n      date\n      quality\n      duration\n      note\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddSleepEntry($input: SleepEntryInput!) {\n    addSleepEntry(input: $input) {\n      id\n      date\n      quality\n      duration\n      note\n    }\n  }\n"): (typeof documents)["\n  mutation AddSleepEntry($input: SleepEntryInput!) {\n    addSleepEntry(input: $input) {\n      id\n      date\n      quality\n      duration\n      note\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSleepEntry($id: ID!) {\n    deleteSleepEntry(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteSleepEntry($id: ID!) {\n    deleteSleepEntry(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddMindfulMinutes($minutes: Int!) {\n    addMindfulMinutes(minutes: $minutes) {\n      totalMinutesToday\n    }\n  }\n"): (typeof documents)["\n  mutation AddMindfulMinutes($minutes: Int!) {\n    addMindfulMinutes(minutes: $minutes) {\n      totalMinutesToday\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMindfulnessHistory {\n    mindfulnessHistory {\n      date\n      minutes\n    }\n  }\n"): (typeof documents)["\n  query GetMindfulnessHistory {\n    mindfulnessHistory {\n      date\n      minutes\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;