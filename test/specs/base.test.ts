import assert from 'assert';
import { describe, it } from 'node:test';
import type { UserConfig } from 'vitepress';
import { withI18n } from '../../dist/index.js';

const editLinkPattern = 'https://vitepress-i18n.cdget.com';

const vitePressConfigBase: UserConfig = {
  title: 'Test',
  themeConfig: {
    logo: { src: '/logo.png', width: 24, height: 24 },
    editLink: {
      pattern: editLinkPattern
    }
  }
};

describe('Test: base test', () => {
  it('generateI18n', () => {
    assert.deepStrictEqual(
      withI18n(vitePressConfigBase, {
        locales: [
          { path: 'en', locale: 'en' },
          { path: 'ko', locale: 'ko' }
        ],
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
          editLink: {
            pattern: editLinkPattern
          },
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
                text: 'Edit this page',
                pattern: editLinkPattern
              },
              docFooter: {
                prev: 'Previous page',
                next: 'Next page'
              },
              outline: {
                label: 'On this page'
              },
              logo: { src: '/logo.png', width: 24, height: 24 },
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
                text: '이 페이지 편집 제안',
                pattern: editLinkPattern
              },
              docFooter: {
                prev: '이전',
                next: '다음'
              },
              outline: {
                label: '이 페이지 콘텐츠'
              },
              logo: { src: '/logo.png', width: 24, height: 24 },
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
  });
});
