import classNames from "classnames";
import { routeUrls } from "configs";
import React from "react";
import { FaCalendarPlus } from "react-icons/fa";
import { IoAnalyticsOutline, IoApps, IoLogoAppleAr, IoPerson } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";

const SidebarLayout = ({ t }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay" />
      <div className="menu py-4 px-8 overflow-y-auto w-80">
        <div >
          <button onClick={() => navigate("/")}>
            <img className="h-14" src="/images/mtms-logo.png" alt="logo" />
          </button>
        </div>
        <div className="pt-8 space-y-4">
          <div className="w-full">
            <button
              className={classNames(
                "text-base font-normal",
                location.pathname !== "/"
                  ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row font-bold"
                  : "btn btn-base justify-start",
              )}
              onClick={() => navigate("/")}
            >
              <IoLogoAppleAr />
              <p className="pl-2">{t("dashboard.dashboard")}</p>
            </button>
          </div>
          <div className="w-full">
            <button
              className={classNames(
                "text-base font-normal",
                location.pathname.includes(routeUrls.scheduleMeeting.path)
                  ? "font-normal btn btn-base justify-start"
                  : "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row",
              )}
              onClick={() => navigate(`/${routeUrls.scheduleMeeting.path}`)}
            >
              <FaCalendarPlus />
              <p className="pl-2">{t("meeting.meetings")}</p>
            </button>
          </div>
          <div className="w-full">
            <button
              className={classNames(
                "text-base font-normal",
                location.pathname !== `/${routeUrls.room247.path}`
                  ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                  : "font-normal btn btn-base justify-start",
              )}
              onClick={() => navigate(`/${routeUrls.comingSoon.path}`)}
            >
              <IoApps />
              <p className="pl-2">{t("room.rooms")}</p>
            </button>
          </div>
          <div className="w-full">
            <button
              className={classNames(
                "text-base font-normal",
                location.pathname !== `/${routeUrls.contact.path}`
                  ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                  : "font-normal btn btn-base justify-start",
              )}
              onClick={() => navigate(`/${routeUrls.comingSoon.path}`)}
            >
              <IoPerson />
              <p className="pl-2">{t("contact.contacts")}</p>
            </button>
          </div>
          <div className="w-full">
            <button
              className={classNames(
                "text-base font-normal",
                location.pathname !== `/${routeUrls.analytic.path}`
                  ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                  : "font-normal btn btn-base justify-start",
              )}
              onClick={() => navigate(`/${routeUrls.comingSoon.path}`)}
            >
              <IoAnalyticsOutline />
              <p className="pl-2">{t("sidebar.analytics")}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(SidebarLayout);
