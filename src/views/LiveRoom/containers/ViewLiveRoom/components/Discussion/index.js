import React, {} from "react";
import {GroupLayout} from "components";
import UpdateComing from "./UpdateComing";
import Comments from "./Comments";
import CommentEditor from "./CommentEditor";
import {LiveRoomStoreProvider} from "../../../../../../stores/liveroom.store";

const Discussion = ({uuid, isOwner, timeZone, live_time}) => {
    return (
        <LiveRoomStoreProvider>
            <GroupLayout className="flex flex-col justify-between mt-4">
                <UpdateComing uuid={uuid} isOwner={isOwner} timeZone={timeZone} live_time={live_time}/>
                <CommentEditor uuid={uuid} />
                <Comments uuid={uuid} />
            </GroupLayout>
        </LiveRoomStoreProvider>
    )
}

export default Discussion;
