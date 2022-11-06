import React, {useState} from "react";
import moment from "moment";
import {message} from "antd";
import {useNavigate} from "react-router-dom";
import styles from "../index.module.css";
import {IconChat} from "../../../../../components/Icons/IconChat";
import {IconToggleRight} from "../../../../../components/Icons/IconToggleRight";
import {likeRoom} from "../../../../../services";
import {API_RESPONSE_STATUS, routeUrls} from "../../../../../configs";

const RoomItem = ({item}) => {
    const navigate = useNavigate();
    const [isReload, setIsReload] = useState(false);
    const renderLiveTime = () => {
        const time = moment(item?.live_time?.time).format("LT");
        const date = moment(item?.live_time?.date).format("DD-MM-YYYY");
        return `${item?.live_time?.time}, ${date}, ${item?.user_timezone}`;
    };

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
    };

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
    };

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
        <div className={`w-full border-1 shadow-lg rounded-2xl p-3 ${styles.container}`}>
            <div className={ styles.header }>
                <div className={`font-size-small rounded border-1 border-red-500 ${styles.headerLiveTime}`}>
                    <span className="whitespace-nowrap text-red-500 font-bold">LIVE ON</span>
                    <span>8:24 PM, 28/04/2022 Melbourne/Aus</span>
                </div>
            </div>
            <div
                className={`flex flex-col justify-between rounded w-full my-2 p-2 ${styles.wrapper}`}
                style={{ height: '40%', backgroundImage: `url(${ item?.thumbnail ? item?.thumbnail : '../../images/bg-crypto.png'})`}}
                onClick={() => {
                    navigate(`/${routeUrls.exploreRoom.path}/view/${item.uuid}`);
                }}
             />
            <div
                onClick={() => {
                    navigate(`/${routeUrls.exploreRoom.path}/view/${item.uuid}`);
                }}
                className="cursor-pointer"
            >
                <div className="h-1/3 flex items-center gap-2">
                    <div style={{width: '50px'}}>
                        <img src={ item?.user?.profile?.avatar || "../../../../images/logo.png" } alt="" className={`${styles.hexagon} rounded-full`}/>
                    </div>
                    <div className={`font-bold w-4/5 ${styles.profileName}`}>
                        <div className={styles.threeDot}>
                            Room: { item.title }
                        </div>
                        <div className={styles.threeDot}>
                            Host: { item?.user?.profile?.name }
                        </div>
                    </div>
                </div>
            </div>
            <div className={`pt-2 ${styles.description}`}>
                <span className="font-bold font-size-small">Live Topic: </span>
                <span className="font-size-small">
                            {/* <p dangerouslySetInnerHTML={{ __html: item?.description }} /> */}
                    { item?.live_topic }
                </span>
            </div>
            <div className="flex justify-between py-0.5">
                <a
                    className="btn-primary p-1 px-5 rounded text-white font-bold w-full flex justify-between"
                    onClick={onJoin}
                >
                    <span>Join</span>
                    <IconToggleRight />
                </a>

            </div>
            <div className="flex items-center justify-between mt-1">
                <div className="flex items-center font-size-small gap-1">
                    <IconChat size={16} />{ item?.total_comments } DISCUSSION
                </div>
                <div className="flex items-center font-size-small gap-1">
                    <div
                        className={`rounded px-1 py-0.5 border-1 cursor-pointer ${ item?.liked ? "border-primary" : "" }`}
                        onClick={ async () => {
                            if(item?.liked){
                                await onDisLike();
                            }else{
                                await onLike();
                            }
                        }}
                    >
                        { item?.liked ? "Liked" : "Like" }
                    </div>
                    <div className="rounded px-1 py-0.5 border-1">{ item?.total_likes }</div>
                </div>
            </div>
        </div>
    );
};

export default RoomItem;
