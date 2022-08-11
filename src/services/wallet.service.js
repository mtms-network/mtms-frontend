import { BASE_API } from "configs";
import { createPrivateInstance } from "./base";

const client = createPrivateInstance(BASE_API.wallet);

export const getRequirePreWallet = async () => {
  try {
    const res = await client.get("/pre-requisite");
    return res?.data;
  } catch (error) {
    console.error("getPreRequireWallet", error);
    return null;
  }
};
