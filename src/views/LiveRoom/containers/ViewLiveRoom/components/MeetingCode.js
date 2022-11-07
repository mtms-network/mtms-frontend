import React, {useState} from "react";
import {Icon} from "../../../../../components";
import {IoCheckmarkCircleOutline} from "react-icons/io5";
import {useTranslation} from "react-i18next";

const MeetingCode = ({ identifier }) => {
    const { t } = useTranslation();
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyCode = (code) => {
        setIsCopied(true);
        navigator.clipboard.writeText(code);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <div className="flex space-x-[8px] items-center">
            <span>{t("meeting.meeting_code")}: </span>
            <span className="font-[700]">{identifier}</span>
            <div className="dropdown-top relative">
                <button
                    onClick={() => {
                        handleCopyCode(identifier);
                    }}
                >
                    <Icon className="h-6 w-6" src="/icons/icons/copy-light-outline.svg" alt="copy" />
                </button>
                {isCopied && (
                    <ul
                        tabIndex="0"
                        className="dropdown-content menu p-2 shadow bg-white rounded-box mb-2 absolute -left-8"
                    >
                        <p className="flex flex-row justify-center items-center space-x-2">
                            <span className="text-black">{t("home.copied")}</span>
                            <span className="text-success">
                      <IoCheckmarkCircleOutline />
                    </span>
                        </p>
                    </ul>
                )}
            </div>
        </div>

    )
}

export default MeetingCode;
