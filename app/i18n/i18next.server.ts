import { RemixI18Next } from 'remix-i18next';
import { resolve } from 'node:path';
import i18n from './i18n'; // your i18n configuration file

const i18next = new RemixI18Next({
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
    },
  },
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
  },
});

export default i18next;
