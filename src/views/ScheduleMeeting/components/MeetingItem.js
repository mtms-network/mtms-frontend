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
        <div className="flex flex-col w-full flex-1 h-full justify-between">
          <p className="label-base text-lg font-semibold group-hover:text-primary line-clamp-2 overflow-hidden">
            {data?.title}
          </p>
          <p className="text-gray">{data?.type.name}</p>
          <div>
            <div className="flex flex-row space-x-2 items-center pt-2 group-hover:text-primary">
              <IoCalendarNumberOutline />
              <p className="label-base p-0 group-hover:text-primary">{data?.start_date_time}</p>
            </div>
            <div className="flex flex-row space-x-2 items-center pt-2 group-hover:text-primary">
              <IoTimerOutline />
              <p className="label-base p-0 group-hover:text-primary">
                {calculateDuration(data.start_date_time, data.estimated_end_time)} Minutes
              </p>
            </div>
            {/* <div className="flex flex-row w-full pt-4">
              <button className="btn btn-active btn-ghost btn-sm text-black font-normal">
                {data?.type.name}
              </button>
            </div> */}
          </div>
        </div>
      </GroupLayout>
    </Link>
  );
};

export default MeetingItem;
