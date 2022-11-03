import React from "react";
import moment from "moment";
import Table from "../../ components/Table";

const LiveRoomToDay = () => {

    const today = moment().format("YYYY-MM-DD");

    return (
        <Table
            title="My Rooms"
            isLiveRoom
            filterDefault={{
                start_date: today,
                end_date: today
            }}
        />
    );
};

export default LiveRoomToDay;
