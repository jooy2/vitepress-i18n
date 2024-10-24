import type { UserConfig } from 'vitepress';
import type { PluginSupportLocalesOptions, VitePressI18nOptions, I18nLocale } from './types.ts';
import {
  ALGOLIA_SEARCH_TRANSLATIONS,
  LOCAL_SEARCH_TRANSLATIONS,
  LOCALES_TRANSLATIONS
} from './strings.js';

declare type AnyValueObject = { [key: string]: any };

const FALLBACK_LOCALE = 'en';
const PLUGIN_SUPPORT_LOCALES: PluginSupportLocalesOptions[] = [
  { value: FALLBACK_LOCALE, label: 'English', lang: 'en-US' },
  { value: 'ko', label: '한국어', lang: 'ko-KR' },
  { value: 'zhHans', label: '简体中文', lang: 'zh-CN' },
  { value: 'zhHant', label: '繁體中文', lang: 'zh-TW' },
  { value: 'ja', label: '日本語', lang: 'ja-JP' },
  { value: 'es', label: 'Español', lang: 'es-ES' },
  { value: 'pt', label: 'Português', lang: 'pt-PT' },
  { value: 'ru', label: 'Русский', lang: 'ru-RU' },
  { value: 'id', label: 'Bahasa Indonesia', lang: 'id-ID' },
  { value: 'de', label: 'Deutsch', lang: 'de-DE' },
  { value: 'fr', label: 'Français', lang: 'fr-FR' },
  { value: 'vi', label: 'Tiếng Việt', lang: 'vi-VN' },
  { value: 'it', label: 'Italiano', lang: 'it-IT' }
];

export default class VitePressI18n {
  static withI18n(
    vitePressOptions: UserConfig,
    i18nOptions: Partial<VitePressI18nOptions>
  ): Partial<UserConfig> {
    if (arguments.length !== 2 || !vitePressOptions || !i18nOptions) {
      throw new Error(
        `You will need to pass VitePress's defineConfig option and plugin options respectively, see the documentation for details.`
      );
    }
    if (!i18nOptions?.locales || i18nOptions.locales.length < 1) {
      throw new Error(
        `The 'locales' option value is required. Please refer to the documentation to pass the correct value.`
      );
    }

    if (!i18nOptions.rootLocale) {
      if (
        typeof i18nOptions.locales[0] === 'object' &&
        Object.hasOwn(i18nOptions.locales[0], 'path') &&
        Object.hasOwn(i18nOptions.locales[0], 'locale')
      ) {
        i18nOptions.rootLocale = i18nOptions.locales[0].locale;
      } else if (typeof i18nOptions.locales[0] === 'string') {
        i18nOptions.rootLocale = i18nOptions.locales[0];
      }
    }

    if (!PLUGIN_SUPPORT_LOCALES.some((obj) => obj.value === i18nOptions.rootLocale)) {
      throw new Error(
        `Invalid locale detected, please make sure you are using a supported language code for the 'rootLocale' or 'locales' option.`
      );
    }

    const result: Partial<UserConfig> = {
      themeConfig: {
        ...(i18nOptions.searchProvider
          ? {
              search: {
                provider: i18nOptions.searchProvider,
                options: {
                  ...i18nOptions.searchOptions,
                  locales: {}
                }
              }
            }
          : {})
      }, // For `search` only
      locales: {}
    };

    for (let i = 0; i < i18nOptions.locales.length; i += 1) {
      let locale: string | undefined;
      let label: string | undefined;

      if (typeof i18nOptions.locales[i] === 'object') {
        const localeOption = i18nOptions.locales[i] as I18nLocale;

        if (Object.hasOwn(localeOption, 'path') && Object.hasOwn(localeOption, 'locale')) {
          locale = localeOption.locale;
          label = localeOption.path;
        }
      } else if (typeof i18nOptions.locales[i] === 'string') {
        locale = i18nOptions.locales[i].toString();
        label = i18nOptions.locales[i].toString();
      }

      if (!locale || !label) {
        throw new Error(`The value of the 'locales' option is not in the correct format!`);
      }

      if (!PLUGIN_SUPPORT_LOCALES.some((obj) => obj.value === locale)) {
        throw new Error(`The '${locale}' locale is not currently supported.`);
      }

      // Search
      if (i18nOptions.searchProvider) {
        if (i18nOptions.searchProvider === 'local') {
          result.themeConfig.search.options.locales[
            locale === i18nOptions.rootLocale ? 'root' : label
          ] = LOCAL_SEARCH_TRANSLATIONS[locale];
        } else {
          result.themeConfig.search.options.locales[
            locale === i18nOptions.rootLocale ? 'root' : label
          ] = ALGOLIA_SEARCH_TRANSLATIONS[locale];
        }
      }

      const commonThemeConfig = LOCALES_TRANSLATIONS[locale];

      if (commonThemeConfig.editLink && vitePressOptions.themeConfig?.editLink?.pattern) {
        commonThemeConfig.editLink.pattern = vitePressOptions.themeConfig.editLink.pattern;
      }

      result.locales![locale === i18nOptions.rootLocale ? 'root' : label] = {
        ...VitePressI18n.getDefaultLangValue(i18nOptions, label, locale),
        label: i18nOptions.label?.[label] || VitePressI18n.getDefaultLabelValue(locale),
        ...(i18nOptions.link?.[label] ? { link: i18nOptions.link?.[label] } : {}),
        ...(i18nOptions.title?.[label] ? { title: i18nOptions.title?.[label] } : {}),
        ...(i18nOptions.titleTemplate?.[label]
          ? { titleTemplate: i18nOptions.titleTemplate?.[label] }
          : {}),
        ...(i18nOptions.description?.[label]
          ? { description: i18nOptions.description?.[label] }
          : {}),
        ...(i18nOptions.head?.[label] ? { head: i18nOptions.head?.[label] } : {}),
        themeConfig: i18nOptions.themeConfig?.[label]
          ? {
              ...commonThemeConfig,
              // Override
              ...i18nOptions.themeConfig?.[label]
            }
          : commonThemeConfig
      };
    }

    if (i18nOptions.debugPrint) {
      process.stdout.write(
        `\n${'='.repeat(50)}\n${JSON.stringify(i18nOptions, null, 2)}\n${'-'.repeat(
          50
        )}\n${JSON.stringify(result, null, 2)}\n${'='.repeat(50)}\n\n`
      );
    }

    return VitePressI18n.objMergeNewKey(vitePressOptions, result) as UserConfig;
  }

  private static getDefaultLabelValue(locale: string): string {
    const findIndex = PLUGIN_SUPPORT_LOCALES.findIndex((x) => x.value === locale);
    const fallbackLocaleIndex = PLUGIN_SUPPORT_LOCALES.findIndex(
      (x) => x.value === FALLBACK_LOCALE
    );

    return findIndex !== -1
      ? PLUGIN_SUPPORT_LOCALES[findIndex].label
      : PLUGIN_SUPPORT_LOCALES[fallbackLocaleIndex].label;
  }

  private static getDefaultLangValue(
    options: Partial<VitePressI18nOptions>,
    label: string,
    locale: string
  ): object {
    if (options.lang?.[label]) {
      return { lang: options.lang?.[label] };
    }

    if (options.disableAutoSetLangValue) {
      return {};
    }

    const findIndex = PLUGIN_SUPPORT_LOCALES.findIndex((x) => x.value === locale);
    const fallbackLocaleIndex = PLUGIN_SUPPORT_LOCALES.findIndex(
      (x) => x.value === FALLBACK_LOCALE
    );

    return {
      lang:
        findIndex !== -1
          ? PLUGIN_SUPPORT_LOCALES[findIndex].lang
          : PLUGIN_SUPPORT_LOCALES[fallbackLocaleIndex].lang
    };
  }

  private static isObject(data: any): boolean {
    return data !== null && data !== undefined && Object.getPrototypeOf(data) === Object.prototype;
  }

  private static objMergeNewKey(obj: AnyValueObject, obj2: AnyValueObject): AnyValueObject | null {
    if (!obj || typeof obj !== 'object' || !obj2 || typeof obj2 !== 'object') {
      return null;
    }

    const merged: AnyValueObject = { ...obj };

    Object.keys(obj2).forEach((key: string) => {
      const data = obj2[key];

      if (Object.hasOwn(merged, key)) {
        if (Array.isArray(merged[key]) && Array.isArray(data)) {
          if (merged[key].length === data.length) {
            for (let i = 0; i < merged[key].length; i += 1) {
              const update = data[i];

              if (VitePressI18n.isObject(update)) {
                merged[key][i] = VitePressI18n.objMergeNewKey(merged[key][i], update);
              }
            }
          }
        } else if (VitePressI18n.isObject(merged[key]) && VitePressI18n.isObject(data)) {
          merged[key] = VitePressI18n.objMergeNewKey(merged[key], data);
        } else {
          merged[key] = data;
        }
      } else {
        merged[key] = data;
      }
    });

    return merged;
  }
}

export { VitePressI18n };

export const { withI18n } = VitePressI18n;
