import { gql } from 'graphql-request';

export const GetAllCountries = gql`
  {
    countries {
      name
      code
    }
  }
`;

interface Country {
  name: string;
  code: string;
}

export interface GetAllCountriesResponse {
  countries: Country[];
}
