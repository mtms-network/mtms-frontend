import React, { useEffect, useState } from "react";
import {
  BrandLogoLoading,
  Button,
  Collapser,
  GroupTitle,
  MainLayout,
  Pagination,
} from "components";
import { IoFilterCircle, IoOptions, IoSwapVertical, IoTv } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { getScheduleMeetings, getRequirePreMeeting } from "services";
import { useMeetingStore } from "stores/meeting.store";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "configs";
import { withTranslation } from "react-i18next";
import Sort from "../../../../components/base/Sort";
import { ConfigScheduleMeeting } from "../../config";
import { MeetingItem, ScheduleHistoriesFilter } from "../../components";

const ScheduleMeetingHistories = ({ t }) => {
  const navigate = useNavigate();
  const [, updateMeetingStore] = useMeetingStore();
  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState({
    data: [],
    pagination: null,
  });
  const [filter, setFilter] = useState({
    limit: 12,
    page: 1,
    order: "desc",
    sort_by: "start_date_time",
    title: "",
  });
  const [sort, setSort] = useState(false);

  const onChangeFilter = (type, value) => {
    const cloneFilter = { ...filter };
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

  const [isShowFilter, setIsShowFilter] = useState(false);
  const fetchCommonData = async () => {
    try {
      const res = await getRequirePreMeeting();
      if (res) {
        updateMeetingStore((draft) => {
          draft.categories = res?.categories;
          draft.types = res?.types;
          draft.statuses = res?.statuses;
          draft.isForceLoadMeetingHistories = true;
        });
      }
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      await fetchCommonData();
      const res = await getScheduleMeetings({ ...filter });
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
      <div className="flex flex-col sm:flex-row justify-between w-full py-2">
        <div className="flex-1">
          <GroupTitle icon={<IoTv />} title={t("schedule_meeting.scheduled_meetings")} />
        </div>
        <div className="flex-1 space-x-2 flex flex-row items-center pt-2 justify-between sm:justify-end">
          <Button
            className="btn btn-primary border-0 gap-2 btn-sm"
            onClick={() => {
              navigate(`/${routeUrls.scheduleMeeting.path}/new`);
            }}
          >
            {t("general.create_new")}
            <span className="bg-white p-1 rounded-lg">
              <FaPlus className="font-bold text-primary" />
            </span>
          </Button>
          <div className="px-2 space-x-4 flex flex-row w-auto items-center justify-center sm:justify-end">
            <div className="tooltip" data-tip="Filter">
              <button
                onClick={() => {
                  setIsShowFilter(!isShowFilter);
                }}
              >
                <IoFilterCircle className="text-black group-hover:text-primary" size={20} />
              </button>
            </div>
            <div className="tooltip" data-tip="Sort">
              <button>
                <IoSwapVertical
                  className="text-black group-hover:text-primary"
                  onClick={() => {
                    setSort(!sort);
                  }}
                />
                {sort ? (
                  <Sort
                    onSort={onChangeFilter}
                    contentField={ConfigScheduleMeeting.arrSort}
                    order={filter.order}
                    sortBy={filter.sort_by}
                  />
                ) : null}
              </button>
            </div>
            <div className="tooltip" data-tip="Option">
              <button>
                <IoOptions className="text-black group-hover:text-primary" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 relative">
        <div>
          <GroupTitle title={t("schedule_meeting.meetings_today")} />
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
                loading={loading}
              />
            }
          />
        </div>
        {loading && <BrandLogoLoading />}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!loading && histories.data?.map((item) => <MeetingItem data={item} key={item?.uuid} />)}
        </div>
      </div>
    </MainLayout>
  );
};

export default withTranslation()(ScheduleMeetingHistories);
