import type { HeadConfig } from 'vitepress';
import type { DefaultTheme } from 'vitepress/types/default-theme.d.ts';

export interface KeyValueItem {
  [key: string]: any;
}

export interface DefineLocales {
  label: string;
  translateLocale: string;
}

export interface PluginSupportLocalesOptions {
  label: string;
  lang: string;
  value: string;
}

export interface VitePressI18nLocalesOptions {
  defineLocales: DefineLocales[];
  rootLocale?: string;
  disableAutoSetLangValue?: boolean;
  debugPrint?: boolean;
  editLinkPattern?: string;
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

export interface VitePressI18nSearchOptions {
  defineLocales: DefineLocales[];
  rootLocale?: string;
  provider: 'local' | 'algolia';
  options?: DefaultTheme.LocalSearchOptions;
}
