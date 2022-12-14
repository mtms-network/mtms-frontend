import React, {useMemo, useRef} from "react";
import classNames from "classnames";
import { Button, GroupLayout } from "components";
import { Link, useNavigate } from "react-router-dom";
import { LIVE_MEETING_URL, MEETING_STATUS, routeParts, routeUrls } from "configs";
import { t } from "i18next";
import {Dropdown, Menu, message, Avatar, Tooltip} from "antd";
import moment from "moment-timezone";
import {generateRandomColor} from "../../../helpers";
import DeleteLiveRoomModal from "./DeleteLiveRoomModal";
import c from "postcss-nesting";

const LiveRoomItem = ({ data, className, setIsReload, isLiveRoom }) => {
    const deleteModalRef = useRef(null);
    const navigate = useNavigate();

    const handleStart = async () => {
        try {
            if (data) {
                window.open(`#/${routeUrls.meetingRedirect.path}/${data?.identifier}`);
            }
        } catch (error) {
            console.log("start meeting error");
        }
    };

    const handleCopyLink = () => {
        if (data?.identifier) {
            const meetingUrl = `${LIVE_MEETING_URL}/${data.identifier}`;
            navigator.clipboard.writeText(meetingUrl);
            message.success(t("home.copied"));
        }
    };

    const menu = (item) => (
        <Menu
            items={[
                // { key: '1', label: 'View to do' },
                {
                    key: '1',
                    label: (
                        <div onClick={() => { handleCopyLink(); }}>
                            Share link
                        </div>
                    )
                },
                {
                    key: '2',
                    label: (
                        <div onClick={() => { navigate(`/${routeUrls.liveRoom.path}/${item?.uuid}/duplicate`) }}>
                            Duplicate room
                        </div>
                    )
                },
                {
                    key: '3',
                    label: (
                        <div onClick={() => { deleteModalRef.current?.show(item); }}>
                            Delete room
                        </div>
                    )
                },
            ]}
        />
    );

    const renderLive = () => {
        const startDate = moment(data?.start_date_time);
        const currentDate = moment();
        if(data?.user_timezone){
            currentDate.tz(data?.user_timezone);
        }

        const minutes  = startDate.diff(currentDate, 'minutes');

        if(minutes > 0 && minutes < 60 && isLiveRoom) {
            return (
                <div className="flex gap-1 items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-box" /> Live
                </div>
            )
        }

        return (
            <>
                <img src="/images/icon/calender.svg" alt="" />
                <div className="flex flex-col">
                    <p className="label-base p-0 group-hover:text-primary">
                        {data?.start_date_time &&
                            `${moment(data?.start_date_time).format("MMM,DD YYYY HH:mm")} ${
                                data?.user_timezone || ""
                            }`}
                    </p>
                </div>
            </>
        )
    }

    return (
        <GroupLayout
            className={classNames(
                "flex flex-col flex-1 justify-between",
                "min-h-[160px]",
                "hover:border-primary hover:bg-light-primary",
                className,
            )}
        >
            <div className="flex flex-col w-full flex-1 h-full">
                <div className="flex justify-between items-center">
                    <Link to={`/${routeUrls.liveRoom.path}/view/${data?.uuid}`} key={data?.uuid}>
                        <div className="text-lg font-semibold group-hover:text-primary overflow-hidden">
                            {data?.title}
                        </div>
                    </Link>
                    <div className="relative">
                        <div className="dropdown dropdown-end">
                            <Dropdown overlay={menu(data)} placement="bottomRight" arrow>
                                <img className="cursor-pointer" src="/images/icon/more.svg" alt="" />
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>

                        <Avatar.Group
                            maxCount={3}
                            maxPopoverTrigger="click"
                            size="large"
                            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                        >
                            <Tooltip placement="top" title={data?.user?.email}>
                                <Avatar key={0} style={{ backgroundColor: `${generateRandomColor(data?.user?.email)}` }}>
                                    { data?.user?.email?.charAt(0)?.toUpperCase() }
                                </Avatar>
                            </Tooltip>

                        </Avatar.Group>
                    </div>
                    <div>
                        <Avatar.Group
                            maxCount={3}
                            maxPopoverTrigger="click"
                            size="large"
                            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                        >
                            {
                                data?.invitees?.map((invite, index) => {
                                    return (
                                        <Avatar key={index} style={{ backgroundColor: `${generateRandomColor(invite?.contact?.email)}` }}>
                                            { invite?.contact?.email?.charAt(0)?.toUpperCase() }
                                        </Avatar>
                                    );
                                })
                            }
                        </Avatar.Group>
                    </div>
                </div>
                <div
                    className="text-gray cursor-pointer flex items-center"
                    onClick={() => {
                        navigate(`/${routeUrls.liveRoom.path}/view/${data?.uuid}`);
                    }}
                >
                    <img src="/icons/icons/meeting-outline.svg" alt="meeting" className="mr-1"/>
                    {data?.type.name}
                </div>
                <div
                    className="flex justify-between items-center flex-row cursor-pointer"
                    onClick={() => {
                        navigate(`/${routeUrls.liveRoom.path}/view/${data?.uuid}`);
                    }}
                >
                    <div>
                        <div className="flex flex-row space-x-2 items-start pt-2 group-hover:text-primary">
                            { renderLive() }
                        </div>
                    </div>
                    <div>
                        <Button
                            className={classNames(
                                "rounded-[20px] px-[12px] py-[6px]",
                                "!h-[32px] !min-h-[32px]",
                                "border-0 bg-secondary hover:bg-primary hover:text-white",
                                "text-primary z-50",
                            )}
                            onClick={handleStart}
                        >
                            {t("home.join_meeting_now")}
                        </Button>
                    </div>
                </div>
            </div>
            <DeleteLiveRoomModal
                onRefresh={setIsReload}
                ref={deleteModalRef}
            />
        </GroupLayout>
    );
};

export default LiveRoomItem;
