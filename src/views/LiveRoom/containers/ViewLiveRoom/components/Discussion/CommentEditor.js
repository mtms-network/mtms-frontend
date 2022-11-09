import React, { useState } from "react";
import moment from "moment";
import {Avatar, Comment } from "antd";
import Editor from "./Editor";
import {getUser} from "../../../../../../helpers";
import {addComment} from "../../../../../../services";
import {useLiveRoomStore} from "../../../../../../stores/liveroom.store";
import {API_RESPONSE_STATUS} from "../../../../../../configs";

const CommentEditor = ({uuid, parentId = null, setIsReply}) => {
    const [liveRoomStore, updateLiveRoomStore] = useLiveRoomStore();
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
                parent_id: parentId
            })

            if(res?.status === API_RESPONSE_STATUS.success){
                updateLiveRoomStore((r) => {

                    if(parentId === null){
                        let clone = [res.comment];
                        clone = clone.concat(liveRoomStore.comments)
                        r.comments = clone;
                    }else
                    {
                        let comments = [...liveRoomStore.comments];

                        let indexC = comments.findIndex((c) => c.id === parentId);
                        if(indexC !== -1){
                            let replies = [res.comment];
                            if(Array.isArray(comments[indexC]?.replies)){
                                replies = replies.concat([...comments[indexC].replies])
                            }

                            const item = {...comments[indexC]};
                            item.replies = replies

                            comments[indexC] = item;
                            r.comments = comments;
                        }
                    }
                })
            }
        }, 1000);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className="mtms-comment-discussion">
            <Comment
                avatar={<Avatar src={ user?.profile?.avatar } alt="avatar" />}
                content={
                    <Editor
                        parentId={parentId}
                        rows={3}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                        setIsReply={setIsReply}
                    />
                }
            />
        </div>
    )
}

export default CommentEditor;
