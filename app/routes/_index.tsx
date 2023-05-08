import { Link, Outlet } from '@remix-run/react';
import type { V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }];
};

export default function Index() {
  return (
    <div>
      <nav>
        <Link className="m-2 inline-block bg-slate-600 px-4 py-3 text-white" to="/offset">
          Offset
        </Link>
        <Link className="m-2 inline-block bg-slate-600 px-4 py-3 text-white" to="/paginate">
          Paginate
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
