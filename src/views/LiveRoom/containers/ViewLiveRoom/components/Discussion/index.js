import React from "react";
import {GroupLayout} from "components";
import UpdateComing from "./UpdateComing";
import Comments from "./Comments";
import CommentEditor from "./CommentEditor";

const Discussion = ({}) => {
    return (
        <GroupLayout className="flex flex-col justify-between mt-4">
            <UpdateComing />
            <CommentEditor />
            <Comments />
        </GroupLayout>
    )
}

export default Discussion;
