import classNames from "classnames";
import { routeUrls } from "configs";
import React from "react";
import { FaCalendarPlus } from "react-icons/fa";
import { IoAnalyticsOutline, IoApps, IoLogoAppleAr, IoPerson } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { withNamespaces } from 'react-i18next';

const SidebarUserCenter = ({ t }) => {
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
                location.pathname.includes(routeUrls.profile.path)
                  ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                  : "font-normal btn btn-base justify-start",
              )}
              onClick={() => navigate(`/${routeUrls.profile.path}`)}
            >
              <p className="pl-2">{t('Update Profile')}</p>
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
            >
              <p className="pl-2">{t('Rewards Center')}</p>
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
              <p className="pl-2">{t('Registration Invite')}</p>
            </button>
          </div>
          <div className="w-full">
            <button className="text-base font-normal btn btn btn-primary w-full mt-3">
              Account: 1000 USD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(SidebarUserCenter);
