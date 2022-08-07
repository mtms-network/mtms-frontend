/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import moment from "moment";
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
} from "components";
import { IoOptions, IoTv } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMeetingStore } from "stores/meeting.store";

import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { convertFromHTML, convertToRaw, EditorState, ContentState } from "draft-js";
import { createPrivateInstance } from "services/base";
import { BASE_API, ALERT_TYPE, routeUrls } from "configs";
import { handleHttpError } from "helpers";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMeetingDetail,
  getMeetingContact,
  getRequirePreMeeting,
} from "services/meeting.service";
import { withTranslation } from "react-i18next";

const timeFormat = "MMM DD, yyyy";

const ScheduleMeetingDetail = ({ t }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [meetingStore, updateMeetingStore] = useMeetingStore();
  const [types, setTypes] = useState([]);
  const [description, setDescription] = useState(null);
  const [startDateTime, setStartDateTime] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [type, setType] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [durationHour, setDurationHour] = useState(0);
  const [durationMinute, setDurationMinute] = useState(0);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: ALERT_TYPE.ERROR,
    error: [],
  });
  const [listContacts, setListContacts] = useState([]);

  const schema = yup
    .object()
    .shape({
      title: yup.string(),
      agenda: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
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
      // setCategories(list);
    }
  };

  const onSubmit = async (values) => {
    try {
      setAlert({ ...alert, show: false, message: "" });
      setLoading(true);
      values.description = description
        ? draftToHtml(convertToRaw(description.getCurrentContent()))
        : "";
      values.is_paid = false;
      values.is_pam = false;
      values.uuid = params.meetingId;
      values.start_date_time = startDateTime.add(startTime, "hours").format("YYYY-MM-DD HH:mm:ss");

      values.contacts = contacts.map((value) => {
        return { uuid: value };
      });
      values.type = { uuid: type };
      values.period = durationHour * 60 + durationMinute;
      delete values.identifier;
      const client = createPrivateInstance(BASE_API.meeting);
      await client.patch(`/${params.meetingId}`, values);

      setLoading(false);
      navigate(`/${routeUrls.scheduleMeeting.path}`);
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({
          type: ALERT_TYPE.ERROR,
          show: true,
          message: errorData.message,
          error: errorData.detail,
        });
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

  const fetchMeeting = async () => {
    try {
      const res = await getMeetingDetail(params.meetingId);
      if (res) {
        updateMeetingStore((draft) => {
          draft.meeting = res;
        });
        setType(res.type.uuid);
        setValue("agenda", res.agenda);
        setValue("title", res.title);
        setValue("identifier", res.identifier);
        setValue("max_participant_count", res.max_participant_count);
        const startDate = moment(res.start_date_time, "YYYY-MM-DD");
        const time = parseInt(moment(res.start_date_time).format("HH"), 10);
        setStartDateTime(startDate);
        setStartTime(time);
        setDurationHour(Math.floor(res.period / 60));
        setDurationMinute(res.period % 60);
        setDescription(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(convertFromHTML(res.description)),
          ),
        );
        const currentContacts = [];
        res.invitees.map((item, idx) => {
          currentContacts.push(item.contact.uuid);
          return 1;
        });
        setContacts(currentContacts);
      }
    } catch (error) {
      console.log("ScheduleMeetingDetail", error);
    }
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
    } catch (error) {
      console.log("ScheduleMeetingDetail fetchContact", error);
    }
  };

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
    } catch (error) {
      console.log("ScheduleMeetingDetail fetchCommonDate", error);
    }
  };

  const fetchData = async () => {
    try {
      setFetchLoading(true);
      await fetchCommonData();
      await fetchContact();
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
      {fetchLoading && (
        <div className="h-screen">
          <BrandLogoLoading />
        </div>
      )}
      {!fetchLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-between w-full py-2">
            <div className="flex-1 text-center">
              <GroupTitle icon={<IoTv />} title={t("schedule_meeting_new.schedule_new_meeting")} />
            </div>
          </div>
          <div className="w-[90%] m-auto bg-white rounded-[20px] md:w-[80%] lx:w-[60%]">
            <GroupLayout className="flex flex-col justify-between">
              <div className="w-full h-auto">
                <Input
                  className="w-full"
                  labelClassName="text-base"
                  register={register("title")}
                  label={t("meeting.props.title")}
                  placeholder={t("schedule_meeting.enter_title_meeting")}
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
                <div>Start Time</div>
                <div className="flex-1">
                  <DateTimePicker
                    placeholder="Mar 2, 2022 5:02 PM"
                    onChangeDateTime={onChangeDateTime}
                    format={timeFormat}
                    value={startDateTime}
                  />
                </div>
                <div className="flex-1">
                  <Select
                    options={START_TIME}
                    defaultValue="01:00"
                    onChange={(e) => setStartTime(e)}
                    value={startTime}
                  />
                </div>
              </div>
            </GroupLayout>
            <GroupLayout className="flex flex-col space-y-4">
              <div className="w-full sm:flex sm:flex-row sm:justify-between sm:space-x-4">
                <div>Duration</div>
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
                  {/* <Input
                    register={register("period")}
                    label="Duration"
                    placeholder="60"
                    type="number"
                    min="1"
                  /> */}
                </div>
              </div>
            </GroupLayout>
            <GroupLayout className="flex flex-col justify-between">
              <div className="w-full sm:flex sm:flex-row sm:justify-between sm:space-x-4">
                <div className="flex-1">
                  <Input
                    register={register("max_participant_count")}
                    label="Maximum participant"
                    placeholder="1000"
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
                    register={register("identifier")}
                    label={t("meeting.meeting_code")}
                    placeholder={t("meeting.enter_meeting_code")}
                    className="!bg-disable"
                    disabled
                  />
                </div>
              </div>
            </GroupLayout>
            <GroupLayout className="flex flex-col justify-between">
              <div className="w-full h-auto">
                <Select
                  label="Email invite"
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
              />
            </GroupLayout>
            <GroupLayout className="flex flex-col justify-between">
              <Editor
                editorState={description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editor) => {
                  setDescription(editor);
                }}
                register={register("description")}
              />
              <div className="w-full sm:flex sm:flex-row justify-between pt-8 space-y-2 sm:space-y-0">
                <div className="sm:space-x-4 space-y-2 sm:space-y-0 w-full flex justify-center">
                  <Button
                    className="btn btn-primary btn-block sm:btn-wide"
                    isLoading={loading}
                    type="submit"
                    onClick={() => onSubmit()}
                  >
                    {t("schedule_meeting_new.save_meeting")}
                  </Button>
                </div>
              </div>
            </GroupLayout>
          </div>
        </form>
      )}
    </MainLayout>
  );
};

export default withTranslation()(ScheduleMeetingDetail);

const DURATION_HOURS = [
  { value: "0 hour", key: 0 },
  { value: "1 hour", key: 1 },
  { value: "2 hour", key: 2 },
  { value: "3 hour", key: 3 },
  { value: "4 hour", key: 4 },
];

const DURATION_MINUTES = [
  { value: "0 minute", key: 0 },
  { value: "15 minutes", key: 15 },
  { value: "30 minutes", key: 30 },
  { value: "45 minutes", key: 45 },
];

const START_TIME = [
  { value: "1:00 am", key: 1 },
  { value: "2:00 am", key: 2 },
  { value: "3:00 am", key: 3 },
  { value: "4:00 am", key: 4 },
  { value: "5:00 am", key: 5 },
  { value: "6:00 am", key: 6 },
  { value: "7:00 am", key: 7 },
  { value: "8:00 am", key: 8 },
  { value: "9:00 am", key: 9 },
  { value: "10:00 am", key: 10 },
  { value: "11:00 am", key: 11 },
  { value: "12:00 am", key: 12 },
  { value: "1:00 pm", key: 13 },
  { value: "2:00 pm", key: 14 },
  { value: "3:00 pm", key: 15 },
  { value: "4:00 pm", key: 16 },
  { value: "5:00 pm", key: 17 },
  { value: "6:00 pm", key: 18 },
  { value: "7:00 pm", key: 19 },
  { value: "8:00 pm", key: 20 },
  { value: "9:00 pm", key: 21 },
  { value: "10:00 pm", key: 22 },
  { value: "11:00 pm", key: 23 },
  { value: "12:00 pm", key: 0 },
];
