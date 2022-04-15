import { combineProviders } from "./store";
import { AppStoreProvider } from "./app.store";

const providers = [AppStoreProvider];

export const AppContextProvider = combineProviders(...providers);
