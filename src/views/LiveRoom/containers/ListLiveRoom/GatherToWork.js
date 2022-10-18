import React from "react";
import moment from "moment";
import Table from "../../ components/Table";

const GatherToWork = () => {

    return (
        <Table
            title="Gather To Work"
            filterDefault={{
                start_date: null,
                end_date: null,
                roomType: 'gather_to_work'
            }}
        />
    );
};

export default GatherToWork;
