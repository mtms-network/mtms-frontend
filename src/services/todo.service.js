import QueryString from "qs";
import {createPrivateInstance} from "./base";
import {BASE_API} from "../configs";

const client = createPrivateInstance(BASE_API.todo);

export const getListToDo = async (filter) => {
  try {
    const query = QueryString.stringify({ ...filter });

    const res = await client.get(`?${query}`);
    return res?.data;
  }catch (err){}
  
  return null;
};

export const postToDo = async (data) => {
  try {
    const res = await  client.post('', data);
    return res;
  }catch (err){}
  return null;
};

export const deleteToDo = async (id) => {
  try {
    const res = await client.delete(`/${id}`);
    return res;
  }catch (err){}

  return null;
};

export const postStatusTodo = async (id) => {
  try {
    const res = await  client.post(`/${id}/status`);
    return res;
  }catch (err){}
  return null;
}
