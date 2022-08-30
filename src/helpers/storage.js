import { LOCAL_STORAGE_KEYS } from "configs";

export const getAccessToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);
};

export const getUser = () => {
  const user = localStorage.getItem(LOCAL_STORAGE_KEYS.user);
  return user ? JSON.parse(user) : null;
};

export const getLanguage = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.language);
};

export const setTokenLoginSucceeded = ({ accessToken, user }) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user));
  localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, accessToken);
};

export const setLanguage = (language = "en") => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.language, language);
};

export const resetUserToken = () => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, "");
  localStorage.setItem(LOCAL_STORAGE_KEYS.user, "");
};

export const resetUserInfo = () => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.user, "");
};
