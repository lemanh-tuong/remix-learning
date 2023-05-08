import { delay } from '~/utils/delay';

const items = Array.from({ length: 300 }, (_, i) => i);

export const getItemsWithOffset = async (offset: number, limit: number) => {
  await delay(1000);
  return {
    limit,
    offset,
    total: items.length,
    items: items.slice(offset, offset + limit),
  };
};

export const getItemsWithPaginate = async (page: number, postsPerPage: number) => {
  await delay(1000);
  const start = page * postsPerPage;
  return {
    page,
    postsPerPage,
    items: items.slice(start, start + postsPerPage),
    totalPages: Math.ceil(items.length / postsPerPage) - 1,
    total: items.length,
  };
};
