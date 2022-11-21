import React, {useState} from "react";
import moment from "moment";
import {message} from "antd";
import {useNavigate} from "react-router-dom";
import styles from "../index.module.css";
import {IconChat} from "../../../../../components/Icons/IconChat";
import {IconToggleRight} from "../../../../../components/Icons/IconToggleRight";
import {disLikeRoom, likeRoom, startRoom} from "../../../../../services";
import {API_RESPONSE_STATUS, routeUrls} from "../../../../../configs";
import {UserOutlined, LikeOutlined} from "@ant-design/icons";
import {getUser} from "../../../../../helpers";

const RoomItem = ({item, isLive}) => {
    const navigate = useNavigate();
    const [isReload, setIsReload] = useState(false);
    const renderLiveTime = () => {
        const time = moment(item?.live_time?.time).format("LT");
        const date = moment(item?.live_time?.date).format("DD-MM-YYYY");
        return `${item?.live_time?.time}, ${date}, ${item?.user_timezone}`;
    };

    const onLike = async () => {
        const res = await likeRoom(item?.uuid);
        if (res?.status === API_RESPONSE_STATUS.success) {
            message.success("Liked success");
            item.total_likes += 1;
            item.liked = true;
            setIsReload(!isReload);
        } else {
            message.error("Liked fail");
        }
    };

    const onDisLike = async () => {
        const res = await disLikeRoom(item?.uuid);
        if (res?.status === API_RESPONSE_STATUS.success) {
            message.success("Dislike success");
            item.total_likes -= 1;
            item.liked = false;
            setIsReload(!isReload);
        } else {
            message.error("Dislike fail");
        }
    };

    const checkOwner = () => {
        const user = getUser();
        return user?.uuid?.toUpperCase() === item?.user?.uuid?.toUpperCase();
    }

    const onJoin = async () => {
        try {

            let start = true;
            if(checkOwner()){
                const res = await startRoom(item?.uuid);
                if(res?.status !== API_RESPONSE_STATUS.success){
                    start = false;
                }
            }

            if (item?.identifier && start) {
                window.open(`#/${routeUrls.meetingRedirect.path}/${item?.identifier}`);
            }
        } catch (error) {
            console.log("start meeting error");
        }
    };
    
    return (
        <div className={`w-full border-1 shadow-lg rounded-2xl p-3 ${styles.container}`}>
            <div className="flex flex-col gap-2" style={{height: '92%'}}>
                <div className={styles.header}>
                    <div className={`font-size-small rounded ${styles.headerLiveTime}`}>
                        {
                            isLive ? (
                                <span className="whitespace-nowrap text-red-500 font-bold">LIVE NOW</span>
                            ) : (
                                <>
                                    <span className="whitespace-nowrap text-red-500 font-bold">LIVE ON</span>
                                    <span>{ moment(item?.live_time?.date).format("LLL") } { item?.user_timezone }</span>
                                </>
                            )
                        }
                    </div>
                </div>
                <div
                    className={`flex flex-col justify-between rounded w-full p-2 ${styles.wrapper}`}
                    style={{
                        height: '40%',
                        backgroundImage: `url(${item?.thumbnail ? item?.thumbnail : '../../images/bg-crypto.png'})`,
                        backgroundSize: '100% 100%'
                    }}
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
                    <div className="flex items-center gap-2">
                        <div style={{width: '50px'}}>
                            <img src={item?.user?.profile?.avatar || "../../../../images/logo.png"} alt=""
                                 className={`${styles.hexagon} rounded-full`}/>
                        </div>
                        <div className={`w-4/5 ${styles.profileName}`}>
                            <div className={`font-bold ` + styles.threeDot}>
                                {item.title}
                            </div>
                            <div className={`flex items-center ` + styles.threeDot}>
                                <div className="flex">
                                    <UserOutlined/>
                                </div>
                                <div className={`pl-1 mt-1`}>{item?.user?.profile?.name}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.description}`}>
                    <span className="font-size-small">Live Topic: </span>
                    <span className="font-size-small">
                            {/* <p dangerouslySetInnerHTML={{ __html: item?.description }} /> */}
                        {item?.live_topic}
                </span>
                </div>
                <div className="flex justify-between">
                    <a
                        className="btn-primary p-1 px-5 rounded text-white font-bold w-full flex justify-between"
                        onClick={onJoin}
                    >
                        <span>Join</span>
                        <IconToggleRight/>
                    </a>

                </div>
            </div>
            <div className="flex items-center justify-between mt-1">
                <div className="flex items-center font-size-small gap-1">
                    <IconChat size={16}/>{item?.total_comments} discussions
                </div>
                <div className="flex items-center font-size-small gap-1">
                    <div
                        title={item?.liked ? 'You liked this room' : 'Clicks to like this room'}
                        className={`rounded px-1 py-0.5 border-1 cursor-pointer hover:border-info ${item?.liked ? "border-primary text-primary" : ""}`}
                        onClick={async () => {
                            if (item?.liked) {
                                await onDisLike();
                            } else {
                                await onLike();
                            }
                        }}
                    >
                        <div className={`flex items-center`}>
                            <LikeOutlined/>
                            <span className={`px-1`}>{item?.total_likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomItem;
