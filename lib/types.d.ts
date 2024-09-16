import type { HeadConfig } from 'vitepress';
import type { DefaultTheme } from 'vitepress/types/default-theme.d.ts';

import LocalSearchOptions = DefaultTheme.LocalSearchOptions;

export declare interface KeyValueItem {
  [key: string]: any;
}

export declare interface DefineLocales {
  label: string;
  translateLocale: string;
}

export declare interface VitePressI18nLocalesOptions {
  defineLocales: DefineLocales[];
  rootLocale?: string;
  debugPrint: boolean;
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

export declare interface VitePressI18nSearchOptions {
  defineLocales: DefineLocales[];
  rootLocale?: string;
  provider: 'local' | 'algolia';
  options?: LocalSearchOptions;
}
