/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from "react";
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

const timeFormat = "MMM DD, yyyy HH:mm";

const ScheduleMeetingDetail = ({ t }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [meetingStore, updateMeetingStore] = useMeetingStore();
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState(null);
  const [accessibleToMembers, setAccessibleToMembers] = useState(false);
  const [accessibleViaLink, setAccessibleViaLink] = useState(false);
  const [startDateTime, setStartDateTime] = useState(null);
  const [emails, setEmails] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
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
      setCategories(list);
    }
  };

  const onSubmit = async (values, sendInvite = false) => {
    try {
      setAlert({ ...alert, show: false, message: "" });
      setLoading(true);

      values.description = description
        ? draftToHtml(convertToRaw(description.getCurrentContent()))
        : "";
      values.accessible_to_members = accessibleToMembers;
      values.accessible_via_link = accessibleViaLink;
      values.fee = 0;
      values.is_paid = false;
      values.is_pam = false;
      values.uuid = params.meetingId;
      values.start_date_time = startDateTime;
      values.emails = emails;
      values.contacts = contacts.map((value) => {
        return { uuid: value };
      });
      values.category.uuid = category;
      values.type.uuid = type;

      const client = createPrivateInstance(BASE_API.meeting);
      const res = await client.patch(`/${params.meetingId}`, values);

      if (sendInvite === true) {
        const client = createPrivateInstance(`/meetings/${params.meetingId}/invitation`);
        const res = await client.post("", values);
      }

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

  const onOk = (e) => {
    setStartDateTime(
      moment(
        `${e._d.getFullYear()}-${(e._d.getMonth() + 1).toString().padStart(2, "0")}-${e._d
          .getDate()
          .toString()
          .padStart(2, "0")} ${e._d.getHours().toString().padStart(2, "0")}:${e._d
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${e._d.getSeconds().toString().padStart(2, "0")}`,
        "YYYY-MM-DD HH:mm:ss",
      ),
    );
  };

  const handleSaveAndSave = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(true);
  };

  const fetchMeeting = async () => {
    try {
      const res = await getMeetingDetail(params.meetingId);
      if (res) {
        updateMeetingStore((draft) => {
          draft.meeting = res;
        });
        setCategory(res.category.uuid);
        setType(res.type.uuid);
        setValue("agenda", res.agenda);
        setValue("title", res.title);
        setValue("period", res.period);
        setValue("identifier", res.identifier);
        setValue("max_participant_count", res.max_participant_count);
        setAccessibleViaLink(res.accessible_via_link);
        setAccessibleToMembers(res.accessible_to_members);
        setDescription(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(convertFromHTML(res.description)),
          ),
        );
        const startDate = moment(res.start_date_time, "YYYY-MM-DD HH:mm:ss");
        setStartDateTime(startDate);
        const currentContacts = [];
        res.invitees.map((item, idx) => {
          currentContacts.push(item.contact.uuid);
        });
        setContacts(currentContacts);
      }
    } catch (error) {}
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
      setFetchLoading(true);
      if (!meetingStore.isForceLoadMeetingHistories) {
        await fetchCommonData();
        await fetchContact();
        await fetchMeeting();
      }
      await prepareData();
      setFetchLoading(false);
    } catch (error) {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [meetingStore.isForceLoadMeetingHistories]);

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
        <form>
          <div className="flex flex-row justify-between w-full py-2">
            <div className="flex-1">
              <GroupTitle icon={<IoTv />} title={t("schedule_meeting_new.schedule_new_meeting")} />
            </div>
            <div className="space-x-2 flex flex-row items-center justify-end">
              <div className="px-2 space-x-4 flex flex-row w-auto items-center justify-end">
                <IoOptions className="text-black" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
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
                <TextArea
                  className="w-full"
                  register={register("agenda")}
                  label={t("meeting.props.agenda")}
                  placeholder={t("schedule_meeting_new.enter_agenda_meeting")}
                />
              </div>
            </GroupLayout>
            <GroupLayout className="flex flex-col space-y-4">
              <div className="w-full sm:flex sm:flex-row sm:justify-between sm:space-x-4">
                <div className="sm:flex-1">
                  <Select
                    className="w-full"
                    label={t("meeting.props.type")}
                    options={types}
                    register={register("type.uuid")}
                    value={type}
                    onChange={(e) => setType(e)}
                  />
                </div>
                <div className="sm:flex-1">
                  <Select
                    className="w-full"
                    label={t("meeting.meeting_category.category")}
                    options={categories}
                    value={category}
                    register={register("category.uuid")}
                    onChange={(e) => setCategory(e)}
                  />
                </div>
                <div className="sm:flex-1 w-full">
                  <DateTimePicker
                    className="w-full"
                    label={t("meeting.props.start_date_time")}
                    placeholder="Mar 2, 2022 5:02 PM"
                    showTime
                    onOk={onOk}
                    format={timeFormat}
                    register={register("start_date_time")}
                    value={startDateTime}
                  />
                </div>
              </div>
            </GroupLayout>
            <GroupLayout className="flex flex-col space-y-4">
              <div className="w-full sm:flex sm:flex-row sm:justify-between sm:space-x-4">
                <div className="flex-1">
                  <Input
                    register={register("period")}
                    label={t("meeting.props.estimated_period")}
                    placeholder="60"
                    type="number"
                    min="1"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    register={register("identifier")}
                    label={t("meeting.meeting_code")}
                    placeholder={t("meeting.enter_meeting_code")}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    register={register("max_participant_count")}
                    label={t("meeting.config.max_participant_count")}
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
              </div>
            </GroupLayout>
            <GroupLayout className="flex flex-col space-y-4">
              <div className="w-full sm:flex sm:flex-row sm:justify-between sm:space-x-4">
                <div className="form-control">
                  <label className="label cursor-pointer flex sm:justify-center justify-start items-center gap-2">
                    <input
                      checked={accessibleViaLink}
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                      onChange={() => setAccessibleViaLink(!accessibleViaLink)}
                      register={register("accessible_via_link")}
                    />
                    <span className="label-base pb-0">
                      {t("meeting.props.accessible_via_link")}
                    </span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex sm:justify-center justify-start items-center gap-2">
                    <input
                      checked={accessibleToMembers}
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                      onChange={() => setAccessibleToMembers(!accessibleToMembers)}
                      register={register("accessible_to_members")}
                    />
                    <span className="label-base pb-0">
                      {t("meeting.props.only_accessible_to_members")}
                    </span>
                  </label>
                </div>
              </div>
            </GroupLayout>
            <GroupLayout className="flex flex-col justify-between">
              <div className="w-full h-auto">
                <Select
                  label={t("schedule_meeting_new.Add_invitees")}
                  mode="multiple"
                  options={listContacts}
                  placeholder={t("schedule_meeting_new.select_invitees")}
                  onChange={(e) => setContacts(e)}
                  register={register("contacts")}
                  value={contacts}
                />
                <Select
                  label={t("schedule_meeting_new.enter_email")}
                  mode="tags"
                  placeholder={t("schedule_meeting_new.input_invitees")}
                  register={register("emails")}
                  onChange={(e) => setEmails(e)}
                />
              </div>
            </GroupLayout>
            <GroupLayout className="flex flex-col justify-between">
              <div className="border-1 rounded-xl p-4">
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
              </div>
              <div className="w-full sm:flex sm:flex-row justify-between pt-8 space-y-2 sm:space-y-0">
                <div className="sm:space-x-4 space-y-2 sm:space-y-0 w-full flex justify-center">
                  <Button
                    className="btn btn-primary btn-block sm:btn-wide"
                    isLoading={loading}
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
