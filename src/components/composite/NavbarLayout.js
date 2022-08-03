import React, { useMemo } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useAppStore } from "stores/app.store";
import { LIVE_URL, routeUrls } from "configs";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const NavbarLayout = ({ width, onLogout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [appStore] = useAppStore();
  const user = useMemo(() => appStore.user, [appStore.user]);

  return (
    <div
      className="navbar fixed z-30 h-16 w-full bg-white flex-1"
      style={{ width: width > 1023 && `calc(${width}px - 320px)` }}
    >
      <div className="flex justify-end flex-none lg:hidden w-full">
        <button onClick={() => navigate("/")}>
          <img src="/images/mtms-logo.png" alt="logo" className="h-10" />
        </button>
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <IoMenu />
        </label>
      </div>
      <div className="flex-none hidden lg:block px-4">
        <div className="menu menu-horizontal space-x-3 py-4">
          <div className="flex flex-row justify-center items-center space-x-2">
            <div className="dropdown dropdown-end">
              <label
                tabIndex="0"
                className="hover:cursor-pointer flex flex-row space-x-2 justify-center items-center"
              >
                <div className="avatar">
                  <div className="!flex w-12 rounded-full justify-center items-center bg-primary text-black">
                    {user?.profile?.avatar ? (
                      <img src={`${LIVE_URL}appStore?.user?.profile?.avatar`} alt="avatar" />
                    ) : (
                      <span className="text-xl">{user?.profile?.name[0]}</span>
                    )}
                  </div>
                </div>
              </label>
              <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content rounded-box w-32"
              >
                <li className="w-full">
                  <Link to="/profile" className="btn btn-block hover:text-primary">
                    {t("user.profile")}
                  </Link>
                </li>
                <li className="w-full">
                  <a className="btn btn-block hover:text-primary">{t("menu_avatar.settings")}</a>
                </li>
                <li className="w-full">
                  <a className="btn btn-block hover:text-primary" onClick={onLogout}>
                    {t("auth.logout")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarLayout;
