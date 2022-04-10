import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "components";

export default function Login() {
  const remember = true;

  const schema = yup
    .object()
    .shape({
      email: yup.string().email("Invalid email").required("Email is required"),
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

  const renderLogin = () => {
    return (
      <LoginLayout>
        <div className="pt-12 pb-6">
          <p className="text-white text-lg">Login to your Account</p>
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
          <a className="text-[13px] btn-link-dark">Forget Password?</a>
          <a className="text-[13px] btn-link-light">Click to Register</a>
        </div>
      </LoginLayout>
    );
  };

  const renderUnlock = () => {
    return (
      <LoginLayout>
        <div className="pt-12 pb-6">
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
          <a className="text-[13px] btn-link-dark">Forget Password?</a>
          <a className="text-[13px] btn-link-light">Logout</a>
        </div>
      </LoginLayout>
    );
  };

  return remember ? renderUnlock() : renderLogin();
}
