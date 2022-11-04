import React, {} from "react";
import {GroupLayout} from "components";
import UpdateComing from "./UpdateComing";
import Comments from "./Comments";
import CommentEditor from "./CommentEditor";
import {LiveRoomStoreProvider} from "../../../../../../stores/liveroom.store";

const Discussion = ({uuid}) => {
    return (
        <LiveRoomStoreProvider>
            <GroupLayout className="flex flex-col justify-between mt-4">
                <UpdateComing />
                <CommentEditor uuid={uuid} />
                <Comments uuid={uuid} />
            </GroupLayout>
        </LiveRoomStoreProvider>
    )
}

export default Discussion;
