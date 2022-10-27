import React from "react";
import {Button, IconBase} from "../../../../../../components";

const UpdateComing = ({}) => {

    return (
        <div className="p-2">
            <div className="rounded-2xl bg-red-500 inline p-4 mr-3">
                Upcoming Live Meeting: Feb 28, 2022. 8:24 AM Melbourne/Australia
            </div>

            <Button
                className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
            >
                Update
            </Button>

            <Button
                className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
            >
                Vote New Live: 100
            </Button>
        </div>
    )
}

export default UpdateComing;
