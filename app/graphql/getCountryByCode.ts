import { gql } from 'graphql-request';
import type { Variables } from 'graphql-request';

export const GetCountryByCode = gql`
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      name
      code
      capital
      currency
    }
  }
`;

export interface GetCountryByCodeVariables extends Variables {
  code: string;
}

export interface GetCountryByCodeResponse {
  country: {
    name: string;
    code: string;
    capital: string;
    currency: string;
  };
}
