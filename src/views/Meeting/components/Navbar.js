import React from "react";
import { withTranslation } from "react-i18next";

const OverviewNavBar = ({ t }) => {
  return (
    <div className="flex justify-center sm:justify-between items-center py-2">
      <div
        className="flex flex-row sm:flex-row basis-full pb-2
      space-x-4 justify-center sm:justify-end"
      >
        <button className="btn btn-primary btn-sm px-8 sm:px-4 text-black">
          {t("home.wallet")}
        </button>
        <button className="btn btn-primary btn-sm px-8 sm:px-4 text-black">
          {t("home.user_center")}
        </button>
      </div>
    </div>
  );
};

export default withTranslation()(OverviewNavBar);
