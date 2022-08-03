import React, { useEffect, useState } from "react";
import { IoCalendarClear, IoCheckmarkCircleOutline } from "react-icons/io5";
import classNames from "classnames";
import { Button, GroupLayout, GroupTitle, Input } from "components";
import { useMeetingStore } from "stores/meeting.store";
import { startMeeting } from "services";
import { LIVE_MEETING_URL } from "configs";
import { withTranslation } from "react-i18next";

const StartInstantMeeting = ({ className, t }) => {
  const [meetingStore, updateMeetingStore] = useMeetingStore();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [participant, setParticipant] = useState("");
  const [type, setType] = useState(null);
  const [isKeepAlive, setIsKeepALive] = useState(false);
  const [isOnlyActiveMember, setIsOnlyActiveMember] = useState(true);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(code);
    setTimeout(() => {
      setIsCopied(false);
    }, [1000]);
  };

  const handleStart = async () => {
    try {
      setLoading(true);
      const res = await startMeeting({
        maxParticipant: participant > 0 ? participant : 1000,
        type,
        isKeepAlive,
        isActiveMember: isOnlyActiveMember,
      });
      if (res?.data?.meeting?.uuid) {
        window.open(`${LIVE_MEETING_URL}/${res?.data?.meeting.identifier}`, "_blank");
        updateMeetingStore((draft) => {
          draft.isForceLoadMeetingHistories = true;
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (meetingStore?.types?.length) {
      setType(meetingStore.types[0]);
    }
  }, [meetingStore.types]);

  return (
    <div className={classNames([className, "flex flex-col"])}>
      <GroupLayout
        className="flex flex-col justify-between w-full"
        titleComponent={
          <GroupTitle icon={<IoCalendarClear />} title={t("home.start_instant_meeting")} />
        }
      >
        <div className="flex flex-row space-x-4 pb-4">
          <div className="flex-1">
            <p className="label-base font-bold">{t("meeting.select_meeting_type")}</p>
            <div className="flex-wrap flex gap-2 w-full">
              {meetingStore?.types?.map((item) => {
                return (
                  <button
                    className={classNames(
                      type?.uuid === item.uuid
                        ? "btn btn-primary btn-outlined-base"
                        : "btn btn-fill-base",
                    )}
                    key={item.uuid}
                    onClick={() => {
                      setType(item);
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="basis-full sm:basis-1/2 py-4 sm:py-0">
            <p className="label-base font-bold">{t("home.maximum_participant")}</p>
            <Input
              placeholder="1000"
              className="bg-gray-base-100 border-0"
              value={participant}
              type="number"
              min="1"
              onChange={(e) => {
                const { value } = e.target;
                if (value <= 99999 && value >= 0 && value.length <= 5) {
                  setParticipant(e.target.value);
                }
              }}
            />
          </div>
          <div className="basis-full sm:basis-1/2">
            <p className="label-base font-bold">{t("meeting.meeting_code")}</p>
            <Input
              placeholder={t("meeting.enter_meeting_code")}
              className="bg-gray-base-100 border-0"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              rightButton={
                <div className={classNames("dropdown", isCopied && "dropdown-top")}>
                  <button
                    className="btn btn-primary btn-outlined-base btn-xs"
                    onClick={handleCopyCode}
                  >
                    {t("general.copy")}
                  </button>
                  {isCopied && (
                    <ul
                      tabIndex="0"
                      className="dropdown-content menu p-2 shadow bg-white rounded-box mb-2"
                    >
                      <p className="flex flex-row justify-center items-center space-x-2">
                        <span className="text-black">{t("home.copied")}</span>
                        <span className="text-success">
                          <IoCheckmarkCircleOutline />
                        </span>
                      </p>
                    </ul>
                  )}
                </div>
              }
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row pt-4">
          <div className="basis-full sm:basis-1/2 flex flex-col justify-start items-start">
            <div className="form-control">
              <label className="label cursor-pointer flex justify-center items-center gap-2">
                <input
                  type="checkbox"
                  value={isKeepAlive}
                  className="checkbox checkbox-primary checkbox-sm"
                  onChange={() => {
                    setIsKeepALive(!isKeepAlive);
                  }}
                />
                <span className="label-base pb-0">{t("meeting.keep_meeting_live")}</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer flex justify-center items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  value={isOnlyActiveMember}
                  onChange={() => {
                    setIsOnlyActiveMember(!isOnlyActiveMember);
                  }}
                />
                <span className="label-base pb-0">
                  {t("meeting.props.only_accessible_to_members")}
                </span>
              </label>
            </div>
          </div>
          <div className="basis-full sm:basis-1/2 flex items-end">
            <Button className="btn btn-primary btn-block" isLoading={loading} onClick={handleStart}>
              {t("home.start_a_instant_meeting")}
            </Button>
          </div>
        </div>
      </GroupLayout>
    </div>
  );
};

export default withTranslation()(StartInstantMeeting);
