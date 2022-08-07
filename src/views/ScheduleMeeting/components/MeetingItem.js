import React from "react";
import classNames from "classnames";
import { GroupLayout } from "components";
import { calculateDuration } from "helpers";
import { Link } from "react-router-dom";
import { routeUrls } from "configs";

const MeetingItem = ({ data, className }) => {
  return (
    <GroupLayout
      className={classNames(
        "flex flex-col flex-1 justify-between",
        "min-h-[160px]",
        "hover:border-primary hover:bg-light-primary",
        className,
      )}
    >
      <div className="flex flex-col w-full flex-1 h-full">
        <div className="flex justify-between">
          <div className="label-base text-lg font-semibold group-hover:text-primary overflow-hidden">
            <Link to={`/${routeUrls.scheduleMeeting.path}/view/${data?.uuid}`} key={data?.uuid}>
              {data?.title}
            </Link>
          </div>
          <div className="relative">
            <div className="group">
              <img className="cursor-pointer" src="/images/icon/more.svg" alt="" />
              <div className="absolute right-0 w-[160px] bg-white rounded-[20px] py-[16px] shadow-[0_1px_12px_rgba(169,169,169,0.2)] hidden group-hover:block">
                <div className="p-[16px] hover:bg-primary hover:text-white">Duplicate Meeting</div>
                <div className="p-[16px] hover:bg-primary hover:text-white">Delete Meeting</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-gray">{data?.type.name}</div>
        <div className="flex justify-center flex-col">
          <div className="flex flex-row space-x-2 items-center pt-2 group-hover:text-primary">
            <img src="/images/icon/calender.svg" alt="" />
            <p className="label-base p-0 group-hover:text-primary">{data?.start_date_time}</p>
          </div>
          <div className="flex flex-row space-x-2 items-center pt-2 group-hover:text-primary">
            <img src="/images/icon/clock.svg" alt="" />
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
  );
};

export default MeetingItem;
