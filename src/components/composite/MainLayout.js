import React, { useEffect, useState } from "react";
import { resetUserToken } from "helpers";
import { useAuth, useDimensions } from "hooks";
import { useAppStore } from "stores/app.store";
import classNames from "classnames";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { getLanguages } from "services";
import i18n from "i18n";
import NavbarLayout from "./NavbarLayout";
import SidebarLayout from "./SidebarLayout";
import SidebarUserCenter from "./SidebarUserCenter";
import BrandLogoLoading from "./BrandLogoLoading";

const Layout = ({ children, bottom, contentClassName = "", userCenter = false }) => {
  const [, updateAppStore] = useAppStore();
  const [loading, setLoading] = useState(false);

  const { width } = useDimensions();

  const handleLogout = () => {
    resetUserToken();
    updateAppStore((draft) => {
      draft.isAuthenticated = false;
    });
  };

  useAuth();

  const fetchLanguage = async () => {
    try {
      if (!i18next.exists("home.copied")) {
        setLoading(true);
        const data = await getLanguages();
        const resources = { en: { translation: data } };

        i18n.init({
          resources,
          lng: "en",
        });
        setLoading(false);
      }
    // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  useEffect(() => {
    fetchLanguage();
  }, []);

  return loading ? (
    <div className="h-screen">
      <BrandLogoLoading />
    </div>
  ) : (
    <I18nextProvider i18n={i18next}>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <NavbarLayout width={width} onLogout={handleLogout} />
          <div className={classNames("relative min-h-screen")}>
            <div
              className={classNames(
                "flex flex-col pt-20 sm:pt-22 pb-28 overflow-y-auto px-4 relative",
                "min-h-full bg-gray-base",
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
        {userCenter ? <SidebarUserCenter /> : <SidebarLayout />}
      </div>
    </I18nextProvider>
  );
};

export default Layout;
