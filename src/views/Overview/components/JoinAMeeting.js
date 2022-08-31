import React, { useState } from "react";
import { IoCalendarSharp } from "react-icons/io5";
import { Button, GroupLayout, GroupTitle, Input } from "components";
import classNames from "classnames";
import { joinMeetingByCode } from "services";
import { LIVE_MEETING_URL, routeUrls } from "configs";
import { withTranslation } from "react-i18next";
import { handleHttpError } from "helpers";
import { message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;

const JoinAMeeting = ({ className, t }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReplaceLocaleWarning = () => {
    const { origin } = window.location;
    const warningLocale = t("meeting.props.warning_meeting_code", { url: origin });
    return warningLocale.replaceAll("&#x2F;", "/");
  };

  const handleConfirmMeetingCodeNotExist = (meetingCode) => {
    confirm({
      title: handleReplaceLocaleWarning(),
      icon: <ExclamationCircleOutlined />,
      okText: t("meeting.props.continue"),
      okType: "danger",
      cancelText: t("meeting.props.no"),
      onOk() {
        window.open(`${routeUrls.meetingRedirect.path}/${meetingCode}`);
      },
      onCancel() {},
    });
  };

  const handleJoin = async () => {
    try {
      if (code) {
        setLoading(true);
        const res = await joinMeetingByCode({ code });
        if (res?.data?.uuid) {
          window.open(`${routeUrls.meetingRedirect.path}/${res?.data?.identifier}`);
        } else {
          handleConfirmMeetingCodeNotExist(code);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className={classNames([className, "flex flex-col"])}>
      <GroupLayout
        className="flex flex-col justify-between"
        titleComponent={
          <GroupTitle icon={<IoCalendarSharp />} title={t("meeting.join_a_meeting")} />
        }
      >
        <div className="flex flex-col pb-4">
          <p className="label-base">{t("meeting.join_a_meeting_desc")}</p>
        </div>
        <p className="label-base font-bold">{t("meeting.meeting_code")}</p>
        <div className="flex flex-row">
          <div className="w-full flex-1">
            <Input
              placeholder={t("meeting.enter_meeting_code")}
              className="bg-gray-base-100 border-0"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyPress={(event) => {
                if (event.charCode === 13) {
                  handleJoin();
                }
              }}
            />
          </div>
          <div className="pl-2">
            <Button className="btn-primary" isLoading={loading} onClick={handleJoin}>
              {t("home.join_meeting_now")}
            </Button>
          </div>
        </div>
      </GroupLayout>
    </div>
  );
};

export default withTranslation()(JoinAMeeting);
