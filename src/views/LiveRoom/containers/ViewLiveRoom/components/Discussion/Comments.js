import React from "react";
import CommentItem from "./CommentItem";

const Comments = ({children}) => {
    return (
        <div>
            <CommentItem />
            <CommentItem>
                <CommentItem />
                <CommentItem>
                    <CommentItem />
                </CommentItem>
            </CommentItem>
            <CommentItem />
            <CommentItem />
            <CommentItem />
        </div>
    )
}

export default Comments;
