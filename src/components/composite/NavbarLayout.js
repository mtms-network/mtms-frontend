/* eslint-disable no-empty */
import React, { useCallback, useMemo } from "react";
import { IoMenu, IoWifi } from "react-icons/io5";
import { useAppStore } from "stores/app.store";
import { LIVE_URL, routeUrls } from "configs";
import { useTranslation } from "react-i18next";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { InputSingle } from "components/base/Input";
import { Button, IconBase } from "components/base";
import { startMeeting } from "services";
import classNames from "classnames";
import UserInfo from "./UserInfo";
import {IconChat} from "../Icons/IconChat";
import {IconLiveRoom} from "../Icons/IconLiveRoom";

const NavbarLayout = ({ width, onLogout }) => {
    const location = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [appStore] = useAppStore();
    const user = useMemo(() => appStore.user, [appStore.user]);

    const onStartAnInstant = useCallback(async () => {
        try {
            const res = await startMeeting({
                instant: true,
            });
            if (res?.data?.meeting?.uuid) {
                window.open(`/${routeUrls.meetingRedirect.path}/${res?.data?.meeting?.identifier}`);
            }
        } catch (error) {}
    }, []);

    return (
        <div
            className="navbar fixed z-30 h-16 w-full bg-white flex-1"
            style={{ width: width > 1023 && `calc(${width}px - 320px)` }}
        >
            <div className="flex lg:justify-end justify-between  lg:hidden sm:w-full  w-full">
                <div className="flex items-center">
                    <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost text-black text-xl">
                        <IoMenu />
                    </label>
                    <div className="flex">
                        <label
                            className="btn btn-square btn-ghost text-black text-xl"
                            onClick={() => {
                                navigate(`/${routeUrls.exploreRoom.path}`)
                            }}
                        >
                            <IconLiveRoom color={`${location.pathname.includes(routeUrls.exploreRoom.path) ? '#0391FE' : '#333449'}`}/>
                        </label>
                        <label className="btn btn-square btn-ghost text-black text-xl">
                            <IconChat />
                        </label>
                    </div>
                </div>
                <button onClick={() => navigate("/")}>
                    <img src="/images/mtms-logo.png" alt="logo" className="h-10" />
                </button>
            </div>
            <div className="justify-between hidden lg:flex w-full">
                <div className="flex items-center gap-2 text-black">
                    <label
                        className={`flex flex-col items-center cursor-pointer ${location.pathname.includes(routeUrls.exploreRoom.path) ? 'text-primary' : ''}`}
                        onClick={() => {
                            navigate(`/${routeUrls.exploreRoom.path}`)
                        }}
                    >
                        <IconLiveRoom color={`${location.pathname.includes(routeUrls.exploreRoom.path) ? '#0391FE' : '#333449'}`} /> Explore Room
                    </label>

                    <label className="flex flex-col items-center cursor-pointer">
                        <IconChat color='#333449' /> Chat
                    </label>
                </div>

                <div className="flex-1 flex justify-start items-start pr-10 max-w-[50%]">
                    <InputSingle
                        compactInput
                        placeholder={t("general.search")}
                        leftIcon={<img src="/icons/icons/search-normal-outline.svg" alt="search" />}
                    />
                </div>
                <div className="menu menu-horizontal space-x-3 py-4">
                    <div className="flex flex-row justify-center items-center space-x-2">
                        <Button className="btn btn-primary" onClick={onStartAnInstant}>
                            <img src="/icons/icons/camera-white-fill.svg" alt="buy mtms" className="pr-2" />
                            {t("home.start_a_instant_meeting")}
                        </Button>
                        <UserInfo onLogout={onLogout} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarLayout;
