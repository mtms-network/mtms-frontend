import React from "react";
import { GroupLayout, GroupTitle, MainLayout } from "components";
import { IoOptions, IoTv } from "react-icons/io5";

const ScheduleMeetingItem = () => {
  return (
    <MainLayout>
      <div className="flex flex-row justify-between w-full py-2">
        <div className="flex-1">
          <GroupTitle icon={<IoTv />} title="Schedule New Meeting" />
        </div>
        <div className="flex-1 space-x-2 flex flex-row items-center justify-end">
          <div className="px-2 space-x-4 flex flex-row w-auto items-center justify-end">
            <button>
              <IoOptions className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ScheduleMeetingItem;
