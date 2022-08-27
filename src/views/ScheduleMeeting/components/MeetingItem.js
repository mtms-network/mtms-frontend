import React, { useMemo } from "react";
import classNames from "classnames";
import { Button, GroupLayout } from "components";
import { calculateDuration } from "helpers";
import { Link, useNavigate } from "react-router-dom";
import { LIVE_MEETING_URL, MEETING_STATUS, routeUrls } from "configs";
import { t } from "i18next";
import { message } from "antd";

const MeetingItem = ({ data, className }) => {
  const navigate = useNavigate();

  const canModify = useMemo(
    () => data.status === MEETING_STATUS.scheduled && data.can_moderate && !data.is_blocked,
    [data],
  );

  const handleStart = async () => {
    try {
      if (data) {
        window.open(`/${routeUrls.meetingRedirect.path}/${data?.identifier}`);
      }
    } catch (error) {
      console.log("start meeting error");
    }
  };

  const handleCopyLink = () => {
    if (data?.identifier) {
      const meetingUrl = `${LIVE_MEETING_URL}/${data.identifier}`;
      navigator.clipboard.writeText(meetingUrl);
      message.success(t("home.copied"));
    }
  };

  return (
    <GroupLayout
      className={classNames(
        "flex flex-col flex-1 justify-between",
        "min-h-[160px]",
        "hover:border-primary hover:bg-light-primary",
        className,
      )}
    >
      <div className="flex flex-col w-full flex-1 h-full">
        <div className="flex justify-between">
          <Link to={`/${routeUrls.scheduleMeeting.path}/view/${data?.uuid}`} key={data?.uuid}>
            <div className="label-base text-lg font-semibold group-hover:text-primary overflow-hidden">
              {data?.title}
            </div>
          </Link>
          <div className="relative">
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="m-1">
                <img className="cursor-pointer" src="/images/icon/more.svg" alt="" />
              </label>
              <ul
                tabIndex="0"
                className="dropdown-content menu py-6 shadow-lg bg-white rounded-box w-52"
              >
                <li>
                  <a
                    onClick={handleCopyLink}
                    className={classNames(
                      "bg-white border-0 text-black",
                      "hover:text-white hover:bg-primary",
                      "flex justify-start rounded-none",
                    )}
                  >
                    {t("general.share_url")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-gray">{data?.type.name}</div>
        <div className="flex justify-between items-center flex-row">
          <div>
            <div className="flex flex-row space-x-2 items-center pt-2 group-hover:text-primary">
              <img src="/images/icon/calender.svg" alt="" />
              <p className="label-base p-0 group-hover:text-primary">{data?.start_date_time}</p>
            </div>
            <div className="flex flex-row space-x-2 items-center pt-2 group-hover:text-primary">
              <img src="/images/icon/clock.svg" alt="" />
              <p className="label-base p-0 group-hover:text-primary">
                {`${calculateDuration(data.start_date_time, data.estimated_end_time)} `}
                {t("list.general.durations.minutes")}
              </p>
            </div>
          </div>
          {canModify && (
            <div>
              <Button
                className={classNames(
                  "rounded-[20px] px-[12px] py-[6px]",
                  "!h-[32px] !min-h-[32px]",
                  "border-0 bg-secondary hover:bg-primary hover:text-white",
                  "text-primary z-50",
                )}
                onClick={handleStart}
              >
                {t("home.join_meeting_now")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </GroupLayout>
  );
};

export default MeetingItem;
