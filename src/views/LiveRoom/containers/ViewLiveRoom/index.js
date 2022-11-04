import React, { useState, useEffect, useMemo, useRef } from "react";
import moment from "moment";
import {
    Button,
    GroupLayout,
    GroupTitle,
    MainLayout,
    AlertError,
    BrandLogoLoading,
} from "components";
import { IoTv } from "react-icons/io5";
import { useMeetingStore } from "stores/meeting.store";
import { ALERT_TYPE, routeUrls } from "configs";
import { useNavigate, useParams } from "react-router-dom";
import { getMeetingDetail } from "services/meeting.service";
import { withTranslation } from "react-i18next";
import DeleteMeetingModal from "components/composite/DeleteMeetingModal";
import LiveTime from "./components/LiveTime";
import Duration from "./components/Duration";
import MaximumParticipant from "./components/MaximumParticipant";
import BtnStart from "./components/Button/BtnStart";
import BtnCopy from "./components/Button/BtnCopy";
import BtnEdit from "./components/Button/BtnEdit";
import Attendees from "./components/Attendees";
import Discussion from "./components/Discussion";
import BtnBlockRoom from "./components/Button/BtnBlockRoom";
import BtnMyGift from "./components/Button/BtnMyGift";
import LiveTopic from "./components/LiveTopic";
import {getUser} from "../../../../helpers";
import BtnRoomFull from "./components/Button/BtnRoomFull";
import BtnGiftToHost from "./components/Button/BtnGiftToHost";
import ShareRoom from "./components/Button/ShareRoom";

const ViewLiveRoom = ({ t }) => {
    const params = useParams();
    const navigate = useNavigate();
    const [fetchLoading, setFetchLoading] = useState(false);
    const [meetingStore, updateMeetingStore] = useMeetingStore();
    const [types, setTypes] = useState([]);
    const [meeting, setMeeting] = useState();
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: ALERT_TYPE.ERROR,
        error: [],
    });

    const deleteMeetingModalRef = useRef(null);

    const prepareData = () => {
        if (meetingStore?.types) {
            const list = meetingStore.types.map((item) => ({
                ...item,
                key: item.uuid,
                value: item.name,
            }));
            setTypes(list);
        }
    };

    const onConfirmDeleteMeeting = (item) => {
        deleteMeetingModalRef.current?.show(item);
    };

    const fetchMeeting = async () => {
        try {
            const res = await getMeetingDetail(params.meetingId);
            if (res) {
                updateMeetingStore((draft) => {
                    draft.meeting = res;
                });
                setMeeting(res);
            }
        } catch (error) {
            console.log("ScheduleMeetingDetail", error);
        }
    };

    useEffect(() => {
        if (meeting) {
            prepareData();
        }
    }, [meeting]);

    const fetchData = async () => {
        try {
            setFetchLoading(true);
            await Promise.all([fetchMeeting()]);
            setFetchLoading(false);
        } catch (error) {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, [params.meetingId]);

    const checkOwner = () => {
        const user = getUser();
        return user?.uuid?.toUpperCase() === meeting?.user?.uuid?.toUpperCase();
    }

    console.log(checkOwner());
    return (
        <MainLayout>
            <div className="w-full">
                {fetchLoading && (
                    <div className="h-screen">
                        <BrandLogoLoading />
                    </div>
                )}
                <AlertError
                    {...{ ...alert }}
                    onClose={() => {
                        setAlert({ ...alert, show: false });
                    }}
                />
            </div>
            <GroupLayout className="flex flex-col justify-between">
                <img src={ meeting?.cover } alt="bg" className="mb-2"/>
                <h1 className="font-[700] text-[32px] truncate">{meetingStore?.meeting?.title}</h1>
                <div className="text-[16px] text-gray mb-[24px]">{meetingStore?.meeting?.type?.name}</div>

                <div className="flex flex-wrap gap-x-5 gap-y-3 mb-[24px]">
                    <LiveTime
                        t={t}
                        start_date_time={meetingStore?.meeting?.start_date_time}
                        user_timezone={meetingStore?.meeting?.user_timezone}
                    />
                    <Duration t={t} period={meetingStore?.meeting?.period} />
                    <MaximumParticipant t={t} max_participant_count={meetingStore?.meeting?.max_participant_count} />
                </div>
                <div className="flex mb-6 flex-wrap items-center">
                    {
                        checkOwner() ? (
                            <>
                                <BtnStart t={t} meeting={meeting} isStart={true}/>
                                <BtnBlockRoom uuid={params?.meetingId} is_blocked={meeting?.is_blocked} />
                                <BtnCopy t={t} meeting={meeting} />
                                <BtnEdit t={t} meeting={meeting} />
                                <Button
                                    className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
                                    onClick={() => {
                                        onConfirmDeleteMeeting(meetingStore?.meeting);
                                    }}
                                >
                                    {t("general.delete")}
                                </Button>
                                <BtnMyGift />
                            </>
                        ) : (
                            <>
                                <BtnStart t={t} meeting={meeting} isStart={false} />
                                <BtnRoomFull />
                                <BtnGiftToHost />
                                <ShareRoom />
                            </>
                        )
                    }

                </div>
                <hr className="mb-6" />
                <LiveTopic />
                <Attendees t={t} meeting={meeting} />

                <div>
                    <GroupTitle icon={<IoTv />} title={t("general.agenda")} />
                </div>
                <p className="mb-6 truncate flex-wrap">{meetingStore?.meeting?.agenda}</p>
                <div>
                    <GroupTitle icon={<IoTv />} title="Room Description" />
                </div>
                <p dangerouslySetInnerHTML={{ __html: meetingStore?.meeting?.description }} />
                <DeleteMeetingModal
                    onRefresh={() => {
                        navigate(`/${routeUrls.scheduleMeeting.path}`);
                    }}
                    ref={deleteMeetingModalRef}
                />
            </GroupLayout>

            <Discussion uuid={params.meetingId} />
        </MainLayout>
    );
};

export default withTranslation()(ViewLiveRoom);
