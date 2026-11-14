import { createContext, useContext } from "react";
import { DEFAULT_LANG, getT } from "./index.js";

const I18nContext = createContext({ lang: DEFAULT_LANG, t: getT(DEFAULT_LANG) });

export function I18nProvider({ lang, children }) {
  return <I18nContext.Provider value={{ lang, t: getT(lang) }}>{children}</I18nContext.Provider>;
}

/** { lang, t } for the current page language. */
export function useI18n() {
  return useContext(I18nContext);
}
