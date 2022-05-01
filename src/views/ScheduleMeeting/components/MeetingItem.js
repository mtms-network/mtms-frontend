import React from "react";
import classNames from "classnames";
import { GroupLayout } from "components";
import { IoCalendarNumberOutline, IoTimerOutline } from "react-icons/io5";

const MeetingItem = ({ className }) => {
  return (
    <GroupLayout className={classNames("flex justify-between", className)}>
      <div className="flex flex-col w-full">
        <p className="label-base text-2xl">Meeting designer</p>
        <div className="flex flex-row space-x-2 items-center pt-2">
          <IoCalendarNumberOutline />
          <p className="label-base p-0">Feb 28, 2022 at 8:24AM</p>
        </div>
        <div className="flex flex-row space-x-2 items-center pt-2">
          <IoTimerOutline />
          <p className="label-base p-0">60 Minutes</p>
        </div>
        <div className="flex flex-row space-x-2 items-center justify-center pt-6 w-full">
          <button className="btn btn-primary btn-sm">Default</button>
          <button className="btn btn-primary btn-sm">Audio Conference</button>
        </div>
      </div>
    </GroupLayout>
  );
};

export default MeetingItem;
