import React from "react";
import moment from "moment";
import Table from "../../ components/Table";

const GatherToLearn = () => {

    return (
        <Table
            title="Gather To Learn"
            filterDefault={{
                start_date: null,
                end_date: null,
                roomType: 'gather_to_learn'
            }}
        />
    );
};

export default GatherToLearn;
