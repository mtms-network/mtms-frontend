import { createStore } from "./store";

const MeetingStore = createStore({
  categories: null,
  types: null,
  statuses: null,
  isForceLoadMeetingHistories: false,
});

export const useMeetingStore = MeetingStore.useStore;
export const MeetingStoreProvider = MeetingStore.Provider;
