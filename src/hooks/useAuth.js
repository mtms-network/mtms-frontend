import { useEffect } from "react";
import { getAccessToken } from "helpers";
import { useNavigate, useLocation } from "react-router-dom";
import { routeUrls } from "configs";
import { useAppStore } from "stores/app.store";

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appStore, setAppStore] = useAppStore();

  const checkToken = () => {
    const token = getAccessToken();

    if (token) {
      setAppStore((draft) => {
        draft.isAuthenticated = true;
      });
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
