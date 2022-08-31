import React from "react";
import { MainLayout } from "components";
import { JoinAMeeting, MeetingHistory, OverviewNavBar, StartInstantMeeting } from "./components";

const Meeting = () => {
  return (
    <MainLayout>
      <div className="flex flex-col sm:flex-row gap-4">
        <StartInstantMeeting className="flex basis-full w-full sm:basis-2/3 items-stretch" />
        <JoinAMeeting className="flex basis-full w-full sm:basis-1/3 items-stretch" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <MeetingHistory className="flex basis-full w-full" />
      </div>
    </MainLayout>
  );
};

export default Meeting;
