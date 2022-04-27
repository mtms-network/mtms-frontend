import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert, Button, GuestFormLayout, Input } from "components";
import { useNavigate } from "react-router-dom";
import { ALERT_TYPE, routeUrls } from "configs";
import { signIn } from "services";
import { getUser, handleHttpError, resetUserInfo, setTokenLoginSucceeded } from "helpers";
import { useAuth } from "hooks";
import { useAppStore } from "stores/app.store";

export default function Login() {
  const navigate = useNavigate();
  const [appStore, setAppStore] = useAppStore();
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
        device_name: "1",
      });

      setLoading(false);
      setTokenLoginSucceeded({ accessToken: data?.token, user: data?.user });
      setAppStore((draft) => {
        draft.isAuthenticated = true;
      });
      navigate("/");
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({ type: ALERT_TYPE.ERROR, show: true, message: errorData.message });
      }
      setAppStore((draft) => {
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
        device_name: "1",
      });
      setLoading(false);
      setTokenLoginSucceeded({ accessToken: data?.token, user: data?.user });
      setAppStore((draft) => {
        draft.isAuthenticated = true;
      });
      navigate("/");
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({ type: ALERT_TYPE.ERROR, show: true, message: errorData.message });
      }
      setAppStore((draft) => {
        draft.isAuthenticated = false;
      });
      setLoading(false);
    }
  };

  const onClearUserInfo = () => {
    resetUserInfo();
    setUser(null);
  };

  const onForgetPassword = () => {
    navigate(`/${routeUrls.reset.path}`);
  };

  const onLogin = () => {
    navigate(`/${routeUrls.login.path}`);
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
        <div className="pt-8 pb-4">
          <p className="text-white text-lg">Login to your Account</p>
        </div>
        <div className="w-full">
          <button className="btn btn-block btn-primary">Connect Wallet</button>
        </div>
        <div className="w-full pt-4">
          <button className="btn btn-base">Connect Avalanche</button>
        </div>
        <div className="pt-4 w-full">
          <Alert
            {...{ ...alert }}
            onClose={() => {
              setAlert({ ...alert, show: false });
            }}
          />
        </div>
        <form className="w-full h-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full pt-6">
            <Input
              className="w-full"
              register={register("email")}
              label="Email"
              placeholder="Enter your email"
              error={errors.email}
            />
            <Input
              className="w-full"
              type="password"
              register={register("password")}
              label="Password"
              placeholder="***********"
              error={errors.password}
            />
          </div>
          <div className="w-full pt-9">
            <Button className="btn-block btn-primary" isLoading={loading}>
              Login
            </Button>
          </div>
        </form>
        <div className="flex flex-row justify-between w-full pt-6">
          <a className="text-[13px] btn-link-dark" onClick={onForgetPassword}>
            Forget Password?
          </a>
          <a className="text-[13px] btn-link-light" onClick={onLogin}>
            Click to Register
          </a>
        </div>
      </GuestFormLayout>
    );
  };

  const renderUnlock = () => {
    return (
      <GuestFormLayout>
        <div className="pt-8 pb-4">
          <div className="w-32 h-32 border-base rounded-full flex justify-center items-center bg-color-base-200">
            <p className="text-4xl uppercase">{user?.username.slice(0, 2) || "HI"}</p>
          </div>
        </div>
        <div className="pt-10 pb-14">
          <p className="text-white text-lg">Login to your Account</p>
        </div>
        <div className="pt-4 w-full">
          <Alert
            {...{ ...alert }}
            onClose={() => {
              setAlert({ ...alert, show: false });
            }}
          />
        </div>
        <form className="w-full h-auto" onSubmit={handleSubmitUnlock(onUnlock)}>
          <div className="w-full">
            <Input
              className="w-full"
              type="password"
              register={registerUnlock("password")}
              label="Password"
              placeholder="***********"
              error={errorsUnlock.password}
            />
          </div>
          <div className="w-full pt-9">
            <Button className="btn-block btn-primary" isLoading={loading}>
              Login
            </Button>
          </div>
        </form>
        <div className="flex flex-row justify-between w-full pt-6">
          <a className="text-xs btn-link-dark" onClick={onForgetPassword}>
            Forget Password?
          </a>
          <a className="text-xs btn-link-light" onClick={onClearUserInfo}>
            Logout
          </a>
        </div>
      </GuestFormLayout>
    );
  };

  return user?.username ? renderUnlock() : renderLogin();
}
