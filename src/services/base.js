import axios from "axios";
import { getAccessToken, getLanguage } from "helpers";
import { LIVE_API } from "configs";
import { getTimezone } from "helpers/i18nLocal";

export const handleError = (error) => {
  const { response, message } = error;
  if (response) {
    return response;
  }
  return message;
};

export const createPrivateInstance = (path, options) => {
  const timezone = getTimezone();
  const instance = axios.create({
    baseURL: `${LIVE_API}${path}`,
    headers: { Accept: "application/json", "x-timezone": timezone },
    ...options,
  });

  instance.interceptors.request.use((request) => {
    const token = getAccessToken();
    const language = getLanguage();

    request.headers.Authorization = `Bearer ${token}`;
    request.headers["x-localization"] = language;
    return request;
  });

  instance.interceptors.response.use((response) => {
    return response;
  });

  return instance;
};

export const createPublicInstance = (path, options) => {
  const timezone = getTimezone();

  const instance = axios.create({
    baseURL: `${LIVE_API}${path}`,
    headers: {
      Accept: "application/json",
      "x-timezone": timezone,
    },
    ...options,
  });

  instance.interceptors.request.use((request) => {
    request.headers["x-localization"] = getLanguage();
    return request;
  });

  instance.interceptors.response.use((data) => {
    return data;
  });
  return instance;
};
