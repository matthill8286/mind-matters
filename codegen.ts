import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: ['lib/**/*.ts', 'app/**/*.tsx', 'components/**/*.tsx'],
  generates: {
    './gql/': {
      preset: 'client',
      plugins: [],
      config: {
        useTypeImports: true,
      },
    },
    './gql/hooks.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
