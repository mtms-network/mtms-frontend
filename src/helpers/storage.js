import { LOCAL_STORAGE_KEYS } from "configs";

export const getAccessToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);
};

export const getUser = () => {
  const user = localStorage.getItem(LOCAL_STORAGE_KEYS.user);
  return user ? JSON.parse(user) : null;
};

export const setTokenLoginSucceeded = ({ accessToken, user }) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user));
  localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, accessToken);
};

export const resetUserToken = () => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, "");
};
