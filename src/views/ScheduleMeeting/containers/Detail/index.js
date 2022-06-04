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
import { getMeetingDetail, getMeetingContact } from "services/meeting.service";
import moment from 'moment';

const timeFormat = "MMM DD, yyyy HH:mm";

const ScheduleMeetingDetail = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  const [alert, setAlert] = useState({ show: false, message: "", type: ALERT_TYPE.ERROR, error: [] });
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
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const prepareData = () => {
    
    fetchMeeting();
    fetchContact();

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

      values.description = description ? draftToHtml(convertToRaw(description.getCurrentContent())) : '';
      values.accessible_to_members = accessibleToMembers;
      values.accessible_via_link = accessibleViaLink;
      values.fee = 0;
      values.is_paid = false;
      values.is_pam = false;
      values.uuid = params.mettingId;
      values.start_date_time = startDateTime;
      values.emails = emails;
      values.contacts = contacts.map((value) => {
        return {uuid: value}
      });
      values.category.uuid = category;
      values.type.uuid = type;

      const client = createPrivateInstance(BASE_API.meeting);
      
      const res = await client.patch(`/${params.mettingId}/`, values);
      const uuid = res.data.meeting.uuid;

      if(sendInvite === true) {
        const client = createPrivateInstance(`/meetings/${uuid}/invitation`);
        const res = await client.post('', values);
      }

      setLoading(false);
      navigate(`/${routeUrls.scheduleMeeting.path}`);
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({ type: ALERT_TYPE.ERROR, show: true, message: errorData.message, error: errorData.detail });
      }
      setLoading(false);
    }
  };

  const onOk = (e) => {
    setStartDateTime(
      moment(
      e._d.getFullYear()+'-'+
      (e._d.getMonth()+1).toString().padStart(2, '0')+'-'+
      e._d.getDate().toString().padStart(2, '0')+' '+
      e._d.getHours().toString().padStart(2, '0')+':'+
      e._d.getMinutes().toString().padStart(2, '0')+':'+
      e._d.getSeconds().toString().padStart(2, '0')
      , 'YYYY-MM-DD HH:mm:ss')
    );
  };

  const onChange = (e) => {
    console.log(e);
  };

  const handleChange = (e) => {
    console.log(e);
  }

  const handleSaveAndSave = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(true)
  }

  const fetchMeeting = async () => {
    try {
      const res = await getMeetingDetail(params.mettingId);
      if (res) {
          updateMeetingStore((draft) => {
            draft.meeting = res;
          });
          setCategory(res.category.uuid);
          setType(res.type.uuid);
          setValue('agenda', res.agenda);
          setValue('title', res.title);
          setValue('period', res.period);
          setValue('identifier', res.identifier);
          setValue('max_participant_count', res.max_participant_count);
          setAccessibleViaLink(res.accessible_via_link);
          setAccessibleToMembers(res.accessible_to_members);
          setDescription(EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(res.description)
          )));
          setStartDateTime(moment(res.start_date_time, 'YYYY-MM-DD HH:mm:ss'));
          const currentContacts = [];
          res.invitees.map((item, idx) => {
            currentContacts.push(item.contact.uuid);
          })
          setContacts(currentContacts);
      }
    } catch (error) {}
  }

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
  }

  useEffect(() => {
    prepareData();
  }, [meetingStore.types]);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-between w-full py-2">
          <div className="flex-1">
            <GroupTitle icon={<IoTv />} title="Schedule New Meeting" />
          </div>
          <div className="flex-1 space-x-2 flex flex-row items-center justify-end">
            <div className="px-2 space-x-4 flex flex-row w-auto items-center justify-end">
              <button>
                <IoOptions className="text-black" />
              </button>
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
                label="Title"
                placeholder="Enter title meeting"
                rules={[
                  {
                    required: true,
                    message: "This field is required."
                  }
                ]}
              />
              <TextArea
                className="w-full"
                register={register("agenda")}
                label="Agenda"
                placeholder="Enter agenda meeting"
              />
            </div>
          </GroupLayout>
          <GroupLayout className="flex flex-col space-y-4">
            <div className="flex flex-row justify-between space-x-4">
              <div className="flex-1">
                <Select 
                  label="Type" 
                  options={types} 
                  register={register('type.uuid')} 
                  value={type}
                  onChange={(e) => setType(e)} 
                />
              </div>
              <div className="flex-1">
                <Select 
                  label="Meeting Category" 
                  options={categories} 
                  value={category}
                  register={register('category.uuid')} 
                  onChange={(e) => setCategory(e)}
                />
              </div>
              <div className="flex-1">
                <DateTimePicker
                  label="Start Date Time"
                  placeholder="Mar 2, 2022 5:02 PM"
                  showTime
                  onOk={onOk}
                  format={timeFormat}
                  register={register("start_date_time")}
                  value={startDateTime}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <div className="flex-1">
                <Input
                  register={register("period")}
                  label="Estimated Period"
                  placeholder="60"
                  type="number"
                  min="1"
                />
              </div>
              <div className="flex-1">
                <Input
                  register={register("identifier")}
                  label="Meeting code"
                  placeholder="Enter Meeting Code"
                />
              </div>
              <div className="flex-1">
                <Input
                  register={register("max_participant_count")}
                  label="Maximum Participant Count"
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
            <div className="flex flex-row items-center space-x-4">
              <div className="form-control">
                <label className="label cursor-pointer flex justify-center items-center gap-2">
                  <input
                    checked={accessibleViaLink}
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    onChange={() => setAccessibleViaLink(!accessibleViaLink)}
                    register={register("accessible_via_link")}
                  />
                  <span className="label-base pb-0">Accessible via link</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex justify-center items-center gap-2">
                  <input
                    checked={accessibleToMembers}
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    onChange={() => setAccessibleToMembers(!accessibleToMembers)}
                    register={register("accessible_to_members")}
                  />
                  <span className="label-base pb-0">Only accessible to active member</span>
                </label>
              </div>
            </div>
          </GroupLayout>
          <GroupLayout className="flex flex-col justify-between">
            <div className="w-full h-auto">
              <Select
                label="Add Invitees"
                mode="multiple"
                options={listContacts}
                placeholder="Select Invitees"
                onChange={(e) => setContacts(e)}
                register={register("contacts")}
                value={contacts}
              />
              <Select label="Enter Email" mode="tags" placeholder="Input invitees" register={register("emails")} onChange={(e) => setEmails(e)} />
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
            <div className="w-full flex flex-row justify-between pt-8">
              <div className="space-x-4">
                <Button className="btn btn-primary" isLoading={loading}>
                  Save meeting
                </Button>
              </div>
              <div className="space-x-4">
                <Button onClick={(e) => handleSaveAndSave(e)} className="btn btn-primary" isLoading={loading}>
                  Save and Send meeting
                </Button>
                <Button className="btn-outline-base" type="button" isLoading={loading}>
                  Reset
                </Button>
                <Button className="btn btn-primary" isLoading={loading}>
                  Save meeting
                </Button>
              </div>
            </div>
          </GroupLayout>
        </div>
      </form>
    </MainLayout>
  );
};

export default ScheduleMeetingDetail;
