export const POSTS_PER_PAGE = 8;
export const getPage = (searchParams: URLSearchParams) => ({
  page: Number(searchParams.get('page') || '0'),
  postsPerPage: Number(searchParams.get('postsPerPage') || POSTS_PER_PAGE.toString()),
});
