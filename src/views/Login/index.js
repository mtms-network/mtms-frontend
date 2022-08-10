import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert, Button, GoogleButton, GuestFormLayout, Input, WalletButton } from "components";
import { useNavigate } from "react-router-dom";
import { ALERT_TYPE, routeUrls } from "configs";
import { signIn } from "services";
import { getUser, handleHttpError, resetUserInfo, setTokenLoginSucceeded } from "helpers";
import { useAuth } from "hooks";
import { useAppStore } from "stores/app.store";
import Wallet from "components/base/Wallet";

export default function Login() {
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

      setLoading(false);
      setTokenLoginSucceeded({ accessToken: data?.token, user: data?.user });
      updateAppStore((draft) => {
        draft.isAuthenticated = true;
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

  const onForgetPassword = () => {
    navigate(`/${routeUrls.reset.path}`);
  };

  const onRegister = () => {
    navigate(`/${routeUrls.register.path}`);
  };

  /* const CommonLogin = useMemo(
    () => (
      {<>
        <div className="pb-4">
          <p className="text-black text-3xl font-bold">Login To Your Account</p>
          <div className="flex flex-row w-full pt-1">
            <p className="pr-2 text-xs">Don’t have an account?</p>
            <a className="btn-text-primary text-xs" onClick={onRegister}>
              Register
            </a>
          </div>
        </div>
        <div className="pt-6">
          <p className="text-black-base text-lg font-bold pb-3">Log In With Social</p>
          <GoogleButton showTitle />
        </div>
        <div>
          <div className="divider mt-2 mb-2 text-hint">Or</div>
          <p className="text-black-base text-lg font-bold pb-3 pt-4">Log In With Crypto Wallet</p>
          <div className="flex flex-row space-x-4">
            <WalletButton name="Oasis" src="/icons/oasis-logo.png" />
            <WalletButton name="Avalanche" src="/icons/avalanche-logo.png" />
            <WalletButton name="Binance" src="/icons/binance-logo.png" onClick={() => connect('injected')} />
            <WalletButton name="Metamask" src="/icons/metamask-logo.png" onClick={handleConnectMetaMask} />
          </div>
        </div>
      </>}
    ),
    [],
  ); */

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
          <Wallet />
          <div className="divider mt-2 mb-2 text-hint">Or</div>
          <p className="text-black-base text-lg font-bold pb-2 pt-4">Log In With Email</p>
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
                  label="Email"
                  placeholder="Enter your email"
                  error={errors.email}
                  labelClassName="font-medium"
                />
              </div>
              <div className="pt-4">
                <Input
                  className="w-full"
                  type="password"
                  register={register("password")}
                  label="Password"
                  placeholder="***********"
                  error={errors.password}
                  labelClassName="font-medium"
                  labelRightComponent={
                    <a className="btn-text-primary text-md" onClick={onForgetPassword}>
                      Forget Password?
                    </a>
                  }
                />
              </div>
            </div>
            <div className="w-full pt-5">
              <Button className="btn-primary rounded-full btn-wide" isLoading={loading}>
                Login
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
        <Wallet />
        <div>
          <div className="divider mt-2 mb-2 text-hint">Or</div>
          <p className="text-black-base text-lg font-bold pb-2 pt-4">Log in with Email</p>
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
                  label="Password"
                  placeholder="***********"
                  error={errorsUnlock.password}
                  labelClassName="font-medium"
                  labelRightComponent={
                    <a className="btn-text-primary text-md" onClick={onForgetPassword}>
                      Forget Password?
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
              Login
            </Button>
            <Button
              className="btn-primary rounded-full btn-wide btn-ghost text-primary"
              isLoading={loading}
              onClick={onClearUserInfo}
            >
              Logout
            </Button>
          </div>
        </div>
      </GuestFormLayout>
    );
  };

  return user?.username ? renderUnlock() : renderLogin();
}
