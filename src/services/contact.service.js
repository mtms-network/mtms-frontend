import QueryString from "qs";
import {createPrivateInstance} from "./base";
import {BASE_API} from "../configs";

const client = createPrivateInstance(BASE_API.contact);

export const getAllContact = async (filter) => {
  try {
    const query = QueryString.stringify({ ...filter });

    const res = await client.get(`?${query}`);
    return res?.data;
  }catch (err){}
  return null;
};

export const postContact = async (data) => {
  try {
    const res = client.post(``, data);
    return res;
  }catch (err){ }
  return null;
};

export const deleteContact = async (id) => {
  const res = await client.delete(`/${id}`);
  return res;
};

export const patchContact = async (id, data) => {
  const res = await client.patch(`/${id}`, data);
  return res;
};

export const getDetailContact = async (uuid) => {
  try {
    const res = await client.get(`/${uuid}`);
    return res?.data;
  }catch (err){ }
  return null;
};
