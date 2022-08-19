import classNames from "classnames";
import { routeUrls } from "configs";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { IconBase } from "components/base";
import { useAppStore } from "stores/app.store";

const SidebarLayout = ({ t }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appStore, updateAppStore] = useAppStore();

  const onToggleLanguage = () => {
    updateAppStore((draft) => {
      if (appStore.language === "en") {
        draft.language = "vn";
      } else {
        draft.language = "en";
      }
    });
  };

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay" />
      <div className="menu py-4 px-8 overflow-y-auto w-80">
        <div>
          <button onClick={() => navigate("/")}>
            <img className="h-14" src="/images/mtms-logo.png" alt="logo" />
          </button>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="pt-8 space-y-4">
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
                  icon="/icons/icons/home-outline.svg"
                  iconActivated="/icons/icons/home-fill.svg"
                  isActive={location.pathname === "/"}
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
            <div className="w-full">
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
            <div className="w-full">
              <button
                className={classNames(
                  "text-base font-normal",
                  location.pathname !== `/${routeUrls.contact.path}`
                    ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                    : "btn btn-base justify-start font-medium",
                )}
                onClick={() => navigate(`/${routeUrls.comingSoon.path}`)}
              >
                <IconBase
                  icon="/icons/icons/personalcard-outline.svg"
                  iconActivated="/icons/icons/personalcard-fill.svg"
                  isActive={location.pathname.includes(routeUrls.contact.path)}
                />
                <p className="pl-2">{t("sidebar.contact")}</p>
              </button>
            </div>
            <div className="w-full">
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
            <div className="w-full">
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
            <div className="w-full">
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(SidebarLayout);
