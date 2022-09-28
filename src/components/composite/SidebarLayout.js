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
  const [appStore, updateAppStore] = useAppStore();
  const [, updateMeetingStore] = useMeetingStore();

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
            <div className="w-full">
              <button
                className={classNames(
                  "text-base font-normal",
                  location.pathname !== "/"
                    ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                    : "btn btn-base justify-start font-medium",
                )}
                onClick={() => navigate("/")}
              >
                <IconBase
                  icon="/icons/icons/overview.svg"
                  iconActivated="/icons/icons/overview-active.svg"
                  isActive={location.pathname === "/"}
                />
                <p className="pl-2">{t("sidebar.mtms_accounts")}</p>
              </button>
            </div>
            <div className="w-full">
              <button
                className={classNames(
                  "text-base font-normal",
                  location.pathname === `/${routeUrls.meeting.path}`
                    ? "btn btn-base justify-start font-medium"
                    : "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row",
                )}
                onClick={() => navigate(`/${routeUrls.meeting.path}`)}
              >
                <IconBase
                  icon="/icons/icons/calendar-outline.svg"
                  iconActivated="/icons/icons/calendar-fill.svg"
                  isActive={location.pathname === `/${routeUrls.meeting.path}`}
                />
                <p className="pl-2">{t("sidebar.meeting")}</p>
              </button>
            </div>
            <div className="w-full">
              <button
                className={classNames(
                  "text-base font-normal",
                  location.pathname.includes(routeUrls.scheduleMeeting.path)
                    ? "btn btn-base justify-start font-medium"
                    : "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row",
                )}
                onClick={() => navigate(`/${routeUrls.scheduleMeeting.path}`)}
              >
                <IconBase
                  icon="/icons/icons/calendar-outline.svg"
                  iconActivated="/icons/icons/calendar-fill.svg"
                  isActive={location.pathname.includes(routeUrls.scheduleMeeting.path)}
                />
                <p className="pl-2">{t("sidebar.schedule_a_meeting")}</p>
              </button>
            </div>
            <div className="w-full">
              <button
                className={classNames(
                  "text-base font-normal",
                  location.pathname.includes(routeUrls.rewards.path)
                    ? "btn btn-base justify-start font-medium"
                    : "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row",
                )}
                onClick={() => navigate(`/${routeUrls.rewards.path}`)}
              >
                <IconBase
                  icon="/icons/icons/gift-outline.svg"
                  iconActivated="/icons/icons/gift-fill.svg"
                  isActive={location.pathname.includes(routeUrls.rewards.path)}
                />
                <p className="pl-2">{t("sidebar.reward_center")}</p>
              </button>
            </div>
            <div className="w-full opacity-30">
              <button
                className={classNames(
                  "text-base font-normal",
                  location.pathname !== `/${routeUrls.room247.path}`
                    ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                    : "btn btn-base justify-start font-medium",
                )}
                onClick={() => navigate(`/${routeUrls.comingSoon.path}`)}
              >
                <IconBase
                  icon="/icons/icons/menu-outline.svg"
                  iconActivated="/icons/icons/menu-fill.svg"
                  isActive={location.pathname.includes(routeUrls.room247.path)}
                />
                <p className="pl-2">{t("sidebar.rooms")}</p>
              </button>
            </div>
            <div className="w-full opacity-30">
              <button
                className={classNames(
                  "text-base font-normal",
                  location.pathname !== `/${routeUrls.contact.path}`
                    ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                    : "btn btn-base justify-start font-medium",
                )}
                onClick={() => navigate(`/${routeUrls.contact.path}`)}
              >
                <IconBase
                  icon="/icons/icons/personalcard-outline.svg"
                  iconActivated="/icons/icons/personalcard-fill.svg"
                  isActive={location.pathname.includes(routeUrls.contact.path)}
                />
                <p className="pl-2">{t("sidebar.contact")}</p>
              </button>
            </div>
            <div className="w-full opacity-30">
              <button
                className={classNames(
                  "text-base font-normal",
                  location.pathname !== `/${routeUrls.todo.path}`
                    ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                    : "btn btn-base justify-start font-medium",
                )}
                onClick={() => navigate(`/${routeUrls.comingSoon.path}`)}
              >
                <IconBase
                  icon="/icons/icons/task-outline.svg"
                  iconActivated="/icons/icons/task-fill.svg"
                  isActive={location.pathname.includes(routeUrls.todo.path)}
                />
                <p className="pl-2">{t("sidebar.to_do")}</p>
              </button>
            </div>
            <div className="w-full opacity-30">
              <button
                className={classNames(
                  "text-base font-normal",
                  location.pathname !== `/${routeUrls.analytic.path}`
                    ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                    : "btn btn-base justify-start font-medium",
                )}
                onClick={() => navigate(`/${routeUrls.comingSoon.path}`)}
              >
                <IconBase
                  icon="/icons/icons/chart-outline.svg"
                  iconActivated="/icons/icons/chart-fill.svg"
                  isActive={location.pathname.includes(routeUrls.analytic.path)}
                />
                <p className="pl-2">{t("sidebar.analytics")}</p>
              </button>
            </div>
            <div className="w-full opacity-30">
              <button
                className={classNames(
                  "text-base font-normal",
                  location.pathname !== `/${routeUrls.nftMarketplace.path}`
                    ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                    : "btn btn-base justify-start font-medium",
                )}
                onClick={() => navigate(`/${routeUrls.comingSoon.path}`)}
              >
                <IconBase
                  icon="/icons/icons/buy-crypto-outline.svg"
                  iconActivated="/icons/icons/buy-crypto-fill.svg"
                  isActive={location.pathname.includes(routeUrls.nftMarketplace.path)}
                />
                <p className="pl-2">{t("sidebar.nft_marketplace")}</p>
              </button>
            </div>
          </div>
          <div>
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
                className="pl-4"
                icon="/icons/icons/arrow-right-outline.svg"
                iconActivated="/icons/icons/arrow-right-outline.svg"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(SidebarLayout);
