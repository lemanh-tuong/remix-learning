import { Form, Link, useLoaderData } from '@remix-run/react';
import { storage } from '~/services/SessionStorage';
import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await storage.getSession({ request });
  return session;
};

export default function Index() {
  const session = useLoaderData();

  if (session.userInfo) {
    return (
      <div>
        <div>
          <h1>Hello {session.userInfo.email}</h1>
          <div>
            <Link to="/profile">Profile</Link>
          </div>
          <div>
            <Form action="/logout" method="POST">
              <button type="submit" className="text-gray-700 hover:text-purple-700">
                Log Out
              </button>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Hello world</h1>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
