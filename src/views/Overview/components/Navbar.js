import React from "react";
import { withNamespaces } from 'react-i18next';

const OverviewNavBar = ({ t }) => {
  return (
    <div className="flex justify-center sm:justify-between items-center py-2">
      <div
        className="flex flex-col sm:flex-row basis-1/2 sm:basis-full
      sm:space-x-4 space-y-2  sm:space-y-0 justify-center sm:justify-start"
       />
      <div
        className="flex flex-col sm:flex-row basis-1/2 sm:basis-full
      sm:space-x-4 space-y-2  sm:space-y-0 justify-center sm:justify-end"
      >
        <button className="btn btn-primary btn-sm text-white">{t('home.wallet')}</button>
        <button className="btn btn-primary btn-sm text-white">{t('home.user_center')}</button>
      </div>
    </div>
  );
};

export default withNamespaces()(OverviewNavBar);
