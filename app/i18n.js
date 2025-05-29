import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next';

import navInfoEN from './locales/en/navbarEn.json';
import navInfoBN from './locales/bn/navbarBn.json'


i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    lng: "en",
    resources: {
        en: {
            navbar: navInfoEN
        },
        bn: {
            navbar: navInfoBN
        }
    }
})