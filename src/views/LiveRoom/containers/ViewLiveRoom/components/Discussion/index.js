import React, {useEffect, useState} from "react";
import {GroupLayout} from "components";
import UpdateComing from "./UpdateComing";
import Comments from "./Comments";
import CommentEditor from "./CommentEditor";
import {getComments} from "../../../../../../services";

const Discussion = ({uuid}) => {

    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        const res = await getComments(uuid);
        setComments(res?.data);
    }

    useEffect(() => {
        fetchData().then();
    }, [])

    return (
        <GroupLayout className="flex flex-col justify-between mt-4">
            <UpdateComing />
            <CommentEditor uuid={uuid} />
            <Comments uuid={uuid} comments={comments}/>
        </GroupLayout>
    )
}

export default Discussion;
