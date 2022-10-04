import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "../../../components";
import {useWalletStore} from "../../../stores/wallet.store";
import {convertTime, renderBox} from "../config";

const Plan = () => {
  const { t } = useTranslation();
  const [walletStore, updateWalletStore] = useWalletStore();
  const [loading, setLoading] = useState(false);

  const meetingTime = convertTime(walletStore?.wallet?.meeting?.minute_all || 0);
  const totalEarning = convertTime(walletStore?.wallet?.total_earning?.earn_today || 0);
  const earningRate = convertTime(walletStore?.wallet?.total_earning?.earn_all || 0);
  return (
    <div>
      <div className="w-full bg-white rounded-3xl py-6 px-8">
        <div className="flex flex-1 flex-col md:flex-row justify-between w-full">
          <div className="w-full md:w-1/4">
            {
              renderBox(
                `${t("rewards.meeting_time")} (hh/mm)`,
                `${meetingTime.h}:${meetingTime.m}`
              )
            }

            {
              renderBox(
                `${t("rewards.today_earning")} (${t('list.general.durations.minutes')})`,
                `${totalEarning.h}:${totalEarning.m}`
              )
            }
          </div>
          <div className="w-full md:w-1/3">
            {
              renderBox(
                `${t("rewards.earning_rate")} (MTMS/${t('list.general.durations.m')})`,
                `${(Number(walletStore?.wallet?.user_earning?.nft_erate) || 0) + (Number(walletStore?.wallet?.user_earning?.sub_erate) || 0)}`
              )
            }
            {
              renderBox(
                `${t("rewards.earning_rate")} (MTMS/${t('list.general.durations.m')})`,
                `${Number(walletStore?.wallet?.user_earning?.sub_time_earning) || 0}`,
                ""
              )
            }
          </div>
          <div className="w-full md:w-1/6">
            {
              renderBox(
                "Plan Earned",
                `${walletStore?.wallet?.total_earning?.earn_all || 0} MTMS`,
              )
            }
          </div>
          <div className="w-full md:w-1/4 flex justify-center">
            <Button
              className="btn-primary"
              isLoading={loading}
              onClick={() => {

              }}
              disabled={walletStore?.wallet?.total_token_all_days <= 0}
            >
              {t("rewards.claim_token")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
