import React from "react";
import moment from "moment";
import Table from "../../ components/Table";

const GatherToPlay = () => {

    return (
        <Table
            title="Gather To Play"
            filterDefault={{
                start_date: null,
                end_date: null,
                roomType: 'gather_to_play'
            }}
        />
    );
};

export default GatherToPlay;
