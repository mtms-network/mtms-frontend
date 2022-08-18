/* eslint-disable react/no-danger */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
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
import { createPrivateInstance } from "services/base";
import { BASE_API, ALERT_TYPE, routeUrls, LIVE_MEETING_URL } from "configs";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getMeetingDetail } from "services/meeting.service";
import { withTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";

const timeFormat = "MMM DD, yyyy";

const { confirm } = Modal;

const ScheduleMeetingView = ({ t }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [meetingStore, updateMeetingStore] = useMeetingStore();
  const [types, setTypes] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: ALERT_TYPE.ERROR,
    error: [],
  });

  const prepareData = () => {
    if (meetingStore?.types) {
      const list = meetingStore.types.map((item) => ({
        ...item,
        key: item.uuid,
        value: item.name,
      }));
      setTypes(list);
    }
    if (meetingStore?.categories) {
      const list = meetingStore.categories.map((item) => ({
        ...item,
        key: item.uuid,
        value: item.name,
      }));
    }
  };

  const handleDeleteMeeting = () => {
    confirm({
      title: "Are you sure delete avatar?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteMeeting();
      },
      onCancel() {},
    });
  };

  const handleCopyLink = () => {
    const meetingUrl = `${LIVE_MEETING_URL}/${meetingStore?.meeting?.identifier}`;
    navigator.clipboard.writeText(meetingUrl);
    setTimeout(() => {}, [1000]);
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
      }
    } catch (error) {
      console.log("ScheduleMeetingDetail", error);
    }
  };

  const fetchData = async () => {
    try {
      setFetchLoading(true);
      await fetchMeeting();

      await prepareData();
      setFetchLoading(false);
    } catch (error) {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.meetingId]);
  return (
    <MainLayout>
      <div className="pt-4 w-full">
        <AlertError
          {...{ ...alert }}
          onClose={() => {
            setAlert({ ...alert, show: false });
          }}
        />
      </div>
      <GroupLayout className="flex flex-col justify-between">
        <h1 className="font-[700] text-[32px]">{meetingStore?.meeting?.title}</h1>
        <div className="text-[16px] text-gray mb-[24px]">{meetingStore?.meeting?.type.name}</div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 mb-[24px]">
          <div className="flex space-x-[8px] items-center">
            <img src="/images/icon/calender.svg" alt="" />
            <span>Start Time:</span>{" "}
            <span className="font-[700] text-[16px]">
              {moment(meetingStore?.meeting?.start_date_time).format("MMM DD, yyyy h:mm A")}
            </span>
          </div>
          <div className="flex space-x-[8px] items-center">
            <img src="/images/icon/clock.svg" alt="" />
            <span>Duration:</span>{" "}
            <span className="font-[700] text-[16px]">{meetingStore?.meeting?.period} Minutes</span>
          </div>
          <div className="flex space-x-[8px] items-center">
            <img src="/images/icon/clock.svg" alt="" />
            <span>Maximum Participant: </span>
            <span className="font-[700] text-[16px]">
              {meetingStore?.meeting?.max_participant_count}
            </span>
          </div>
          <div className="flex space-x-[8px] items-center">
            <img src="/images/icon/clock.svg" alt="" />
            <span>Meeting Code:</span>{" "}
            <span className="font-[700] text-[16px]">{meetingStore?.meeting?.identifier}</span>
          </div>
        </div>
        <div className="flex space-x-[24px] mb-[24px]">
          <Button className="btn btn-primary rounded-[20px] h-[40px] min-h-[40px]">Start</Button>
          <Button
            className="btn btn-outline btn-primary rounded-[20px] h-[40px] min-h-[40px]"
            onClick={handleCopyLink}
          >
            Copy link
          </Button>
          <Link
            className="btn btn-outline btn-primary rounded-[20px] h-[40px] min-h-[40px]"
            to={`/${routeUrls.scheduleMeeting.path}/${meetingStore?.meeting?.uuid}`}
          >
            Edit
          </Link>
          <Button
            className="btn btn-outline btn-primary rounded-[20px] h-[40px] min-h-[40px]"
            onClick={handleDeleteMeeting}
          >
            Delete
          </Button>
        </div>
        <hr className="mb-[24px]" />
        <div>
          <GroupTitle icon={<IoTv />} title="Agenda" />
        </div>
        <p className="mb-[24px]">{meetingStore?.meeting?.agenda}</p>
        <div>
          <GroupTitle icon={<IoTv />} title="Description" />
        </div>
        <p dangerouslySetInnerHTML={{ __html: meetingStore?.meeting?.description }} />
      </GroupLayout>
    </MainLayout>
  );
};

export default withTranslation()(ScheduleMeetingView);
