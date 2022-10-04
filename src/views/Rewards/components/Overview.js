import React from "react";
import {withTranslation} from "react-i18next";
import {useWalletStore} from "../../../stores/wallet.store";
import {convertTime, renderBox} from "../config";

const Overviews = ({plan, reload}) => {
  const [walletStore, updateWalletStore] = useWalletStore();

  const meetingTimeToday = convertTime(walletStore?.wallet?.meeting_times?.minute_today);
  const meetingTimeWeek = convertTime(walletStore?.wallet?.meeting_times?.minute_week);
  const meetingTimeMonth = convertTime(walletStore?.wallet?.meeting_times?.minute_month);
  const meetingTimeAll = convertTime(walletStore?.wallet?.meeting_times?.minute_all);

  return (
    <div>
      <div className="w-full bg-white rounded-3xl py-6 px-8">
        <div className="">
          <div className="grid grid-cols-1 gap-8 w-full md:grid-cols-2 lg:grid-cols-4">
            { renderBox(
              `All your time (hh/mm)`,
              `${meetingTimeAll?.h || '00'}:${meetingTimeAll?.m || '00'}`
            ) }
            { renderBox(
              `Month's Time (hh/m)`,
              `${meetingTimeMonth?.h || '00'}:${meetingTimeMonth?.m || '00'}`
            ) }
            { renderBox(
              `This week's (hh/m)`,
              `${meetingTimeWeek?.h || '00'}:${meetingTimeWeek?.m || '00'}`
            ) }
            { renderBox(
              `Today's Time (hh/m)`,
              `${meetingTimeToday?.h || '00'}:${meetingTimeToday?.m || '00'}`
            ) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Overviews);
