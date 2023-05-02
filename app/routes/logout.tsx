import { storage } from '~/services/SessionStorage';
import type { ActionFunction } from 'react-router';

export const action: ActionFunction = async ({ request }) => {
  await storage.logout({ request });
  return null;
};
