/* eslint-disable react/no-danger */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useMemo, useRef } from "react";
import moment from "moment";
import {
  Button,
  GroupLayout,
  GroupTitle,
  MainLayout,
  AlertError,
  BrandLogoLoading,
  IconBase,
  Icon,
} from "components";
import { IoCheckmarkCircleOutline, IoTv } from "react-icons/io5";
import { useMeetingStore } from "stores/meeting.store";
import { createPrivateInstance } from "services/base";
import { BASE_API, ALERT_TYPE, routeUrls, LIVE_MEETING_URL, MEETING_STATUS } from "configs";
import { useNavigate, useParams } from "react-router-dom";
import { getMeetingDetail } from "services/meeting.service";
import { withTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import DeleteMeetingModal from "components/composite/DeleteMeetingModal";

const timeFormat = "MMM DD, yyyy";

const { confirm } = Modal;

const ScheduleMeetingView = ({ t }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  const [isCopied, setIsCopied] = useState(false);
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

  const handleCopyLink = () => {
    const meetingUrl = `${LIVE_MEETING_URL}/${meetingStore?.meeting?.identifier}`;
    navigator.clipboard.writeText(meetingUrl);
    message.success(t("home.copied"));
  };

  const handleStart = async () => {
    try {
      // eslint-disable-next-line no-shadow
      const { meeting } = meetingStore;
      if (meeting) {
        window.open(`/${routeUrls.meetingRedirect.path}/${meeting.identifier}`);
      }
    } catch (error) {
      console.log("start meeting error");
    }
  };

  const deleteMeeting = async () => {
    try {
      setLoading(true);
      const client = createPrivateInstance(BASE_API.meeting);
      const res = await client.delete(`/${params.meetingId}`);
      if (res.data.status === "success") {
        message.success(`Meeting deleted successfully`);
        navigate(`/${routeUrls.scheduleMeeting.path}`);
      } else {
        message.success(`Meeting deleted failed`);
      }
      setLoading(false);
    } catch (error) {
      message.error(`${error.response.data.errors.message}`);
      setLoading(false);
    }
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

  const canModify = useMemo(
    () =>
      meeting?.status === MEETING_STATUS.scheduled && meeting.can_moderate && !meeting.is_blocked,
    [meeting],
  );

  const canStart = useMemo(
    () => meeting?.status === MEETING_STATUS.scheduled && !meeting.is_blocked,
    [meeting],
  );

  useEffect(() => {
    fetchData();
  }, [params.meetingId]);

  const handleCopyCode = (code) => {
    setIsCopied(true);
    navigator.clipboard.writeText(code);
    setTimeout(() => {
      setIsCopied(false);
    }, [1000]);
  };

  return (
    <MainLayout>
      <div className="pt-4 w-full">
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
        <h1 className="font-[700] text-[32px] truncate">{meetingStore?.meeting?.title}</h1>
        <div className="text-[16px] text-gray mb-[24px]">{meetingStore?.meeting?.type.name}</div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 mb-[24px]">
          <div className="flex space-x-[8px] items-center">
            <img src="/images/icon/calender.svg" alt="" />
            <span>{t("meeting.view.start_time")}: </span>

            <p className="text-md font-bold">
              {meetingStore?.meeting?.start_date_time &&
                `${moment(meetingStore?.meeting?.start_date_time).format("HH:mm DD/MM/YYYY")} ${
                  meetingStore?.meeting?.user_timezone || ""
                }`}
            </p>
          </div>
          <div className="flex space-x-[8px] items-center">
            <img src="/images/icon/clock.svg" alt="" />
            <span>{t("config.ui.duration")}: </span>
            <span className="font-[700] text-[16px]">
              {`${meetingStore?.meeting?.period} `} {t("list.general.durations.minutes")}
            </span>
          </div>
          <div className="flex space-x-[8px] items-center">
            <img src="/images/icon/clock.svg" alt="" />
            <span>{t("home.maximum_participant")}: </span>
            <span className="font-[700] text-[16px]">
              {meetingStore?.meeting?.max_participant_count}
            </span>
          </div>
          <div className="flex space-x-[8px] items-center">
            <img src="/images/icon/clock.svg" alt="" />
            <span>{t("meeting.meeting_code")}: </span>
            <span className="font-[700] text-[16px]">{meetingStore?.meeting?.identifier}</span>
            <div className="dropdown-top relative">
              <button
                onClick={() => {
                  handleCopyCode(meetingStore?.meeting?.identifier);
                }}
              >
                <Icon className="h-6 w-6" src="/icons/icons/copy-light-outline.svg" alt="copy" />
              </button>
              {isCopied && (
                <ul
                  tabIndex="0"
                  className="dropdown-content menu p-2 shadow bg-white rounded-box mb-2 absolute -left-8"
                >
                  <p className="flex flex-row justify-center items-center space-x-2">
                    <span className="text-black">{t("home.copied")}</span>
                    <span className="text-success">
                      <IoCheckmarkCircleOutline />
                    </span>
                  </p>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="flex mb-6 flex-wrap items-center">
          {canStart && (
            <Button
              className="btn btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
              onClick={handleStart}
            >
              {t("general.start")}
            </Button>
          )}
          <Button
            className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
            onClick={handleCopyLink}
          >
            <IconBase className="mr-2" icon="/icons/icons/copy-primary-outline.svg" />
            {t("general.copy_link")}
          </Button>
          {canModify && (
            <Button
              className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
              onClick={() => {
                navigate(`/${routeUrls.scheduleMeeting.path}/${meetingStore?.meeting?.uuid}`);
              }}
            >
              {t("general.edit")}
            </Button>
          )}
          {canModify && (
            <Button
              className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
              onClick={() => {
                onConfirmDeleteMeeting(meetingStore?.meeting);
              }}
            >
              {t("general.delete")}
            </Button>
          )}
        </div>
        <hr className="mb-6" />
        <div>
          <GroupTitle className="!pb-0" icon={<IoTv />} title={t("schedule_meeting.attendees")} />
          <GroupLayout className="flex flex-wrap gap-[12px] !px-0 !pt-2 !pb-6">
            {meeting?.invitees &&
              meeting.invitees?.map((item, key) => {
                return (
                  <span
                    key={key}
                    className="rounded-[20px] px-[12px] py-[6px] bg-slate-base bg-secondary text-primary"
                  >
                    {item?.contact?.email}
                  </span>
                );
              })}
          </GroupLayout>
        </div>
        <div>
          <GroupTitle icon={<IoTv />} title={t("general.agenda")} />
        </div>
        <p className="mb-6 truncate flex-wrap">{meetingStore?.meeting?.agenda}</p>
        <div>
          <GroupTitle icon={<IoTv />} title={t("meeting.props.description")} />
        </div>
        <p dangerouslySetInnerHTML={{ __html: meetingStore?.meeting?.description }} />
        <DeleteMeetingModal
          onRefresh={() => {
            navigate(`/${routeUrls.scheduleMeeting.path}`);
          }}
          ref={deleteMeetingModalRef}
        />
      </GroupLayout>
    </MainLayout>
  );
};

export default withTranslation()(ScheduleMeetingView);
