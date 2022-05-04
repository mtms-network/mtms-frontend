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
import { GroupLayout, GroupTitle, Input } from "components";
import { getMeetingHistories } from "services/meeting.service";

const MeetingHistory = ({ className }) => {
  const [histories, setHistories] = useState([]);
  const fetchData = async () => {
    try {
      const res = await getMeetingHistories();
      if (res?.data) {
        setHistories(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
                  <th className="bg-white">Started at</th>
                  <th className="bg-white">Ended at</th>
                  <th className="bg-white" />
                </tr>
              </thead>
              <tbody className="border-0">
                {histories.map((item) => (
                  <tr className="text-cl-base text-xs border-0" key={item?.uuid}>
                    <td>{item?.user?.profile?.name}</td>
                    <td>{item?.name}</td>
                    <td>{item?.identifier}</td>
                    <td className="space-x-2">
                      <button className="btn btn-square btn-xs bg-primary border-0">
                        <IoShareOutline />
                      </button>
                      <button>
                        <IoPeople />
                      </button>
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
          </div>
        </div>
      </GroupLayout>
    </div>
  );
};

export default MeetingHistory;
