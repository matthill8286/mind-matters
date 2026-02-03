import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { authTokenVar } from './state';

export async function graphqlFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
): Promise<TData> {
  const token = authTokenVar();
  const res = await fetch(process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    const { message } = json.errors[0];
    throw new Error(message);
  }

  return json.data;
}

export function useGraphQLQuery<TData, TVariables = null>(
  key: any[],
  query: string,
  variables?: TVariables,
  options?: Omit<UseQueryOptions<TData, Error, TData>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<TData, Error>({
    queryKey: variables ? [...key, variables] : key,
    queryFn: () => graphqlFetcher<TData, TVariables>(query, variables),
    ...options,
  });
}

export function useGraphQLMutation<TData, TVariables>(
  key: any[],
  query: string,
  options?: UseMutationOptions<TData, Error, TVariables>,
) {
  return useMutation<TData, Error, TVariables>({
    mutationKey: key,
    mutationFn: (variables: TVariables) => graphqlFetcher<TData, TVariables>(query, variables),
    ...options,
  });
}
