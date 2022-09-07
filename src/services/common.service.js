import { BASE_API } from "configs";
import { createPrivateInstance } from "./base";

const client = createPrivateInstance("/");

export const getLanguages = async (language = "en") => {
  try {
    const res = await client.get(`/locale/${language}`);
    return res?.data;
  } catch (error) {
    console.error("getLanguages", error);
    return null;
  }
};

export const changePassword = async ({ oldPassword = "", password = "", confirmPassword = "" }) => {
  try {
    const res = await client.post(BASE_API.changePassword, {
      current_password: oldPassword,
      new_password: password,
      new_password_confirmation: confirmPassword,
    });
    return res?.data;
  } catch (error) {
    console.error("changePassword", error);
    return null;
  }
};

export const updateProfile = async (params) => {
  const res = await client.post(BASE_API.profile, {
    ...params,
  });
  return res?.data;
};

export const connectWallet = async ({
  provider = "wallet",
  type = "metamask",
  walletAddress = "",
}) => {
  const res = await client.post("/wallet/connect", {
    wallet_type: type,
    wallet_provider: provider,
    wallet_address: walletAddress,
  });
  return res?.data;
};
