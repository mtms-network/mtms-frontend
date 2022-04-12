import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert, GuestFormLayout, Input } from "components";
import { useNavigate } from "react-router-dom";
import { ALERT_TYPE, routeUrls } from "configs";
import { login } from "services";

export default function Login() {
  const navigate = useNavigate();
  const remember = false;
  const [alert, setAlert] = useState({ show: false, message: "", type: ALERT_TYPE.ERROR });

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

  const onSubmit = async (values) => {
    try {
      const data = await login({
        email: values.email,
        password: values.password,
        device_name: "1",
      });
    } catch (error) {
      if (error) {
        setAlert({ type: ALERT_TYPE.ERROR, show: true, message: "kk" });
      }
    }
  };

  const onForgetPassword = () => {
    navigate(`/${routeUrls.reset.path}`);
  };

  const onLogin = () => {
    navigate(`/${routeUrls.login.path}`);
  };

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
              register={register("email")}
              label="Email"
              placeholder="Enter your email"
              error={errors.email}
            />
            <Input
              type="password"
              register={register("password")}
              label="Password"
              placeholder="***********"
              error={errors.password}
            />
          </div>
          <div className="w-full pt-9">
            <button className="btn btn-block btn-primary">Login</button>
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
            <p className="text-4xl">AV</p>
          </div>
        </div>
        <div className="pt-10 pb-14">
          <p className="text-white text-lg">Login to your Account</p>
        </div>
        <form className="w-full h-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <Input
              type="password"
              register={register("password")}
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
            />
          </div>
          <div className="w-full pt-9">
            <button className="btn btn-block btn-primary">Login</button>
          </div>
        </form>
        <div className="flex flex-row justify-between w-full pt-6">
          <a className="text-xs btn-link-dark" onClick={onForgetPassword}>
            Forget Password?
          </a>
          <a className="text-xs btn-link-light">Logout</a>
        </div>
      </GuestFormLayout>
    );
  };

  return remember ? renderUnlock() : renderLogin();
}
