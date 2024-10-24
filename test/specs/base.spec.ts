import assert from 'assert';
import { UserConfig } from 'vitepress';
import { withI18n, generateI18nSearch, generateI18nLocale } from '../../dist';

const vitePressConfigBase: UserConfig = {
  title: 'Test',
  themeConfig: {
    logo: { src: '/logo.png', width: 24, height: 24 }
  }
};

describe('Test: base test', () => {
  it('generateI18n', (done) => {
    assert.deepStrictEqual(
      withI18n(vitePressConfigBase, {
        debugPrint: true,
        defineLocales: [
          { label: 'en', translateLocale: 'en' },
          { label: 'ko', translateLocale: 'ko' }
        ],
        rootLocale: 'en',
        searchProvider: 'local',
        description: {
          en: 'Hello',
          ko: '안녕하세요'
        }
      }),
      {
        title: 'Test',
        themeConfig: {
          logo: { src: '/logo.png', width: 24, height: 24 },
          search: {
            provider: 'local',
            options: {
              locales: {
                root: {
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
              }
            }
          }
        },
        locales: {
          root: {
            lang: 'en-US',
            label: 'English',
            description: 'Hello',
            themeConfig: {
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
            }
          },
          ko: {
            lang: 'ko-KR',
            label: '한국어',
            description: '안녕하세요',
            themeConfig: {
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
          }
        }
      }
    );

    done();
  });

  it('generateI18nLocale', (done) => {
    assert.deepStrictEqual(
      generateI18nLocale({
        defineLocales: [
          { label: 'en', translateLocale: 'en' },
          { label: 'ko', translateLocale: 'ko' }
        ],
        rootLocale: 'en',
        label: {
          en: 'English',
          ko: '한국어'
        },
        lang: {
          en: 'en-US',
          ko: 'ko-KR'
        },
        description: {
          en: 'Hello',
          ko: '안녕하세요'
        }
      }),
      {
        root: {
          lang: 'en-US',
          label: 'English',
          description: 'Hello',
          themeConfig: {
            editLink: { text: 'Edit this page' },
            docFooter: { prev: 'Previous page', next: 'Next page' },
            outline: { label: 'On this page' },
            lastUpdated: { text: 'Last updated' },
            langMenuLabel: 'Change language',
            returnToTopLabel: 'Return to top',
            sidebarMenuLabel: 'Menu',
            darkModeSwitchLabel: 'Appearance',
            lightModeSwitchTitle: 'Switch to light theme',
            darkModeSwitchTitle: 'Switch to dark theme'
          }
        },
        ko: {
          lang: 'ko-KR',
          label: '한국어',
          description: '안녕하세요',
          themeConfig: {
            editLink: { text: '이 페이지 편집 제안' },
            docFooter: { prev: '이전', next: '다음' },
            outline: { label: '이 페이지 콘텐츠' },
            lastUpdated: { text: '업데이트 일자' },
            langMenuLabel: '언어 변경',
            returnToTopLabel: '맨 위로',
            sidebarMenuLabel: '사이드바 메뉴',
            darkModeSwitchLabel: '다크 모드',
            lightModeSwitchTitle: '라이트 모드로 변경',
            darkModeSwitchTitle: '다크 모드로 변경'
          }
        }
      }
    );

    done();
  });

  it('generateI18nSearch', (done) => {
    assert.deepStrictEqual(
      generateI18nSearch({
        defineLocales: [{ label: 'ko', translateLocale: 'ko' }],
        rootLocale: 'en',
        provider: 'local'
      }),
      {
        options: {
          locales: {
            ko: {
              translations: {
                button: {
                  buttonAriaLabel: '검색',
                  buttonText: '검색'
                },
                modal: {
                  backButtonTitle: '검색 닫기',
                  displayDetails: '상세 목록 표시',
                  footer: {
                    closeKeyAriaLabel: 'esc',
                    closeText: '닫기',
                    navigateDownKeyAriaLabel: '아래로',
                    navigateText: '탐색',
                    navigateUpKeyAriaLabel: '위로',
                    selectKeyAriaLabel: '선택하기',
                    selectText: '선택'
                  },
                  noResultsText: '결과를 찾을 수 없음',
                  resetButtonTitle: '검색 초기화'
                }
              }
            }
          }
        },
        provider: 'local'
      }
    );

    done();
  });
});
