import type { DefaultTheme } from 'vitepress/types/default-theme.d.ts';
import type { HeadConfig, LocaleConfig, LocaleSpecificConfig } from 'vitepress/types/index.d.ts';
import type { DocSearchProps } from 'vitepress/types/docsearch.d.ts';

type LocalSearchOptions = DefaultTheme.LocalSearchOptions;
type AlgoliaSearchOptions = DefaultTheme.AlgoliaSearchOptions;

declare interface KeyValueItem {
  [key: string]: any;
}

declare interface DefineLocales {
  label: string;
  translateLocale: string;
}

export declare interface VitePressI18nLocalesOptions {
  defineLocales: DefineLocales[];
  rootLocale?: string;
  editLinkPattern: string;
  label: { [key: string]: string };
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

const FALLBACK_LOCALE = 'en';
const PLUGIN_SUPPORT_LOCALES: string[] = [FALLBACK_LOCALE, 'ko'];

const LOCALES_TRANSLATIONS: KeyValueItem = {
  en: {
    editLink: {
      text: 'Edit this page'
    },
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },
    outline: {
      label: 'On this page'
    },
    lastUpdated: {
      text: 'Last updated'
    },
    langMenuLabel: 'Change language',
    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme'
  },
  ko: {
    editLink: {
      text: '이 페이지 편집 제안'
    },
    docFooter: {
      prev: '이전',
      next: '다음'
    },
    outline: {
      label: '이 페이지 콘텐츠'
    },
    lastUpdated: {
      text: '업데이트 일자'
    },
    langMenuLabel: '언어 변경',
    returnToTopLabel: '맨 위로',
    sidebarMenuLabel: '사이드바 메뉴',
    darkModeSwitchLabel: '다크 모드',
    lightModeSwitchTitle: '라이트 모드로 변경',
    darkModeSwitchTitle: '다크 모드로 변경'
  }
};

const LOCAL_SEARCH_TRANSLATIONS: KeyValueItem = {
  en: {
    translations: {
      button: {
        buttonText: 'Search',
        buttonAriaLabel: 'Search'
      },
      modal: {
        displayDetails: 'Display detailed list',
        resetButtonTitle: 'Reset search',
        backButtonTitle: 'Close search',
        noResultsText: 'No results for',
        footer: {
          selectText: 'to select',
          selectKeyAriaLabel: 'enter',
          navigateText: 'to navigate',
          navigateUpKeyAriaLabel: 'up arrow',
          navigateDownKeyAriaLabel: 'down arrow',
          closeText: 'to close',
          closeKeyAriaLabel: 'escape'
        }
      }
    }
  },
  ko: {
    translations: {
      button: {
        buttonText: '검색',
        buttonAriaLabel: '검색'
      },
      modal: {
        displayDetails: '상세 목록 표시',
        resetButtonTitle: '검색 초기화',
        backButtonTitle: '검색 닫기',
        noResultsText: '결과를 찾을 수 없음',
        footer: {
          selectText: '선택',
          selectKeyAriaLabel: '선택하기',
          navigateText: '탐색',
          navigateUpKeyAriaLabel: '위로',
          navigateDownKeyAriaLabel: '아래로',
          closeText: '닫기',
          closeKeyAriaLabel: 'esc'
        }
      }
    }
  }
};

const ALGOLIA_SEARCH_TRANSLATIONS: KeyValueItem = {
  en: {
    placeholder: 'Search docs',
    translations: {
      button: {
        buttonText: 'Search',
        buttonAriaLabel: 'Search'
      },
      modal: {
        searchBox: {
          resetButtonTitle: 'Clear the query',
          resetButtonAriaLabel: 'Clear the query',
          cancelButtonText: 'Cancel',
          cancelButtonAriaLabel: 'Cancel',
          searchInputLabel: 'Search'
        },
        startScreen: {
          recentSearchesTitle: 'Recent',
          noRecentSearchesText: 'No recent searches',
          saveRecentSearchButtonTitle: 'Save this search',
          removeRecentSearchButtonTitle: 'Remove this search from history',
          favoriteSearchesTitle: 'Favorite',
          removeFavoriteSearchButtonTitle: 'Remove this search from favorites'
        },
        errorScreen: {
          titleText: 'Unable to fetch results',
          helpText: 'You might want to check your network connection.'
        },
        footer: {
          selectText: 'to select',
          selectKeyAriaLabel: 'Enter key',
          navigateText: 'to navigate',
          navigateUpKeyAriaLabel: 'Arrow up',
          navigateDownKeyAriaLabel: 'Arrow down',
          closeText: 'to close',
          closeKeyAriaLabel: 'Escape key',
          searchByText: 'Search by'
        },
        noResultsScreen: {
          noResultsText: 'No results for',
          suggestedQueryText: 'Try searching for',
          reportMissingResultsText: 'Believe this query should return results?',
          reportMissingResultsLinkText: 'Let us know.'
        }
      }
    }
  },
  // TODO: add missing translations
  ko: {
    placeholder: '문서 검색',
    translations: {
      button: {
        buttonText: '검색',
        buttonAriaLabel: '검색'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '검색 지우기',
          resetButtonAriaLabel: '검색 지우기',
          cancelButtonText: '취소',
          cancelButtonAriaLabel: '취소'
        },
        startScreen: {
          recentSearchesTitle: '검색 기록',
          noRecentSearchesText: '최근 검색 없음',
          saveRecentSearchButtonTitle: '검색 기록에 저장',
          removeRecentSearchButtonTitle: '검색 기록에서 삭제',
          favoriteSearchesTitle: '즐겨찾기',
          removeFavoriteSearchButtonTitle: '즐겨찾기에서 삭제'
        },
        errorScreen: {
          titleText: '결과를 가져올 수 없습니다',
          helpText: '네트워크 연결을 확인하세요'
        },
        footer: {
          selectText: '선택',
          navigateText: '탐색',
          closeText: '닫기',
          searchByText: '검색 기준'
        },
        noResultsScreen: {
          noResultsText: '결과를 찾을 수 없습니다',
          suggestedQueryText: '새로운 검색을 시도할 수 있습니다',
          reportMissingResultsText: '해당 검색어에 대한 결과가 있어야 합니까?',
          reportMissingResultsLinkText: '피드백 보내기 클릭'
        }
      }
    }
  }
};

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
