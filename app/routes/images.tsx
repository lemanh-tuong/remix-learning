import React from 'react';
import Image, { MimeType } from 'remix-image';
import image from '~/assets/images/images.jpg';

const IndexPage: React.FC = () => (
  <div>
    <Image
      options={{ contentType: MimeType.WEBP }}
      src="/image.jpeg"
      placeholder="blur"
      loaderUrl="/api"
      responsive={[
        {
          size: { width: 100, height: 100 },
          maxWidth: 500,
        },
        {
          size: { width: 600, height: 600 },
        },
      ]}
    />
    <Image
      options={{ contentType: MimeType.WEBP }}
      src={image}
      placeholder="blur"
      loaderUrl="/api"
      responsive={[{ size: { width: 100 } }]}
    />
    <Image
      options={{ contentType: MimeType.WEBP }}
      src="https://images.pexels.com/photos/12736878/pexels-photo-12736878.jpeg"
      placeholder="blur"
      loaderUrl="/api"
      responsive={[{ size: { width: 100 } }]}
    />
  </div>
);

export default IndexPage;
