import React from "react";
import { Button, GuestFormLayout } from "components";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { signUp } from "services";
import { useAppStore } from "stores/app.store";
import { message } from "antd";
import { routeUrls } from "configs";

function RegisterResult({ t }) {
  const navigate = useNavigate();
  const [appStore] = useAppStore();

  const onResendVerify = async () => {
    try {
      const data = await signUp(appStore.registerData || {});
      if (data) {
        message.success("A new verification link has been sent to your email.");
      }
    } catch (error) {
      navigate(`/${routeUrls.register.path}`);
      message.error("Opssss, error...!");
    }
  };

  return (
    <GuestFormLayout>
      <div className="pb-5">
        <img src="/images/mtms-logo.png" alt="logo" className="w-32" />
      </div>
      <div className="pb-4">
        <p className="text-black text-3xl font-bold">Check Your Mailbox</p>
      </div>
      <p>{t("auth.reset_result.page_description")}</p>
      <div className="w-full pt-9 flex justify-between items-center space-x-4">
        <Button className="btn-primary rounded-full btn-wide" onClick={onResendVerify}>
          Resend Verification Email
        </Button>
        <Button
          className="btn-primary rounded-full btn-wide btn-ghost text-primary"
          onClick={() => {
            navigate("/");
          }}
        >
          {t("auth.reset_result.return")}
        </Button>
      </div>
    </GuestFormLayout>
  );
}

export default withTranslation()(RegisterResult);
