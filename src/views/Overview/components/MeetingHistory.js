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
  Icon,
  IconButton,
} from "components";
import { ScheduleHistoriesFilter } from "views/ScheduleMeeting/components";
import { getMeetingHistories, getRequirePreMeeting } from "services";
import { useMeetingStore } from "stores/meeting.store";
import { withTranslation } from "react-i18next";
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
    sort_by: "start_date_time",
    order: "desc",
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
    } catch (error) {
      console.log(error);
    }
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
    <div className={classnames([className, "flex flex-col pt-8"])}>
      <GroupLayout
        className="flex flex-col w-full"
        titleComponent={
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex-1">
              <GroupTitle title={t("meeting.meeting_history")} className="!pb-0" />
            </div>
            <div className="space-x-2 py-2 flex flex-row w-auto items-center justify-end">
              <div className="tooltip" data-tip="Filter">
                <IconButton
                  onClick={() => {
                    setIsShowFilter(!isShowFilter);
                  }}
                  src="/icons/icons/filter-outline.svg"
                  alt="Filter"
                />
              </div>
              <div className="tooltip" data-tip="Sort">
                <button>
                  <IconButton
                    onClick={() => {
                      setSort(!sort);
                    }}
                    src="/icons/icons/sort-outline.svg"
                    alt="Sort"
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
              </div>
              <div className="tooltip" data-tip="Option">
                <IconButton onClick={() => {}} src="/icons/icons/more-outline.svg" alt="Option" />
              </div>
            </div>
          </div>
        }
      >
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
        <div className="flex w-full flex-1">
          <div className="overflow-x-auto flex-1 rounded-lg">
            {loading && <BrandLogoLoading />}
            {!loading && (
              <table className="table w-full">
                <thead className="border-b-1">
                  <tr className="text-cl-base">
                    <th className="bg-white">{t("meeting.host")}</th>
                    <th className="bg-white">{t("meeting.props.type")}</th>
                    <th className="bg-white">{t("meeting.props.identifier")}</th>
                    <th className="bg-white" />
                    <th className="bg-white">{t("meeting.started_at")}</th>
                    <th className="bg-white">{t("meeting.ended_at")}</th>
                    <th className="bg-white">{t("meeting.props.status")}</th>
                  </tr>
                </thead>
                <tbody className="border-0">
                  {histories.data?.map((item) => (
                    <tr className="text-cl-base text-md border-0 table-row" key={item?.uuid}>
                      <td className="bg-white">{item?.user?.profile?.name}</td>
                      <td className="bg-white">{item?.type?.name?.toUpperCase()}</td>
                      <td className="bg-white">{item?.identifier}</td>
                      <td className="space-x-2 bg-white">
                        <button>
                          <Icon src="/icons/icons/paperclip-fill.svg" alt="share" />
                        </button>
                      </td>
                      <td className="bg-white">{item?.start_date_time}</td>
                      <td className="flex justify-center align-middle bg-white">
                        {item?.ended_at || "-"}
                      </td>
                      <td className="bg-white">
                        <p className={item.status === "live" ? "text-primary" : ""}>
                          {mapHistories(item).statusName}
                        </p>
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
                onPage={(page) => {
                  if (page !== histories.pagination?.current_page) {
                    setFilter({ ...filter, page });
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

export default withTranslation()(MeetingHistory);
