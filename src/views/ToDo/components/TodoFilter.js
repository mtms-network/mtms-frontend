import { Button, Input, Select } from "components";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMeetingStore } from "stores/meeting.store";
import { withTranslation } from "react-i18next";
import { t } from "i18next";

const TodoFilter = ({ onChange, onClear, loading }) => {

  const schema = yup.object().shape({keyword: yup.string()}).required();

  const {register, handleSubmit, setValue, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    onChange(values);
  };

  const status = [
    {value: t("todo.completed"), key: true},
    {value: t("todo.incomplete"), key: false},
  ];

  return (
    <>
      <form>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Input
            className="w-full"
            register={register("keyword")}
            label={t("meeting.props.title")}
            placeholder={t("todo.enter_to_do")}
          />
          <Select
            label={t("meeting.props.status")}
            options={status}
            register={register("status.uuid")}
            onChange={(e) => {
              setValue('status', e);
            }}
            allowClear
          />
        </div>
      </form>
      <div className="pt-4"><Button
        className="btn btn-white btn-sm mr-4"
        isLoading={loading}
        onClick={onClear}
      >
        Clear
      </Button>

        <Button
          className="btn btn-primary btn-sm mr-4"
          isLoading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {t("general.filter")}
        </Button>
      </div>
    </>
  );
};

export default withTranslation()(TodoFilter);
