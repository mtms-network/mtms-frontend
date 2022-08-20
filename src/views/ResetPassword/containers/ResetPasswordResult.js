import React from "react";
import { Button, GuestFormLayout } from "components";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "configs";

export default function ResetPasswordResult() {
  const navigate = useNavigate();

  const onVerifyCode = () => {
    navigate(`/${routeUrls.resetResult.path}`);
  };

  return (
    <GuestFormLayout>
      <div className="pb-5">
        <img src="/images/mtms-logo.png" alt="logo" className="w-32" />
      </div>
      <div className="pb-4">
        <p className="text-black text-3xl font-bold">Check Your Mailbox</p>
      </div>
      <p>
        We have sent a confirmation email for your registration. Please ensure to check your spam
        box incase you can’t find it in your inbox
      </p>
      <div className="w-full pt-9 flex justify-between items-center">
        <Button
          className="btn-primary rounded-full btn-wide"
          onClick={() => {
            navigate("/");
          }}
        >
          Return to HomePage
        </Button>
        <Button
          className="btn-primary rounded-full btn-wide btn-ghost text-primary"
          onClick={onVerifyCode}
        >
          Verify code
        </Button>
      </div>
    </GuestFormLayout>
  );
}
