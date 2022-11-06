import React, {useState} from "react";
import {Button} from "../../../../../../components";
import {LikeOutlined} from "@ant-design/icons";
import {disLikeRoom, likeRoom} from "../../../../../../services";
import {API_RESPONSE_STATUS} from "../../../../../../configs";
import {message} from "antd";

const LikeRoom = ({t, meeting}) => {

    const [isReload, setIsReload] = useState(false);

    const onLike = async () => {
        const res = await likeRoom(meeting?.uuid);
        if (res?.status === API_RESPONSE_STATUS.success) {
            message.success("Liked success");
            meeting.total_likes += 1;
            meeting.liked = true;
            setIsReload(!isReload);
        } else {
            message.error("Liked fail");
        }
    };

    const onDisLike = async () => {
        const res = await disLikeRoom(meeting?.uuid);
        if (res?.status === API_RESPONSE_STATUS.success) {
            message.success("Dislike success");
            meeting.total_likes -= 1;
            meeting.liked = false;
            setIsReload(!isReload);
        } else {
            message.error("Dislike fail");
        }
    };

    return (
        <>
            <Button
                className={`btn btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4 hover:btn-info ${meeting?.liked ? "" : "btn-outline"}`}
                onClick={async () => {
                    if (meeting?.liked) {
                        await onDisLike();
                    } else {
                        await onLike();
                    }
                }}
            >
                <div className={`flex items-center`}>
                    <LikeOutlined/>
                    <span className={`px-1`}>{meeting?.total_likes || 0}</span>
                </div>
            </Button>
        </>
    )
}

export default LikeRoom;
