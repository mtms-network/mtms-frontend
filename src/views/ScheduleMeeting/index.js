import React, { useEffect, useState } from "react";
import { Button, GroupTitle, MainLayout, Pagination } from "components";
import { IoFilterCircle, IoOptions, IoSwapVertical, IoTv } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { getMeetingHistories } from "services/meeting.service";
import { MeetingItem } from "./components";

const ScheduleMeeting = () => {
  const [histories, setHistories] = useState([]);
  const fetchData = async () => {
    try {
      const res = await getMeetingHistories();
      if (res?.data) {
        setHistories(res.data);
      }
    } catch (error) {
      console.info(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout bottom={<Pagination />}>
      <div className="flex flex-row justify-between w-full py-2">
        <div className="flex-1">
          <GroupTitle icon={<IoTv />} title="Scheduled Meetings" />
        </div>
        <div className="flex-1 space-x-2 flex flex-row items-center justify-end">
          <Button className="btn btn-primary border-0 gap-2 btn-sm">
            Create new
            <span className="bg-white p-1 rounded-lg">
              <FaPlus className="font-bold text-primary" />
            </span>
          </Button>
          <div className="px-2 space-x-4 flex flex-row w-auto items-center justify-end">
            <button className="">
              <IoFilterCircle className="text-black" />
            </button>
            <button>
              <IoSwapVertical className="text-black" />
            </button>
            <button>
              <IoOptions className="text-black" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col gap-4 relative">
        <div>
          <GroupTitle title="Meetings today" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {histories.map((item) => (
            <MeetingItem data={item} key={item?.uuid} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ScheduleMeeting;
