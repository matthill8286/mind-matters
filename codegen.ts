import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: ['gql/**/*.ts', '!gql/gql.ts', '!gql/graphql.ts', '!gql/hooks.ts'],
  generates: {
    './gql/generated.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        fetcher: {
          endpoint: 'process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT',
        },
      },
    },
  },
};

export default config;
