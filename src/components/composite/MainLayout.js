import React, { useEffect } from "react";
import { resetUserToken } from "helpers";
import { useAuth, useDimensions } from "hooks";
import { useAppStore } from "stores/app.store";
import classNames from "classnames";
import NavbarLayout from "./NavbarLayout";
import SidebarLayout from "./SidebarLayout";
import SidebarUserCenter from "./SidebarUserCenter";
import { withNamespaces } from 'react-i18next';
import { createPrivateInstance } from "services/base";

const Layout = ({ children, bottom, contentClassName = "", t, i18n, userCenter = false }) => {
  const [, updateAppStore] = useAppStore();

  const { width } = useDimensions();

  const handleLogout = () => {
    resetUserToken();
    updateAppStore((draft) => {
      draft.isAuthenticated = false;
    });
  };

  useAuth();

  useEffect(() => {
    const setLanguage = async () => {
      const client = createPrivateInstance('/locale/en');
      const res = await client.get('');

      const resources  = { en: { translation: res.data } };

      i18n.init({
        resources,
        lng: "en",
      })
    }

    setLanguage();
  }, [])
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
      { userCenter ? <SidebarUserCenter /> : <SidebarLayout /> }
    </div>
  );
};

export default withNamespaces()(Layout);
