import React from "react";

const MaximumParticipant = ({ max_participant_count, t }) => {
    return (
        <div className="flex space-x-[8px] items-center">
            <img src="/images/icon/clock.svg" alt="" />
            <span>{t("home.maximum_participant")}: </span>
            <span className="font-[700]">
              {max_participant_count ?? 0}
            </span>
        </div>
    )
}

export default MaximumParticipant;
