import React from "react";
import styles from "../index.module.css";
import {IconChat} from "../../../../../components/Icons/IconChat";

const RoomItem = () => {
    return (
        <div className="w-full h-80 border-1 shadow-lg rounded-2xl p-3">
            <div className={`${ styles.roomItemTitle } font-size-small gap-6`}>
                <div className={`${styles.roomItemTitleItem} rounded`}>Video Conference</div>
                <div className={`${styles.roomItemTitleItem} rounded-2xl`}>Crypto</div>
            </div>
            <div className={`flex flex-col justify-between rounded w-full my-3 p-4`} style={{ backgroundImage: `url("../../images/bg-crypto.png")`, height: '68%' }}>
                <div className={`flex justify-center gap-1 w-full items-center p-1.5 w-auto ${styles.roomItemBodyLive}`}>
                    <span className="w-20 font-bold">Live on</span>
                    <span className="font-size-small text-red-500">
                        8:24 PM, 28/04/2022 Melbourne/Aus
                    </span>
                </div>

                <div className="mt-2">
                    <span className="font-bold font-size-small">Live Topic: </span>
                    <span className="font-size-small">I want to talk with everyone about everything. Just some time feel boring while i work from home</span>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <button className="rounded-full w-8 h-8 bg-red-500 font-bold">Join</button>
                    <div className="px-1">Quách hoài nam</div>
                    <div className={styles.hexagon}>
                        <img src="http://gravatar.com/avatar/e20a1eb8fedf2831348ab4adfbe2989d?s=512" alt="" className="rounded-full"/>
                    </div>
                </div>
            </div>
            <div className="title font-bold">
                Room: Down Trend Market
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center font-size-small gap-1">
                    <IconChat size={16} />7.589 DISCUSSION
                </div>
                <div className="flex items-center font-size-small gap-1">
                    <div className="rounded px-1 py-0.5 border-1">Liked</div>
                    <div className="rounded px-1 py-0.5 border-1">100k</div>
                </div>
            </div>
        </div>
    )
}

export default RoomItem;
