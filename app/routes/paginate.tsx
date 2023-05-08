import { json } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { getItemsWithPaginate } from '~/services/getItems';
import { getPage } from '~/utils/getPage';
import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Paginate' }];
};

export const loader = async ({ request }: LoaderArgs) => {
  const { page, postsPerPage } = getPage(new URL(request.url).searchParams);
  return json(await getItemsWithPaginate(page, postsPerPage), {
    headers: {
      'Cache-Control': 'public, max-age=120',
    },
  });
};

export default function Offset() {
  const data = useLoaderData<typeof loader>();
  const [items, setItems] = useState<number[]>(data.items);
  const [currentPage, setCurrentPage] = useState(data.page + 1);
  const [postsPerPage, setPostsPerPage] = useState(data.postsPerPage);

  const fetcher = useFetcher<typeof loader>();

  useEffect(() => {
    if (fetcher.data) {
      setItems(fetcher.data.items);
      setCurrentPage(fetcher.data.page + 1);
      setPostsPerPage(fetcher.data.postsPerPage);
    }
  }, [fetcher.data]);

  return (
    <div className="p-7">
      <h1> Paginate (page={currentPage})</h1>
      <Table
        rowKey={item => item.order}
        loading={fetcher.state === 'loading'}
        pagination={{
          pageSize: postsPerPage,
          current: currentPage,
          total: data.total,
          showLessItems: true,
          showSizeChanger: false,
          onChange(page) {
            const qs = new URLSearchParams([
              ['page', (page - 1).toString()],
              ['postsPerPage', postsPerPage.toString()],
            ]);
            fetcher.load(`/paginate?${qs}`);
          },
        }}
        dataSource={items.map(item => ({ order: item }))}
        columns={[{ title: 'Item', render: (_, record) => <div>Item {record.order}</div> }]}
      />
    </div>
  );
}
