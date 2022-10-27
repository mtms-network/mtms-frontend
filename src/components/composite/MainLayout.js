/* eslint-disable no-empty */
import React, { useEffect, useState } from "react";
import { getLanguage, resetUserToken, setLanguage } from "helpers";
import { useAuth, useDimensions } from "hooks";
import { useAppStore } from "stores/app.store";
import classNames from "classnames";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { getLanguages, getRequirePreMeeting } from "services";
import i18n from "i18n";
import { useMeetingStore } from "stores/meeting.store";
import NavbarLayout from "./NavbarLayout";
import SidebarLayout from "./SidebarLayout";
import BrandLogoLoading from "./BrandLogoLoading";
import {Loading} from "../base/Loading";
import OpenBox from "../base/OpenBox";

const Layout = ({ children, bottom, contentClassName = "" }) => {
    const [appStore, updateAppStore] = useAppStore();
    const [meetingStore, updateMeetingStore] = useMeetingStore();
    const [loading, setLoading] = useState(false);
    const [language, setCurrentLanguage] = useState(appStore.language);

    const { width } = useDimensions();

    const handleLogout = () => {
        resetUserToken();
        updateAppStore((draft) => {
            draft.isAuthenticated = false;
        });
    };

    useAuth();

    const fetchCommonData = async () => {
        try {
            const storeLanguage = getLanguage();
            if (
                appStore.language !== storeLanguage ||
                !meetingStore.types ||
                !meetingStore.types?.length === 0
            ) {
                if(appStore.isAuthenticated){
                    const res = await getRequirePreMeeting();
                    if (res) {
                        updateMeetingStore((draft) => {
                            draft.categories = res?.categories;
                            draft.types = res?.types;
                            draft.statuses = res?.statuses;
                            draft.isForceLoadMeetingHistories = true;
                        });
                    }
                }
            }
        } catch (error) {}
    };

    const fetchLanguage = async () => {
        try {
            if (!i18next.exists("general.cancel") || language !== appStore.language) {
                setLoading(true);
                const data = await getLanguages(appStore.language);
                setCurrentLanguage(appStore.language);
                const resources = { en: { translation: data } };
                i18n.init({
                    resources,
                    lng: "en",
                });
                setLoading(false);
            }
            // eslint-disable-next-line no-empty
        } catch (error) {}
    };
    useEffect(() => {
        setLanguage(appStore.language);
        fetchLanguage();
        fetchCommonData();
    }, [appStore.language]);

    useEffect(() => {
        const currentLanguage = getLanguage();
        updateAppStore((draft) => {
            draft.language = currentLanguage;
        });
    }, []);

    const { appendComponentLayout } = appStore;

    return loading ? (
        <div className="h-screen">
            <BrandLogoLoading />
        </div>
    ) : (
        <I18nextProvider i18n={i18next}>
            { appendComponentLayout}
            <div className="drawer drawer-mobile relative">
                { appStore.loadingIcon && <Loading title={appStore.loadingIconTitle} /> }
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <NavbarLayout width={width} onLogout={handleLogout} />
                    <div className={classNames("relative min-h-screen")}>
                        <div
                            className={classNames(
                                "flex flex-col pt-20 sm:pt-22 pb-28 overflow-y-auto px-4 relative",
                                "min-h-full bg-gray-base",
                                contentClassName,
                            )}
                        >
                            {children}
                        </div>
                        {bottom && (
                            <div
                                className="navbar bg-white fixed z-10 bottom-0 px-4"
                                style={{ width: width > 768 && `calc(${width}px - 320px)` }}
                            >
                                <div className="flex py-2 w-full">{bottom}</div>
                            </div>
                        )}
                    </div>
                </div>
                <SidebarLayout onLogout={handleLogout} />
            </div>
        </I18nextProvider>
    );
};

export default Layout;
