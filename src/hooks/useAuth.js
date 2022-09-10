import { useEffect } from "react";
import {getAccessToken, getParamUrl, setLanguage, getUser} from "helpers";
import { useNavigate, useLocation } from "react-router-dom";
import {LOCAL_STORAGE_KEYS, routeUrls} from "configs";
import { useAppStore } from "stores/app.store";
import { getUser as getUserApi} from "../services/auth.service";

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appStore, updateAppStore] = useAppStore();

  const check = () => {
    const token = getAccessToken();

    if (token) {
      if (!appStore.isAuthenticated) {
        const me = getUser();
        updateAppStore((draft) => {
          draft.isAuthenticated = true;
          draft.user = me;
        });
      }

      if (location.pathname === `/${routeUrls.login.path}`) {
        navigate(`/${routeUrls.meeting.path}`);
      }
    } else if (location.pathname !== `/${routeUrls.login.path}`) {
      navigate(`/${routeUrls.login.path}`);
    }
  }

  const checkToken = () => {
    const paramToken = getParamUrl('t');
    const checkAuthByParam = async () => {
      try {
        if(paramToken){
          const user = await getUserApi(paramToken);
          if(user){

            localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user));
            localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, paramToken);
            navigate('/');
          }
        }

      }
      catch (err){}
    }

    if(paramToken){
      checkAuthByParam().then((res) => {
        check();
      });
    }else{
      check();
    }
  };

  return useEffect(() => {
    checkToken();
  }, [appStore.isAuthenticated]);
};

export default useAuth;
