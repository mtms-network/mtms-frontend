import React from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { signInSocial } from "services";
import { setTokenLoginSucceeded } from "helpers";
import { useAppStore } from "stores/app.store";
import { useNavigate } from "react-router-dom";
import { WalletButton } from "../WalletButtons";

export function GoogleButton({ showTitle = true }) {
  const [, updateAppStore] = useAppStore();
  const navigate = useNavigate();

  const handleResponse = async (result) => {
    try {
      if (result?.code) {
        const redirectUri = `${window.location.origin}`;
        const data = await signInSocial({ code: result.code, redirectUri });
        setTokenLoginSucceeded({ accessToken: data?.token, user: data?.user });
        updateAppStore((draft) => {
          draft.isAuthenticated = true;
        });
        navigate("/");
      }
    } catch (error) {
      console.log("GoogleButton:: error:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleResponse,
    redirect_uri: "http://localhost:3000/",
    flow: "auth-code",
  });

  return (
    <div className="flex">
      <WalletButton name="Google" src="/icons/google-logo.png" onClick={login} />
    </div>
  );
}
