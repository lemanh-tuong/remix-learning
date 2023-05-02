import { useLoaderData } from '@remix-run/react';
import { storage } from '~/services/SessionStorage';
import type { V2_MetaFunction } from '@remix-run/react';
import type { LoaderFunction } from 'react-router';

export const loader: LoaderFunction = async ({ request }) => {
  await storage.checkedAuthentication({ request });

  const session = await storage.getSession({ request });
  //   REQUEST CÁI GÌ ĐÓ Ở ĐÂY
  return session;
};

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Profile' }];
};

export default function Profile() {
  const sessionData = useLoaderData();
  return <div>{JSON.stringify(sessionData)}</div>;
}
