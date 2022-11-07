import React from "react";
import {Button} from "../../../../../../components";
import {message} from "antd";
import {useTranslation} from "react-i18next";

const ShareRoom = ({identifier}) => {
    const { t } = useTranslation();
    const handleCopyLink = () => {
        const meetingUrl = `${window.location.origin}/m/${identifier}`;
        navigator.clipboard.writeText(meetingUrl);
        message.success(t("home.copied"));
    };

    return (
        <>
            <Button
                className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
                onClick={handleCopyLink}
            >
                Share Room
            </Button>
        </>
    )
}

export default ShareRoom;
