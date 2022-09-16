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
import {createPrivateInstance} from "services/base";
import {message} from "antd";
import {useAppStore} from "stores/app.store";
import {useNavigate} from "react-router-dom";

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

  const handleClaimTokenToday = async () => {
    try {
      setAlert({...alert, show: false, message: ""});
      setLoading(true);
      const res = await claimTokenToDay();
      if (res?.status === API_RESPONSE_STATUS.success) {
        message.success(res?.message);
      }

      await prepareData();
      setLoading(false);
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

  const convertTime = useCallback((totalMinute) => {
    const h = Math.floor(totalMinute / 60);
    const m = totalMinute - h * 60;
    return {
      h: h?.toString().padStart(2, "0"),
      m: m?.toString()?.padStart(2, "0"),
    };
  }, [walletStore?.wallet?.total_minute_all_days]);

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
                    token: walletStore?.wallet?.token_per_checkin || 0,
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
          <div className="w-full bg-white rounded-3xl py-6 px-8">
            <div className="flex flex-1 flex-col sm:flex-row justify-between">
              <div className="">
                <div className="mb-4">
                  <p className="text-base text-gray">{t("rewards.meeting_time")} (hh/mm)</p>
                  <p className="text-orange-base font-bold text-xl">
                    {`${convertTime(walletStore?.wallet?.total_minute_all_days).h}:${convertTime(walletStore?.wallet?.total_minute_all_days).m}`}
                  </p>
                </div>
                <div className="">
                  <p
                    className="text-base text-gray">{t("rewards.today_earning")} ({t('list.general.durations.minutes')})</p>
                  <p className="text-orange-base font-bold text-xl">
                    {`${convertTime(walletStore?.wallet?.total_minute_earn_today).h}:${convertTime(walletStore?.wallet?.total_minute_earn_today).m}`}
                  </p>
                </div>
              </div>
              <div className="">
                <div className="mb-4">
                  <p
                    className="text-base text-gray">{t("rewards.earning_rate")} (MTMS/{t('list.general.durations.m')})</p>
                  <p className="text-orange-base font-bold text-xl">
                    {`${walletStore?.wallet?.meeting_cost}`}
                  </p>
                </div>
                <div>
                  <p
                    className="text-base text-gray">{t("rewards.max_daily_earnings")} ({t('list.general.durations.minutes')})</p>
                  <p className="text-orange-base font-bold text-xl">
                    {`${walletStore?.wallet?.max_minute_day}`}
                  </p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <p className="text-base text-gray">{t("rewards.total_earn")}</p>
                  <p className="text-orange-base font-bold text-xl">
                    {`${parseFloat(walletStore?.wallet?.total_token_all_days).toFixed(3)} MTMS`}
                  </p>
                </div>
              </div>
              <div>
                <Button
                  className="btn-primary"
                  isLoading={loading}
                  onClick={() => {
                    if (walletStore?.wallet?.total_token_all_days > 0) {
                      handleClaimTokenToday();
                    }
                  }}
                  disabled={walletStore?.wallet?.total_token_all_days <= 0}
                >
                  {t("rewards.claim_token")}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:space-x-5">
            <div className="basis-2/3 bg-white rounded-3xl py-6 px-8 grow">
              <div className="flex flex-1 flex-row justify-between">
                <div>
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
                <p className="text-orange-base font-bold text-5xl">{`${
                  walletStore?.wallet?.user?.total_token || 0
                }`}</p>
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
