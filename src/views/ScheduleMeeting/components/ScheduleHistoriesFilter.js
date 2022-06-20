import { Button, Input } from "components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ScheduleHistoriesFilter = ({ onChange }) => {
  const [submitting, setSubmitting] = useState(false);
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

  const onSubmit = async (values) => {
    try {
      onChange(values);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Input
          className="w-full"
          labelClassName="text-base"
          register={register("title")}
          label="Title"
          placeholder="Enter title meeting"
        />
      </div>
      <div className="pt-4">
        <Button className="btn btn-primary btn-sm" isLoading={submitting}>
          Filter
        </Button>
      </div>
    </form>
  );
};

export default ScheduleHistoriesFilter;
