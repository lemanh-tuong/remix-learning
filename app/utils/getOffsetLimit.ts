export const LIMIT = 100;
export const getOffsetLimit = (searchParams: URLSearchParams) => ({
  offset: Number(searchParams.get('offset') || '0'),
  limit: Number(searchParams.get('limit') || LIMIT.toString()),
});
