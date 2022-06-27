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
import { BrandLogoLoading, GroupLayout, GroupTitle, Input, Pagination } from "components";
import { getMeetingHistories } from "services/meeting.service";
import { useMeetingStore } from "stores/meeting.store";
import { withNamespaces } from "react-i18next";

const MeetingHistory = ({ className, t }) => {
  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState({
    data: [],
    pagination: null,
  });

  const [filter, setFilter] = useState({
    limit: 10,
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
      setLoading(true);
      const res = await getMeetingHistories({ ...filter });
      if (res?.data) {
        setHistories({ data: res.data, pagination: res.meta });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [meetingStore.isForceLoadMeetingHistories, filter]);

  return (
    <div className={classnames([className])}>
      <GroupLayout className="flex flex-col w-full">
        {loading && <BrandLogoLoading />}
        {!loading && (
          <>
            <div className="flex flex-row justify-between w-full">
              <div className="flex-1">
                <GroupTitle icon={<IoRadio />} title={t("meeting.meeting_history")} />
              </div>
              <div className="flex-1 space-x-2 flex flex-row w-auto items-center justify-end">
                <div className="tooltip" data-tip="Filter">
                  <button className="btn btn-circle btn-sm group bg-transparent border-0 hover:bg-slate-200">
                    <IoFilterCircle className="text-black group-hover:text-primary" size={20} />
                  </button>
                </div>
                <div className="tooltip" data-tip="Sort">
                  <button className="btn btn-circle btn-sm group bg-transparent border-0 hover:bg-slate-200">
                    <IoSwapVertical className="text-black group-hover:text-primary" size={20} />
                  </button>
                </div>
                <div className="tooltip" data-tip="Option">
                  <button className="btn btn-circle btn-sm group bg-transparent border-0 hover:bg-slate-200">
                    <IoOptions className="text-black group-hover:text-primary" size={20} />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex pt-4 w-full flex-1">
              <div className="overflow-x-auto flex-1  border-1 rounded-lg">
                <table className="table w-full">
                  <thead className="border-b-1">
                    <tr className="text-cl-base">
                      <th className="bg-white">{t("meeting.host")}</th>
                      <th className="bg-white">{t("meeting.props.type")}</th>
                      <th className="bg-white">{t("meeting.props.identifier")}</th>
                      <th className="bg-white" />
                      <th className="bg-white">{t("meeting.props.status")}</th>
                      <th className="bg-white">{t("meeting.started_at")}</th>
                      <th className="bg-white">{t("meeting.ended_at")}</th>
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
                </div>
              </div>
            </div>
          </>
        )}
      </GroupLayout>
    </div>
  );
};

export default withNamespaces()(MeetingHistory);
