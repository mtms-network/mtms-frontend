import React, { useState } from "react";
import { IoCalendarSharp } from "react-icons/io5";
import { Button, GroupLayout, GroupTitle, Input } from "components";
import classNames from "classnames";
import { joinMeetingByCode } from "services/meeting.service";
import { LIVE_MEETING_URL } from "configs";
import { withNamespaces } from 'react-i18next';

const JoinAMeeting = ({ className, t }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    try {
      if (code) {
        setLoading(true);
        const res = await joinMeetingByCode({ code });
        if (res?.data?.uuid) {
          window.open(`${LIVE_MEETING_URL}/${code}`, "_blank");
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className={classNames([className])}>
      <GroupLayout className="flex flex-col justify-between">
        <GroupTitle icon={<IoCalendarSharp />} title={ t('meeting.join_a_meeting') } />
        <div className="flex flex-col py-4">
          <p className="label-base">
            { t('meeting.join_a_meeting_desc') }
          </p>
          <p className="label-base">{ t('meeting.meeting_code') }</p>
        </div>
        <div className="flex flex-col">
          <Input
            placeholder={ t('meeting.enter_meeting_code') }
            className="bg-gray-base-100 border-0"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="w-full pt-4">
            <Button className="btn btn-primary btn-block" isLoading={loading} onClick={handleJoin}>
              Join meeting now
            </Button>
          </div>
        </div>
      </GroupLayout>
    </div>
  );
};

export default withNamespaces()(JoinAMeeting);
