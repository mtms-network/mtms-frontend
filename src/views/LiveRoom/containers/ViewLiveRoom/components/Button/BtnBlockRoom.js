import React from "react";
import {Button} from "../../../../../../components";
import { LockOutlined } from '@ant-design/icons';

const BtnBlockRoom = ({}) => {
    return (
        <Button
            className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
            onClick={() => {}}
        >
            <LockOutlined className={'mr-2'} />
            Lock Room
        </Button>
    )
}

export default BtnBlockRoom;
