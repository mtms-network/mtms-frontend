/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  DateTimePicker,
  GroupLayout,
  GroupTitle,
  Input,
  MainLayout,
  Select,
  TextArea,
  AlertError,
  BrandLogoLoading,
  TimePicker,
} from "components";
import { IoOptions, IoTv } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMeetingStore } from "stores/meeting.store";

import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { ALERT_TYPE, routeUrls, COMMON } from "configs";
import { handleHttpError } from "helpers";
import { useNavigate, useParams } from "react-router-dom";
import { createInstantMeeting, getMeetingContact, sendEmailToMemberInMeeting } from "services";
import { withTranslation } from "react-i18next";
import moment from "moment";
import { message } from "antd";
import { t } from "i18next";

const timeFormat = "MMM DD, yyyy";

const ScheduleMeetingItem = ({ t }) => {
  const DURATION_HOURS = [
    { label: `0 ${t("list.general.durations.h")}`, value: 0, key: 0 },
    { label: `1 ${t("list.general.durations.h")}`, value: 1, key: 1 },
    { label: `2 ${t("list.general.durations.hours")}`, value: 2, key: 2 },
    { label: `3 ${t("list.general.durations.hours")}`, value: 3, key: 3 },
    { label: `4 ${t("list.general.durations.hours")}`, value: 4, key: 4 },
  ];

  const DURATION_MINUTES = [
    { value: `0 ${t("list.general.durations.m")}`, key: 0 },
    { value: `15 ${t("list.general.durations.minutes")}`, key: 15 },
    { value: `30 ${t("list.general.durations.minutes")}`, key: 30 },
    { value: `45 ${t("list.general.durations.minutes")}`, key: 45 },
  ];

  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [meetingStore] = useMeetingStore();
  const [description, setDescription] = useState(null);
  const [startDateTime, setStartDateTime] = useState(moment());
  const [contacts, setContacts] = useState([]);
  const [type, setType] = useState(null);
  const [startTime, setStartTime] = useState(1);
  const [durationHour, setDurationHour] = useState(0);
  const [durationMinute, setDurationMinute] = useState(0);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: ALERT_TYPE.ERROR,
    error: [],
  });
  const [listContacts, setListContacts] = useState([]);

  const schema = yup.object().shape({
    title: yup.string().required(),
    agenda: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      console.log("values", values);
      const data = { ...values };
      setAlert({ ...alert, show: false, message: "" });
      setLoading(true);

      data.description = description
        ? draftToHtml(convertToRaw(description?.getCurrentContent()))
        : "";
      data.is_paid = false;
      data.is_pam = false;
      data.uuid = null;
      startDateTime.set("hour", startTime.hours());
      startDateTime.set("minute", startTime.minutes());
      startDateTime.set("second", startTime.seconds());
      data.start_date_time = startDateTime.format("YYYY-MM-DD HH:mm:ss");
      data.contacts = contacts.map((value) => {
        return { uuid: value };
      });
      data.type = { uuid: type };
      data.period = durationHour * 60 + durationMinute;
      const res = await createInstantMeeting(data);

      if (res?.data) {
        message.success(res?.data?.message);
        if (data.contacts?.length > 0) {
          await sendEmailToMemberInMeeting(params.meetingId);
        }
      } else if (res?.request) {
        const errorData = handleHttpError(res);
        message.error(errorData.messageDetail);
      }
      setLoading(false);
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        message.error(errorData?.message);
      }
      setLoading(false);
    }
  };

  const onChangeDateTime = (e) => {
    setStartDateTime(
      moment(
        `${e._d.getFullYear()}-${(e._d.getMonth() + 1).toString().padStart(2, "0")}-${e._d
          .getDate()
          .toString()
          .padStart(2, "0")} ${e._d.getHours().toString().padStart(2, "0")}:${e._d
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${e._d.getSeconds().toString().padStart(2, "0")}`,
        "YYYY-MM-DD",
      ),
    );
  };

  const onChangeStartTime = (value) => {
    const time = moment(value, "hh:mm:ss");
    setStartTime(time);
  };

  const fetchContact = async () => {
    try {
      const res = await getMeetingContact();
      if (res) {
        const list = res.data.map((item) => ({
          ...item,
          key: item.uuid,
          value: item.name,
        }));
        setListContacts(list);
      }
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      setFetchLoading(true);
      await fetchContact();
      setFetchLoading(false);
    } catch (error) {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

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
      {fetchLoading && (
        <div className="h-96">
          <BrandLogoLoading />
        </div>
      )}
      {!fetchLoading && (
        <>
          <div className="flex flex-row justify-between w-full py-2">
            <div className="flex-1 text-center">
              <GroupTitle icon={<IoTv />} title={t("schedule_meeting.scheduled_meetings")} />
            </div>
          </div>
          <div className="w-[60%] m-auto bg-white rounded-[20px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <GroupLayout className="flex flex-col justify-between">
                <div className="w-full h-auto">
                  <Input
                    className="w-full"
                    labelClassName="text-base"
                    register={register("title")}
                    label={t("meeting.props.title")}
                    placeholder={t("schedule_meeting.enter_title_meeting")}
                    required
                    rules={[
                      {
                        required: true,
                        message: "This field is required.",
                      },
                    ]}
                  />
                </div>
              </GroupLayout>
              <GroupLayout className="flex flex-wrap gap-[12px]">
                {meetingStore?.types &&
                  meetingStore.types.map((item) => {
                    return (
                      <span
                        className={`rounded-[20px] px-[12px] py-[6px] bg-slate-base cursor-pointer${
                          type === item.uuid ? " bg-secondary text-primary" : ""
                        }`}
                        onClick={() => setType(item.uuid)}
                      >
                        {item.name}
                      </span>
                    );
                  })}
              </GroupLayout>
              <GroupLayout className="flex flex-col space-y-4">
                <div className="w-full sm:flex sm:flex-row sm:justify-between sm:space-x-4">
                  <div>{t("meeting.view.start_time")}</div>
                  <div className="flex-1">
                    <DateTimePicker
                      placeholder="Mar 2, 2022 5:02 PM"
                      onChangeDateTime={onChangeDateTime}
                      format={timeFormat}
                      value={startDateTime}
                    />
                  </div>
                  <div className="flex-1">
                    <TimePicker
                      use12Hours
                      value={startTime}
                      format="hh:mm a"
                      onChange={onChangeStartTime}
                    />
                  </div>
                </div>
              </GroupLayout>
              <GroupLayout className="flex flex-col space-y-4">
                <div className="w-full sm:flex sm:flex-row sm:justify-between sm:space-x-4">
                  <div>{t("config.ui.duration")}</div>
                  <div className="flex-1">
                    <Select
                      options={DURATION_HOURS}
                      defaultValue={0}
                      value={durationHour}
                      onChange={(e) => setDurationHour(e)}
                    />
                  </div>
                  <div className="flex-1">
                    <Select
                      options={DURATION_MINUTES}
                      defaultValue={0}
                      value={durationMinute}
                      onChange={(e) => setDurationMinute(e)}
                    />
                  </div>
                </div>
              </GroupLayout>
              <GroupLayout className="flex flex-col justify-between">
                <div className="w-full sm:flex sm:flex-row sm:justify-between sm:space-x-4">
                  <div className="flex-1">
                    <Input
                      register={register("max_participant_count")}
                      label={t("home.maximum_participant")}
                      placeholder={COMMON.MAX_PARTICIPANT}
                      type="number"
                      min="1"
                      onChange={(e) => {
                        const { value } = e.target;
                        if (value <= 99999 && value >= 0 && value.length <= 5) {
                          // setParticipant(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      label={t("meeting.meeting_code")}
                      placeholder={t("meeting.enter_meeting_code")}
                      register={register("identifier")}
                    />
                  </div>
                </div>
              </GroupLayout>
              <GroupLayout className="flex flex-col justify-between">
                <div className="w-full h-auto">
                  <Select
                    label={t("meeting.config.email_invite")}
                    mode="tags"
                    options={listContacts}
                    placeholder={t("schedule_meeting_new.select_invitees")}
                    onChange={(e) => setContacts(e)}
                    register={register("contacts")}
                    value={contacts}
                  />
                </div>
              </GroupLayout>
              <GroupLayout className="flex flex-col justify-between">
                <TextArea
                  className="w-full"
                  register={register("agenda")}
                  label={t("meeting.props.agenda")}
                  placeholder={t("schedule_meeting_new.enter_agenda_meeting")}
                  required
                />
              </GroupLayout>
              <GroupLayout className="flex flex-col justify-between">
                <Editor
                  editorState={description}
                  toolbarClassName="toolbarClassName rounded-lg"
                  wrapperClassName="wrapperClassName bg-slate-base rounded-lg"
                  editorClassName="editorClassName px-2"
                  placeholder="Enter Description"
                  onEditorStateChange={(editor) => {
                    setDescription(editor);
                  }}
                  register={register("description")}
                />
              </GroupLayout>
            </form>
            <div className="w-full sm:flex sm:flex-row justify-between pt-2 pb-8 space-y-2 sm:space-y-0">
              <div className="space-x-4 space-y-2 sm:space-y-0 w-full flex justify-center">
                <Button
                  className="btn btn-primary btn-outline"
                  type="submit"
                  onClick={() => {
                    navigate(`/${routeUrls.scheduleMeeting.path}`);
                  }}
                  disabled={loading}
                >
                  {t("general.cancel")}
                </Button>
                <Button
                  className="btn btn-primary"
                  isLoading={loading}
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  {t("general.create")}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default withTranslation()(ScheduleMeetingItem);
