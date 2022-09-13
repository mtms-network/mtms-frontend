import React from "react";
import { GroupTitle, MainLayout } from "components";
import { IoTv } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { routeUrls } from "configs";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { TodayMeeting } from "./TodayMeeting";
import { UpcomingMeeting } from "./UpcomingMeeting";

const ScheduleMeetingHistories = ({ t }) => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="py-6 flex justify-center">
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
