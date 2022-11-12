import classNames from "classnames";
import { IconBase } from "components/base";
import { LIVE_URL, routeUrls } from "configs";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "stores/app.store";

const UserInfo = ({ onLogout, className }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [appStore] = useAppStore();
  const user = useMemo(() => appStore.user, [appStore.user]);

  return (
    <div className={classNames("dropdown dropdown-end", className)}>
      <label
        tabIndex="0"
        className="hover:cursor-pointer flex flex-row space-x-2 justify-center items-center"
      >
        <div className="avatar">
          {user?.profile?.avatar ? (
            <div className="!flex w-12 rounded-lg justify-center items-center text-black">
              <img src={`${user?.profile?.avatar}`} alt="avatar" />
            </div>
          ) : (
            <div className="!flex w-12 rounded-lg justify-center items-center bg-primary text-black">
              <span className="text-xl text-white">{user?.profile?.name[0]}</span>
            </div>
          )}
        </div>
        <div className="flex sm:hidden flex-col">
          <p className="truncate text-base font-bold">{user?.profile?.name}</p>
          <p className="truncate text-sm">{user?.email || ""}</p>
        </div>
      </label>
      <div
        tabIndex="0"
        className="right-8 py-6 shadow menu menu-compact dropdown-content rounded-box w-44 z-50 bg-white space-y-2"
      >
        <Link
          to={`/${routeUrls.profileUpdate.path}`}
          className={classNames(
            "btn btn-block btn-primary",
            "bg-white border-0 text-black",
            "hover:text-white hover:bg-primary",
            "flex justify-start rounded-none z-10 rounded-3xl",
          )}
        >
          {t("profile.edit")}
        </Link>
        <Link
          to={`/${routeUrls.profileChangePassword.path}`}
          className={classNames(
            "btn btn-block btn-primary",
            "bg-white border-0 text-black",
            "hover:text-white hover:bg-primary",
            "flex justify-start rounded-none z-10 rounded-3xl",
          )}
        >
          {t("user.change_password")}
        </Link>
        <Link
          to={`/${routeUrls.connectWallet.path}`}
          className={classNames(
            "btn btn-block btn-primary",
            "bg-white border-0 text-black",
            "hover:text-white hover:bg-primary",
            "flex justify-start rounded-none z-10 rounded-3xl",
          )}
        >
          Connect Wallet
        </Link>
        <a
          className={classNames(
            "btn btn-block btn-primary",
            "bg-white border-0 text-black",
            "hover:text-white hover:bg-primary",
            "flex justify-start rounded-none z-10 rounded-3xl",
          )}
          onClick={onLogout}
        >
          <IconBase icon="/icons/icons/logout-outline.svg" alt="logout-icon" className="pr-4" />
          {t("auth.logout")}
        </a>
      </div>
    </div>
  );
};

export default UserInfo;
