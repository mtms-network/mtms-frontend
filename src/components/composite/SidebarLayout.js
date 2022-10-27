import classNames from "classnames";
import { routeUrls } from "configs";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { IconBase } from "components/base";
import { useAppStore } from "stores/app.store";
import { setLanguage } from "helpers";
import { useMeetingStore } from "stores/meeting.store";
import { getRequirePreMeeting } from "services";
import UserInfo from "./UserInfo";

const SidebarLayout = ({ t, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-3" className="drawer-overlay" />
            <div className="menu py-4 px-8 overflow-y-auto w-80 bg-white rounded-tr-lg rounded-br-lg sm:rounded-none">
                <div>
                    <button onClick={() => navigate("/")}>
                        <img className="h-14" src="/images/mtms-logo.png" alt="logo" />
                    </button>
                </div>
                <div className="flex flex-1 flex-col justify-between">
                    <div className="pt-8 space-y-4 sm:pt-0">
                        <div className="w-full px-4 pb-8 sm:pb-0">
                            <UserInfo onLogout={onLogout} className="flex sm:hidden" />
                        </div>
                        {
                            arrSidebar.map((item, index) => {

                                let isActive = false;
                                if(location.pathname === "/"){
                                    isActive = true;
                                }else if(location.pathname.includes(item.path)){
                                    isActive = true
                                }

                                return (
                                    <div className="w-full" key={index}>
                                        <button
                                            className={classNames(
                                                "text-base font-normal",
                                                location.pathname !== item.path
                                                    ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                                                    : "btn btn-base justify-start font-medium",
                                            )}
                                            onClick={() => navigate(item.path)}
                                        >
                                            <IconBase
                                                icon={item.icon}
                                                iconActivated={item.iconActive}
                                                isActive={location.pathname === item.path && isActive}
                                            />
                                            <p className="pl-2">{item.label}</p>
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withTranslation()(SidebarLayout);

const arrSidebar = [
    {
        label: 'MTMS Accounts',
        path: '/',
        icon: '/icons/icons/overview.svg',
        iconActive: '/icons/icons/overview-active.svg',
    },
    {
        label: 'Meeting',
        path: `/${routeUrls.meeting.path}`,
        icon: '/icons/icons/meeting-outline.svg',
        iconActive: '/icons/icons/meeting-fill.svg',
    },
    {
        label: 'Schedule a Meeting',
        path: `/${routeUrls.scheduleMeeting.path}`,
        icon: '/icons/icons/calendar-outline.svg',
        iconActive: '/icons/icons/calendar-fill.svg',
    },
    {
        label: 'Reward Center',
        path: `/${routeUrls.rewards.path}`,
        icon: '/icons/icons/gift-outline.svg',
        iconActive: '/icons/icons/gift-fill.svg',
    },
    {
        label: 'Contact',
        path: `/${routeUrls.contact.path}`,
        icon: '/icons/icons/personalcard-outline.svg',
        iconActive: '/icons/icons/personalcard-fill.svg',
    },
    {
        label: 'To Do',
        path: `/${routeUrls.todo.path}`,
        icon: '/icons/icons/task-outline.svg',
        iconActive: '/icons/icons/task-fill.svg',
    },
    {
        label: 'Live Room',
        path: `/${routeUrls.liveRoom.path}`,
        icon: '/icons/icons/live-room-outline.svg',
        iconActive: '/icons/icons/live-room-fill.svg',
    },
    {
        label: 'Explore Live Room',
        path: `/${routeUrls.exploreRoom.path}`,
        icon: '/icons/icons/live-room-outline.svg',
        iconActive: '/icons/icons/live-room-fill.svg',
    },
]
