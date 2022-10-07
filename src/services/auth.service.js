import { BASE_API, LIVE_API } from "configs";
import axios from "axios";
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

export const signInWallet = async ({
  provider = "wallet",
  type = "metamask",
  walletAddress = "",
  signId = "",
}) => {
  const res = await client.post("/login/wallet", {
    wallet_type: type,
    wallet_provider: provider,
    id: walletAddress,
    signature: signId,
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

export const resendRegisterVerification = async ({ email }) => {
  const res = await client.post("/register/resend", {
    email,
  });
  return res?.data;
};

export const forgotPassword = async ({ email }) => {
  const res = await client.post("/password", {
    email,
  });
  return res?.data;
};

export const validateResetPassword = async ({ email, code }) => {
  const res = await client.post("/validate-reset-password", {
    email,
    code,
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
    token,
  });
  return res?.data;
};

export const getUser = async (token) => {
  const res = await axios.get(`${LIVE_API}/auth/user`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res?.data;
};


export const getMessageKey = async () => {
  const res = await client.get('/signature');
  return res?.data;
};

export const connectGoogleCalendar = async (code, redirectUri, token) => {
  try {
    const response = await client.post(`/google-calendar/oauth2callback?code=${code}&redirect_uri=${redirectUri}`, null,{
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (err){ }
  return null;
};

export const checkIsConnectGoogleCalendar = async (token) => {
  try {
    const response = await client.get('/google-calendar/check-integrated', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  }catch (err){
    return null;
  }
}
