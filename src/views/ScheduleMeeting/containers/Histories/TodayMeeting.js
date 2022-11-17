import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { getScheduleMeetings } from "services";
import {MEETING_STATUS, routeUrls} from "configs";
import { BrandLogoLoading, GroupTitle, Pagination } from "components";
import { t } from "i18next";
import { MeetingItem } from "views/ScheduleMeeting/components";
import DeleteMeetingModal from "components/composite/DeleteMeetingModal";
import {useNavigate} from "react-router-dom";
import {setIsReloadPin} from "../../../../redux/reducers/ScheduleMeetingReducer";
import {useDispatch, useSelector} from "react-redux";
import ListMeetingItem from "../../components/ListMeetingItem";

export const TodayMeeting = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const uuid = 'TodayMeeting';
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
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
    });
    const scheduleMeetingSlice = useSelector(state => state.ScheduleMeetingReducer)

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

    useEffect(() => {
        fetchData().then(() => {
            dispatch(setIsReloadPin(false))
        });
    }, [scheduleMeetingSlice.isReloadPin])

    return (
        <div className="flex flex-col gap-4 relative pt-8">
            <div className="flex justify-center sm:justify-between items-center flex-col sm:flex-row">
                <GroupTitle
                    className="sm:pb-0 pb-4 flex justify-center"
                    title={t("schedule_meeting.today_meetings")}
                />
                {
                    histories?.data?.length > 0 && <Pagination
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
                histories?.data?.length ? (
                    <div id={uuid}>
                        <ListMeetingItem
                            uuid={uuid}
                            loading={loading}
                            onConfirmDeleteMeeting={onConfirmDeleteMeeting}
                            meetings={histories.data}
                        />
                    </div>
                ): (
                    <div className="flex">
            <span>
              {"You have no meetings today. "}
                <span
                    className="text-[#0190fe] cursor-pointer"
                    onClick={() => {
                        navigate(`/${routeUrls.scheduleMeeting.path}/new`)
                    }}
                >
              Schedule your meeting now
            </span>
            </span>

                    </div>
                )
            }
            <DeleteMeetingModal onRefresh={fetchData} ref={deleteMeetingModalRef} />
        </div>
    );
};
