import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

// the translations
const resources = {
  en: {
    translation: {}
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
  });

export default i18n;