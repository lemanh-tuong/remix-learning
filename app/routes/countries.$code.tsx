import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { GetCountryByCode } from '~/graphql/getCountryByCode';
import { client } from '~/lib/graphql-client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import type { GetCountryByCodeResponse, GetCountryByCodeVariables } from '~/graphql/getCountryByCode';

type PageProps = GetCountryByCodeResponse | null;

export const loader: LoaderFunction = async ({ params }) => {
  const { code } = params;

  if (code) {
    const { country } = await client.request<GetCountryByCodeResponse, GetCountryByCodeVariables>(GetCountryByCode, {
      code,
    });
    return json<PageProps>({ country });
  } else {
    return json<PageProps>(null);
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
      <form method="post" action={`/countries/${data?.country.code}`}>
        <label>
          <input name="code" type="text" placeholder="Country code" />
        </label>
        <button type="submit">Go</button>
      </form>
      <pre>{JSON.stringify(data?.country, null, 2)}</pre>
    </>
  );
}
