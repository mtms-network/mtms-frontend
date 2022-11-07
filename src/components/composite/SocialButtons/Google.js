import React from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { signInSocial } from "services";
import { setTokenLoginSucceeded } from "helpers";
import { useAppStore } from "stores/app.store";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "configs";
import { WalletButton } from "../WalletButtons";

export function GoogleButton({
                                 showTitle = true,
                                 className = "",
                                 name = "Google",
                                 customHandleResponse = null,
                             }) {
    const [, updateAppStore] = useAppStore();
    const navigate = useNavigate();

    const handleResponse = async (result) => {
        if (customHandleResponse){
            customHandleResponse(result);
        }else {
            try {
                if (result?.code) {
                    const redirectUri = `${window.location.origin}`;
                    const data = await signInSocial({ code: result.code, redirectUri });
                    setTokenLoginSucceeded({ accessToken: data?.token, user: data?.user });
                    updateAppStore((draft) => {
                        draft.isAuthenticated = true;
                        draft.user = data?.user;
                        draft.googleCalendar = {
                            integrated: data?.google_calendar_info?.integrated,
                            email: data?.google_calendar_info?.email,
                            name: data?.google_calendar_info?.name,
                        };
                    });
                    navigate(`/${routeUrls.exploreRoom.path}`);
                }
            } catch (error) {
                console.log("GoogleButton:: error:", error);
            }
        }
    };

    let optionGoogle = {
        onSuccess: handleResponse,
        redirect_uri: "http://localhost:3000/",
        flow: "auth-code",
    }

    if(customHandleResponse){
        optionGoogle.scope = "https://www.googleapis.com/auth/calendar";
    }

    const login = useGoogleLogin(optionGoogle);

    return (
        <div className="flex">
            <WalletButton name={name} className={className} src={`${ customHandleResponse != null ? "/images/google-calendar.png" : "/icons/google-logo.png" }`} onClick={login} />
        </div>
    );
}
