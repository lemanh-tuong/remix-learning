import gql from 'graphql-tag';
import type { GraphQLClient } from 'graphql-request';
import type { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
}

export interface Continent {
  __typename?: 'Continent';
  code: Scalars['ID']['output'];
  countries: Array<Country>;
  name: Scalars['String']['output'];
}

export interface ContinentFilterInput {
  code?: InputMaybe<StringQueryOperatorInput>;
}

export interface Country {
  __typename?: 'Country';
  awsRegion: Scalars['String']['output'];
  capital?: Maybe<Scalars['String']['output']>;
  code: Scalars['ID']['output'];
  continent: Continent;
  currencies: Array<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  emoji: Scalars['String']['output'];
  emojiU: Scalars['String']['output'];
  languages: Array<Language>;
  name: Scalars['String']['output'];
  native: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  phones: Array<Scalars['String']['output']>;
  states: Array<State>;
  subdivisions: Array<Subdivision>;
}

export interface CountryNameArgs {
  lang?: InputMaybe<Scalars['String']['input']>;
}

export interface CountryFilterInput {
  code?: InputMaybe<StringQueryOperatorInput>;
  continent?: InputMaybe<StringQueryOperatorInput>;
  currency?: InputMaybe<StringQueryOperatorInput>;
}

export interface Language {
  __typename?: 'Language';
  code: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  native: Scalars['String']['output'];
  rtl: Scalars['Boolean']['output'];
}

export interface LanguageFilterInput {
  code?: InputMaybe<StringQueryOperatorInput>;
}

export interface Query {
  __typename?: 'Query';
  continent?: Maybe<Continent>;
  continents: Array<Continent>;
  countries: Array<Country>;
  country?: Maybe<Country>;
  language?: Maybe<Language>;
  languages: Array<Language>;
}

export interface QueryContinentArgs {
  code: Scalars['ID']['input'];
}

export interface QueryContinentsArgs {
  filter?: InputMaybe<ContinentFilterInput>;
}

export interface QueryCountriesArgs {
  filter?: InputMaybe<CountryFilterInput>;
}

export interface QueryCountryArgs {
  code: Scalars['ID']['input'];
}

export interface QueryLanguageArgs {
  code: Scalars['ID']['input'];
}

export interface QueryLanguagesArgs {
  filter?: InputMaybe<LanguageFilterInput>;
}

export interface State {
  __typename?: 'State';
  code?: Maybe<Scalars['String']['output']>;
  country: Country;
  name: Scalars['String']['output'];
}

export interface StringQueryOperatorInput {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<Scalars['String']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
}

export interface Subdivision {
  __typename?: 'Subdivision';
  code: Scalars['ID']['output'];
  emoji?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
}

export type GetContinentsQueryVariables = Exact<{ [key: string]: never }>;

export interface GetContinentsQuery {
  __typename?: 'Query';
  continents: Array<{
    __typename?: 'Continent';
    code: string;
    name: string;
    countries: Array<{
      __typename?: 'Country';
      code: string;
      name: string;
      phone: string;
      currency?: string | null;
      languages: Array<{ __typename?: 'Language'; name: string }>;
    }>;
  }>;
}

export type GetCountriesQueryVariables = Exact<{ [key: string]: never }>;

export interface GetCountriesQuery {
  __typename?: 'Query';
  countries: Array<{ __typename?: 'Country'; name: string; code: string }>;
}

export interface CountryFieldsFragment {
  __typename?: 'Country';
  code: string;
  name: string;
  phone: string;
  currency?: string | null;
  languages: Array<{ __typename?: 'Language'; name: string }>;
}

export type GetCountryByCodeQueryVariables = Exact<{
  code: Scalars['ID']['input'];
}>;

export interface GetCountryByCodeQuery {
  __typename?: 'Query';
  country?: {
    __typename?: 'Country';
    name: string;
    code: string;
    capital?: string | null;
    currency?: string | null;
  } | null;
}

export const CountryFieldsFragmentDoc = gql`
  fragment CountryFields on Country {
    code
    name
    phone
    currency
    languages {
      name
    }
  }
`;
export const GetContinentsDocument = gql`
  query getContinents {
    continents {
      code
      name
      countries {
        ...CountryFields
      }
    }
  }
  ${CountryFieldsFragmentDoc}
`;
export const GetCountriesDocument = gql`
  query getCountries {
    countries {
      name
      code
    }
  }
`;
export const GetCountryByCodeDocument = gql`
  query getCountryByCode($code: ID!) {
    country(code: $code) {
      name
      code
      capital
      currency
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getContinents(
      variables?: GetContinentsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetContinentsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetContinentsQuery>(GetContinentsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getContinents',
        'query',
      );
    },
    getCountries(
      variables?: GetCountriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetCountriesQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetCountriesQuery>(GetCountriesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getCountries',
        'query',
      );
    },
    getCountryByCode(
      variables: GetCountryByCodeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetCountryByCodeQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetCountryByCodeQuery>(GetCountryByCodeDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getCountryByCode',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
