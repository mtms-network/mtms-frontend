import React from "react";
import {Button} from "../../../../../../components";
import {API_RESPONSE_STATUS, routeUrls} from "../../../../../../configs";
import {startRoom} from "../../../../../../services";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';

const BtnStart = ({t, meeting, isStart}) => {
    const { confirm } = Modal;

    const handleStart = async () => {
        let start = true;
        if(isStart)
        {
            const res = await startRoom(meeting?.uuid);
            if(res?.status !== API_RESPONSE_STATUS.success){
                isStart = false;
            }
        }

        if(start){
            try {
                if (meeting) {
                    window.open(`/${routeUrls.meetingRedirect.path}/${meeting?.identifier}`);
                }
            } catch (error) {
                console.log("start meeting error");
            }
        }
    };

    const showConfirm = () => {
        confirm({
            title: 'Information',
            icon: <ExclamationCircleOutlined />,
            content: `Do you want ${ isStart ? 'start' : 'end' } room?`,
            okText: 'Yes',
            onOk() {
                handleStart().then()
            },
            onCancel() {

            },
        });
    };

    return (
        <Button
            className={`btn btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4 ${ meeting?.status === 'live' ? 'cursor-not-allowed' : '' }`}
            onClick={() => {
                if(meeting?.status !== 'live' ){
                    showConfirm();
                }else{
                    handleStart();
                }
            }}
        >
            { isStart ? (
                meeting?.status === 'live' ? "Started" : t("general.start")
            ) : "Join" }
        </Button>
    )
}

export default BtnStart;
