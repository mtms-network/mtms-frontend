import React, { useMemo } from "react";
import classNames from "classnames";
import { Button, GroupLayout } from "components";
import { Link, useNavigate } from "react-router-dom";
import { LIVE_MEETING_URL, MEETING_STATUS, routeParts, routeUrls } from "configs";
import { t } from "i18next";
import { message } from "antd";
import moment from "moment";

const MeetingItem = ({ data, className, onDelete }) => {
  const navigate = useNavigate();

  const canModify = useMemo(
    () => data.status === MEETING_STATUS.scheduled && !data.is_blocked,
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

  const handleDuplicate = () => {
    if (data?.uuid) {
      navigate(`/${routeUrls.scheduleMeeting.path}/${data?.uuid}/${routeParts.duplicate.path}`);
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
                <li>
                  <a
                    onClick={handleDuplicate}
                    className={classNames(
                      "bg-white border-0 text-black",
                      "hover:text-white hover:bg-primary",
                      "flex justify-start rounded-none",
                    )}
                  >
                    {t("meeting.config.duplicate_meeting")}
                  </a>
                </li>
                <li>
                  <a
                    onClick={onDelete}
                    className={classNames(
                      "bg-white border-0 text-black",
                      "hover:text-white hover:bg-primary",
                      "flex justify-start rounded-none",
                    )}
                  >
                    {t("meeting.config.delete_meeting")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="text-gray cursor-pointer"
          onClick={() => {
            navigate(`/${routeUrls.scheduleMeeting.path}/view/${data?.uuid}`);
          }}
        >
          {data?.type.name}
        </div>
        <div
          className="flex justify-between items-center flex-row cursor-pointer"
          onClick={() => {
            navigate(`/${routeUrls.scheduleMeeting.path}/view/${data?.uuid}`);
          }}
        >
          <div>
            <div className="flex flex-row space-x-2 items-start pt-2 group-hover:text-primary">
              <img src="/images/icon/calender.svg" alt="" />
              <div className="flex flex-col">
                <p className="label-base p-0 group-hover:text-primary">
                  {data?.start_date_time &&
                    `${moment(data?.start_date_time).format("MMM,DD YYYY HH:mm")} ${
                      data?.user_timezone || ""
                    }`}
                </p>
              </div>
            </div>
            <div className="flex flex-row space-x-2 items-center pt-2 group-hover:text-primary">
              <img src="/images/icon/clock.svg" alt="" />
              <p className="label-base p-0 group-hover:text-primary">
                {`${data?.period || 0} `}
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
