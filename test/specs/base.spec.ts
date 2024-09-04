import assert from 'assert';
import { generateI18nSearch, generateI18nLocale } from '../../dist';

describe('Test: base test', () => {
  it('generateI18nLocale', (done) => {
    assert.deepStrictEqual(
      generateI18nLocale({
        defineLocales: [
          { label: 'root', translateLocale: 'en' },
          { label: 'ko', translateLocale: 'ko' }
        ],
        label: {
          root: 'English',
          ko: '한국어'
        },
        lang: {
          root: 'en-US',
          ko: 'ko-KR'
        },
        description: {
          root: 'Hello',
          ko: '안녕하세요'
        }
      }),
      {
        ko: {
          description: '안녕하세요',
          label: '한국어',
          lang: 'ko-KR',
          themeConfig: {
            darkModeSwitchLabel: '다크 모드',
            darkModeSwitchTitle: '다크 모드로 변경',
            docFooter: {
              next: '다음',
              prev: '이전'
            },
            editLink: {
              text: '이 페이지 편집 제안'
            },
            langMenuLabel: '언어 변경',
            lastUpdated: {
              text: '업데이트 일자'
            },
            lightModeSwitchTitle: '라이트 모드로 변경',
            outline: {
              label: '이 페이지 콘텐츠'
            },
            returnToTopLabel: '맨 위로',
            sidebarMenuLabel: '사이드바 메뉴'
          }
        },
        root: {
          label: 'English',
          themeConfig: {
            darkModeSwitchLabel: 'Appearance',
            darkModeSwitchTitle: 'Switch to dark theme',
            docFooter: {
              next: 'Next page',
              prev: 'Previous page'
            },
            editLink: {
              text: 'Edit this page'
            },
            langMenuLabel: 'Change language',
            lastUpdated: {
              text: 'Last updated'
            },
            lightModeSwitchTitle: 'Switch to light theme',
            outline: {
              label: 'On this page'
            },
            returnToTopLabel: 'Return to top',
            sidebarMenuLabel: 'Menu'
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
