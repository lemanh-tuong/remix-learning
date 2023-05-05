import { fetchResolver, fsResolver, imageLoader } from 'remix-image/server';
import { sharpTransformer } from 'remix-image-sharp';
import type { LoaderFunction } from '@remix-run/node';
import type { LoaderConfig, Resolver } from 'remix-image/server';

export const fetchImage: Resolver = async (asset, url, options, basePath) => {
  if (url.startsWith('/') && (url.length === 1 || url[1] !== '/')) {
    return fsResolver(asset, url, options, basePath);
  } else {
    return fetchResolver(asset, url, options, basePath);
  }
};

const config: LoaderConfig = {
  selfUrl: 'http://localhost:3000',
  resolver: fetchImage,
  transformer: sharpTransformer,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
