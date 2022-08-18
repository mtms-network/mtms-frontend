import { COMMON } from "configs";
import { createStore } from "./store";

const MeetingStore = createStore({
  categories: null,
  types: null,
  statuses: null,
  isForceLoadMeetingHistories: false,
  meeting: null,
  defaultStartInstantMeeting: {
    maxParticipant: COMMON.MAX_PARTICIPANT,
    isKeepAlive: false,
    isActiveMember: false,
  },
});

export const useMeetingStore = MeetingStore.useStore;
export const MeetingStoreProvider = MeetingStore.Provider;
