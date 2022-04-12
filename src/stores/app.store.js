import { createStore } from "./store";

export const AppStore = createStore({
  language: "en",
  loading: false,
  isAuthenticated: false,
  user: {},
  notification: {
    isShow: false,
    type: "info",
    message: "",
  },
});

export const useAppStore = AppStore.useStore;
