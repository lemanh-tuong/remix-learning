import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { client } from '~/graphql/graphql-client';
import { getSdk } from '~/graphql/sdk';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import type { GetCountryByCodeQuery } from '~/graphql/sdk';

type PageProps = GetCountryByCodeQuery;

export const loader: LoaderFunction = async ({ params }) => {
  const { code } = params;

  if (code) {
    const sdk = getSdk(client);
    const { country } = await sdk.getCountryByCode({ code });
    return json<PageProps>({ country });
  } else {
    return json<PageProps>({ country: null });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const code = formData.get('code');
  redirect(`/countries/${code}`);
};

export default function CountryPage() {
  const data = useLoaderData<PageProps>();

  return (
    <>
      <form method="post" action={`/countries/${data?.country?.code}`}>
        <label>
          <input name="code" type="text" placeholder="Country code" />
        </label>
        <button type="submit">Go</button>
      </form>
      <pre>{JSON.stringify(data?.country, null, 2)}</pre>
    </>
  );
}
