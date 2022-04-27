import React from "react";
import { IoCalendarSharp } from "react-icons/io5";
import classnames from "classnames";
import { GroupLayout, GroupTitle, Input } from "components";

const JoinAMeeting = ({ className }) => {
  return (
    <div className={classnames([className])}>
      <GroupLayout className="flex flex-col justify-between">
        <GroupTitle icon={<IoCalendarSharp />} title="Join a meeting" />
        <div className="flex flex-col py-4">
          <p className="label-base">
            Join the simplified video conferencing meeting across any device by entering the meeting
            code.
          </p>

          <p className="label-base">Meeting code</p>
        </div>
        <div className="flex flex-col">
          <Input placeholder="Enter meeting code" className="bg-gray-base-100 border-0" />
          <div className="w-full pt-4">
            <button className="btn btn-primary btn-block text-white">Join meeting now</button>
          </div>
        </div>
      </GroupLayout>
    </div>
  );
};

export default JoinAMeeting;
