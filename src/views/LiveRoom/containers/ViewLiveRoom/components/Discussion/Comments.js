import React, {useEffect, useState} from "react";
import CommentItem from "./CommentItem";
import {useLiveRoomStore} from "../../../../../../stores/liveroom.store";
import {getComments} from "../../../../../../services";

const Comments = ({uuid}) => {

    const [liveRoomStore, updateLiveRoomStore] = useLiveRoomStore();

    const fetchData = async () => {
        const res = await getComments(uuid);

        await updateLiveRoomStore((r) => {
            r.comments = res?.data || [];
        })
    }

    useEffect(() => {
        fetchData().then();
    }, [])

    return (
        <div>
            {
                liveRoomStore?.comments?.map((comment, index) => {

                    return (
                        <CommentItem key={index} item={comment}  />
                    )
                })
            }
        </div>
    )
}

export default Comments;
