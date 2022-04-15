import axios from "axios";
import { getAccessToken } from "helpers";

export const handleError = (error) => {
  const { response, message } = error;
  if (response) {
    return response;
  }
  return message;
};

export const createInstance = (path, options) => {
  const { origin } = window && window.location;
  const instance = axios.create({
    baseURL: `${origin}${path}`,
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
  console.log(`${origin}${path}`);
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
