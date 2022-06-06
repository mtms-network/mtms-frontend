import React, { useEffect, useState } from "react";
import { IoCalendarClear, IoCheckmarkCircleOutline } from "react-icons/io5";
import classNames from "classnames";
import { Button, GroupLayout, GroupTitle, Input } from "components";
import { useMeetingStore } from "stores/meeting.store";
import { startMeeting } from "services/meeting.service";
import { LIVE_MEETING_URL } from "configs";

const StartInstantMeeting = ({ className }) => {
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
    <div className={classNames([className])}>
      <GroupLayout className="flex flex-col justify-between w-full">
        <GroupTitle icon={<IoCalendarClear />} title="Start Instant Meeting" />
        <div className="flex flex-row space-x-4 py-4">
          <div className="basis-1/2">
            <p className="label-base">Meeting code</p>
            <Input
              placeholder="Enter meeting code"
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
                    copy
                  </button>
                  {isCopied && (
                    <ul
                      tabIndex="0"
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box mb-2"
                    >
                      <p className="flex flex-row justify-center items-center space-x-2">
                        <span className="text-black">Copied</span>
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
          <div className="basis-1/2">
            <p className="label-base">Maximum participant</p>
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
        </div>
        <div className="flex flex-row space-x-4 py-4">
          <div className="flex-1">
            <p className="label-base">Select Meeting Type</p>
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
        <div className="flex flex-col sm:flex-row">
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
                <span className="label-base pb-0">Keep meeting live</span>
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
                <span className="label-base pb-0">Only accessible to active member</span>
              </label>
            </div>
          </div>
          <div className="basis-full sm:basis-1/2 flex items-end">
            <Button className="btn btn-primary btn-block" isLoading={loading} onClick={handleStart}>
              Start a instant meeting
            </Button>
          </div>
        </div>
      </GroupLayout>
    </div>
  );
};

export default StartInstantMeeting;
