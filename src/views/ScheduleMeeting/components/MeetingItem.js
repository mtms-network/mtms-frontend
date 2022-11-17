import React, {useEffect, useRef} from "react";
import moment from "moment/moment";
import {t} from "i18next";
import styles from "../index.module.css";
import {useNavigate} from "react-router-dom";
import {API_RESPONSE_STATUS, routeUrls} from "../../../configs";
import {pinMeeting} from "../../../services";
import {message} from "antd";
import {useDispatch} from "react-redux";
import {setIsReloadPin, setIsReloadToDay, setIsReloadUpcoming} from "../../../redux/reducers/ScheduleMeetingReducer";

const MeetingItem = ({ data, isPinAction }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = data?.uuid

    const onGoToDetail = () => {
        navigate(`/${routeUrls.scheduleMeeting.path}/view/${data?.uuid}`)
    }

    const pin = async () => {
        const res = await pinMeeting(data?.uuid);
        if(res?.status === API_RESPONSE_STATUS.success){
            message.success(res?.message || "");
            await dispatch(setIsReloadPin(true));
            await dispatch(setIsReloadToDay(true));
            await dispatch(setIsReloadUpcoming(true));
        }else{
            message.error("Pin fail");
        }
    }

    return (
        <div className="w-full flex justify-center" id={id}>
            <div
                 // style={{width: 529}}
                className="bg-white rounded-xl shadow-2xl w-full p-2 flex flex-col gap-2"
            >
                <div className={"h-32 w-full cursor-pointer"} onClick={onGoToDetail}>
                    <img className="h-full w-full rounded" src={ data?.thumbnail || "https://api-dev.mtms.live/images/meeting-cover/Crypto.png"} alt={"Thumbnail"}/>
                </div>
                <div className="flex items-center gap-4 px-2 cursor-pointer" onClick={onGoToDetail}>
                    <div className="w-12 h-12 flex">
                        <img src={data?.user?.profile?.avatar} alt={"avatar"} className="rounded-full"/>
                    </div>
                    <div className="font-bold cursor-pointer" onClick={onGoToDetail}>
                        <div className={ styles.nowrap + ' truncate w-40'}>{ data?.title }</div>
                        <div className={ styles.nowrap + ' truncate w-40'}>Host: { data?.user?.profile?.name }</div>
                    </div>
                </div>
                <div className={`px-2 ${styles.meetingItemDesc} cursor-pointer`} onClick={onGoToDetail}>
                    <span>Meeting topic:</span>
                    {data?.agenda}
                    {/* <div> */}
                    {/*     <span dangerouslySetInnerHTML={{ __html: data?.description }} /> */}
                    {/* </div> */}
                </div>
                <div className="flex w-full justify-between px-2">
                    <div className="font-size-small">
                        <div className="flex flex-row space-x-2 items-start group-hover:text-primary">
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
                        <div className="flex flex-row space-x-2 items-center mt-1 group-hover:text-primary">
                            <img src="/images/icon/clock.svg" alt="" />
                            <p className="label-base p-0 group-hover:text-primary">
                                {`${data?.period || 0} `}
                                {t("list.general.durations.minutes")}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="btn btn-primary btn-outlined-base" onClick={pin}>
                            { isPinAction ? "Pin" : "Unpin" }
                        </button>
                    </div>
                </div>
                <div className="flex justify-between">
                    <a
                        className="btn-primary py-1.5 px-5 rounded text-white font-bold w-full flex justify-center"
                        onClick={() => {}}
                    >
                        <span>Join</span>
                    </a>

                </div>
            </div>
        </div>
    )
}

export default MeetingItem;
