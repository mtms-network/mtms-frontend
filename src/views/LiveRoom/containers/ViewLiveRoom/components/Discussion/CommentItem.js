import React, {useState, createElement, useCallback} from "react";
import {Avatar, Comment, Tooltip } from "antd";
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import "../../index.css";
import moment from "moment-timezone";
import {getTimezone} from "../../../../../../helpers/i18nLocal";
import CommentEditor from "./CommentEditor";

const CommentItem = (props) => {
    const { item, children, uuid, level } = props;
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [isReply, setIsReply] = useState(false);

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
          <span onClick={like}>
            {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
              <span className="comment-action">{likes}</span>
          </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
            {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
              <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        !level && <span key="comment-basic-reply-to" onClick={() => { setIsReply(!isReply) }}>Reply to</span>,
    ];

    const time = moment.utc(item?.created_at).tz(getTimezone())

    const handleSetReply = useCallback(() => {
        setIsReply(!isReply);
    }, [isReply])

    return (
        <Comment
            actions={actions}
            author={<a>{ item?.user?.profile?.name }</a>}
            avatar={<Avatar src={item?.user?.profile?.avatar} alt={item?.user?.profile?.name} />}
            content={
                <p>
                    { item?.body }
                </p>
            }
            datetime={
                <Tooltip title={ time.format("hh:mm:ss a DD/MM/YYYY") }>
                    <span>{ time.startOf('minute').fromNow() }</span>
                </Tooltip>
            }
        >
            {
                isReply === true && <CommentEditor uuid={uuid} parentId={item?.id} setIsReply={handleSetReply}/>
            }

            {
                item?.replies?.map((c, index) => {
                    return <CommentItem key={index} item={c} uuid={uuid} level={2} />
                })
            }

            {children}
        </Comment>
    )
}

export default CommentItem
