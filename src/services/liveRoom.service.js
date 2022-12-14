import QueryString from "qs";
import {createPrivateInstance} from "./base";
import {BASE_API} from "../configs";
import {handleHttpError} from "../helpers";

const client = createPrivateInstance(BASE_API.meeting);

export const getListLiveRoom = async (filter) => {
  const defaultFilters = {
    sort_by: "start_date_time",
    order: "desc",
    room: true,
    name: "",
    current_page: filter.page || 1,
    per_page: filter.limit || 10,
    start_date: filter.start_date,
    end_date: filter.end_date,
    roomType: filter?.roomType || null,
  };

  const query = QueryString.stringify({ ...defaultFilters });
  const res = await client.get(`?${query}`);
  return res?.data;
};

export const getPublicLiveRoom = async (filter) => {
    try {
        const defaultFilters = {
            sort_by: filter?.sort_by || 'start_date_time',
            order: "desc",
            room: true,
            name: "",
            current_page: filter.page || 1,
            per_page: filter.limit || 10,
            keyword: filter?.keyword || '',
            roomType: filter?.roomType || null,
        };

        if(filter?.status){
            defaultFilters.status = filter.status;
        }

        const query = QueryString.stringify({ ...defaultFilters });
        const res = await client.get(`/live-room?${query}`);
        return res?.data;
    }catch (err){}

    return null
}


export const getMyRoom = async (filter) => {
    try {
        const defaultFilters = {
            sort_by: "start_date_time",
            order: "desc",
            room: true,
            name: "",
            current_page: filter.page || 1,
            per_page: filter.limit || 10,
            start_date: filter.start_date,
            end_date: filter.end_date,
            roomType: filter?.roomType || null,
            keyword: filter?.keyword,
        };

        const query = QueryString.stringify({ ...defaultFilters });
        const res = await client.get(`/my-rooms?${query}`);
        return res?.data;
    }catch (err){}

    return null
}

export const getMyFavorite = async (filter) => {
    try {
        const defaultFilters = {
            sort_by: "start_date_time",
            order: "desc",
            room: true,
            name: "",
            current_page: filter.page || 1,
            per_page: filter.limit || 10,
            start_date: filter.start_date,
            end_date: filter.end_date,
            roomType: filter?.roomType || null,
            keyword: filter?.keyword,
        };

        const query = QueryString.stringify({ ...defaultFilters });
        const res = await client.get(`/live-room/interested?${query}`);
        return res?.data;
    }catch (err){}

    return null
}

export const likeRoom = async (uuid) => {
    try {
        const res = await client.post(`/${uuid}/like`);
        return res?.data;
    }catch (err){}

    return null;
}

export const disLikeRoom = async (uuid) => {
    try {
        const res = await client.post(`/${uuid}/unlike`);
        return res?.data;
    }catch (err){}

    return null;
}
export const getComments = async (uuid) => {
    try {
        const defaultFilters = {
            sort_by: "created_at",
            orderBy: "desc",
        };

        const query = QueryString.stringify({ ...defaultFilters });

        const res = await client.get(`/${uuid}/comments?${query}`);
        return res?.data;
    }catch (err){}
    return null
}


export const addComment = async (roomUudi, body) => {
    try {
        const res = await client.post(`/${roomUudi}/comments`, body)
        return res?.data;
    }catch (err){

    }

    return null;
}

export const lockRoom = async (uuid, type = 'lock') => {
    try {
        const res = await client.post(`/${uuid}/${type}`)
        return res?.data;
    }catch (err){}

    return null;
}

export const startRoom = async (uuid) => {
    try {
        const res = await client.post(`/${uuid}/start`);
        return res?.data;
    }catch (err){}

    return null;
}

export const giftToHost = async (uuid, transactionHash) => {
    try {
        const res = await client.post(`/${uuid}/confirm-gift`, {transactionHash: transactionHash});
        return res?.data;
    }catch (err){
        console.log('giftToHost fail');
    }

    return null;
}

export const giftWithDraw = async (uuid, amount) => {
    try {
        const res = await client.post(`/${uuid}/gift`, {tokenAmount: amount});
        return res?.data;
    }catch (err){
        let mes = "";
        try {
            mes = err?.response?.data?.errors?.message[0];
        }catch (err){}

        return mes
    }

    return null;
}

export const likeComment = async (meetingUuid, commentUuid, type = 'like') => {
    try {
        const res = await client.post(`/${ meetingUuid }/comments/${commentUuid}/${type}`)
        return res?.data;
    }catch (err){}
    return false;
}
