import React, {useEffect} from "react";
import styles from "../index.module.css";
import {IconFollower} from "../../../../../components/Icons/IconFollower";
import {IconVideo} from "../../../../../components/Icons/IconVideo";
import {IconCalendar} from "../../../../../components/Icons/IconCalendar";
import {IconLike} from "../../../../../components/Icons/IconLike";

const RoomItem = () => {

    return (
        <div className={`h-60 w-full ${styles.wrapperBorder}`} style={{backgroundImage: `url("https://mtms.live/wp-content/uploads/2022/06/blog02-768x768.jpg")`}}>
            <div className="h-2/5">

            </div>
            <div className={`h-3/5 ${styles.wrapperBorderButton}`}>
                <div className={`${styles.buttonTitle} flex items-center justify-between relative`}>
                    <div className="color-danger flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-box" />
                        Live
                    </div>
                    <div className="flex items-center gap-2">
                        <div>Quách Hoài Nam</div>
                        <img alt="avatar" className={`${styles.avatar}`} src="https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png"/>
                        <div className={`flex items-center ${styles.follower}`}>
                            <IconFollower color="#FFFFFF66"/> 9500 Follower
                        </div>
                    </div>
                </div>
                <div className="w-2/3 m-auto border-t border-white"/>
                <div className="py-2">
                    <div className="font-bold text-sm">Room: Relax Tal</div>
                    <div className={`${styles.description}`}>
                        Live Topic:  com cientistas que trabalham
                        na NASA
                    </div>
                    <div className="flex items-center gap-1">
                        <IconVideo /> Video Conference
                    </div>
                    <div className="flex items-center gap-1">
                        <IconCalendar /> 8:24 PM, 28/04/2022 Melbourne/Aus
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <button className="px-1 rounded-md bg-white text-primary">
                            Join
                        </button>

                        <div className="flex gap-1">
                            <IconLike /> 100k
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomItem;
