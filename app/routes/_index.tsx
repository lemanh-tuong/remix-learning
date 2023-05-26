import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { GetAllCountries } from '~/graphql/getCountries';
import { client } from '~/lib/graphql-client';
import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node';
import type { GetAllCountriesResponse } from '~/graphql/getCountries';

type PageProps = GetAllCountriesResponse;

export const loader: LoaderFunction = async () => {
  const { countries } = await client.request<PageProps>(GetAllCountries);

  return json<PageProps>({ countries });
};

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }];
};

export default function Index() {
  const { countries } = useLoaderData<PageProps>();
  const func = async () => {
    const response = await window.versions.ping();
    console.log(response); // prints out 'pong'
  };
  return (
    <div>
      <h1 onClick={func}>Remix + GraphQL!</h1>
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
