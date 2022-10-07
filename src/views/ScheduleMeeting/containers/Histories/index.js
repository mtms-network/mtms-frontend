import React from "react";
import {GoogleButton, GroupTitle, MainLayout} from "components";
import { IoTv } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import {API_RESPONSE_STATUS, routeUrls} from "configs";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { TodayMeeting } from "./TodayMeeting";
import { UpcomingMeeting } from "./UpcomingMeeting";
import {useAppStore} from "../../../../stores/app.store";
import {connectGoogleCalendar} from "../../../../services";
import {getAccessToken} from "../../../../helpers";

const ScheduleMeetingHistories = ({ t }) => {
  const navigate = useNavigate();
  const [appStore, updateAppStore] = useAppStore();

  const handleCustomResponse = async (result) => {
    const redirectUri = `${window.location.origin}`;
    const token = getAccessToken();
    const res = await connectGoogleCalendar(result?.code, redirectUri, token);
    if(res?.status === API_RESPONSE_STATUS.success){
      updateAppStore((store) => {
        store.isLoginGoogleCalendar = true;
      })
    }
  };

  return (
    <MainLayout>
      <div className="py-6 flex justify-center gap-4">
        <div className="text-center">
          <div
            className="inline-block border-0 rounded-[20px] cursor-pointer"
          >
            <GoogleButton customHandleResponse={handleCustomResponse} showTitle name="" className="w-[80px] h-[80px]" />
          </div>
          <div className="mt-[5px]">
            <GroupTitle icon={<IoTv />} title="Google" />
          </div>
        </div>
        <div className="text-center">
          <div
            className="inline-block bg-primary border-0 py-[20px] px-[20px] rounded-[20px] cursor-pointer"
            onClick={() => {
              navigate(`/${routeUrls.scheduleMeeting.path}/new`);
            }}
          >
            <FaPlus className="font-bold text-white text-[40px]" />
          </div>
          <div>
            <GroupTitle icon={<IoTv />} title={t("schedule_meeting.scheduled_meetings")} />
          </div>
        </div>
      </div>
      <TodayMeeting />
      <UpcomingMeeting />
    </MainLayout>
  );
};

export default withTranslation()(ScheduleMeetingHistories);
