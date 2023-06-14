import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { client } from '~/graphql/graphql-client';
import { getSdk } from '~/graphql/sdk';
import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node';
import type { GetCountriesQuery } from '~/graphql/sdk';

type PageProps = GetCountriesQuery;
export const loader: LoaderFunction = async () => {
  const sdk = getSdk(client);
  const { countries } = await sdk.getCountries();

  return json({ countries });
};

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }];
};

export default function Index() {
  const { countries } = useLoaderData<PageProps>();

  return (
    <div>
      <h1>Remix + GraphQL!</h1>
      <button className="bg-slate-300 px-4 py-2">Load</button>
      <ul>
        {countries.map(({ code, name }) => (
          <li key={code}>
            <Link to={`/countries/${code}`} prefetch="intent">
              Link: {name}
            </Link>
            <button onClick={() => window.open(`/countries/${code}`)}>Button open: {name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
