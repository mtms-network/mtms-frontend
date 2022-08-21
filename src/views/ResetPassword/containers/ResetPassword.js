import React, { useState } from "react";
import { Alert, Button, GuestFormLayout, Input } from "components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ALERT_TYPE, routeUrls } from "configs";
import { forgotPassword } from "services";
import { handleHttpError } from "helpers";
import { useAppStore } from "stores/app.store";
import { withTranslation } from "react-i18next";

function ResetPassword({ t }) {
  const [alert, setAlert] = useState({ show: false, message: "", type: ALERT_TYPE.ERROR });
  const [loading, setLoading] = useState(false);
  const [, updateAppStore] = useAppStore();
  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      email: yup.string().email("Invalid email").required("Email is required"),
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
      setAlert({ ...alert, show: false, message: "" });
      setLoading(true);
      const data = await forgotPassword({
        email: values.email,
      });
      if (data) {
        updateAppStore((draft) => {
          draft.resetPassword.email = values.email;
        });
        setAlert({
          type: ALERT_TYPE.SUCCESS,
          show: true,
          message: `Request reset password successful`,
        });
        // setTimeout(() => {
        navigate(`/${routeUrls.resetResult.path}`);
        // }, 3000);
      }
      setLoading(false);
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({ type: ALERT_TYPE.ERROR, show: true, message: errorData.message });
      }
      setLoading(false);
    }
  };

  return (
    <GuestFormLayout>
      <div className="pb-5">
        <img src="/images/mtms-logo.png" alt="logo" className="w-32" />
      </div>
      <div className="pb-4">
        <p className="text-black text-3xl font-bold">{t("auth.password.reset.page_title")}</p>
      </div>
      {alert?.show && (
        <div className="py-4 w-full">
          <Alert
            {...{ ...alert }}
            onClose={() => {
              setAlert({ ...alert, show: false });
            }}
          />
        </div>
      )}
      <form className="w-full h-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <div>
            <Input
              register={register("email")}
              label={t("auth.login.props.email")}
              placeholder={t("auth.login.props.enter_your_email")}
              error={errors.email}
              labelClassName="font-medium"
            />
          </div>
        </div>
      </form>
      <div className="w-full pt-5 flex justify-between items-center">
        <Button
          className="btn-primary rounded-full btn-wide"
          isLoading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {t("auth.send_request")}
        </Button>
      </div>
    </GuestFormLayout>
  );
}

export default withTranslation()(ResetPassword);
