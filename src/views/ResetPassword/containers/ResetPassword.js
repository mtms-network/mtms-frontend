import React, { useState } from "react";
import { Button, GuestFormLayout, Input } from "components";
import { useForm, setError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ALERT_TYPE, routeUrls } from "configs";
import { forgotPassword, resetPassword, validateResetPassword } from "services";
import { handleHttpError } from "helpers";
import { withTranslation } from "react-i18next";
import { message } from "antd";

function ResetPassword({ t }) {
  const [alert, setAlert] = useState({ show: false, message: "", type: ALERT_TYPE.ERROR });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
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
      let data = { message: "" };
      if (step === 1) {
        data = await forgotPassword({
          email: values.email,
        });
        message.success(data?.message);
        setStep(2);
      } else if (step === 2) {
        data = await validateResetPassword({
          email: values.email,
          code: values.code,
        });
        setStep(3);
      } else if (step === 3) {
        data = await resetPassword(values);
        navigate(`/${routeUrls.login.path}`);
        message.success(data?.message);
      }
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        message.error(errorData.messageDetail);
      }
    } finally {
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

      <form className="w-full h-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <div>
            <Input
              readOnly={step > 1}
              register={register("email")}
              label={t("auth.password.props.email")}
              placeholder={t("auth.login.props.enter_your_email")}
              error={errors.email}
              labelClassName="font-medium"
            />
          </div>
          {step === 2 && (
            <div className="pt-4">
              <Input
                register={register("code")}
                label={t("auth.password.props.code")}
                placeholder={t("auth.password.props.code")}
                error={errors.code}
                labelClassName="font-medium"
              />
            </div>
          )}
          {step === 3 && (
            <div className="pt-4">
              <Input
                type={"password"}
                register={register("newPassword")}
                label={t("auth.password.props.new_password")}
                placeholder={t("auth.password.props.new_password")}
                error={errors.new_password}
                labelClassName="font-medium"
              />
            </div>
          )}
          {step === 3 && (
            <div className="pt-4">
              <Input
                type={"password"}
                register={register("newPasswordConfirmation")}
                label={t("auth.password.props.new_password_confirmation")}
                placeholder={t("auth.password.props.new_password_confirmation")}
                error={errors.new_password_confirmation}
                labelClassName="font-medium"
              />
            </div>
          )}
        </div>
      </form>
      <div className="w-full pt-5 flex justify-between items-center space-x-4">
        <Button
          className="btn-primary rounded-full btn-wide"
          isLoading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {step === 1 && t("auth.password.request")}
          {step === 2 && t("auth.password.validate_code")}
          {step === 3 && t("auth.password.reset_here")}
        </Button>

        <Button
          className="btn-primary rounded-full btn-wide btn-ghost text-primary"
          onClick={() => {
            navigate("/");
          }}
        >
          {t("auth.reset_result.return")}
        </Button>
      </div>
    </GuestFormLayout>
  );
}

export default withTranslation()(ResetPassword);
