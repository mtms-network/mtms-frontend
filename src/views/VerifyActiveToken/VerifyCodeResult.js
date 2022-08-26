import React from "react";
import { Button, GuestFormLayout } from "components";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { routeUrls } from "configs";

function VerifyCodeResult({ t }) {
  const navigate = useNavigate();

  const onBackLogin = async () => {
    navigate(`/${routeUrls.login.path}`);
  };

  return (
    <GuestFormLayout>
      <div className="pb-5">
        <img src="/images/mtms-logo.png" alt="logo" className="w-32" />
      </div>
      <div className="pb-4">
        <p className="text-black text-3xl font-bold">Congratulation</p>
      </div>
      <p>You have successfully verified your e-mail address</p>
      <div className="w-full pt-9 flex justify-between items-center space-x-4">
        <Button className="btn-primary rounded-full btn-wide" onClick={onBackLogin}>
          Go to log in Screen
        </Button>
      </div>
    </GuestFormLayout>
  );
}

export default withTranslation()(VerifyCodeResult);
