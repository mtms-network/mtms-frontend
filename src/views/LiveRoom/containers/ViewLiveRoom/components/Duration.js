import React from "react";

const Duration = ({ period, t }) => {
    return (
        <div className="flex space-x-[8px] items-center">
            <img src="/images/icon/clock.svg" alt="" />
            <span>{t("config.ui.duration")}: </span>
            <span className="font-[700]">
              {`${period} `} {t("list.general.durations.minutes")}
            </span>
        </div>
    )
}

export default Duration;
