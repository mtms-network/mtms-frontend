import React from "react";
import {routeUrls} from "../../../../../../configs";
import {Button} from "../../../../../../components";
import {useNavigate} from "react-router-dom";

const BtnEdit = ({t, meeting}) => {
    const navigate = useNavigate();

    return (
        <Button
            className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4"
            onClick={() => {
                navigate(`/${routeUrls.liveRoom.path}/${meeting?.uuid}/edit`);
            }}
        >
            {t("general.edit")}
        </Button>
    )
}

export default BtnEdit;
