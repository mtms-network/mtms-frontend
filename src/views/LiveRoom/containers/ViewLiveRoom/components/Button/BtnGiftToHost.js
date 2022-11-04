import React from "react";
import {Button} from "../../../../../../components";

const BtnGiftToHost = () => {
    return (
        <>
            <Button
                className="btn btn-outline btn-primary rounded-5 h-10 min-h-10 !mt-0 !mb-4 !mr-4 flex items-center gap-0.5"
                // onClick={handleStart}
            >
                Gift To Host
                <img src="../../../images/logo.png" alt="logo" className="W-5 h-5"/>
            </Button>
        </>
    )
}

export default BtnGiftToHost;
