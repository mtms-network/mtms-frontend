/* eslint-disable no-underscore-dangle */
export const LIVE_MEETING_URL = "https://meeting.mtms.live";

export const LIVE_URL = "https://api.mtms.live";

export const LIVE_API = "https://api-dev.mtms.live/api";
// export const LIVE_API = "http://mtms.localhost/api";

export const GOOGLE_CLIENT_ID =
  "604052992702-lnrd7mi7iapok8jrhiohvok1s9m11k7l.apps.googleusercontent.com";

export const AVATAR_UPLOAD_URL = "/profile/avatar";

export const WALLET_ADDRESS = {
  // RINKEBY_ETH: "0xb637475158e3Dd6985DCc015AA143F1C91098AB5",
  RINKEBY_ETH: "0xFeb38aF8D13d1cCd125cAFF6646aA4333B239C3A",
}

export const BASE_API = {
  api: "/api",
  auth: "/auth",
  meeting: "/meetings",
  profile: "/profile",
  avatar: "/profile/avatar",
  changePassword: "/auth/change-password",
  wallet: "/wallet",
};

export const ALERT_TYPE = {
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  WARNING: "WARNING",
  ERROR: "ERROR",
  MESSAGE: "MESSAGE",
};

export const WALLET_NETWORK = {
  mainnet: 1,
  kovan: 42,
  ropsten: 3,
  renkeby: 4,
  goerli: 5,
}

export const API_RESPONSE_STATUS = {
  success: "success",
};

export const COMMON = {
  MAX_PARTICIPANT: 50,
};

export const MEETING_STATUS = {
  ended: "ended",
  scheduled: "scheduled",
  live: "live",
};

export const WALLET_PROVIDER = {
  oasis: {
    type: "oasis",
    name: "Oasis",
    image: "/icons/oasis-logo.png",
  },
  binance: {
    type: "binance",
    name: "Binance",
    image: "/icons/binance-logo.png",
  },
  metamask: {
    type: "metamask",
    name: "MetaMask",
    image: "/icons/metamask-logo.png",
  },
  avalanche: {
    type: "avalanche",
    name: "Avalanche",
    image: "/icons/avalanche-logo.png",
  },
};

export const BOXES = [
  {
    id: null,
    photo: "/images/common-box.svg",
    name: "COMMON BOX",
    sku: "box-common",
    isEpicBox: false,
    owning: 0,
    available: 0,
    tokenId: []
  },
  {
    id: null,
    photo: "/images/box-vip.svg",
    name: "EPIC BOX",
    owning: 0,
    available: 0,
    isEpicBox: true,
    tokenId: [],
    sku: "box-epic",
  },
];

export const CONFIGS = {
  boxUrl: "https://box.mtms.live",
};
