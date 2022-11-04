import React, { useState, createElement } from "react";
import {Avatar, Comment, Tooltip } from "antd";
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import "../../index.css";
import moment from "moment-timezone";
import {getTimezone} from "../../../../../../helpers/i18nLocal";

const CommentItem = (props) => {
    const { item, children } = props;
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

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
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    const time = moment.utc(item?.created_at).tz(getTimezone())

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
                    <span>{ time.endOf('hour').fromNow() }</span>
                </Tooltip>
            }
        >
            {children}
        </Comment>
    )
}

export default CommentItem
