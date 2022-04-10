import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "components";

export default function Register() {
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
    console.log(values);
  };

  const LoginLayout = ({ children }) => (
    <div className="flex w-screen h-screen justify-center items-center px-4 md:px-0">
      <div className="w-full md:w-[35%] h-auto">
        <div className="flex flex-col items-center form-base w-full h-auto p-6">
          <div>
            <img src="/images/mtms-logo.png" alt="logo" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <LoginLayout>
      <div className="pt-12 pb-6">
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
        <div className="pt-2 w-full flex flex-row justify-between space-x-4">
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
        <div className="pt-2 w-full flex flex-row justify-between space-x-4">
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
        <div className="w-full pt-9">
          <button className="btn btn-block btn-primary">Login</button>
        </div>
      </form>
      <div className="flex flex-row justify-between w-full pt-6">
        <a className="text-[13px] btn-link-dark">Forget Password?</a>
        <a className="text-[13px] btn-link-light">Click to Register</a>
      </div>
    </LoginLayout>
  );
}
