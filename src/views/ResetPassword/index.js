import React from "react";
import { GuestFormLayout, Input } from "components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "configs";

export default function ResetPassword() {
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

  const onSubmit = () => {};

  const onLogin = () => {
    navigate("/");
  };

  const onRegister = () => {
    navigate(`/${routeUrls.register.path}`);
  };

  return (
    <GuestFormLayout>
      <div className="pt-8 pb-4">
        <p className="text-white text-lg">Reset Your Account</p>
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
          <button className="btn btn-block btn-primary">Login</button>
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
