/* eslint-disable no-empty */
import React, { useEffect, useState } from "react";
import {
  BrandLogoLoading,
  Button,
  GroupTitle,
  MainLayout,
  Pagination,
} from "components";
import { IoTv } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { getScheduleMeetings, getRequirePreMeeting } from "services";
import { useMeetingStore } from "stores/meeting.store";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "configs";
import { withTranslation } from "react-i18next";
import { MeetingItem } from "../../components";

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
    <MainLayout>
      <div className="py-[75px]">
        <div className="text-center">
          <div
            className="inline-block bg-primary border-0 py-[20px] px-[20px] rounded-[20px] cursor-pointer"
            onClick={() => {
              navigate(`/${routeUrls.scheduleMeeting.path}/new`);
            }}
          >
            <FaPlus className="font-bold text-white text-[40px]" />
          </div>
          <div>
            <GroupTitle icon={<IoTv />} title={t("schedule_meeting.scheduled_meetings")} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 relative">
        <div className="flex justify-between items-center">
          <GroupTitle className="pb-[0px]" title={t("schedule_meeting.meetings_today")} />
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
              if(page !== histories.pagination?.current_page) {
                setFilter({ ...filter, page });
              }
            }}
          />
        </div>
        {loading && <BrandLogoLoading />}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {!loading && histories.data?.map((item) => <MeetingItem data={item} key={item?.uuid} />)}
        </div>
      </div>
    </MainLayout>
  );
};

export default withTranslation()(ScheduleMeetingHistories);
