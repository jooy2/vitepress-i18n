import type { HeadConfig } from 'vitepress';

export interface KeyValueItem {
  [key: string]: any;
}

export interface I18nLocale {
  path: string;
  locale: string;
}

export interface PluginSupportLocalesOptions {
  label: string;
  lang: string;
  value: string;
}

export interface VitePressI18nOptions {
  debugPrint?: boolean;
  locales: I18nLocale[] | string[];
  rootLocale?: string;
  searchProvider?: 'local' | 'algolia' | undefined;
  searchOptions?: { [key: string]: any };
  disableAutoSetLangValue?: boolean;
  label?: { [key: string]: string };
  link?: { [key: string]: string };
  /*
   * Types from: `vitepress/types/default-theme.d.ts`
   */
  lang?: { [key: string]: string };
  title?: { [key: string]: string };
  titleTemplate?: { [key: string]: string | boolean };
  description?: { [key: string]: string };
  head?: { [key: string]: HeadConfig[] };
  themeConfig?: { [key: string]: any };
  /*
   * End
   * */
}
