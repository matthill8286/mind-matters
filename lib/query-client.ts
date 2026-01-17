import { QueryClient } from '@tanstack/react-query';
import { isLoadingVar } from './state';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Porting the loading logic
// React Query provides isFetching and isMutating, which can be used globally
// We can subscribe to the query cache to update our isLoadingVar
queryClient.getQueryCache().subscribe(() => {
  const isFetching = queryClient.isFetching();
  const isMutating = queryClient.isMutating();
  isLoadingVar(isFetching > 0 || isMutating > 0);
});

queryClient.getMutationCache().subscribe(() => {
  const isFetching = queryClient.isFetching();
  const isMutating = queryClient.isMutating();
  isLoadingVar(isFetching > 0 || isMutating > 0);
});
