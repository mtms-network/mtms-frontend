import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkMeetingExist, joinMeeting } from "../../services";
import { LIVE_MEETING_URL } from "../../configs";
import { BrandLogoLoading, MainLayout } from "../../components";

const MeetingRedirect = () => {
  const { meetingId } = useParams();

  const fetchMeeting = async () => {
    try {
      const res = await checkMeetingExist(meetingId);
      if (res && res?.meeting?.id) {
        await joinMeeting(meetingId);
        let url = `${LIVE_MEETING_URL}/${res?.meeting.id}`;

        if (res?.meeting?.jwt) {
          url += `?jwt=${res.meeting.jwt}`;
        }

        window.location = url;
      } else {
        window.location =  `${LIVE_MEETING_URL}/${meetingId}`;
      }
    } catch (error) {
      console.log("ScheduleMeetingDetail", error);
    }
  };

  useEffect(() => {
    fetchMeeting().then();
  }, []);

  return (
    <div className="h-screen">
      <BrandLogoLoading />
    </div>
  );
};

export default MeetingRedirect;
