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
import {
  BrandLogoLoading,
  GroupLayout,
  GroupTitle,
  Pagination,
  Collapser,
  Sorting,
} from "components";
import { ScheduleHistoriesFilter } from "views/ScheduleMeeting/components";
import { getMeetingHistories, getRequirePreMeeting } from "services/meeting.service";
import { useMeetingStore } from "stores/meeting.store";
import { withNamespaces } from "react-i18next";
import { ConfigOverview } from "../config";

const MeetingHistory = ({ className, t }) => {
  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState({
    data: [],
    pagination: null,
  });
  const [isShowFilter, setIsShowFilter] = useState(false);

  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    sort_by: "id",
    order: "ASC",
  });
  const [sort, setSort] = useState(false);
  const [meetingStore, updateMeetingStore] = useMeetingStore();

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

  const fetchCommonData = async () => {
    try {
      if (!meetingStore.categories || !Array.isArray(meetingStore.categories)) {
        const res = await getRequirePreMeeting();
        if (res) {
          updateMeetingStore((draft) => {
            draft.categories = res?.categories;
            draft.types = res?.types;
            draft.statuses = res?.statuses;
            draft.isForceLoadMeetingHistories = true;
          });
        }
      }
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      await fetchCommonData();
      const res = await getMeetingHistories({ ...filter });
      if (res?.data) {
        setHistories({ data: res.data, pagination: res.meta });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onChangeFilter = (type, value) => {
    const cloneFilter = { ...filter, page: 1 };
    switch (type) {
      case "sort_by":
        cloneFilter.sort_by = value;
        break;
      case "order":
        cloneFilter.order = value;
        break;
      default:
        break;
    }

    setFilter(cloneFilter);
    setSort(false);
  };

  useEffect(() => {
    fetchData().then();
  }, [meetingStore.isForceLoadMeetingHistories, filter]);

  return (
    <div className={classnames([className])}>
      <GroupLayout className="flex flex-col w-full">
        <div className="flex flex-row justify-between w-full mb-3">
          <div className="flex-1">
            <GroupTitle icon={<IoRadio />} title={t("meeting.meeting_history")} />
          </div>
          <div className="flex-1 space-x-2 flex flex-row w-auto items-center justify-end">
            <button>
              <IoFilterCircle
                className="text-black"
                onClick={() => {
                  setIsShowFilter(!isShowFilter);
                }}
              />
            </button>
            <button>
              <IoSwapVertical
                className="text-black"
                onClick={() => {
                  setSort(!sort);
                }}
              />
              {sort ? (
                <Sorting
                  onSort={onChangeFilter}
                  order={filter.order}
                  sortBy={filter.sort_by}
                  contentField={ConfigOverview.arrFieldSort}
                />
              ) : null}
            </button>
            <button>
              <IoOptions className="text-black" />
            </button>
          </div>
        </div>
        <div>
          <Collapser
            show={isShowFilter}
            title={t("schedule_meeting.schedule_histories_filters")}
            content={
              <ScheduleHistoriesFilter
                onChange={(f) => {
                  setFilter({ ...filter, ...f });
                }}
              />
            }
          />
        </div>
        <div className="flex pt-4 w-full flex-1">
          <div className="overflow-x-auto flex-1  border-1 rounded-lg">
            {loading && <BrandLogoLoading />}
            {!loading && (
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
            )}
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
      </GroupLayout>
    </div>
  );
};

export default withNamespaces()(MeetingHistory);
