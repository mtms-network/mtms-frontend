import React, {useState} from "react";
import {Button} from "../../../../../../components";
import { LockOutlined, UnlockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {message, Modal} from 'antd';
import {lockRoom} from "../../../../../../services";
import {API_RESPONSE_STATUS} from "../../../../../../configs";


const BtnBlockRoom = ({uuid, meeting}) => {
    const { confirm } = Modal;
    const [reload, setReload] = useState(false);

    const onLockRoom = async () => {
       const res = await lockRoom(uuid, meeting?.is_full ? 'unlock' : 'lock');
        if(res?.status === API_RESPONSE_STATUS.success){
            message.success(res?.status);
            setReload(!reload)
            meeting.is_full = !meeting.is_full;
        }
    }

    const showConfirm = () => {
        confirm({
            title: 'Information',
            icon: <ExclamationCircleOutlined />,
            content: `Do you want ${ meeting?.is_full ? 'unlock' : 'lock' } room?`,
            okText: 'Yes',
            onOk() {
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
                meeting?.is_full ? <><UnlockOutlined className={"mr-2"} /> Locked Room</> : <><LockOutlined className={'mr-2'} />Lock Room</>
            }
        </Button>
    )
}

export default BtnBlockRoom;
