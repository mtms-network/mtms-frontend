import { Button, Input, Select } from "components";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { withTranslation } from "react-i18next";
import { t } from "i18next";

const ContactFilter = ({ onChange, onClear, loading }) => {

  const schema = yup.object().shape({keyword: yup.string()}).required();

  const {register, handleSubmit, setValue, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    onChange(values);
  };


  return (
    <>
      <form>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Input
            className="w-full"
            register={register("name")}
            label={t("contact.props.name")}
            placeholder={t("contact.props.enter_name")}
          />
          <Input
            className="w-full"
            register={register("email")}
            label={t("contact.props.email")}
            placeholder={t("contact.props.enter_email")}
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

export default withTranslation()(ContactFilter);
