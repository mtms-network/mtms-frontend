/* eslint-disable no-empty */
import React, { useState, useEffect } from "react";
import { Button, MainLayout, AlertError, BrandLogoLoading } from "components";

import { BASE_API, ALERT_TYPE, API_RESPONSE_STATUS } from "configs";
import { useWalletStore } from "stores/wallet.store";
import { handleHttpError } from "helpers";
import { useTranslation } from "react-i18next";
import { checkInToday, claimTokenToDay, getRequirePreWallet } from "services/wallet.service";
import { createPrivateInstance } from "services/base";
import { message } from "antd";

const Rewards = () => {
  const [walletStore, updateWalletStore] = useWalletStore();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: ALERT_TYPE.ERROR,
    error: [],
  });
  const [timeMonth, setTimeMonth] = useState({ hour: 0, minute: 0 });
  const [timeToday, setTimeToday] = useState({ hour: 0, minute: 0 });
  const [timeWeek, setTimeWeek] = useState({ hour: 0, minute: 0 });
  const { t } = useTranslation();
  // const

  const prepareData = async () => {
    try {
      if (walletStore.wallet === null) {
        setFetchLoading(true);
        const res = await getRequirePreWallet();
        if (res) {
          updateWalletStore((draft) => {
            draft.wallet = res;
          });
        }
        setFetchLoading(false);
      }
    } catch (error) {
      setFetchLoading(false);
    }
  };

  const handleClaimTokenToday = async () => {
    try {
      setAlert({ ...alert, show: false, message: "" });
      setLoading(true);
      const res = await claimTokenToDay()

      if (res?.status === 200) {
        message.success(res.data.status);
      }

      const totalToken = walletStore.wallet.token_per_checkin + res.data.amount;
      const newWallet = {
        ...walletStore.wallet,
        total_token_today: 0,
        user: { ...walletStore.wallet.user, total_token: totalToken },
      };
      updateWalletStore((draft) => {
        draft.wallet = newWallet;
      });

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
      setAlert({ ...alert, show: false, message: "" });
      setLoading(true);

      const client = createPrivateInstance(BASE_API.wallet);
      const res = await client.post("/claim/checkin");
      const totalToken = walletStore.wallet.user.total_token + res.data.amount;
      const newWallet = {
        ...walletStore.wallet,
        total_checkin_token: 0,
        user: { ...walletStore.wallet.user, total_token: totalToken },
      };
      updateWalletStore((draft) => {
        draft.wallet = newWallet;
      });

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

  const handleCheckInToday = async () => {
    try {
      setAlert({ ...alert, show: false, message: "" });
      setLoading(true);

      const res = await checkInToday();

      if (res?.status === 200) {
        message.success(res.data.status);
      }

      const newWallet = {
        ...walletStore.wallet,
        has_checked_today: true,
        total_checkin_token:
          walletStore.wallet.total_checkin_token + walletStore.wallet.token_per_checkin,
      };
      updateWalletStore((draft) => {
        draft.wallet = newWallet;
      });

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

  useEffect(() => {
    if (walletStore.wallet !== null) {
      const hourMonth = Math.floor(walletStore.wallet.total_minute_month / 60);
      const minuteMonth = walletStore.wallet.total_minute_month % 60;

      const hourToday = Math.floor(walletStore.wallet.total_minute_today / 60);
      const minuteToday = walletStore.wallet.total_minute_today % 60;

      const hourWeek = Math.floor(walletStore.wallet.total_minute_week / 60);
      const minuteWeek = walletStore.wallet.total_minute_week % 60;

      setTimeMonth({ hour: hourMonth, minute: minuteMonth });
      setTimeToday({ hour: hourToday, minute: minuteToday });
      setTimeWeek({ hour: hourWeek, minute: minuteWeek });
    }
    prepareData();
  }, [walletStore]);

  return (
    <MainLayout>
      <div className="p-2 min-h-full">
        <AlertError
          {...{ ...alert }}
          onClose={() => {
            setAlert({ ...alert, show: false });
          }}
        />
        {fetchLoading && (
          <div className="h-screen">
            <BrandLogoLoading />
          </div>
        )}
        <div className="space-y-6">
          <div className="flex w-full bg-white rounded-3xl py-6 px-8">
            <div className="flex flex-1 flex-row justify-between">
              <div>
                <p className="font-bold text-2xl">{t("rewards.daily_task")}</p>
                <p className="text-base">
                  {`${t("rewards.receive_token", {
                    token: walletStore?.wallet?.token_per_checkin || 0,
                  })}`}
                </p>
              </div>
              <div className="flex flex-row items-end space-x-2">
                <Button
                  className="btn-primary"
                  isLoading={loading}
                  onClick={ async () => {
                    if(!walletStore?.wallet?.has_checked_today){
                      await handleCheckInToday();
                    }
                  }}
                  disabled={walletStore?.wallet?.has_checked_today}
                >
                  {t("rewards.check_in")}
                </Button>
                <Button className="btn-primary" disabled isLoading={loading} onClick={() => {}}>
                  {`${t("rewards.claim_value_token", {
                    token: walletStore?.wallet?.token_per_checkin || 0,
                  })}`}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex w-full bg-white rounded-3xl py-6 px-8">
            <div className="flex flex-1 flex-row justify-between">
              <div className="flex flex-row space-x-20">
                <div>
                  <p className="text-base text-gray">{t("rewards.meeting_time")} (hhh/mm/ss)</p>
                  <p className="text-orange-base font-bold text-xl">
                    {`${timeToday.hour}:${timeToday.minute}`}
                  </p>
                </div>
                <div>
                  <p className="text-base text-gray">{t("rewards.total_earn")}</p>
                  <p className="text-orange-base font-bold text-xl">
                    {`${walletStore?.wallet?.total_token_today} MTMS`}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-end space-x-2">
                <Button
                  className="btn-primary"
                  isLoading={loading}
                  onClick={handleClaimTokenToday}
                  disabled={walletStore?.wallet?.total_token_all_days > 0}
                >
                  {t("rewards.claim_token")}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full space-x-5">
            <div className="basis-2/3 bg-white rounded-3xl py-6 px-8 grow">
              <div className="flex flex-1 flex-row justify-between">
                <div>
                  <p className="text-lg text-gray">
                    {t("rewards.your_wallet")}:
                    <span className="font-bold text-lg text-black-base"> {`${walletStore?.wallet?.user?.oasis?.address || ''}`}</span>
                  </p>
                  <p className="text-base pt-5">
                    {t("rewards.message_receive_token", {
                      hours: timeWeek.hour,
                      token: walletStore?.wallet?.total_token_week,
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="basis-1/3 bg-white rounded-3xl py-6 px-8">
              <div className="flex flex-col justify-center items-center">
                <p className="text-base text-gray">{t("rewards.total_token")}</p>
                <p className="text-orange-base font-bold text-5xl">{`${
                  walletStore?.wallet?.user?.total_token || 0
                }`}</p>
                <div className="pt-8">
                  <Button
                    disabled={true}
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
