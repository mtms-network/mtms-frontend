/* eslint-disable no-empty */
import React, { useCallback, useMemo } from "react";
import { IoMenu, IoWifi } from "react-icons/io5";
import { useAppStore } from "stores/app.store";
import { LIVE_URL, routeUrls } from "configs";
import { useTranslation } from "react-i18next";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { InputSingle } from "components/base/Input";
import { Button, IconBase } from "components/base";
import {getRequirePreMeeting, startMeeting} from "services";
import classNames from "classnames";
import UserInfo from "./UserInfo";
import {IconChat} from "../Icons/IconChat";
import {IconLiveRoom} from "../Icons/IconLiveRoom";
import {setLanguage} from "../../helpers";
import {useMeetingStore} from "../../stores/meeting.store";
import {IconNotification} from "../Icons/IconNotification";

const NavbarLayout = ({ width, onLogout }) => {
    const location = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [appStore, updateAppStore] = useAppStore();
    const [, updateMeetingStore] = useMeetingStore();

    const user = useMemo(() => appStore.user, [appStore.user]);


    const onStartAnInstant = useCallback(async () => {
        try {
            const res = await startMeeting({
                instant: true,
            });
            if (res?.data?.meeting?.uuid) {
                window.open(`#/${routeUrls.meetingRedirect.path}/${res?.data?.meeting?.identifier}`);
            }
        } catch (error) {}
    }, []);

    const onToggleLanguage = async () => {
        const newLanguage = appStore.language === "en" ? "vn" : "en";
        setLanguage(newLanguage);
        updateAppStore((draft) => {
            draft.language = newLanguage;
        });

        const res = await getRequirePreMeeting();
        if (res) {
            updateMeetingStore((draft) => {
                draft.categories = res?.categories;
                draft.types = res?.types;
                draft.statuses = res?.statuses;
                draft.isForceLoadMeetingHistories = true;
            });
        }
    };

    return (
        <div
            className="navbar fixed z-30 h-16 w-full bg-white flex-1 border-b"
            style={{ width: width > 1023 && `calc(${width}px - 320px)` }}
        >
            <div className="flex lg:justify-end justify-between  lg:hidden sm:w-full  w-full">
                <div className="flex items-center">
                    <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost text-black text-xl">
                        <IoMenu />
                    </label>
                </div>
                <button onClick={() => navigate("/")}>
                    <img src="/images/mtms-logo.png" alt="logo" className="h-10" />
                </button>
            </div>
            <div className="justify-end hidden lg:flex w-full gap-1">
                {/* <div className="flex-1 flex justify-start items-start pr-10 max-w-[50%]"> */}
                {/*     <InputSingle */}
                {/*         compactInput */}
                {/*         placeholder={t("general.search")} */}
                {/*         leftIcon={<img src="/icons/icons/search-normal-outline.svg" alt="search" />} */}
                {/*     /> */}
                {/* </div> */}
                {/* <label className="btn btn-square btn-ghost text-black text-xl"> */}
                {/*     <IconNotification /> */}
                {/* </label> */}
                <div className="pr-2">
                    <button
                        className={classNames("flex flex-row text-base justify-start font-medium")}
                        onClick={onToggleLanguage}
                    >
                        <IconBase
                            icon={appStore.language === "en" ? "/icons/flag-en.svg" : "/icons/flag-vn.svg"}
                            iconActivated={
                                appStore.language === "en" ? "/icons/flag-en.svg" : "/icons/flag-vn.svg"
                            }
                        />
                        <p className="pl-2">{appStore.language === "en" ? "ENG" : "VIE"}</p>
                        <IconBase
                            className="rotate-90"
                            icon="/icons/icons/arrow-right-outline.svg"
                            iconActivated="/icons/icons/arrow-right-outline.svg"
                        />
                    </button>
                </div>
                <div className="menu menu-horizontal space-x-3 py-4">
                    <div className="flex flex-row justify-center items-center space-x-2">
                        <Button className="btn btn-primary" onClick={onStartAnInstant}>
                            <img src="/icons/icons/camera-white-fill.svg" alt="buy mtms" className="pr-2" />
                            Start meeting
                        </Button>
                        <UserInfo onLogout={onLogout} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarLayout;
