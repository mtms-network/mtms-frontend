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
  try {
    const res = await client.post(BASE_API.profile, {
      ...params,
    });
    return res?.data;
  } catch (error) {
    console.error("updateProfile", error);
    return null;
  }
};
