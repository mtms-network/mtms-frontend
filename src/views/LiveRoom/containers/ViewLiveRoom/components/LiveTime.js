import React from "react";
import moment from "moment/moment";

const LiveTime = ({ t, start_date_time, user_timezone }) => {

    return (
        <div className="flex space-x-[8px] items-center">
            <img src="/images/icon/calender.svg" alt="" />
            <span className="text-red-500 font-bold">Live time: </span>

            <p className="text-md font-bold">
                {start_date_time &&
                    `${moment(start_date_time).format("LLL")} ${
                        user_timezone || ""
                    }`}
            </p>
        </div>
    )
}

export default LiveTime;
