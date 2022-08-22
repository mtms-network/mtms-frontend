import React, { useState, useEffect} from "react";
import {Alert, BrandLogoLoading, GuestFormLayout} from "components";
import { useNavigate, useParams } from "react-router-dom";
import { ALERT_TYPE, routeUrls } from "configs";
import {verifyActiveToken} from "services";
import { handleHttpError } from "helpers";
import { message } from "antd";

export default function VerifyResetPassword() {
  const [alert, setAlert] = useState({ show: false, message: "", type: ALERT_TYPE.ERROR });
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const onVerify = async (token) => {
    try {
      setAlert({ ...alert, show: false, message: "" });
      setLoading(true);
      const data = await verifyActiveToken({
        token
      });
      if (data) {
        message.success(data.message);
        setAlert({ type: ALERT_TYPE.SUCCESS, show: true, message: data.message });
        setTimeout(() => {
          navigate(`/${routeUrls.login.path}`);
        }, 3000);
      }
      setLoading(false);
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({ type: ALERT_TYPE.ERROR, show: true, message: errorData.detail?.message?.join(',') });
      }
      setLoading(false);
    }
  };

  const onLogin = () => {
    navigate(`/${routeUrls.login.path}`);
  };

  useEffect(() => {
    onVerify(params.token);
  }, [])

  return (
    <GuestFormLayout>
      <div className="pb-5">
        <img src="/images/mtms-logo.png" alt="logo" className="w-32" />
      </div>
      <div className="pb-4">
        <p className="text-black text-3xl font-bold">Active Your Account</p>
        <div className="flex flex-row w-full pt-1">
          <p className="pr-2 text-xs">Already have an account?</p>
          <a className="btn-text-primary text-xs" onClick={onLogin}>
            Login
          </a>
        </div>
      </div>
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
      <div className="w-full h-auto">
        <div className="w-full">
          <div className="py-4 w-full text-center space-x-4">
            {loading && <BrandLogoLoading />}
          </div>
        </div>
      </div>
    </GuestFormLayout>
  );
}
