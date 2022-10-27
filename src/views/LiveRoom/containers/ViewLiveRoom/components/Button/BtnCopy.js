import React from "react";
import {Button, IconBase} from "../../../../../../components";
import {message} from "antd";

const BtnCopy = ({t, meeting}) => {

    const handleCopyLink = () => {
        const meetingUrl = `${window.location.origin}/m/${meeting?.identifier}`;
        navigator.clipboard.writeText(meetingUrl);
        message.success(t("home.copied"));
    };

    return (
        <Button
            className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
            onClick={handleCopyLink}
        >
            <IconBase className="mr-2" icon="/icons/icons/copy-primary-outline.svg" />
            {t("general.copy_link")}
        </Button>
    )
}

export default BtnCopy;
