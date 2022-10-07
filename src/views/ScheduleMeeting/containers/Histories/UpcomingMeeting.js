import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { getScheduleMeetings } from "services";
import {MEETING_STATUS, routeUrls} from "configs";
import { BrandLogoLoading, GroupTitle, Pagination } from "components";
import { t } from "i18next";
import { MeetingItem } from "views/ScheduleMeeting/components";
import DeleteMeetingModal from "components/composite/DeleteMeetingModal";
import {useNavigate} from "react-router-dom";

export const UpcomingMeeting = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState({
    data: [],
    pagination: null,
  });

  const [filter, setFilter] = useState({
    limit: 6,
    page: 1,
    order: "asc",
    sort_by: "start_date_time",
    title: "",
    status: MEETING_STATUS.scheduled,
    startDate: moment().add(1, "days").format("YYYY-MM-DD"),
    endDate: moment().add(1, "days").add(1, "years").format("YYYY-MM-DD"),
  });
  const deleteMeetingModalRef = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getScheduleMeetings({ ...filter });
      if (res?.data) {
        setHistories({ data: res.data, pagination: res.meta });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onConfirmDeleteMeeting = (item) => {
    deleteMeetingModalRef.current?.show(item);
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <div className="flex flex-col gap-4 relative pt-8">
      <div className="flex justify-center sm:justify-between items-center flex-col sm:flex-row">
        <GroupTitle
          className="sm:pb-0 pb-4 flex justify-center"
          title={t("schedule_meeting.upcoming_meetings")}
        />
        {
          histories.data?.length > 0 && <Pagination
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
        }

      </div>
      {loading && <BrandLogoLoading />}
      {
        histories.data?.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {!loading &&
              histories.data?.map((item) => (
                <MeetingItem
                  onDelete={() => {
                    onConfirmDeleteMeeting(item);
                  }}
                  data={item}
                  key={item?.uuid}
                />
              ))}
          </div>
        ): (
          <div className="flex">
            <span>
              {"You have no upcoming meetings. "}
              <span
                className="text-[#0190fe] cursor-pointer"
                onClick={() => {
                  navigate(`/${routeUrls.scheduleMeeting.path}/new`)
                }}
              >
              Plan and schedule that next meeting.
            </span>
            </span>

          </div>
        )
      }
      <DeleteMeetingModal onRefresh={fetchData} ref={deleteMeetingModalRef} />
    </div>
  );
};
