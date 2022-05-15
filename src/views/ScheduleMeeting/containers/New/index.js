import React, { useState, useEffect } from "react";
import {
  Button,
  DateTimePicker,
  GroupLayout,
  GroupTitle,
  Input,
  MainLayout,
  Select,
  TextArea,
} from "components";
import { IoOptions, IoTv } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMeetingStore } from "stores/meeting.store";

const timeFormat = "MMM DD, yyyy HH:mm";

const ScheduleMeetingItem = () => {
  const [loading, setLoading] = useState(false);
  const [meetingStore, updateMeetingStore] = useMeetingStore();
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);

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

  const onSubmit = async (values) => {
    try {
      console.log(values);
      setLoading(false);
    } catch (error) {}
  };

  const onOk = (e) => {
    console.log("onOk: ", e);
  };

  const onChange = (e) => {
    console.log(e);
  };

  useEffect(() => {
    prepareData();
  }, [meetingStore.types]);

  return (
    <MainLayout>
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
                <Select label="Type" options={types} />
              </div>
              <div className="flex-1">
                <Select label="Meeting Category" options={categories} />
              </div>
              <div className="flex-1">
                <DateTimePicker
                  label="Start Date Time"
                  placeholder="Mar 2, 2022 5:02 PM"
                  showTime
                  onOk={onOk}
                  format={timeFormat}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <div className="flex-1">
                <Input
                  register={register("estimatedPeriod")}
                  label="Estimated Period"
                  placeholder="60"
                  type="number"
                  min="1"
                />
              </div>
              <div className="flex-1">
                <Input
                  register={register("meetingCode")}
                  label="Meeting code"
                  placeholder="Enter Meeting Code"
                />
              </div>
              <div className="flex-1">
                <Input
                  register={register("maxParticipant")}
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
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    onChange={() => {
                    }}
                  />
                  <span className="label-base pb-0">Accessible via link</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex justify-center items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    onChange={() => {
                    }}
                  />
                  <span className="label-base pb-0">Only accessible to active member</span>
                </label>
              </div>
            </div>
          </GroupLayout>
          <GroupLayout className="flex flex-col justify-between">
            <div className="w-full pt-9 flex flex-row justify-between">
              <div className="space-x-4">
                <Button className="btn btn-primary" isLoading={loading}>
                  Save meeting
                </Button>
              </div>
              <div className="space-x-4">
                <Button className="btn btn-primary" isLoading={loading}>
                  Save and Send meeting
                </Button>
                <Button className="btn-outline-base" isLoading={loading}>
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

export default ScheduleMeetingItem;
