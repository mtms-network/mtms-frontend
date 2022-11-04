import React, {useState} from "react";
import styles from "../index.module.css";
import {IconChat} from "../../../../../components/Icons/IconChat";
import moment from "moment";
import {likeRoom} from "../../../../../services";
import {API_RESPONSE_STATUS, routeUrls} from "../../../../../configs";
import {message} from "antd";
import {useNavigate} from "react-router-dom";

const RoomItem = ({item}) => {
    const navigate = useNavigate();
    const [isReload, setIsReload] = useState(false);
    const renderLiveTime = () => {
        const time = moment(item?.live_time?.time).format("LT")
        const date = moment(item?.live_time?.date).format("DD-MM-YYYY")
        return `${item?.live_time?.time}, ${date}, ${item?.user_timezone}`;
    }

    const onLike = async () => {
        const res = await likeRoom(item?.uuid);
        if(res?.status === API_RESPONSE_STATUS.success){
            message.success("Liked success");
            item.total_likes += 1;
            item.liked = true;
            setIsReload(!isReload);
        }else{
            message.error("Liked fail");
        }
    }

    const onDisLike = async () => {
        const res = await likeRoom(item?.uuid);
        if(res?.status === API_RESPONSE_STATUS.success){
            message.success("Dislike success");
            item.total_likes -= 1;
            item.liked = false;
            setIsReload(!isReload);
        }else{
            message.error("Dislike fail");
        }
    }

    const onJoin = async () => {
        try {
            if (item?.identifier) {
                window.open(`/${routeUrls.meetingRedirect.path}/${item?.identifier}`);
            }
        } catch (error) {
            console.log("start meeting error");
        }
    };

    return (
        <div className="w-full h-80 border-1 shadow-lg rounded-2xl p-3">
            <div className={`${ styles.roomItemTitle } font-size-small gap-6`}>
                <div className="flex gap-2 items-center">
                    <div className={`${styles.roomItemTitleItem} rounded`}>{ item?.type?.name }</div>
                    { item?.roomType?.name ? (
                        <div className={`${styles.roomItemTitleItem} rounded-2xl`}>{ item?.roomType?.name }</div>
                    ) : null }

                </div>
                <button
                    className="rounded-full w-8 h-8 bg-red-600 text-white font-bold"
                    onClick={onJoin}
                >
                    Join
                </button>
            </div>
            <div
                className={`h-full flex flex-col justify-between rounded w-full my-2 p-4 cursor-pointer ${styles.wrapper}`}
                style={{ height: '68%', backgroundImage: `url(${ item?.thumbnail ? item?.thumbnail : '../../images/bg-crypto.png'})`}}
                onClick={() => {
                    navigate(`/${routeUrls.exploreRoom.path}/view/${item.uuid}`)
                }}
            >
                {/* <img src={item?.thumbnail || '../../images/bg-crypto.png'} alt="icon" className={ styles.wrapperBackground } /> */}
                <div className={` h-1/3 flex justify-center gap-1 w-full items-center p-1.5 w-auto ${styles.roomItemBodyLive}`}>
                    <span className="w-20 font-bold">Live on</span>
                    <span className="font-size-small text-red-500">
                       { renderLiveTime() }
                    </span>
                </div>

                <div className="h-1/3">
                    <div className={`pt-2 ${styles.description}`}>
                        <span className="font-bold font-size-small">Live Topic: </span>
                        <span className={`font-size-small`}>
                            {/* <p dangerouslySetInnerHTML={{ __html: item?.description }} /> */}
                            { item?.live_topic }
                        </span>
                    </div>
                </div>

                <div className="h-1/3 flex items-center justify-between gap-2">
                    <div className={`font-bold ${styles.profileName}`}>
                        Join with: { item?.user?.profile?.name }
                    </div>
                    <div style={{width: '50px'}}>
                        <img src={ item?.user?.profile?.avatar || "../../../../images/logo.png" } alt="" className={`${styles.hexagon} rounded-full`}/>
                    </div>
                </div>
            </div>
            <div className={`title font-bold mb-1 ${styles.threeDot}`}>
                Room: { item.title }
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center font-size-small gap-1">
                    <IconChat size={16} />{ item?.total_comments } DISCUSSION
                </div>
                <div className="flex items-center font-size-small gap-1">
                    <div
                        className={`rounded px-1 py-0.5 border-1 cursor-pointer ${ item?.liked ? "border-primary" : "" }`}
                        onClick={ async () => {
                            if(item?.liked){
                                await onDisLike()
                            }else{
                                await onLike()
                            }
                        }}
                    >
                        { item?.liked ? "Liked" : "Like" }
                    </div>
                    <div className="rounded px-1 py-0.5 border-1">{ item?.total_likes }</div>
                </div>
            </div>
        </div>
    )
}

export default RoomItem;
