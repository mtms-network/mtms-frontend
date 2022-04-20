import React from "react";
import { IoCalendarClear } from "react-icons/io5";
import classnames from "classnames";
import { GroupLayout, GroupTitle, Input } from "components";

const StartInstantMeeting = ({ className }) => {
  return (
    <div className={classnames([className])}>
      <GroupLayout className="flex flex-col justify-between w-full">
        <GroupTitle icon={<IoCalendarClear />} title="Start Instant Meeting" />
        <div className="flex flex-row space-x-4 py-4">
          <div className="basis-1/2">
            <p className="label-base">Meeting code</p>
            <Input
              placeholder="Enter meeting code"
              className="bg-gray-base-100 border-0"
              rightButton={
                <button className="btn btn-primary btn-outlined-base btn-xs">copy</button>
              }
            />
          </div>
          <div className="basis-1/2">
            <p className="label-base">Maximum participant</p>
            <Input placeholder="1000" className="bg-gray-base-100 border-0" />
          </div>
        </div>
        <div className="flex flex-row space-x-4 py-4">
          <div className="flex-1">
            <p className="label-base">Select Meeting Type</p>
            <div className="flex-wrap flex gap-2 justify-between">
              <button className="btn btn-primary btn-outlined-base">Audio Conference</button>
              <button className="btn btn-fill-base">Live class</button>
              <button className="btn btn-fill-base">Podcast</button>
              <button className="btn btn-fill-base">Podcast</button>
              <button className="btn btn-fill-base">Video Conference</button>
              <button className="btn btn-fill-base">Webinar</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="basis-full sm:basis-1/2 flex flex-col justify-start items-start">
            <div className="form-control">
              <label className="label cursor-pointer flex justify-center items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                <span className="label-base pb-0">Keep meeting live</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer flex justify-center items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                <span className="label-base pb-0">Only accessible to active member</span>
              </label>
            </div>
          </div>
          <div className="basis-full sm:basis-1/2 flex items-end">
            <button className="btn btn-primary btn-block">Start a instant meeting</button>
          </div>
        </div>
      </GroupLayout>
    </div>
  );
};

export default StartInstantMeeting;
