import React from "react";
import {GroupTitle} from "../../../../../components";
import {IoTv} from "react-icons/io5";

const LiveTopic = ({ meeting, t }) => {
    return (
        <>
            <div>
                <GroupTitle className={""} icon={<IoTv />} title="Live Topic" />
            </div>
            <p className="mb-6 truncate flex-wrap">About Vocabulary</p>
        </>
    )
}

export default LiveTopic;
