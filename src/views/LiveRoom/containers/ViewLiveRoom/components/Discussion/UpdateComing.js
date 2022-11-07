import React from "react";
import {Button, IconBase} from "../../../../../../components";
import {useLiveRoomStore} from "../../../../../../stores/liveroom.store";
import moment from "moment";

const UpdateComing = ({isOwner, live_time, timeZone}) => {
    const [liveRoomStore, updateLiveRoomStore] = useLiveRoomStore();

    return (
        <div className="p-2 mb-2">
            <div className="rounded-2xl bg-red-500 inline p-4 mr-3 text-white">
                Upcoming Live Meeting: { moment(live_time).format("LLL") } { timeZone }
            </div>

            {
                isOwner ? (
                    <Button
                        className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
                    >
                        Update
                    </Button>
                ) : null
            }

            <Button
                className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mr-4"
            >
                Vote New Live: 100
            </Button>
        </div>
    )
}

export default UpdateComing;
