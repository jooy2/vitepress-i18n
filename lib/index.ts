import type { DefaultTheme } from 'vitepress/types/default-theme.d.ts';
import type { LocaleConfig, LocaleSpecificConfig } from 'vitepress/types/index.d.ts';
import type { DocSearchProps } from 'vitepress/types/docsearch.d.ts';
import type { VitePressI18nLocalesOptions, VitePressI18nSearchOptions } from './types.d.ts';
import {
  ALGOLIA_SEARCH_TRANSLATIONS,
  LOCAL_SEARCH_TRANSLATIONS,
  LOCALES_TRANSLATIONS
} from './strings.js';

type LocalSearchOptions = DefaultTheme.LocalSearchOptions;
type AlgoliaSearchOptions = DefaultTheme.AlgoliaSearchOptions;

const FALLBACK_LOCALE = 'en';
const PLUGIN_SUPPORT_LOCALES: string[] = [
  FALLBACK_LOCALE,
  'ko',
  'zhHans',
  'zhHant',
  'ja',
  'es',
  'pt',
  'ru',
  'id',
  'de',
  'fr',
  'vi'
];

export default class VitePressI18n {
  static generateI18nLocale(options: Partial<VitePressI18nLocalesOptions>): LocaleConfig {
    if (arguments.length > 1 || !options) {
      throw new Error(`You must pass 1 argument, see the documentation for details.`);
    }
    if (!options?.defineLocales || options.defineLocales.length < 1) {
      throw new Error(`At least one 'defineLocales' value must exist!`);
    }
    if (!options?.label || Object.keys(options.label).length < 1) {
      throw new Error(`At least one 'label' value must exist!`);
    }

    const result: Record<string, LocaleSpecificConfig & { label: string; link?: string }> = {};

    for (let i = 0; i < options.defineLocales.length; i += 1) {
      const locale = options.defineLocales[i].translateLocale;
      const label = options.defineLocales[i].label;

      if (!PLUGIN_SUPPORT_LOCALES.includes(locale)) {
        throw new Error(`The '${locale}' locale is not currently supported.`);
      }

      const commonThemeConfig = LOCALES_TRANSLATIONS[locale];

      result[label === options.rootLocale ? 'root' : label] = {
        ...(options.lang?.[label] ? { lang: options.lang?.[label] } : {}),
        label: options.label[label],
        ...(options.link?.[label] ? { link: options.link?.[label] } : {}),
        ...(options.title?.[label] ? { title: options.title?.[label] } : {}),
        ...(options.titleTemplate?.[label]
          ? { titleTemplate: options.titleTemplate?.[label] }
          : {}),
        ...(options.description?.[label] ? { description: options.description?.[label] } : {}),
        ...(options.head?.[label] ? { head: options.head?.[label] } : {}),
        themeConfig: options.themeConfig?.[label]
          ? {
              ...commonThemeConfig,
              ...(options.editLinkPattern
                ? {
                    editLink: {
                      pattern: options.editLinkPattern,
                      text: LOCALES_TRANSLATIONS[locale].editLink.text
                    }
                  }
                : {}),
              // Override
              ...options.themeConfig?.[label]
            }
          : commonThemeConfig
      };
    }

    if (options.debugPrint) {
      process.stdout.write(
        `\n${'='.repeat(50)}\n${JSON.stringify(options, null, 2)}\n${'-'.repeat(
          50
        )}\n${JSON.stringify(result, null, 2)}\n${'='.repeat(50)}\n\n`
      );
    }

    return result;
  }

  static generateI18nSearch(
    options: VitePressI18nSearchOptions
  ):
    | { provider: 'local'; options?: Partial<LocalSearchOptions> }
    | { provider: 'algolia'; options: Partial<AlgoliaSearchOptions> } {
    if (arguments.length > 1 || !options) {
      throw new Error(`You must pass 1 argument, see the documentation for details.`);
    }

    const result:
      | Record<string, Partial<Omit<LocalSearchOptions, 'locales'>>>
      | Record<string, Partial<DocSearchProps>> = {};

    for (let i = 0; i < options.defineLocales.length; i += 1) {
      const locale = options.defineLocales[i].translateLocale;
      const label = options.defineLocales[i].label;

      if (!PLUGIN_SUPPORT_LOCALES.includes(locale)) {
        throw new Error(`The '${locale}' locale is not currently supported.`);
      }

      if (options.provider === 'local') {
        result[label === options.rootLocale ? 'root' : label] = LOCAL_SEARCH_TRANSLATIONS[locale];
      } else {
        result[label === options.rootLocale ? 'root' : label] = ALGOLIA_SEARCH_TRANSLATIONS[locale];
      }
    }

    return {
      provider: options.provider,
      options: {
        ...options.options,
        locales: result
      }
    };
  }
}

export { VitePressI18n };

export const { generateI18nSearch, generateI18nLocale } = VitePressI18n;
