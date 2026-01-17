import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, Observable } from '@apollo/client';
import { alertVar, isLoadingVar, sleepModeVar } from './state';

const GRAPHQL_ENDPOINT =
  process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT || 'https://your-api-endpoint.com/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

let activeRequests = 0;

const loadingLink = new ApolloLink((operation, forward) => {
  activeRequests++;
  isLoadingVar(true);

  const decrement = () => {
    activeRequests--;
    if (activeRequests <= 0) {
      activeRequests = 0;
      isLoadingVar(false);
    }
  };

  const observable = forward(operation);

  return new Observable((observer) => {
    const subscription = observable.subscribe({
      next: (result) => {
        decrement();
        observer.next(result);
      },
      error: (error) => {
        decrement();
        observer.error(error);
      },
      complete: () => {
        observer.complete();
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  });
});

export const client = new ApolloClient({
  link: ApolloLink.from([loadingLink, httpLink]),
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
