import type { Quote } from '~/models/Quote';

export const getQuotes = async () => {
  return Promise.resolve<Quote[]>([
    {
      quote: 'Light at the end of the tunnel, dey don cut am.',
      by: 'Brain Jotter',
    },
    {
      quote: 'Promised to stand by you, we don sit down.',
      by: 'Brain Jotter',
    },
    {
      quote: 'Polythecnic wey dey in Italy, Napoli.',
      by: 'Comrade with wisdom and Understanding',
    },
  ]);
};
