import { useEffect } from "react";
import { getAccessToken, getUser } from "helpers";
import { useNavigate, useLocation } from "react-router-dom";
import { routeUrls } from "configs";
import { useAppStore } from "stores/app.store";

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appStore, updateAppStore] = useAppStore();

  const checkToken = () => {
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
        navigate("/");
      }
    } else if (location.pathname !== `/${routeUrls.login.path}`) {
      navigate(`/${routeUrls.login.path}`);
    }
  };

  return useEffect(() => {
    checkToken();
  }, [appStore.isAuthenticated]);
};

export default useAuth;
