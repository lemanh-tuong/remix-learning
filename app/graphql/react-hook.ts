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

export type ContinentsQueryVariables = Exact<{ [key: string]: never }>;

export interface ContinentsQuery {
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

export interface CountryFieldsFragment {
  __typename?: 'Country';
  code: string;
  name: string;
  phone: string;
  currency?: string | null;
  languages: Array<{ __typename?: 'Language'; name: string }>;
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
export const ContinentsDocument = gql`
  query continents {
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

/**
 * __useContinentsQuery__
 *
 * To run a query within a React component, call `useContinentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContinentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContinentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useContinentsQuery(baseOptions?: Apollo.QueryHookOptions<ContinentsQuery, ContinentsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ContinentsQuery, ContinentsQueryVariables>(ContinentsDocument, options);
}
export function useContinentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ContinentsQuery, ContinentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ContinentsQuery, ContinentsQueryVariables>(ContinentsDocument, options);
}
export type ContinentsQueryHookResult = ReturnType<typeof useContinentsQuery>;
export type ContinentsLazyQueryHookResult = ReturnType<typeof useContinentsLazyQuery>;
export type ContinentsQueryResult = Apollo.QueryResult<ContinentsQuery, ContinentsQueryVariables>;
