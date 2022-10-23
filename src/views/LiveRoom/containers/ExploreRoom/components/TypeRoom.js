import React from "react";
import { Avatar } from 'antd';

const arrType = [
    { label: "Home", color: "#0391FE" },
    { label: "Talk", color: "#23B121" },
    { label: "Learn", color: "#F5841F" },
    { label: "Work", color: "#00E5FF" },
    { label: "Play", color: "#F23A5E" },
]

const TypeRoom = () => {
    return (
        <div className="flex gap-4">
            { arrType.map((t, index) => {
                return (
                    <div
                        className="w-24 text-center cursor-pointer py-3 px-3 rounded-2xl text-white opacity-50"
                        key={index}
                        style={{ backgroundColor: t.color}}
                    >
                        { t.label }
                    </div>
                )
            }) }
        </div>
    )
}

export default TypeRoom;
