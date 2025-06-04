import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// navbar file
import navInfoEN from './locales/en/navbarEn.json';
import navInfoBN from './locales/bn/navbarBn.json';

// footer file
import footerInfoEn from './locales/en/footerEn.json'
import footerInfoBn from './locales/bn/footerBn.json'

// home title file
import homeTitleEN from './locales/en/homeTitle.json';
import homeTitleBN from './locales/bn/homeTitle.json';


i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    lng: "en",
    resources: {
        en: {
            navbar: navInfoEN,
            footer: footerInfoEn,
            homeTitle: homeTitleEN,
        },
        bn: {
            navbar: navInfoBN,
            footer: footerInfoBn,
            homeTitle: homeTitleBN,
        }
    }
})