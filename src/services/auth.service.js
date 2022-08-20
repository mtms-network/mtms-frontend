import { BASE_API } from "configs";
import { createPublicInstance } from "./base";

const client = createPublicInstance(BASE_API.auth);

export const signIn = async ({ email, password, deviceName = "1" }) => {
  const res = await client.post("/login", { email, password, device_name: deviceName });
  return res?.data;
};

export const signInSocial = async ({ provider = "google", code, redirectUri }) => {
  const res = await client.post("/social-media/login", {
    provider,
    code,
    device_name: "mtms-app",
    redirect_uri: redirectUri,
  });
  return res?.data;
};

export const signUp = async ({ name, email, username, password, passwordConfirmation }) => {
  const res = await client.post("/register", {
    name,
    email,
    username,
    password,
    password_confirmation: passwordConfirmation,
  });
  return res?.data;
};

export const forgotPassword = async ({ email }) => {
  const res = await client.post("/password", {
    email,
  });
  return res?.data;
};

export const resetPassword = async ({ email, code, newPassword, newPasswordConfirmation }) => {
  const res = await client.post("/reset", {
    email,
    code,
    new_password: newPassword,
    new_password_confirmation: newPasswordConfirmation,
  });
  return res?.data;
};

export const verifyActiveToken = async ({ token }) => {
  const res = await client.post("/verify", {
    token
  });
  return res?.data;
};
