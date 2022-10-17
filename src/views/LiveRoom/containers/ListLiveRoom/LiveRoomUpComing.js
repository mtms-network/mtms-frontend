import React from "react";
import moment from "moment";
import Table from "../../ components/Table";

const LiveRoomUpComing = () => {

  const today = moment().add(1, 'days').format("YYYY-MM-DD");
  const endDay = moment().add(1, 'years').format("YYYY-MM-DD");

  return (
    <Table
      title="Live Room Upcoming"
      filterDefault={{
        start_date: today,
        end_date: endDay
      }}
    />
  );
};

export default LiveRoomUpComing;
