import { createStore } from "./store";

const WalletStore = createStore({
  wallet: null,
});

export const useWalletStore = WalletStore.useStore;
export const WalletStoreProvider = WalletStore.Provider;
