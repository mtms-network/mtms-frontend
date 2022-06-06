import { combineProviders } from "./store";
import { AppStoreProvider } from "./app.store";
import { MeetingStoreProvider } from "./meeting.store";

const providers = [AppStoreProvider, MeetingStoreProvider];

export const AppContextProvider = combineProviders(...providers);
