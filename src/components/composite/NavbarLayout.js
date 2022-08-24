import React, { useCallback, useMemo } from "react";
import { IoMenu } from "react-icons/io5";
import { useAppStore } from "stores/app.store";
import { COMMON, LIVE_MEETING_URL, LIVE_URL, routeUrls } from "configs";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { InputSingle } from "components/base/Input";
import { Button, IconBase } from "components/base";
import { startMeeting } from "services";
import { getAccessToken } from "helpers";

const NavbarLayout = ({ width, onLogout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [appStore] = useAppStore();
  const user = useMemo(() => appStore.user, [appStore.user]);

  const onStartAnInstant = useCallback(async () => {
    try {
      const res = await startMeeting({
        instant: true,
      });
      if (res?.data?.meeting?.uuid) {
        navigate(`/${routeUrls.meetingRedirect.path}/${res?.data?.meeting?.identifier}`);
      }
    } catch (error) {}
  }, []);

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

      <div className="flex-none hidden lg:flex w-full">
        <div className="flex-1 flex justify-start items-start pr-10">
          <InputSingle
            compactInput
            placeholder={t("general.search")}
            leftIcon={<img src="/icons/icons/search-normal-outline.svg" alt="search" />}
          />
        </div>
        <div className="menu menu-horizontal space-x-3 py-4">
          <div className="flex flex-row justify-center items-center space-x-2">
            <Button className="btn btn-primary" onClick={onStartAnInstant}>
              <img src="/icons/icons/camera-white-fill.svg" alt="buy mtms" className="pr-2" />
              {t("home.start_a_instant_meeting")}
            </Button>
            <div className="dropdown dropdown-end">
              <label
                tabIndex="0"
                className="hover:cursor-pointer flex flex-row space-x-2 justify-center items-center"
              >
                <div className="avatar">
                  {user?.profile?.avatar ? (
                    <div className="!flex w-12 rounded-lg justify-center items-center text-black">
                      <img src={`${LIVE_URL}${user?.profile?.avatar}`} alt="avatar" />
                    </div>
                  ) : (
                    <div className="!flex w-12 rounded-lg justify-center items-center bg-primary text-black">
                      <span className="text-xl text-white">{user?.profile?.name[0]}</span>
                    </div>
                  )}
                </div>
              </label>
              <div
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content rounded-box w-44 z-50 bg-white space-y-4"
              >
                <Link
                  to={`/${routeUrls.profileUpdate.path}`}
                  className="btn btn-block btn-primary bg-white border-0 text-black hover:text-white hover:bg-primary flex justify-start"
                >
                  {t("profile.edit")}
                </Link>
                <Link
                  to={`/${routeUrls.profileChangePassword.path}`}
                  className="btn btn-block btn-primary bg-white border-0 text-black hover:text-white hover:bg-primary flex justify-start"
                >
                  {t("user.change_password")}
                </Link>
                <a
                  className="btn btn-block btn-primary bg-transparent border-0 text-black hover:text-white hover:bg-primary flex justify-start"
                  onClick={onLogout}
                >
                  <IconBase
                    icon="/icons/icons/logout-outline.svg"
                    alt="logout-icon"
                    className="pr-4"
                  />
                  {t("auth.logout")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarLayout;
