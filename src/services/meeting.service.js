import { BASE_API } from "configs";
import QueryString from "qs";
import { createPrivateInstance } from "./base";

const client = createPrivateInstance(BASE_API.meeting);

export const getRequirePreMeeting = async () => {
  try {
    const res = await client.get("/pre-requisite");
    return res?.data;
  } catch (error) {
    console.log("getPreRequireMeeting", error);
    return null;
  }
};

export const getMeetingHistories = async () => {
  try {
    const defaultFilters = {
      sort_by: "",
      order: "",
      type: "",
      status: "",
      start_date: "",
      end_date: "",
      name: "",
      current_page: 1,
      per_page: 10,
      instant: false,
    };

    const query = QueryString.stringify({ ...defaultFilters });
    const res = await client.get(`?${query}`);
    return res?.data;
  } catch (error) {
    console.log("getMeetingHistories", error);
    return null;
  }
};
