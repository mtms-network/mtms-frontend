import { Button, Input, Select } from "components";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMeetingStore } from "stores/meeting.store";
import { withNamespaces } from "react-i18next";

const ScheduleHistoriesFilter = ({ onChange, loading }) => {
  const [meetingStore] = useMeetingStore();
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState(null);
  const [, setCategories] = useState([]);

  const schema = yup
    .object()
    .shape({
      title: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    try {
      const filter = { ...values };
      if (type) {
        filter.type = type;
      }
      if (status) {
        filter.status = status;
      }
      onChange(filter);
    } catch (error) {}
  };

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
    if (meetingStore?.statuses) {
      const list = meetingStore.statuses.map((item) => ({
        ...item,
        key: item.uuid,
        value: item.name,
      }));
      setStatuses(list);
    }
  };
  useEffect(() => {
    prepareData();
  }, [meetingStore.types]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Input
          className="w-full"
          register={register("title")}
          label="Title"
          placeholder={t("schedule_meeting.enter_title_meeting")}
        />
        <Select
          label="Type"
          options={types}
          register={register("type.uuid")}
          onChange={(e) => setType(e)}
        />
        <Select
          label="Status"
          options={statuses}
          register={register("status.uuid")}
          onChange={(e) => setStatus(e)}
        />
      </div>
      <div className="pt-4">
        <Button className="btn btn-primary btn-sm" isLoading={loading}>
          Filter
        </Button>
      </div>
    </form>
  );
};

export default withNamespaces()(ScheduleHistoriesFilter);
