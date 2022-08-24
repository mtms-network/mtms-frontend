import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WalletProvider } from "react-binance-wallet";
import { MetaMaskProvider } from "metamask-react";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { IconBase } from "components/base";
import classNames from "classnames";
import { getLanguages } from "../../services";
import i18n from "../../i18n";
import { useAppStore } from "../../stores/app.store";
import { useMeetingStore } from "../../stores/meeting.store";
import { setLanguage } from "../../helpers";
import BrandLogoLoading from "./BrandLogoLoading";

export default function GuestFormLayout({ children }) {
  const navigate = useNavigate();
  const [appStore, updateAppStore] = useAppStore();
  const [loading, setLoading] = useState(false);
  const [language, setCurrentLanguage] = useState(appStore.language);

  const fetchLanguage = async () => {
    try {
      if (!i18next.exists("general.cancel") || language !== appStore.language) {
        setLoading(true);
        const data = await getLanguages(appStore.language);
        setCurrentLanguage(appStore.language);
        const resources = { en: { translation: data } };
        i18n.init({
          resources,
          lng: "en",
        });
        setLoading(false);
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  const onChooseLanguage = async (lang = "en") => {
    updateAppStore((draft) => {
      draft.language = lang;
    });
  };

  useEffect(() => {
    setLanguage(appStore.language);
    fetchLanguage();
  }, [appStore.language]);

  return loading ? (
    <div className="h-screen">
      <BrandLogoLoading />
    </div>
  ) : (
    <I18nextProvider i18n={i18next}>
      <WalletProvider>
        <MetaMaskProvider>
          <div className="flex flex-row ">
            <div className="flex-1 flex flex-col justify-center bg-blue-base pl-20 pr-12 min-h-screen">
              <div>
                <button onClick={() => navigate("/")}>
                  <img className="h-14" src="/images/mtms-logo-white.png" alt="logo" />
                </button>
              </div>
              <div>
                <p className="text-white font-bold text-4xl pt-16">{`THE FIRST AND ONLY
                  MEET & EARN PLATFORM`}</p>
                <p className="text-white text-base pt-4">MTMS: More Time, More Savings</p>
              </div>
              <div>
                <img src="/images/welcome.png" alt="welcome" />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center px-20 bg-white min-h-screen">
              <div className="flex flex-row space-x-2 py-4">
                <button
                  className={classNames("flex flex-row text-base justify-start font-medium")}
                  onClick={() => onChooseLanguage("vn")}
                >
                  <IconBase icon="/icons/flag-vn.svg" iconActivated="/icons/flag-vn.svg" />
                </button>
                <button
                  className={classNames("flex flex-row text-base justify-start font-medium")}
                  onClick={() => onChooseLanguage("en")}
                >
                  <IconBase icon="/icons/flag-en.svg" iconActivated="/icons/flag-vn.svg" />
                </button>
              </div>
              <div className="">{children}</div>
            </div>
          </div>
        </MetaMaskProvider>
      </WalletProvider>
    </I18nextProvider>
  );
}
