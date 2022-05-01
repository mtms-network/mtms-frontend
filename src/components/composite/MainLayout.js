import React, { useEffect } from "react";
import { IoApps, IoPerson, IoAnalyticsOutline, IoLogoAppleAr, IoMenu } from "react-icons/io5";
import { FaCalendarPlus, FaPlusCircle } from "react-icons/fa";
import { resetUserToken } from "helpers";
import { useAuth } from "hooks";
import { useAppStore } from "stores/app.store";
import { useLocation, useNavigate } from "react-router-dom";
import { routeUrls } from "configs";
import classNames from "classnames";

const Layout = ({ children, bottom }) => {
  const [, setAppStore] = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    resetUserToken();
    setAppStore((draft) => {
      draft.isAuthenticated = false;
    });
  };

  const onSelectionLeftNav = () => {};

  useAuth();

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-dark-base">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <IoMenu />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <div>
              <ul className="menu menu-horizontal p-0 flex flex-row justify-start">
                <li className="nav-link">
                  <a className="font-bold text-base">Home</a>
                </li>
                <li className="nav-link">
                  <a className="font-bold text-base">Products</a>
                </li>
                <li className="nav-link">
                  <a className="font-bold text-base">MTMS Farmer</a>
                </li>
                <li className="nav-link">
                  <a className="font-bold text-base">NFT Marketplace</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-none hidden lg:block px-4">
            <div className="menu menu-horizontal space-x-3 py-4">
              <div>
                <button className="btn btn-primary gap-2 text-base">
                  <FaPlusCircle />
                  Buy MTMS
                </button>
              </div>
              <div className="flex flex-row justify-center items-center space-x-2">
                <div className="dropdown dropdown-end bg-dark-base">
                  <label
                    tabIndex="0"
                    className="hover:cursor-pointer flex flex-row space-x-2 justify-center items-center"
                  >
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src="https://api.lorem.space/image/face?hash=28212" alt="avatar" />
                      </div>
                    </div>
                    <div className="nav-link">
                      <p className="font-bold text-base">Michael Jordan</p>
                    </div>
                  </label>
                  <ul
                    tabIndex="0"
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-dark-base rounded-box w-32"
                  >
                    <li className="w-full">
                      <a className="btn btn-block hover:text-primary">Profile</a>
                    </li>
                    <li className="w-full">
                      <a className="btn btn-block hover:text-primary">Settings</a>
                    </li>
                    <li className="w-full">
                      <a className="btn btn-block hover:text-primary" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <button className="btn btn-primary text-base">English</button>
            </div>
          </div>
        </div>
        <div className="bg-white w-full relative">
          <div className="flex flex-col pb-16 p-4">{children}</div>
          {bottom && (
            <div className="absolute pt-4 bg-white bottom-0 w-full pr-16">
              <div className="flex py-2 flex-1">{bottom}</div>
            </div>
          )}
        </div>
      </div>
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
                  location.pathname !== `/${routeUrls.scheduleMeeting.path}`
                    ? "btn btn-ghost btn-block btn-link-dark justify-start flex flex-row"
                    : "font-normal btn btn-base justify-start",
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
    </div>
  );
};

export default Layout;
