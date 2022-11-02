import React, { useState } from "react";
import moment from "moment";
import {Avatar, Comment } from "antd";
import Editor from "./Editor";
import {getUser} from "../../../../../../helpers";
import {addComment} from "../../../../../../services";

const CommentEditor = ({uuid}) => {

    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const user = getUser();

    const handleSubmit = () => {
        if (!value) return;

        setSubmitting(true);

        setTimeout(async () => {
            setSubmitting(false);
            setValue('');
            const res = await addComment(uuid, {
                body: value,
                parent_id: null
            })

            console.log('res', res);
        }, 1000);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className="mtms-comment-discussion">
            <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </div>
    )
}

export default CommentEditor;
