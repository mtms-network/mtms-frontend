import { BASE_API } from "configs";
import { createPublicInstance } from "./base";

const client = createPublicInstance(BASE_API.auth);

export const signIn = async ({ email, password, device_name = "1" }) => {
  const res = await client.post("/login", { email, password, device_name });
  return res?.data;
};

export const signUp = async ({ name, email, username, password, password_confirmation }) => {
  const res = await client.post("/register", {
    name,
    email,
    username,
    password,
    password_confirmation,
  });
  return res?.data;
};

export const forgotPassword = async ({ email }) => {
  const res = await client.post("/password", {
    email,
  });
  return res?.data;
};

export const resetPassword = async ({ email, code, new_password, new_password_confirmation }) => {
  const res = await client.post("/reset", {
    email,
    code,
    new_password,
    new_password_confirmation,
  });
  return res?.data;
};
