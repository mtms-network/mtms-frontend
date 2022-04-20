import React, { useState } from "react";
import { Alert, Button, GuestFormLayout, Input } from "components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ALERT_TYPE, routeUrls } from "configs";
import { forgotPassword } from "services";
import { handleHttpError } from "helpers";

export default function ResetPassword() {
  const [alert, setAlert] = useState({ show: false, message: "", type: ALERT_TYPE.ERROR });
  const [loading, setLoading] = useState(false);
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
        setAlert({ type: ALERT_TYPE.SUCCESS, show: true, message: `Reset password successful` });
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
    navigate(`/${routeUrls.login.path}`);
  };

  const onRegister = () => {
    navigate(`/${routeUrls.register.path}`);
  };

  return (
    <GuestFormLayout>
      <div className="pt-8 pb-4">
        <p className="text-white text-lg">Reset Your Account</p>
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
        </div>
        <div className="w-full pt-9">
          <Button className="btn-block btn-primary" isLoading={loading}>
            Send request
          </Button>
        </div>
      </form>
      <div className="flex flex-row justify-between w-full pt-6">
        <a className="text-xs btn-link-dark" onClick={onLogin}>
          Click to login
        </a>
        <a className="text-xs btn-link-light" onClick={onRegister}>
          Click to Register
        </a>
      </div>
    </GuestFormLayout>
  );
}
