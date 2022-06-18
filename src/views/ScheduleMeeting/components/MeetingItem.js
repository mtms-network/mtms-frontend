import React from "react";
import classNames from "classnames";
import { GroupLayout } from "components";
import { IoCalendarNumberOutline, IoTimerOutline } from "react-icons/io5";
import { calculateDuration } from "helpers";
import { Link } from "react-router-dom";
import { routeUrls } from "configs";

const MeetingItem = ({ data, className }) => {
  return (
    <Link to={`/${routeUrls.scheduleMeeting.path}/${data?.uuid}`} key={data?.uuid}>
      <GroupLayout
        className={classNames(
          "group flex flex-col flex-1 justify-between",
          "min-h-[180px]",
          "hover:border-primary hover:bg-light-primary",
          className,
        )}
      >
        <div className="flex flex-col w-full">
          <p className="label-base text-xl">{data?.title}</p>
          <div className="flex flex-row space-x-2 items-center pt-2">
            <IoCalendarNumberOutline />
            <p className="label-base p-0">{data?.start_date_time}</p>
          </div>
          <div className="flex flex-row space-x-2 items-center pt-2">
            <IoTimerOutline />
            <p className="label-base p-0">
              {calculateDuration("2022-04-27 22:59:51", "2022-04-27 22:00:51")}
            </p>
          </div>
          <div className="flex flex-row pt-6 w-full">
            <button className="btn btn-active btn-ghost btn-sm text-black font-normal">{data?.type.name}</button>
          </div>
        </div>
      </GroupLayout>
    </Link>
  );
};

export default MeetingItem;
