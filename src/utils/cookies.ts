import Cookies from "universal-cookie";

export const setCookie = (key: string, val: string) => {
  const cookie = new Cookies();

  cookie.set(key, val, { path: "/" });
};

export const getCookie = (key: string) => {
  const cookie = new Cookies();

  return cookie.get(key);
};

export const removeCookie = (key: string) => {
  const cookie = new Cookies();

  cookie.remove(key);
};
