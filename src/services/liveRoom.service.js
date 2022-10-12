import QueryString from "qs";
import {createPrivateInstance} from "./base";
import {BASE_API} from "../configs";

const client = createPrivateInstance(BASE_API.meeting);

export const getListLiveRoom = async (filter) => {
  const defaultFilters = {
    sort_by: "start_date_time",
    order: "desc",
    room: true,
    name: "",
    current_page: filter.page || 1,
    per_page: filter.limit || 10,
  };

  const query = QueryString.stringify({ ...defaultFilters });
  const res = await client.get(`?${query}`);
  return res?.data;
};
