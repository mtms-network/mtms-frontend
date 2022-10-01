import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {message} from "antd";
import {Button} from "../../../components";
import {useWalletStore} from "../../../stores/wallet.store";
import {claimTokenToDay, getRequirePreWallet} from "../../../services/wallet.service";
import {ALERT_TYPE, API_RESPONSE_STATUS} from "../../../configs";
import {handleHttpError} from "../../../helpers";
import {renderBox} from "../config";
import {renderExpired} from "../../Overview/config";

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
    <div>
      <div className="flex flex-row w-full items-center pb-3">
        <p className="font-bold sm:w-full text-lg text-dark-base">NFT: { walletStore?.wallet?.user_earning?.primary_nft?.name || "_" }</p>
      </div>
      <div className="w-full bg-white rounded-3xl py-6 px-8">
        <div className="flex flex-1 flex-col md:flex-row justify-between w-full">
          <div className="w-full md:w-1/4">

            { renderBox(
              `NFT E-Rate`,
              walletStore?.wallet?.user_earning?.primary_nft?.voucher?.power || 0
            ) }
            { renderBox(
              `Voucher`,
              walletStore?.wallet?.user_earning?.primary_nft?.voucher?.name || "-",
              'mb-4'
            ) }
          </div>
          <div className="w-full md:w-1/3">
            { renderBox(
              `NFT Max. Daily Earnings`,
              walletStore?.wallet?.user_earning?.primary_nft?.time_earning || 0,
              'mb-4'
            ) }
            { renderBox(
              `EXPIRED`,
              renderExpired(walletStore?.wallet?.user_earning?.nft_voucher?.end_at, "") || ""
            ) }
          </div>
          <div className="w-full md:w-1/4">

            { renderBox(
              `NFT Earned`,
              walletStore?.wallet?.nft?.earn_all || 0,
              'mb-4'
            ) }

            { renderBox(
              <div>Estimate Total</div>,
              "10 MTMS"
            ) }
          </div>

          <div className="w-full md:w-1/6 flex flex-col items-center">
            <div className="mb-4">
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
                Claim Voucher
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nfts;

