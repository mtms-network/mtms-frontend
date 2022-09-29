import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {message} from "antd";
import {Button} from "../../../components";
import {useWalletStore} from "../../../stores/wallet.store";
import {claimTokenToDay, getRequirePreWallet} from "../../../services/wallet.service";
import {ALERT_TYPE, API_RESPONSE_STATUS} from "../../../configs";
import {handleHttpError} from "../../../helpers";

const Nfts = () => {
  const {t} = useTranslation();
  const [walletStore, updateWalletStore] = useWalletStore();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: ALERT_TYPE.ERROR,
    error: [],
  });

  const convertTime = useCallback((totalMinute) => {
    const h = Math.floor(totalMinute / 60);
    const m = totalMinute - h * 60;
    return {
      h: h?.toString().padStart(2, "0"),
      m: m?.toString()?.padStart(2, "0"),
    };
  }, [walletStore?.wallet?.meeting?.minute_all]);

  const meetingTime = convertTime(walletStore?.wallet?.meeting?.minute_all);
  const totalEarning = convertTime(walletStore?.wallet?.total_checkin_token);

  const renderBox = (title, content, margin = "") => {
    return (
      <div className={ margin }>
        <p className="text-base text-gray">{ title }</p>
        <p className="text-orange-base font-bold text-xl">
          { content }
        </p>
      </div>
    );
  };

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

  return (
    <div className="w-full bg-white rounded-3xl py-6 px-8">
      <div className="flex flex-1 flex-col sm:flex-row justify-between">
        <div className="">
          { renderBox(
            `${t("rewards.meeting_time")} (hh/mm)`,
            `${meetingTime.h}:${meetingTime.m}`,
            'mb-4'
          ) }

          { renderBox(
            `NFT Earning`,
            walletStore?.wallet?.nft?.earn_all || 0,
            'mb-4'
          ) }

          { renderBox(
            `Subscription Earning`,
            walletStore?.wallet?.subscription?.earn_all || 0,
            ''
          ) }
        </div>
        <div className="">
          { renderBox(
            `${t("rewards.today_earning")} (${t('list.general.durations.minutes')})`,
            `${totalEarning.h}:${totalEarning.m}`,
            'mb-4'
          ) }

          { renderBox(
            `NFT E-Rate`,
            walletStore?.wallet?.user_earning?.nft_erate || 0,
            'mb-4'
          ) }

          { renderBox(
            `Subscription E-Rate`,
            walletStore?.wallet?.user_earning?.sub_erate || 0,
            'mb-4'
          ) }
        </div>
        <div>
          { renderBox(
            t("rewards.total_earn"),
            // eslint-disable-next-line no-unsafe-optional-chaining
            walletStore?.wallet?.total_earning?.earn_all || 0,
            'mb-4'
          ) }
          { renderBox(
            `NFT Max. Daily Earnings`,
            walletStore?.wallet?.user_earning?.primary_nft?.time_earning || 0,
            'mb-4'
          ) }

          { renderBox(
            `Subscription Max. Daily Earnings`,
            walletStore?.wallet?.user_earning?.primary_subscription?.max_daily_earning || 0,
            'mb-4'
          ) }
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
  );
};

export default Nfts;

