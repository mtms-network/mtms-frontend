import { combineProviders } from "./store";
import { AppStoreProvider } from "./app.store";
import { MeetingStoreProvider } from "./meeting.store";
import { WalletStoreProvider } from "./wallet.store";

const providers = [AppStoreProvider, MeetingStoreProvider, WalletStoreProvider];

export const AppContextProvider = combineProviders(...providers);
