import { json } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { Divider, List, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getItemsWithOffset } from '~/services/getItems';
import { getOffsetLimit } from '~/utils/getOffsetLimit';
import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Offset' }];
};

export const loader = async ({ request }: LoaderArgs) => {
  const { offset, limit } = getOffsetLimit(new URL(request.url).searchParams);
  return json(await getItemsWithOffset(offset, limit), {
    headers: {
      'Cache-Control': 'public, max-age=120',
    },
  });
};

export default function Offset() {
  const data = useLoaderData<typeof loader>();
  const [items, setItems] = useState<number[]>(data.items);
  const [offset, setOffset] = useState(data.offset);
  const [limit, setLimit] = useState(data.limit);

  const fetcher = useFetcher<typeof loader>();

  const loadMoreData = () => {
    if (fetcher.state === 'loading') {
      return;
    }
    const newOffset = offset + 100;
    const qs = new URLSearchParams([
      ['offset', newOffset.toString()],
      ['limit', limit.toString()],
    ]);
    fetcher.load(`/offset?${qs}`);
  };

  useEffect(() => {
    if (fetcher.data) {
      setItems(prevItems => (fetcher.data ? [...prevItems, ...fetcher.data.items] : prevItems));
      setOffset(fetcher.data.offset);
      setLimit(fetcher.data.limit);
    }
  }, [fetcher.data]);

  return (
    <div className="p-7">
      <h1> Infinite Scrolling (offset={offset})</h1>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <InfiniteScroll
          dataLength={items.length}
          next={loadMoreData}
          hasMore={data.total > items.length}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={items}
            renderItem={item => (
              <List.Item key={item}>
                <div>{item}</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
}
