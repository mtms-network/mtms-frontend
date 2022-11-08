import React from "react";
import {Button, IconBase} from "../../../../../../components";
import {useLiveRoomStore} from "../../../../../../stores/liveroom.store";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {routeUrls} from "../../../../../../configs";

const UpdateComing = ({isOwner, live_time, timeZone, uuid}) => {
    const navigate = useNavigate();
    return (
        <div className="p-2 mb-2 gap-4">
            <div className="rounded-2xl bg-red-500 inline-flex p-3.5 m-1.5 text-white">
                Upcoming Live Meeting: { moment(live_time).format("LLL") } { timeZone }
            </div>

            {
                isOwner ? (
                    <Button
                        className="inline-flex m-1.5 btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4"
                        onClick={() => {
                            navigate(`/${routeUrls.exploreRoom.path}/${uuid}/edit`)
                        }}
                    >
                        Update
                    </Button>
                ) : null
            }

            <Button
                className=" inline-flex m-1.5 btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0"
            >
                Vote New Live: 100
            </Button>
        </div>
    )
}

export default UpdateComing;
