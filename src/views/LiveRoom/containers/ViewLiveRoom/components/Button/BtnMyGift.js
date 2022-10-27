import React from "react";
import {Button} from "../../../../../../components";
import { LockOutlined, GiftOutlined  } from '@ant-design/icons';

const BtnMyGift = ({}) => {
    return (
        <Button
            className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
            onClick={() => {}}
        >
            <GiftOutlined className={'mr-2'} />
            My Gift: 10 MTMS
        </Button>
    )
}

export default BtnMyGift;
