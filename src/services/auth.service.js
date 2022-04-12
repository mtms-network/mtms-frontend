import { BASE_API } from "configs";
import { createPublicInstance } from "./base";

const client = createPublicInstance(BASE_API.auth);

export const login = async ({ email, password, device_name = "1" }) => {
  return await client.post("/login", { email, password, device_name });
};
