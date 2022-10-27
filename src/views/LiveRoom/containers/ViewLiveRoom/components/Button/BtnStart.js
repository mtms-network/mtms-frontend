import React from "react";
import {Button} from "../../../../../../components";
import {routeUrls} from "../../../../../../configs";

const BtnStart = ({t, meeting}) => {

    const handleStart = async () => {
        try {
            if (meeting) {
                window.open(`/${routeUrls.meetingRedirect.path}/${meeting?.identifier}`);
            }
        } catch (error) {
            console.log("start meeting error");
        }
    };

    return (
        <Button
            className="btn btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
            onClick={handleStart}
        >
            {t("general.start")}
        </Button>
    )
}

export default BtnStart;
