import React, {useEffect, useState} from "react";
import CommentItem from "./CommentItem";
import {getComments} from "../../../../../../services";

const Comments = ({comments, ...children}) => {

    return (
        <div>
            {
                comments?.map((comment, index) => {

                    return (
                        <CommentItem key={index} />
                    )
                })
            }
        </div>
    )
}

export default Comments;
