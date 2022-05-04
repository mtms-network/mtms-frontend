import { useEffect } from "react";
import { getAccessToken, getUser } from "helpers";
import { useNavigate, useLocation } from "react-router-dom";
import { routeUrls } from "configs";
import { useAppStore } from "stores/app.store";
import { getRequirePreMeeting } from "services/meeting.service";
import { useMeetingStore } from "stores/meeting.store";

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appStore, setAppStore] = useAppStore();
  const [, setMeetingStore] = useMeetingStore();

  const fetchCommonData = async () => {
    try {
      const res = await getRequirePreMeeting();
      if (res) {
        setMeetingStore((draft) => {
          draft.categories = res?.categories;
          draft.types = res?.types;
          draft.statuses = res?.statuses;
        });
      }
    } catch (error) {}
  };

  const checkToken = () => {
    const token = getAccessToken();

    if (token) {
      if (!appStore.isAuthenticated) {
        const me = getUser();
        setAppStore((draft) => {
          draft.isAuthenticated = true;
          draft.user = me;
        });
        fetchCommonData();
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
