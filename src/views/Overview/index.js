import React from "react";
import { MainLayout } from "components";
import { JoinAMeeting, MeetingHistory, OverviewNavBar, StartInstantMeeting } from "./components";

const Overview = () => {
  return (
    <MainLayout>
      <OverviewNavBar />
      <div className="flex flex-col sm:flex-row gap-4">
        <StartInstantMeeting className="flex basis-full sm:basis-2/3  items-stretch" />
        <JoinAMeeting className="flex basis-full sm:basis-1/3 items-stretch" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <MeetingHistory className="flex basis-full" />
      </div>
    </MainLayout>
  );
};

export default Overview;
