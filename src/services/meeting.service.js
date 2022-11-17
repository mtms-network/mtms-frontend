/* eslint-disable camelcase */
import { BASE_API, COMMON, routeUrls } from "configs";
import QueryString from "qs";
import { createPrivateInstance } from "./base";
import { getAccessToken } from "../helpers";

const client = createPrivateInstance(BASE_API.meeting);

export const getRequirePreMeeting = async () => {
    try {
        const res = await client.get("/pre-requisite");
        return res?.data;
    } catch (error) {
        console.error("getPreRequireMeeting", error);
        return error;
    }
};

export const getMeetingHistories = async ({
                                              limit,
                                              page,
                                              title = "",
                                              type,
                                              status,
                                              sort_by,
                                              order,
                                              startDate,
                                              endDate,
                                          }) => {
    try {
        const defaultFilters = {
            sort_by,
            order,
            type,
            status,
            start_date: startDate || "",
            end_date: endDate || "",
            name: "",
            current_page: page || 1,
            per_page: limit || 10,
        };
        if (title) {
            defaultFilters.keyword = title;
        }

        const query = QueryString.stringify({ ...defaultFilters });
        const res = await client.get(`?${query}`);
        return res?.data;
    } catch (error) {
        console.error("getMeetingHistories", error);
        return error;
    }
};

export const getScheduleMeetings = async ({
                                              limit,
                                              page,
                                              title = "",
                                              type,
                                              status,
                                              order,
                                              sort_by,
                                              startDate,
                                              endDate,
                                              pinned,
                                          }) => {
    try {
        const defaultFilters = {
            order,
            sort_by,
            current_page: page || 1,
            per_page: limit || 10,
            status,
            start_date: startDate || "",
            end_date: endDate || "",
            instant: 0,
            pinned: pinned || false,
        };
        if (title) {
            defaultFilters.keyword = title;
        }

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
        return error;
    }
};

export const startMeeting = async ({
                                       instant = true,
                                       type = {
                                           uuid: "video_conference",
                                           name: "Video Conference",
                                       },
                                       maxParticipant = COMMON.MAX_PARTICIPANT,
                                       isActiveMember = false,
                                       isKeepAlive = false,
                                       fee = 0,
                                       code = "",
                                   }) => {
    try {
        const res = await client.post(``, {
            instant,
            type,
            max_participant_count: maxParticipant,
            accessible_to_members: isActiveMember,
            identifier: code,
            keep_alive: isKeepAlive,
            is_pam: false,
            is_paid: false,
            fee,
        });
        return res;
    } catch (error) {
        console.error("startMeeting", error);
        return error;
    }
};

export const getMeetingDetail = async (uuid) => {
    try {
        const res = await client.get(`/${uuid}`);
        return res?.data;
    } catch (error) {
        console.error("getMeetingDetail", error);
        return error;
    }
};

export const createInstantMeeting = async (data) => {
    try {
        const res = await client.post(``, {
            ...data,
        });
        return res;
    } catch (error) {
        console.error("createInstantMeeting", error);
        return error;
    }
};

export const updateInstantMeeting = async (meetingId, data) => {
    try {
        const res = await client.put(`/${meetingId}`, {
            ...data,
        });
        return res;
    } catch (error) {
        console.error("updateInstantMeeting", error);
        return error;
    }
};

export const sendEmailToMemberInMeeting = async (meetingId) => {
    try {
        const res = await client.post(`/${meetingId}/invitation`);
        return res;
    } catch (error) {
        console.error("sendEmailToMemberInMeeting", error);
        return error;
    }
};

export const getMeetingContact = async () => {
    try {
        const Axios = createPrivateInstance("");
        const res = await Axios.get(`/contacts?per_page=-1`);
        return res?.data;
    } catch (error) {
    }
    return null;
};

export const checkMeetingExist = async (meetingId) => {
    try {
        const token = getAccessToken();
        const headers = {};
        if (token) {
            headers["X-authorization"] = `Bearer ${token}`;
        }

        const res = await client.get(`/check-exist/${meetingId}`, {
            headers,
        });

        return res?.data;
    } catch (error) {
        console.error("getMeetingDetail", error);
        return error;
    }
};

export const joinMeeting = async (identifer) => {
    try {
        const res = await client.get(`/m/${identifer}`);
        return res?.data;
    } catch (error) {
        console.error("joinMeeting", error);
        return error;
    }
};

export const deleteMeetingByUuid = async (uuid) => {
    try {
        const res = await client.delete(`/${uuid}`);
        return res?.data;
    } catch (error) {
        console.error("deleteMeetingByUuid", error);
        return error;
    }
};

export const pinMeeting = async (uuid) => {
    try {
        const res = await client.post(`/${uuid}/pin`);
        return res?.data;
    } catch (error) {
        let mgs = "Pin fail";
        try {
            mgs = error?.response?.data?.errors.message[0];
        }catch (err){};
        return mgs;
    }
}
