import React, { useEffect, useState } from "react";
import { Button, GroupTitle, MainLayout, Pagination } from "components";
import { IoFilterCircle, IoOptions, IoSwapVertical, IoTv } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { getScheduleMeetings } from "services/meeting.service";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "configs";
import { MeetingItem } from "../../components";

const ScheduleMeetingHistories = () => {
  const navigate = useNavigate();
  const [histories, setHistories] = useState({
    data: [],
    pagination: null,
  });
  const [filter, setFilter] = useState({
    limit: 2,
    page: 1,
  });
  const fetchData = async () => {
    try {
      const res = await getScheduleMeetings({ ...filter });
      if (res?.data) {
        setHistories({ data: res.data, pagination: res.meta });
      }
    } catch (error) {
      console.info(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <MainLayout
      bottom={
        <Pagination
          page={histories.pagination?.current_page}
          totalPage={histories.pagination?.last_page}
          total={histories.pagination?.total}
          limit={histories.pagination?.per_page}
          from={histories.pagination?.from}
          to={histories.pagination?.to}
          onNext={() => {
            if (filter.page < histories.pagination?.last_page) {
              const nextPage = filter.page + 1;
              setFilter({ ...filter, page: nextPage });
            }
          }}
          onBack={() => {
            if (filter.page <= histories.pagination?.last_page && filter.page > 1) {
              const nextPage = filter.page - 1;
              setFilter({ ...filter, page: nextPage });
            }
          }}
        />
      }
    >
      <div className="flex flex-row justify-between w-full py-2">
        <div className="flex-1">
          <GroupTitle icon={<IoTv />} title="Scheduled Meetings" />
        </div>
        <div className="flex-1 space-x-2 flex flex-row items-center justify-end">
          <Button
            className="btn btn-primary border-0 gap-2 btn-sm"
            onClick={() => {
              navigate(`/${routeUrls.newScheduleMeeting.path}`);
            }}
          >
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
          {histories.data?.map((item) => (
            <MeetingItem data={item} key={item?.uuid} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ScheduleMeetingHistories;
