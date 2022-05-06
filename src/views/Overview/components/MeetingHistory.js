import React, { useEffect, useState } from "react";
import {
  IoEllipsisHorizontal,
  IoFilterCircle,
  IoOptions,
  IoPeople,
  IoRadio,
  IoShareOutline,
  IoSwapVertical,
} from "react-icons/io5";
import classnames from "classnames";
import { GroupLayout, GroupTitle, Input, Pagination } from "components";
import { getMeetingHistories } from "services/meeting.service";
import { useMeetingStore } from "stores/meeting.store";

const MeetingHistory = ({ className }) => {
  const [histories, setHistories] = useState({
    data: [],
    pagination: null,
  });

  const [filter, setFilter] = useState({
    limit: 5,
    page: 1,
  });
  const [meetingStore] = useMeetingStore();

  const mapHistories = (item) => {
    const newItem = { ...item };
    newItem.statusName = "";
    meetingStore?.statuses?.forEach((status) => {
      if (status.uuid === item.status) {
        newItem.statusName = status.name;
      }
    });
    return newItem;
  };
  const fetchData = async () => {
    try {
      const res = await getMeetingHistories({ ...filter });
      if (res?.data) {
        setHistories({ data: res.data, pagination: res.meta });
      }
    } catch (error) {
      console.info(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [meetingStore.isForceLoadMeetingHistories, filter]);

  return (
    <div className={classnames([className])}>
      <GroupLayout className="flex flex-col w-full">
        <div className="flex flex-row justify-between w-full">
          <div className="flex-1">
            <GroupTitle icon={<IoRadio />} title="Meeting History" />
          </div>
          <div className="flex-1 space-x-2 flex flex-row w-auto items-center justify-end">
            <button>
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
        <div className="flex pt-4 w-full flex-1">
          <div className="overflow-x-auto flex-1  border-1 rounded-lg">
            <table className="table w-full">
              <thead className="border-b-1">
                <tr className="text-cl-base">
                  <th className="bg-white">Host</th>
                  <th className="bg-white">Type</th>
                  <th className="bg-white">Code</th>
                  <th className="bg-white" />
                  <th className="bg-white">Status</th>
                  <th className="bg-white">Started at</th>
                  <th className="bg-white">Ended at</th>
                  <th className="bg-white" />
                </tr>
              </thead>
              <tbody className="border-0">
                {histories.data?.map((item) => (
                  <tr className="text-cl-base text-xs border-0" key={item?.uuid}>
                    <td>{item?.user?.profile?.name}</td>
                    <td>{item?.type?.name.toUpperCase()}</td>
                    <td>{item?.identifier}</td>
                    <td className="space-x-2">
                      <button className="btn btn-square btn-xs bg-primary border-0">
                        <IoShareOutline />
                      </button>
                      <button>
                        <IoPeople />
                      </button>
                    </td>
                    <td>
                      <p className={item.status === "live" ? "text-primary" : ""}>
                        {mapHistories(item).statusName}
                      </p>
                    </td>
                    <td>{item?.start_date_time}</td>
                    <td>{item?.ended_at || "-"}</td>
                    <td>
                      <button className="btn btn-square btn-xs border-0">
                        <IoEllipsisHorizontal />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4">
              <Pagination
                page={histories.pagination?.current_page}
                totalPage={histories.pagination?.last_page}
                total={histories.pagination?.total}
                limit={histories.pagination?.per_page}
                from={histories.pagination?.from}
                to={histories.pagination?.to}
                onNext={() => {
                  if (histories.pagination?.current_page < histories.pagination?.last_page) {
                    const nextPage = filter.page + 1;
                    setFilter({ ...filter, page: nextPage });
                  }
                }}
                onBack={() => {
                  if (
                    histories.pagination?.current_page >= histories.pagination?.last_page &&
                    histories.pagination?.current_page > 1
                  ) {
                    const nextPage = filter.page - 1;
                    setFilter({ ...filter, page: nextPage });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </GroupLayout>
    </div>
  );
};

export default MeetingHistory;
