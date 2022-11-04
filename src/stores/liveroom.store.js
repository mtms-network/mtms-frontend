import { createStore } from "./store";

const LiveRoomStore = createStore({
    comments: [],
});

export const useLiveRoomStore = LiveRoomStore.useStore;
export const LiveRoomStoreProvider = LiveRoomStore.Provider;
