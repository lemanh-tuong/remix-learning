import React from 'react';
import Image, { MimeType } from 'remix-image';

const IndexPage: React.FC = () => (
  <div>
    <Image
      options={{ contentType: MimeType.WEBP }}
      src="/image.jpeg"
      placeholder="blur"
      loaderUrl="/api"
      responsive={[
        {
          size: { width: 500 },
          maxWidth: 500,
        },
      ]}
    />
  </div>
);

export default IndexPage;
