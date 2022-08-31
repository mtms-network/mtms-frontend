import React, { useState } from "react";
import { Alert, Button, GuestFormLayout, Input } from "components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ALERT_TYPE, routeUrls } from "configs";
import { resetPassword } from "services";
import { handleHttpError } from "helpers";
import { useAppStore } from "stores/app.store";
import { message } from "antd";
import { withTranslation } from "react-i18next";

function VerifyResetPassword({ t }) {
  const [alert, setAlert] = useState({ show: false, message: "", type: ALERT_TYPE.ERROR });
  const [loading, setLoading] = useState(false);
  const [appStore] = useAppStore();

  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      email: yup.string().required("Email is required"),
      code: yup.string().required("Code is required"),
      password: yup.string().required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
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

  const onSubmit = async (values) => {
    try {
      setAlert({ ...alert, show: false, message: "" });
      setLoading(true);
      const data = await resetPassword({
        email: values.email,
        code: values.code,
        newPassword: values.password,
        newPasswordConfirmation: values.confirmPassword,
      });
      if (data) {
        message.success("Reset password successful");
        setTimeout(() => {
          navigate(`/${routeUrls.login.path}`);
        }, 3000);
      }
      setLoading(false);
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        message.error(errorData.messageDetail);
      }
      setLoading(false);
    }
  };

  const onLogin = () => {
    navigate(`/${routeUrls.login.path}`);
  };

  return (
    <GuestFormLayout>
      <div className="pb-5">
        <img src="/images/mtms-logo.png" alt="logo" className="w-32" />
      </div>
      <div className="pb-4">
        <p className="text-black text-3xl font-bold">{t("auth.verify.page_title")}</p>
        <div className="flex flex-row w-full pt-1">
          <p className="pr-2 text-xs">{t("auth.register.already_have_account")}</p>
          <a className="btn-text-primary text-xs" onClick={onLogin}>
            {t("auth.login.login")}
          </a>
        </div>
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
          <div className="pt-4 w-full flex flex-row justify-between space-x-4">
            <div className="flex-1">
              <Input
                register={register("email")}
                label={t("auth.login.props.email")}
                placeholder={t("auth.login.props.enter_your_email")}
                error={errors.email}
                labelClassName="font-medium"
              />
            </div>
            <div className="flex-1">
              <Input
                type="password"
                register={register("code")}
                label={t("auth.password.props.code")}
                placeholder="***********"
                error={errors.code}
                labelClassName="font-medium"
              />
            </div>
          </div>
          <div className="pt-4 w-full flex flex-row justify-between space-x-4">
            <div className="flex-1">
              <Input
                type="password"
                register={register("password")}
                label={t("auth.password.props.new_password")}
                placeholder="***********"
                error={errors.password}
              />
            </div>
            <div className="flex-1">
              <Input
                type="password"
                register={register("confirmPassword")}
                label={t("auth.password.props.new_password_confirmation")}
                placeholder="***********"
                error={errors.confirmPassword}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="w-full pt-5 flex justify-between items-center">
        <Button
          className="btn-primary rounded-full btn-wide"
          isLoading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {t("auth.reset_result.verify_code")}
        </Button>
      </div>
    </GuestFormLayout>
  );
}

export default withTranslation()(VerifyResetPassword);
