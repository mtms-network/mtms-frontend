import { BASE_API } from "configs";
import QueryString from "qs";
import { createPrivateInstance } from "./base";

const client = createPrivateInstance(BASE_API.meeting);

export const getRequirePreMeeting = async () => {
  try {
    const res = await client.get("/pre-requisite");
    return res?.data;
  } catch (error) {
    console.error("getPreRequireMeeting", error);
    return null;
  }
};

export const getMeetingHistories = async ({ limit, page, sort_by, order }) => {
  try {
    const defaultFilters = {
      sort_by,
      order,
      type: "",
      status: "",
      start_date: "",
      end_date: "",
      name: "",
      current_page: page || 1,
      per_page: limit || 10,
      instant: false,
    };

    const query = QueryString.stringify({ ...defaultFilters });
    const res = await client.get(`?${query}`);
    return res?.data;
  } catch (error) {
    console.error("getMeetingHistories", error);
    return null;
  }
};

export const getScheduleMeetings = async ({ limit, page, order, sort_by }) => {
  try {
    const defaultFilters = {
      current_page: page || 1,
      per_page: limit || 10,
      order,
      sort_by,
    };

    const query = QueryString.stringify({ ...defaultFilters });
    const res = await client.get(`?${query}`);
    return res?.data;
  } catch (error) {
    console.error("getMeetingHistories", error);
    return null;
  }
};

export const joinMeetingByCode = async ({ code }) => {
  try {
    const res = await client.get(`/m/${code}`);
    return res;
  } catch (error) {
    console.error("joinMeetingByCode", error);
    return null;
  }
};

export const startMeeting = async ({
  instant = true,
  type = {
    uuid: "audio_conference",
    name: "Audio Conference",
  },
  maxParticipant = 1000,
  isActiveMember = false,
  isKeepAlive = false,
  fee = 0,
}) => {
  try {
    const res = await client.post(`/`, {
      instant,
      type,
      max_participant_count: maxParticipant,
      accessible_to_members: isActiveMember,
      identifier: "",
      keep_alive: isKeepAlive,
      is_pam: false,
      is_paid: false,
      fee,
    });
    return res;
  } catch (error) {
    console.error("startMeeting", error);
    return null;
  }
};
