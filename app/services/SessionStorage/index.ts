import { createCookieSessionStorage, redirect } from '@remix-run/node';
import axios from 'axios';
import type { SessionStorage as RemixSessionStorage } from '@remix-run/node';
import type { AxiosResponse } from 'axios';

interface Session {
  userInfo: {
    username: string;
    email: string;
    avatar: string;
  };
  authentication: {
    type: 'Bearer' | 'Basic';
    token: string;
  };
}

class SessionStorage {
  storage: RemixSessionStorage<Session>;

  constructor() {
    this.storage = createCookieSessionStorage({
      cookie: {
        name: '_session', // use any name you want here
        sameSite: 'lax', // this helps with CSRF
        path: '/', // remember to add this so the cookie will work in all routes
        httpOnly: true, // for security reasons, make this cookie http only
        secrets: process.env.SESSION_SECRET.split(','), // replace this with an actual secret
        secure: process.env.NODE_ENV === 'production', // enable this in prod only
      },
    });
  }

  login = async ({ email, password, request }: { request: Request; email: string; password: string }) => {
    try {
      const session = await this.storage.getSession(request.headers.get('Cookie'));
      console.log('REQUEST API LOGIN', { email, password });
      const response: AxiosResponse<{ info: Session; message: string }>['data'] = await Promise.resolve({
        info: {
          userInfo: {
            avatar: '',
            email: 'tuong@gmail.com',
            username: 'Tuong',
          },
          authentication: {
            token: 'Hello',
            type: 'Bearer',
          },
        },
        message: 'Logged in',
      });
      session.set('userInfo', response.info.userInfo);
      session.set('authentication', response.info.authentication);
      return {
        redirector: redirect('/', {
          headers: {
            'Set-Cookie': await this.storage.commitSession(session),
          },
        }),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: error.response?.data,
        };
      }
      return {
        error,
      };
    }
  };

  logout = async ({ request }: { request: Request }) => {
    const session = await this.storage.getSession(request.headers.get('Cookie'));
    console.log('REQUEST LOGOUT API', session.data);
    await Promise.resolve({ message: 'Logged out' });
    // Return redirect không được
    throw redirect('/login', {
      headers: {
        'Set-Cookie': await this.storage.destroySession(session),
      },
    });
  };

  getSession = async ({ request }: { request: Request }) => {
    const session = await this.storage.getSession(request.headers.get('Cookie'));
    return session.data;
  };

  checkedAuthentication = async ({ request }: { request: Request }) => {
    const session = await this.storage.getSession(request.headers.get('Cookie'));
    if (!session.data.authentication?.token) {
      throw redirect('/login');
    }
  };
}

export const storage = new SessionStorage();
