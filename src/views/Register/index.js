import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert, Button, GoogleButton, GuestFormLayout, Input, WalletButton } from "components";
import { handleHttpError, resetUserInfo } from "helpers";
import { ALERT_TYPE, routeUrls } from "configs";
import { signUp } from "services";
import Wallet from "components/base/Wallet";
import { withTranslation } from "react-i18next";
import { message } from "antd";

function Register({ t }) {
  const [alert, setAlert] = useState({ show: false, message: "", type: ALERT_TYPE.ERROR });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
      phone: yup.string(),
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
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (values) => {
    try {
      setAlert({ ...alert, show: false, message: "" });
      setLoading(true);
      const data = await signUp({
        name: values.name,
        email: values.email,
        username: values.username,
        password: values.password,
        passwordConfirmation: values.confirmPassword,
      });
      if (data) {
        resetUserInfo();
        setAlert({ type: ALERT_TYPE.SUCCESS, show: true, message: `Register successful` });
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
    navigate(`/${routeUrls.login}`);
  };

  return (
    <GuestFormLayout>
      <div className="py-4">
        <p className="text-black text-3xl font-bold">{t("auth.register.page_title")}</p>
        <div className="flex flex-row w-full pt-1">
          <p className="pr-2 text-xs">{t("auth.register.already_have_account")}</p>
          <a className="btn-text-primary text-xs" onClick={onLogin}>
            { t("auth.login.login") }
          </a>
        </div>
      </div>
      <div className="pt-6">
        <p className="text-black-base text-lg font-bold pb-3">{t("auth.login.login_with_social")}</p>
        <GoogleButton showTitle />
      </div>
      <div>
        <div className="divider mt-2 mb-2 text-hint">Or</div>
        <p className="text-black-base text-lg font-bold pb-3 pt-4">{t("auth.login.login_with_crypto")}</p>
        <div className="flex flex-row space-x-4">
          <Wallet />
        </div>
      </div>
      <div>
        <div className="divider mt-2 mb-2 text-hint">Or</div>
        <p className="text-black-base text-lg font-bold pb-2 pt-4">{t("auth.login.login_with_email")}</p>
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
          <div className="pt-1 w-full flex flex-row justify-between space-x-4">
            <div className="flex-1">
              <Input
                register={register("name")}
                label={t("auth.register.props.name")}
                placeholder={t("auth.register.props.enter_your_name")}
                error={errors.name}
                labelClassName="font-medium"
              />
            </div>
            <div className="flex-1">
              <Input
                register={register("username")}
                label={t("auth.register.props.username")}
                placeholder={t("auth.register.props.enter_your_username")}
                error={errors.username}
                labelClassName="font-medium"
              />
            </div>
          </div>
          <div className="pt-4 w-full flex flex-row justify-between space-x-4">
            <div className="flex-1">
              <Input
                register={register("email")}
                label={t("auth.register.props.email")}
                placeholder={t("auth.register.props.enter_your_email")}
                error={errors.email}
                labelClassName="font-medium"
              />
            </div>
            <div className="flex-1">
              <Input
                register={register("phone")}
                label={t("auth.register.props.phone_number")}
                placeholder={t("auth.register.props.enter_phone_number")}
                error={errors.phone}
                labelClassName="font-medium"
              />
            </div>
          </div>
          <div className="pt-4 w-full flex flex-row justify-between space-x-4">
            <div className="flex-1">
              <Input
                type="password"
                register={register("password")}
                label={t("auth.register.props.password")}
                placeholder="***********"
                error={errors.password}
              />
            </div>
            <div className="flex-1">
              <Input
                type="password"
                register={register("confirmPassword")}
                label={t("auth.register.props.confirm_password")}
                placeholder="***********"
                error={errors.confirmPassword}
              />
            </div>
          </div>
          <div className="flex items-start pt-4">
            <p className="text-sm">
              {t("auth.register.registration_terms_label")}
              <span className="text-primary"> {t("auth.register.registration_terms_policy")}</span>
            </p>
          </div>
        </form>
        <div className="w-full py-5 flex justify-between items-center">
          <Button
            className="btn-primary rounded-full btn-wide"
            isLoading={loading}
            onClick={handleSubmit(onSubmit)}
          >
            { t("auth.register.register") }
          </Button>
        </div>
      </div>
    </GuestFormLayout>
  );
};

export default withTranslation()(Register)
