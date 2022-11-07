/* eslint-disable no-underscore-dangle */
export const LIVE_MEETING_URL = "https://meetingapp.mtms.live";

export const LIVE_URL = "https://api.mtms.live";

export const LIVE_API = "https://api-dev.mtms.live/api";
// export const LIVE_API = "http://mtms.localhost/api";

export const GOOGLE_CLIENT_ID = "283062678453-9ja1ecrp24uo63dsh93ct4r13gvj7ves.apps.googleusercontent.com";

export const AVATAR_UPLOAD_URL = "/profile/avatar";

export const WALLET_ADDRESS = {
    // RINKEBY_ETH: "0xb637475158e3Dd6985DCc015AA143F1C91098AB5",
    RINKEBY_ETH: "0xFeb38aF8D13d1cCd125cAFF6646aA4333B239C3A",
    MUMBOA: "0xCdF44978B624E9CA4D54e8fb0AB2711B746C9849",
    MTMS: '0xB7E3373EAA064703cB9608a218daeED349C60DfD'
}

export const BASE_API = {
    api: "/api",
    auth: "/auth",
    meeting: "/meetings",
    profile: "/profile",
    avatar: "/profile/avatar",
    changePassword: "/auth/change-password",
    wallet: "/wallet",
    todo: '/utility/todos',
    contact: '/contacts',
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
    mumbai: 80001,
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
        tokenId: [],
        boxes_opened: [],
        boxes_opened_contract: [],
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
        boxes_opened: [],
        boxes_opened_contract: [],
    },
];

export const CONFIGS = {
    boxUrl: "https://box.mtms.live",
};
