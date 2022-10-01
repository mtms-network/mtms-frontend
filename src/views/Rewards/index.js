/* eslint-disable no-empty */
import React, {useState, useEffect, useCallback} from "react";
import {Button, MainLayout, AlertError, BrandLogoLoading} from "components";

import {BASE_API, ALERT_TYPE, API_RESPONSE_STATUS, routeUrls, WALLET_PROVIDER} from "configs";
import {useWalletStore} from "stores/wallet.store";
import {getUser, handleHttpError} from "helpers";
import {useTranslation} from "react-i18next";
import {
  checkInToday,
  claimCheckIn,
  claimTokenToDay,
  getRequirePreWallet,
} from "services/wallet.service";
import {message} from "antd";
import {useAppStore} from "stores/app.store";
import {useNavigate} from "react-router-dom";
import Nfts from "./components/Nfts";
import Plan from "./components/Plan";

const Rewards = () => {
  const [walletStore, updateWalletStore] = useWalletStore();
  const [appStore, updateAppStore] = useAppStore();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: ALERT_TYPE.ERROR,
    error: [],
  });
  const [timeMonth, setTimeMonth] = useState({hour: 0, minute: 0});
  const [timeToday, setTimeToday] = useState({hour: 0, minute: 0});
  const [timeWeek, setTimeWeek] = useState({hour: 0, minute: 0});
  const {t} = useTranslation();

  const prepareData = async () => {
    try {
      setFetchLoading(true);
      const res = await getRequirePreWallet();
      if (res) {
        updateWalletStore((draft) => {
          draft.wallet = res;
        });
      }
      setFetchLoading(false);
    } catch (error) {
      setFetchLoading(false);
    }
  };

  const handleClaimCheckInToday = async () => {
    try {
      setAlert({...alert, show: false, message: ""});
      setLoading(true);

      const res = await claimCheckIn();

      if (res?.status === API_RESPONSE_STATUS.success) {
        message.success(res?.message);
      }
      await prepareData();
      await setLoading(false);
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({
          type: ALERT_TYPE.ERROR,
          show: true,
          message: errorData.message,
          error: errorData.detail,
        });
      }
      setLoading(false);
    }
  };

  const handleCheckInToday = async () => {
    try {
      setAlert({...alert, show: false, message: ""});
      setLoading(true);

      const res = await checkInToday();
      if (res?.status === API_RESPONSE_STATUS.success) {
        message.success(res?.message);
      }

      await prepareData();
      await setLoading(false);
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({
          type: ALERT_TYPE.ERROR,
          show: true,
          message: errorData.message,
          error: errorData.detail,
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (walletStore.wallet !== null) {
      const hourMonth = Math.floor(walletStore.wallet.total_minute_month / 60);
      const minuteMonth = walletStore.wallet.total_minute_month % 60;

      const hourToday = Math.floor(walletStore.wallet.total_minute_today / 60);
      const minuteToday = walletStore.wallet.total_minute_today % 60;

      const hourWeek = Math.floor(walletStore.wallet.total_minute_week / 60);
      const minuteWeek = walletStore.wallet.total_minute_week % 60;

      setTimeMonth({hour: hourMonth, minute: minuteMonth});
      setTimeToday({hour: hourToday, minute: minuteToday});
      setTimeWeek({hour: hourWeek, minute: minuteWeek});
    }
    prepareData();
  }, []);

  return (
    <MainLayout>
      <div className="p-2 min-h-full">
        <AlertError
          {...{...alert}}
          onClose={() => {
            setAlert({...alert, show: false});
          }}
        />
        {fetchLoading && (
          <div className="h-screen">
            <BrandLogoLoading/>
          </div>
        )}
        <div className="space-y-6">
          <div className="flex w-full bg-white rounded-3xl py-6 px-8">
            <div className="flex flex-1 flex-col sm:flex-row justify-between">
              <div className="flex flex-col">
                <p className="font-bold text-2xl">{t("rewards.daily_task")}</p>
                <p className="text-base">
                  {`${t("rewards.receive_token", {
                    token: walletStore?.wallet?.user_earning?.checkin_earning || 0,
                  })}`}
                </p>
              </div>
              <div className="flex flex-row items-end space-x-2 py-4">
                <Button
                  className="btn-primary"
                  isLoading={loading}
                  onClick={async () => {
                    if (!walletStore?.wallet?.has_checked_today) {
                      await handleCheckInToday();
                    }
                  }}
                  disabled={walletStore?.wallet?.has_checked_today}
                >
                  {walletStore?.wallet?.has_checked_today
                    ? t("rewards.checked_in")
                    : t("rewards.check_in")}
                </Button>
                <Button
                  className="btn-primary"
                  disabled={walletStore?.wallet?.total_checkin_token <= 0}
                  isLoading={loading}
                  onClick={() => {
                    if (walletStore?.wallet?.total_checkin_token > 0) {
                      handleClaimCheckInToday();
                    }
                  }}
                >
                  {`${t("rewards.claim_value_token", {
                    token: walletStore?.wallet?.total_checkin_token || 0,
                  })}`}
                </Button>
              </div>
            </div>
          </div>
          <Plan />
          <Nfts />
          <div className="flex flex-col sm:flex-row w-full sm:space-x-5">
            <div className="basis-2/3 bg-white rounded-3xl py-6 px-8 grow">
              <div className="flex flex-1 flex-row justify-between">
                <div style={{lineBreak: 'anywhere'}}>
                  <div className="flex flex-row">
                    {appStore?.user?.wallets?.[0]?.wallet_address ? (
                      <div className="pr-4">
                        <img
                          src={WALLET_PROVIDER[appStore.user?.wallets?.[0]?.wallet_type]?.image}
                          alt="wallet-logo"
                          className="h-12"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div>
                      <p className="text-lg text-gray">
                        {appStore?.user?.wallets?.[0]?.wallet_address
                          ? `${
                            WALLET_PROVIDER[appStore.user?.wallets?.[0]?.wallet_type]?.name
                          } wallet`
                          : t("rewards.your_wallet")}
                      </p>
                      <span className="font-bold text-lg text-black-base">
                        {`${appStore?.user?.wallets?.[0]?.wallet_address || ""}`}
                      </span>
                      {!appStore?.user?.wallets?.[0]?.wallet_address && (
                        <a
                          onClick={() => {
                            navigate(`/${routeUrls.connectWallet.path}`);
                          }}
                          className="btn-text-primary text-lg"
                        >
                          {t('rewards.connect_wallet')}
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-base pt-5">
                    {t("rewards.well_done", {
                      name: getUser()?.profile?.name,
                    })}
                  </p>

                  <p className="text-base pt-5">{t("rewards.slogan")}</p>
                  <p className="text-base pt-5">
                    {t("rewards.message_receive_token", {
                      hours: timeWeek.hour,
                      token: walletStore?.wallet?.total_token_week || 0,
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="basis-1/3 bg-white rounded-3xl py-6 px-8 mt-10 sm:mt-0">
              <div className="flex flex-col justify-center items-center">
                <p className="text-base text-gray">{t("rewards.total_token")}</p>
                <p className="text-orange-base font-bold text-5xl flex">
                  {`${walletStore?.wallet?.user?.total_token || 0}`}
                  <img src="/images/logo.png" className="w-[48px] ml-2" alt="logo mtms" />
                </p>

                <div className="pt-8">
                  <Button
                    disabled
                    className="btn btn-primary rounded-3xl btn-lg h-[54px] min-h-[54px]"
                    // disabled={!walletStore?.wallet?.user?.total_token}
                    isLoading={loading}
                  >
                    {t("rewards.withdraw")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Rewards;
