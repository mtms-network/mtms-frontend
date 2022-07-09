import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useAppStore } from "stores/app.store";
import { LIVE_URL } from "configs";
import { withNamespaces } from "react-i18next";
import { Link } from "react-router-dom";

const NavbarLayout = ({ width, onLogout, t }) => {
  const [appStore] = useAppStore();
  return (
    <div
      className="navbar bg-dark-base fixed z-30 h-18 w-full"
      style={{ width: width > 768 && `calc(${width}px - 320px)` }}
    >
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <IoMenu />
        </label>
      </div>
      <div className="flex-1 px-2 mx-2 hidden lg:block">
        <div>
          <ul className="menu menu-horizontal p-0 flex flex-row justify-start">
            <li className="nav-link">
              <a className="font-bold text-base">{t("general.home")}</a>
            </li>
            <li className="nav-link">
              <a className="font-bold text-base">{t("menu.products")}</a>
            </li>
            <li className="nav-link">
              <a className="font-bold text-base">{t("menu.farmer")}</a>
            </li>
            <li className="nav-link">
              <a className="font-bold text-base">{t("menu.nft_marketplace")}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-none hidden lg:block px-4">
        <div className="menu menu-horizontal space-x-3 py-4">
          <div>
            <button className="btn btn-primary gap-2 text-base">
              <FaPlusCircle />
              {t("menu.buy")}
            </button>
          </div>
          <div className="flex flex-row justify-center items-center space-x-2">
            <div className="dropdown dropdown-end bg-dark-base">
              <label
                tabIndex="0"
                className="hover:cursor-pointer flex flex-row space-x-2 justify-center items-center"
              >
                <div className="avatar">
                  <div className="!flex w-12 rounded-full justify-center items-center bg-primary text-white">
                    {appStore?.user?.profile?.avatar ? (
                      <img src={`${LIVE_URL}appStore?.user?.profile?.avatar`} alt="avatar" />
                    ) : (
                      <span className="text-xl">{appStore?.user?.profile?.name[0]}</span>
                    )}
                  </div>
                </div>
                <div className="nav-link">
                  <p className="font-bold text-base">{appStore?.user?.profile?.name}</p>
                </div>
              </label>
              <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-dark-base rounded-box w-32"
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
          <button className="btn btn-primary text-base">English</button>
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(NavbarLayout);
