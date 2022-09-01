import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert, Button, GoogleButton, GuestFormLayout, Input } from "components";
import { useNavigate } from "react-router-dom";
import { ALERT_TYPE, routeUrls } from "configs";
import { signIn } from "services";
import { getUser, handleHttpError, resetUserInfo, setTokenLoginSucceeded } from "helpers";
import { useAuth } from "hooks";
import { useAppStore } from "stores/app.store";
import Wallet from "components/base/Wallet";
import { withTranslation } from "react-i18next";

function Login({ t }) {
  const navigate = useNavigate();
  const [, updateAppStore] = useAppStore();
  const [alert, setAlert] = useState({ show: false, message: "", type: ALERT_TYPE.ERROR });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const schema = yup
    .object()
    .shape({
      email: yup.string().required("Email is required"),
      password: yup.string().required("Password is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: registerUnlock,
    handleSubmit: handleSubmitUnlock,
    formState: { errors: errorsUnlock },
  } = useForm({
    resolver: yupResolver(
      yup
        .object()
        .shape({
          password: yup.string().required("Password is required"),
        })
        .required(),
    ),
  });

  const onSubmit = async (values) => {
    try {
      setAlert({ ...alert, show: false, message: "" });
      setLoading(true);
      const data = await signIn({
        email: values.email,
        password: values.password,
        deviceName: "mtms-app",
      });
      setTokenLoginSucceeded({ accessToken: data?.token, user: data?.user });
      updateAppStore((draft) => {
        draft.isAuthenticated = true;
        draft.user = data?.user;
      });
      setLoading(false);
      navigate("/meeting");
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({ type: ALERT_TYPE.ERROR, show: true, message: errorData.messageDetail });
      }
      updateAppStore((draft) => {
        draft.isAuthenticated = false;
      });
      setLoading(false);
    }
  };

  const onUnlock = async (values) => {
    try {
      setAlert({ ...alert, show: false, message: "" });
      setLoading(true);
      const data = await signIn({
        email: user?.username,
        password: values.password,
        deviceName: "1",
      });
      setLoading(false);
      setTokenLoginSucceeded({ accessToken: data?.token, user: data?.user });
      updateAppStore((draft) => {
        draft.isAuthenticated = true;
        draft.user = data?.user;
      });
      navigate("/");
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({ type: ALERT_TYPE.ERROR, show: true, message: errorData.message });
      }
      updateAppStore((draft) => {
        draft.isAuthenticated = false;
      });
      setLoading(false);
    }
  };

  const onClearUserInfo = () => {
    resetUserInfo();
    setUser(null);
  };

  const onForgotPassword = () => {
    navigate(`/${routeUrls.reset.path}`);
  };

  const onRegister = () => {
    navigate(`/${routeUrls.register.path}`);
  };

  useAuth();

  useEffect(() => {
    const userInfo = getUser();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const renderLogin = () => {
    return (
      <GuestFormLayout>
        <div>
          <div className="pb-4">
            <p className="text-black text-3xl font-bold">{t("auth.login.page_title")}</p>
            <div className="flex flex-row w-full pt-1">
              <p className="pr-2 text-xs">{t("auth.login.dont_have_account")}</p>
              <a onClick={onRegister} className="btn-text-primary text-xs">
                {t("auth.register.register")}
              </a>
            </div>
          </div>
          <div>
            <p className="text-black-base text-lg font-bold pb-3">
              {t("auth.login.login_with_social")}
            </p>
            <GoogleButton showTitle />
          </div>
          <div>
            <div className="divider mt-2 mb-2 text-hint">Or</div>
            <p className="text-black-base text-lg font-bold pb-3 pt-4">
              {t("auth.login.login_with_crypto")}
            </p>
            <div className="flex flex-row space-x-4">
              <Wallet />
            </div>
          </div>
          <div className="divider mt-2 mb-2 text-hint">Or</div>
          <p className="text-black-base text-lg font-bold pb-2 pt-4">
            {t("auth.login.login_with_email")}
          </p>
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
                  className="w-full"
                  register={register("email")}
                  label={t("auth.login.props.email")}
                  placeholder={t("auth.login.props.enter_your_email")}
                  error={errors.email}
                  labelClassName="font-medium"
                />
              </div>
              <div className="pt-4">
                <Input
                  className="w-full"
                  type="password"
                  register={register("password")}
                  label={t("auth.login.props.password")}
                  placeholder="***********"
                  error={errors.password}
                  labelClassName="font-medium"
                  labelRightComponent={
                    <a className="btn-text-primary text-md" onClick={onForgotPassword}>
                      {t("auth.forget.forget_password")}
                    </a>
                  }
                />
              </div>
            </div>
            <div className="w-full pt-5">
              <Button className="btn-primary rounded-full btn-wide" isLoading={loading}>
                {t("auth.login.login")}
              </Button>
            </div>
          </form>
        </div>
      </GuestFormLayout>
    );
  };

  const renderUnlock = () => {
    return (
      <GuestFormLayout>
        <div className="pb-4">
          <p className="text-black text-3xl font-bold">{t("auth.login.page_title")}</p>
          <div className="flex flex-row w-full pt-1">
            <p className="pr-2 text-xs">{t("auth.login.dont_have_account")}</p>
            <a onClick={onRegister} className="btn-text-primary text-xs">
              {t("auth.register.register")}
            </a>
          </div>
        </div>
        <div className="pt-6">
          <p className="text-black-base text-lg font-bold pb-3">
            {t("auth.login.login_with_social")}
          </p>
          <GoogleButton showTitle />
        </div>
        <div>
          <div className="divider mt-2 mb-2 text-hint">Or</div>
          <p className="text-black-base text-lg font-bold pb-3 pt-4">
            {t("auth.login.login_with_crypto")}
          </p>
          <div className="flex flex-row space-x-4">
            <Wallet />
          </div>
        </div>
        <div>
          <div className="divider mt-2 mb-2 text-hint">Or</div>
          <p className="text-black-base text-lg font-bold pb-2 pt-4">
            {t("auth.login.login_with_email")}
          </p>
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
          <form className="w-full h-auto" onSubmit={handleSubmitUnlock(onUnlock)}>
            <div className="w-full">
              <div>
                <Input
                  className="w-full"
                  type="password"
                  register={registerUnlock("password")}
                  label={t("auth.login.props.password")}
                  placeholder="***********"
                  error={errorsUnlock.password}
                  labelClassName="font-medium"
                  labelRightComponent={
                    <a className="btn-text-primary text-md" onClick={onForgotPassword}>
                      {t("auth.forget.forget_password")}
                    </a>
                  }
                />
              </div>
            </div>
          </form>
          <div className="w-full pt-5 flex justify-between items-center">
            <Button
              className="btn-primary rounded-full btn-wide"
              isLoading={loading}
              onClick={handleSubmitUnlock(onUnlock)}
            >
              {t("auth.login.login")}
            </Button>
            <Button
              className="btn-primary rounded-full btn-wide btn-ghost text-primary"
              onClick={onClearUserInfo}
            >
              {t("auth.logout")}
            </Button>
          </div>
        </div>
      </GuestFormLayout>
    );
  };

  return user?.username ? renderUnlock() : renderLogin();
}

export default withTranslation()(Login);
