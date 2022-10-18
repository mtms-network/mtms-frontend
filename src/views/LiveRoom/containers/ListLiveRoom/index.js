import React from "react";
import {IoTv} from "react-icons/io5";
import {FaPlus} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {GroupTitle, MainLayout} from "../../../../components";
import {routeUrls} from "../../../../configs";
import LiveRoomToDay from "./LiveRoomToDay";
import LiveRoomUpComing from "./LiveRoomUpComing";
import GatherToLearn from "./GatherToLearn";
import GatherToWork from "./GatherToWork";
import GatherToPlay from "./GatherToPlay";

const ListLiveRoom = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <MainLayout>
            <div className="py-6 flex justify-center gap-4">
                <div className="text-center">
                    <div
                        className="inline-block bg-primary border-0 py-[20px] px-[20px] rounded-[20px] cursor-pointer"
                        onClick={() => {
                            navigate(`/${routeUrls.liveRoom.path}/new`);
                        }}
                    >
                        <FaPlus className="font-bold text-white text-[40px]" />
                    </div>
                    <div>
                        <GroupTitle icon={<IoTv />} title="New Live Room" />
                    </div>
                </div>
            </div>
            <LiveRoomToDay />
            <div className="mt-6">
                <LiveRoomUpComing />
            </div>
            <div className="mt-6">
                <GatherToLearn />
            </div>
            <div className="mt-6">
                <GatherToWork />
            </div>
            <div className="mt-6">
                <GatherToPlay />
            </div>
        </MainLayout>
    );
};

export default ListLiveRoom;
