import classNames from "classnames";
import { routeUrls } from "configs";
import React from "react";
import { FaCalendarPlus } from "react-icons/fa";
import { IoAnalyticsOutline, IoApps, IoLogoAppleAr, IoPerson } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="drawer-side bg-dark-base">
      <label htmlFor="my-drawer-3" className="drawer-overlay" />
      <div className="menu py-4 px-8 overflow-y-auto w-80 bg-dark-base">
        <div>
          <img src="/images/mtms-logo.png" alt="logo" />
        </div>
        <div className="pt-8 space-y-4">
          <div className="w-full">
            <button
              className={classNames(
                "text-base font-normal",
                location.pathname !== "/"
                  ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                  : "font-normal btn btn-base justify-start",
              )}
              onClick={() => navigate("/")}
            >
              <IoLogoAppleAr />
              <p className="pl-2">Overview</p>
            </button>
          </div>
          <div className="w-full">
            <button
              className={classNames(
                "text-base font-normal",
                location.pathname === `/${routeUrls.scheduleMeeting.path}` ||
                  location.pathname === `/${routeUrls.newScheduleMeeting.path}`
                  ? "font-normal btn btn-base justify-start"
                  : "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row",
              )}
              onClick={() => navigate(`/${routeUrls.scheduleMeeting.path}`)}
            >
              <FaCalendarPlus />
              <p className="pl-2">Schedule a Meeting</p>
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
            >
              <IoApps />
              <p className="pl-2">Rooms 24/7</p>
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
            >
              <IoPerson />
              <p className="pl-2">Contacts</p>
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
            >
              <IoAnalyticsOutline />
              <p className="pl-2">Analytics</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
