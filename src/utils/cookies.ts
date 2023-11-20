import Cookies, { CookieSetOptions } from 'universal-cookie';

export const CookieHandler = () => new Cookies();

interface CreateCookieProps {
    cookieName: string;
    payload: any;
    options?: CookieSetOptions;
}

export const createCookie = ({cookieName, payload, options}: CreateCookieProps) => {
  CookieHandler().set(cookieName, payload, {
    path: '/',
    secure: true,
    sameSite: 'none',
    ...options,
  });
};

export const getCookie = (cookieName: string) => {
  const cookieValue = CookieHandler().get(cookieName);
  return cookieValue;
};

export const deleteCookie = (cookieName: string) => CookieHandler().remove(cookieName);
