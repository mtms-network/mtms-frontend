import QueryString from "qs";
import {createPrivateInstance} from "./base";
import {BASE_API} from "../configs";

const client = createPrivateInstance(BASE_API.todo);

export const getListToDo = async (defaultFilters) => {
  try {
    const filter = {
      current_page: defaultFilters.page,
      per_page: defaultFilters.limit,
      sort_by: "id",
      order: "desc",
    };
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
};

export const getDetailTodo = async (id) => {
  try {
    const res = await  client.get(`/${id}`);
    return res?.data;
  }catch (err){}
  return null;
}


export const patchTodo = async (uuid, data) => {
  try {
    const res = await  client.patch(`/${uuid}`, data);
    return res;
  }catch (err){}
  return null;
};
