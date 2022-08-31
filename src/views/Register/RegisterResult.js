import React, { useState } from "react";
import { Alert, Button, GuestFormLayout } from "components";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { resendRegisterVerification } from "services";
import { useAppStore } from "stores/app.store";
import { handleHttpError } from "../../helpers";
import { message } from "antd";

function RegisterResult({ t }) {
  const navigate = useNavigate();
  const [appStore] = useAppStore();
  const [loading, setLoading] = useState(false);

  const onResendVerify = async () => {
    try {
      setLoading(true);
      const data = await resendRegisterVerification(appStore.registerData || {});
      if (data) {
        message.success(data?.message);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestFormLayout>
      <div className="pb-5">
        <img src="/images/mtms-logo.png" alt="logo" className="w-32" />
      </div>
      <div className="pb-4">
        <p className="text-black text-3xl font-bold">{t("auth.reset_result.page_title")}</p>
      </div>
      <p>{t("auth.reset_result.page_description")}</p>

      <div className="w-full pt-9 flex justify-between items-center space-x-4">
        <Button
          className="btn-primary rounded-full btn-wide"
          isLoading={loading}
          onClick={onResendVerify}
        >
          {t("auth.reset_result.verify_code")}
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
