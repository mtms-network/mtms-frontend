import { BASE_API } from "configs";
import { createPrivateInstance } from "./base";

const client = createPrivateInstance("/");

export const getLanguages = async () => {
  try {
    const res = await client.get("/locale/en");
    return res?.data;
  } catch (error) {
    console.error("getLanguages", error);
    return null;
  }
};
