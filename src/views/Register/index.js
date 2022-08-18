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

export default function Register() {
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
      phone: yup.string().required("Phone number is required"),
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
        setAlert({ type: ALERT_TYPE.ERROR, show: true, message: errorData.message });
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
        <p className="text-black text-3xl font-bold">Create An Account</p>
        <div className="flex flex-row w-full pt-1">
          <p className="pr-2 text-xs">Already have an account?</p>
          <a className="btn-text-primary text-xs" onClick={onLogin}>
            Login
          </a>
        </div>
      </div>
      <div className="pt-6">
        <p className="text-black-base text-lg font-bold pb-3">Sign Up With Social</p>
        <GoogleButton showTitle />
      </div>
      <div>
        <div className="divider mt-2 mb-2 text-hint">Or</div>
        <p className="text-black-base text-lg font-bold pb-3 pt-4">Sign Up With Crypto Wallet</p>
        <div className="flex flex-row space-x-4">
          <Wallet />
        </div>
      </div>
      <div>
        <div className="divider mt-2 mb-2 text-hint">Or</div>
        <p className="text-black-base text-lg font-bold pb-2 pt-4">Sign Up With Email</p>
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
                label="Name"
                placeholder="Enter your name"
                error={errors.name}
                labelClassName="font-medium"
              />
            </div>
            <div className="flex-1">
              <Input
                register={register("username")}
                label="Username"
                placeholder="Enter your username"
                error={errors.username}
                labelClassName="font-medium"
              />
            </div>
          </div>
          <div className="pt-4 w-full flex flex-row justify-between space-x-4">
            <div className="flex-1">
              <Input
                register={register("email")}
                label="Email"
                placeholder="Enter your email"
                error={errors.email}
                labelClassName="font-medium"
              />
            </div>
            <div className="flex-1">
              <Input
                register={register("phone")}
                label="Phone Number"
                placeholder="Enter your phone number"
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
                label="Password"
                placeholder="***********"
                error={errors.password}
              />
            </div>
            <div className="flex-1">
              <Input
                type="password"
                register={register("confirmPassword")}
                label="Confirm Password"
                placeholder="***********"
                error={errors.confirmPassword}
              />
            </div>
          </div>
          <div className="flex items-start pt-4">
            <p className="text-sm">
              By clicking on Register, you agree to our
              <span className="text-primary"> Terms of Service and Privacy Policy.</span>
            </p>
          </div>
        </form>
        <div className="w-full py-5 flex justify-between items-center">
          <Button
            className="btn-primary rounded-full btn-wide"
            isLoading={loading}
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </Button>
        </div>
      </div>
    </GuestFormLayout>
  );
}
