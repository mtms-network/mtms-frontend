import React from "react";
import { Button, GuestFormLayout } from "components";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "configs";
import { withTranslation } from "react-i18next";

function ResetPasswordResult({ t }) {
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
        <p className="text-black text-3xl font-bold">{t("auth.reset_result.page_title")}</p>
      </div>
      <p>{t("auth.reset_result.page_description")}</p>
      <p className="pt-4">{t("auth.reset_result.page_content")}</p>
      <div className="w-full pt-9 flex justify-between items-center space-x-4">
        <Button
          className="btn-primary rounded-full btn-wide"
          onClick={onVerifyCode}
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

export default withTranslation()(ResetPasswordResult);
