import { Space, Menu, Dropdown } from 'antd';
import React from "react";
import {Button, IconBase} from "../../../../../../components";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {routeUrls} from "../../../../../../configs";
import { DownOutlined } from '@ant-design/icons';
import styles from "../../index.module.css";

const UpdateComing = ({isOwner, live_time, timeZone, uuid, time_slot}) => {
    const navigate = useNavigate();
    const menu = (
        <Menu>
            {
                time_slot?.map((item, index) => {
                    return (
                        <Menu.Item key={index}>
                            Upcoming Live Meeting: { moment(item?.date).format("LLL") } { timeZone }
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    );

    return (
        <div className="p-2 mb-2 gap-4">
            {
                time_slot?.length >= 2 ? (
                    <Dropdown.Button
                        className={ styles.btnGroupDropdown }
                        icon={<DownOutlined />}
                        overlay={menu}
                    >
                        Upcoming Live Meeting: { moment(time_slot[0]?.date).format("LLL") } { timeZone }
                    </Dropdown.Button>
                ) : (
                    <div className="rounded-2xl bg-red-500 inline-flex p-3.5 m-1.5 text-white">
                        Upcoming Live Meeting: { moment(time_slot[0]?.date).format("LLL") } { timeZone }
                    </div>
                )
            }

            {
                isOwner ? (
                    <Button
                        className="inline-flex m-1.5 btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4"
                        onClick={() => {
                            navigate(`/${routeUrls.exploreRoom.path}/${uuid}/edit`)
                        }}
                    >
                        Update
                    </Button>
                ) : null
            }
        </div>
    )
}

export default UpdateComing;
