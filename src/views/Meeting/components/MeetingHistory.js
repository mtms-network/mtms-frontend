import React, { useEffect, useRef, useState } from "react";
import {
  BrandLogoLoading,
  GroupLayout,
  GroupTitle,
  Pagination,
  Collapser,
  Sorting,
  Icon,
  IconButton,
  Button,
} from "components";
import { ScheduleHistoriesFilter } from "views/ScheduleMeeting/components";
import { getMeetingHistories } from "services";
import { useMeetingStore } from "stores/meeting.store";
import { withTranslation } from "react-i18next";
import { LIVE_MEETING_URL, MEETING_STATUS, routeUrls } from "configs";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { message, Popover } from "antd";
import moment from "moment";
import DeleteMeetingModal from "components/composite/DeleteMeetingModal";
import { getTimezone } from "helpers/i18nLocal";
import { ConfigOverview } from "../config";

const timezone = getTimezone();

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
  const [meetingStore] = useMeetingStore();
  const navigate = useNavigate();
  const deleteMeetingModalRef = useRef(null);

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

  const handleJoin = (identifier) => {
    window.open(`${routeUrls.meetingRedirect.path}/${identifier}`);
  };

  const handleCopyLink = (data) => {
    if (data?.identifier) {
      const meetingUrl = `${LIVE_MEETING_URL}/${data.identifier}`;
      navigator.clipboard.writeText(meetingUrl);
      message.success(t("home.copied"));
    }
  };

  const onConfirmDeleteMeeting = (item) => {
    deleteMeetingModalRef.current?.show(item);
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
    <div className={classNames([className, "flex flex-col pt-8"])}>
      <GroupLayout
        className="flex flex-col w-full"
        titleComponent={
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex-1">
              <GroupTitle title={t("meeting.meeting_history")} className="!pb-0" />
            </div>
            <div className="space-x-2 py-2 flex flex-row w-auto items-center justify-end">
              <div className="tooltip" data-tip={t("general.filter")}>
                <IconButton
                  onClick={() => {
                    setIsShowFilter(!isShowFilter);
                  }}
                  src="/icons/icons/filter-outline.svg"
                  alt="Filter"
                />
              </div>
              <div className="tooltip" data-tip={t("general.sort")}>
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
              <div className="tooltip" data-tip={t("general.option")}>
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
                    <th className="bg-white truncate w-8" width="100">{t("meeting.host")}</th>
                    <th className="bg-white">{t("meeting.props.title")}</th>
                    <th className="bg-white">{t("meeting.props.type")}</th>
                    <th className="bg-white">{t("meeting.started_at")}</th>
                    <th className="bg-white">{t("meeting.ended_at")}</th>
                    <th className="bg-white text-center">{t("meeting.props.status")}</th>
                    <th className="bg-white">
                      <img className="cursor-pointer" src="/images/icon/more.svg" alt="" />
                    </th>
                  </tr>
                </thead>
                <tbody className="border-0">
                  {histories.data?.map((item) => (
                    <tr className="text-cl-base text-md border-0 table-row" key={item?.uuid}>
                      <td className="bg-white">
                        <Popover content={item?.user?.profile?.name} trigger="hover">
                          <div className="truncate hover:text-clip w-[50px]">{item?.user?.profile?.name}</div>
                        </Popover>
                      </td>
                      <td className="bg-white max-w-[150px] truncate">{item?.title}</td>
                      <td className="bg-white">{item?.type?.name?.toUpperCase()}</td>
                      <td className="bg-white">
                        {(item?.start_date_time &&
                          `${moment(item?.start_date_time).format("DD/MM/YYYY HH:mm")} ${
                            item?.user_timezone || ""
                          }`) ||
                          "-"}
                      </td>
                      <td className="bg-white">
                        <p>
                          {(item?.ended_at &&
                            `${moment(item?.ended_at).format("DD/MM/YYYY HH:mm")} ${
                              item?.user_timezone || ""
                            }`) ||
                            "-"}
                        </p>
                      </td>
                      <td className="bg-white text-center">
                        {item.status === MEETING_STATUS.ended ? (
                          <p>{mapHistories(item).statusName}</p>
                        ) : (
                          <Button
                            className={classNames(
                              "rounded-[20px] px-[12px] py-[6px]",
                              "!h-[32px] !min-h-[32px]",
                              "border-1 bg-transparent text-primary border-transparent",
                              "hover:border-primary hover:bg-transparent hover:border-1",
                            )}
                            onClick={() => {
                              handleJoin(item?.identifier);
                            }}
                          >
                            {t("home.join_meeting_now")}
                          </Button>
                        )}
                      </td>
                      <td className="bg-white">
                        <div className="dropdown dropdown-end">
                          <label tabIndex="0" className="m-1">
                            <img className="cursor-pointer" src="/images/icon/more.svg" alt="" />
                          </label>
                          <ul
                            tabIndex="0"
                            className="dropdown-content menu py-6 shadow-lg bg-white rounded-box w-52"
                          >
                            <li>
                              <a
                                onClick={() => {
                                  handleCopyLink(item);
                                }}
                                className={classNames(
                                  "bg-white border-0 text-black",
                                  "hover:text-white hover:bg-primary",
                                  "flex justify-start rounded-none",
                                )}
                              >
                                {t("general.share_url")}
                              </a>
                            </li>
                            {item?.status !== MEETING_STATUS.ended && (
                              <li>
                                <a
                                  onClick={() => {
                                    onConfirmDeleteMeeting(item);
                                  }}
                                  className={classNames(
                                    "bg-white border-0 text-black",
                                    "hover:text-white hover:bg-primary",
                                    "flex justify-start rounded-none",
                                  )}
                                >
                                  {t("meeting.config.delete_meeting")}
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="py-8 flex justify-center">
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
            <DeleteMeetingModal onRefresh={fetchData} ref={deleteMeetingModalRef} />
          </div>
        </div>
      </GroupLayout>
    </div>
  );
};

export default withTranslation()(MeetingHistory);
