import { combineProviders } from "./store";
import { AppStoreProvider } from "./app.store";
import { MeetingStoreProvider } from "./meeting.store";
import { WalletStoreProvider } from "./wallet.store";
import { LiveRoomStoreProvider } from "./liveroom.store";

const providers = [AppStoreProvider, MeetingStoreProvider, WalletStoreProvider, LiveRoomStoreProvider];

export const AppContextProvider = combineProviders(...providers);
