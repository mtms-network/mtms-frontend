import React, { useEffect } from "react";
import { resetUserToken } from "helpers";
import { useAuth, useDimensions } from "hooks";
import { useAppStore } from "stores/app.store";
import classNames from "classnames";
import NavbarLayout from "./NavbarLayout";
import SidebarLayout from "./SidebarLayout";

const Layout = ({ children, bottom, contentClassName = "" }) => {
  const [, updateAppStore] = useAppStore();

  const { width } = useDimensions();

  const handleLogout = () => {
    resetUserToken();
    updateAppStore((draft) => {
      draft.isAuthenticated = false;
    });
  };

  useAuth();

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <NavbarLayout width={width} onLogout={handleLogout} />
        <div className={classNames("bg-white relative")}>
          <div
            className={classNames(
              "flex flex-col pt-20 sm:pt-28 pb-28 overflow-y-auto px-4 relative",
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
      <SidebarLayout />
    </div>
  );
};

export default Layout;
