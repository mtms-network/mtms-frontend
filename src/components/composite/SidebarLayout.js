import classNames from "classnames";
import { routeUrls } from "configs";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useTranslation, withTranslation} from "react-i18next";
import {Button, IconBase} from "components/base";
import UserInfo from "./UserInfo";
import { PlusOutlined } from "@ant-design/icons";
import {resetUserToken} from "../../helpers";
import {useAppStore} from "../../stores/app.store";
const SidebarLayout = ({ onLogout }) => {
    const {t} = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();
    const [appStore, updateAppStore] = useAppStore();

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
        // {
        //     label: 'My Room',
        //     path: `/${routeUrls.liveRoom.path}`,
        //     icon: '/icons/icons/live-room-outline.svg',
        //     iconActive: '/icons/icons/live-room-fill.svg',
        // },
        {
            label: 'Explore Live Room',
            path: `/${routeUrls.exploreRoom.path}`,
            icon: '/icons/icons/live-room-outline.svg',
            iconActive: '/icons/icons/live-room-fill.svg',
            rightIcon: <button
                className="bg-primary w-8 h-8 flex items-center justify-center rounded ml-2"
                onClick={() => {
                    navigate(`/${routeUrls.newLiveRoom.path}`)
                }}
            >
                <div className={"flex items-center justify-center bg-white rounded-full p-1"}>
                    <PlusOutlined style={{fontSize: 12}} className={"text-primary"} />
                </div>
            </button>
        },
    ]

    const handleLogout = () => {
        resetUserToken();
        updateAppStore((draft) => {
            draft.isAuthenticated = false;
        });
    };

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
                                }else if(location.pathname.startsWith(`${item.path}`) && item.path !== '/'){
                                    isActive = true
                                }

                                return (
                                    <div className="w-full" key={index}>
                                        <button
                                            className={classNames(
                                                "text-base font-normal",
                                                    isActive && location.pathname?.toLocaleLowerCase().includes(item.path)
                                                    ? "btn btn-base justify-start font-medium"
                                                    : "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row",

                                            )}
                                            onClick={() => {
                                                if(!item.rightIcon){
                                                    navigate(item.path)
                                                }
                                            }}
                                        >
                                            <div className="flex items-center" onClick={() => navigate(item.path)}>
                                                <IconBase
                                                    icon={item.icon}
                                                    iconActivated={item.iconActive}
                                                    isActive={isActive}
                                                />
                                                <p className="pl-2">{item.label}</p>
                                            </div>
                                            { item?.rightIcon }
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <a
                        className={classNames(
                            "btn btn-block btn-primary",
                            "bg-white border-0 text-black",
                            "hover:text-white hover:bg-primary",
                            "flex justify-start rounded-none z-10",
                        )}
                        onClick={handleLogout}
                    >
                        <IconBase icon="/icons/icons/logout-outline.svg" alt="logout-icon" className="mr-4" />
                        {t("auth.logout")}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SidebarLayout;

