import { createStore } from "./store";

const AppStore = createStore({
  language: "en",
  loading: false,
  isAuthenticated: false,
  user: {},
  notification: {
    isShow: false,
    type: "info",
    message: "",
  },
  resetPassword: {
    email: "",
    code: "",
  },
  registerData: null,
  loadingIcon: false,
  loadingIconTitle: "",
  appendComponentLayout: null,
  isLoginGoogleCalendar: false,
});

export const useAppStore = AppStore.useStore;
export const AppStoreProvider = AppStore.Provider;
