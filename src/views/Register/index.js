import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GuestFormLayout, Input } from "components";

export default function Register() {
  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      username: yup.string().required("Username is required"),
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
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (values) => {
  };

  const onLogin = () => {
    navigate("/");
  };

  return (
    <GuestFormLayout>
      <div className="pt-8 pb-4">
        <p className="text-white text-lg">Create Your Account</p>
      </div>
      <div className="w-full">
        <button className="btn btn-block btn-primary">Connect Wallet</button>
      </div>
      <div className="w-full pt-4">
        <button className="btn btn-base">Connect Avalanche</button>
      </div>
      <form className="w-full h-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full pt-6">
          <Input
            register={register("name")}
            label="Enter your name"
            placeholder="Enter your name"
            error={errors.name}
          />
        </div>
        <div className="pt-1 w-full flex flex-row justify-between space-x-4">
          <div className="flex-1">
            <Input
              register={register("email")}
              label="Email"
              placeholder="Enter your email"
              error={errors.email}
            />
          </div>
          <div className="flex-1">
            <Input
              register={register("username")}
              label="Username"
              placeholder="Enter your username"
              error={errors.username}
            />
          </div>
        </div>
        <div className="pt-1 w-full flex flex-row justify-between space-x-4">
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
        <div className="flex text-text-200 items-start pt-4">
          <p className="text-sm">
            By clicking on Register, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
        <div className="w-full pt-7">
          <button className="btn btn-block btn-primary">Login</button>
        </div>
      </form>

      <div className="flex flex-row justify-center w-full pt-6">
        <p className="text-text-200 pr-2 text-xs">Have an account?</p>
        <a className="btn-link-light text-xs" onClick={onLogin}>
          Click to Login
        </a>
      </div>
    </GuestFormLayout>
  );
}
