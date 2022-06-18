import axios from "axios";
import { getAccessToken } from "helpers";
import { LIVE_API } from "configs";

export const handleError = (error) => {
  const { response, message } = error;
  if (response) {
    return response;
  }
  return message;
};

export const createPrivateInstance = (path, options) => {
  const instance = axios.create({
    baseURL: `${LIVE_API}${path}`,
    headers: { Accept: "application/json" },
    ...options,
  });

  instance.interceptors.request.use((request) => {
    const token = getAccessToken();
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  });

  instance.interceptors.response.use((response) => {
    return response;
  });

  return instance;
};

export const createPublicInstance = (path, options) => {
  const { origin } = window && window.location;
  const instance = axios.create({
    baseURL: `${origin}${path}`,
    headers: {
      Accept: "application/json",
    },
    ...options,
  });
  instance.interceptors.response.use((data) => {
    return data;
  });
  return instance;
};
