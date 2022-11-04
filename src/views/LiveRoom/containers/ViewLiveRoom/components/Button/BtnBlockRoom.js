import React, {useState} from "react";
import {Button} from "../../../../../../components";
import { LockOutlined, UnlockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import {lockRoom} from "../../../../../../services";


const BtnBlockRoom = ({uuid, is_blocked}) => {
    const { confirm } = Modal;
    const [reload, setReload] = useState(false);

    const onLockRoom = async () => {
       const res = await lockRoom(uuid, is_blocked ? 'unlock' : 'lock');
        console.log('res', res);
    }

    const showConfirm = () => {
        confirm({
            title: 'Question',
            icon: <ExclamationCircleOutlined />,
            content: `Do you want ${ is_blocked ? 'unlock' : 'lock' } room?`,
            okText: 'Yes',
            onOk() {
                console.log('call');
                onLockRoom().then()
            },
            onCancel() {

            },
        });
    };

    return (
        <Button
            className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
            onClick={showConfirm}
        >
            {
                is_blocked ? <><UnlockOutlined className={"mr-2"} /> Unlock Room</> : <><LockOutlined className={'mr-2'} />Lock Room</>
            }
        </Button>
    )
}

export default BtnBlockRoom;
