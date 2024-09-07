import type { KeyValueItem } from './types.d.ts';

export const LOCALES_TRANSLATIONS: KeyValueItem = {
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
  },
  zhHans: {
    editLink: {
      text: '在 GitHub 上编辑此页面'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '页面导航'
    },
    lastUpdated: {
      text: '最后更新于'
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },
  zhHant: {
    editLink: {
      text: '編輯此頁面'
    },
    docFooter: {
      prev: '前一頁',
      next: '下一頁'
    },
    outline: {
      label: '在此頁面上'
    },
    lastUpdated: {
      text: '最後更新'
    },
    langMenuLabel: '變更語言',
    returnToTopLabel: '返回頁首',
    sidebarMenuLabel: '選單',
    darkModeSwitchLabel: '外觀',
    lightModeSwitchTitle: '切換至燈光主題',
    darkModeSwitchTitle: '切換至深色主題'
  },
  ja: {
    editLink: {
      text: 'このページを編集する'
    },
    docFooter: {
      prev: '前のページ',
      next: '次のページ'
    },
    outline: {
      label: 'このページでは'
    },
    lastUpdated: {
      text: '最終更新日'
    },
    langMenuLabel: '言語の変更',
    returnToTopLabel: 'トップに戻る',
    sidebarMenuLabel: 'メニュー',
    darkModeSwitchLabel: '外観',
    lightModeSwitchTitle: 'ライトテーマに切り替える',
    darkModeSwitchTitle: 'ダークテーマに切り替える'
  }
};

export const LOCAL_SEARCH_TRANSLATIONS: KeyValueItem = {
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
  },
  zhHans: {
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        displayDetails: '显示详细列表',
        resetButtonTitle: '清除查询条件',
        backButtonTitle: '关闭搜索',
        noResultsText: '无法找到相关结果',
        footer: {
          selectText: '选择',
          selectKeyAriaLabel: '进行选择',
          navigateText: '切换',
          navigateUpKeyAriaLabel: '向上',
          navigateDownKeyAriaLabel: '下降',
          closeText: '關閉',
          closeKeyAriaLabel: 'esc'
        }
      }
    }
  },
  zhHant: {
    translations: {
      button: {
        buttonText: '搜尋',
        buttonAriaLabel: '搜尋'
      },
      modal: {
        displayDetails: '顯示詳細清單',
        resetButtonTitle: '重設搜尋',
        backButtonTitle: '關閉搜尋',
        noResultsText: '沒有結果',
        footer: {
          selectText: '選擇',
          selectKeyAriaLabel: '進入',
          navigateText: '導航',
          navigateUpKeyAriaLabel: '上箭頭',
          navigateDownKeyAriaLabel: '下箭頭',
          closeText: '關閉',
          closeKeyAriaLabel: 'escape'
        }
      }
    }
  },
  ja: {
    translations: {
      button: {
        buttonText: '検索',
        buttonAriaLabel: '検索'
      },
      modal: {
        displayDetails: '詳細リスト表示',
        resetButtonTitle: '検索のリセット',
        backButtonTitle: '詳細検索',
        noResultsText: '該当事項はありません。',
        footer: {
          selectText: 'を選択します。',
          selectKeyAriaLabel: '入る',
          navigateText: 'ナビゲートする',
          navigateUpKeyAriaLabel: '上矢印',
          navigateDownKeyAriaLabel: '下矢印',
          closeText: '閉じる',
          closeKeyAriaLabel: 'escape'
        }
      }
    }
  }
};

export const ALGOLIA_SEARCH_TRANSLATIONS: KeyValueItem = {
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
          cancelButtonAriaLabel: '취소',
          searchInputLabel: '검색'
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
          selectKeyAriaLabel: 'Enter 키',
          navigateText: '탐색',
          navigateUpKeyAriaLabel: '방향키 위',
          navigateDownKeyAriaLabel: '방향키 아래',
          closeText: '닫기',
          closeKeyAriaLabel: 'Escape 키',
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
  },
  zhHans: {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消',
          searchInputLabel: '搜索文档'
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接'
        },
        footer: {
          selectText: '选择',
          selectKeyAriaLabel: 'Enter键',
          navigateText: '切换',
          navigateUpKeyAriaLabel: '向上箭头键',
          navigateDownKeyAriaLabel: '向下箭头键',
          closeText: '关闭',
          closeKeyAriaLabel: 'Escape键',
          searchByText: '搜索提供者'
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈'
        }
      }
    }
  },
  zhHant: {
    placeholder: '搜尋文件',
    translations: {
      button: {
        buttonText: '搜尋',
        buttonAriaLabel: '搜尋'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查詢',
          resetButtonAriaLabel: '清除查詢',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消',
          searchInputLabel: '搜尋'
        },
        startScreen: {
          recentSearchesTitle: '最近',
          noRecentSearchesText: '沒有最近的搜尋',
          saveRecentSearchButtonTitle: '儲存此搜尋',
          removeRecentSearchButtonTitle: '從歷史中移除此搜尋',
          favoriteSearchesTitle: '最愛',
          removeFavoriteSearchButtonTitle: '將此搜尋從我的最愛移除'
        },
        errorScreen: {
          titleText: '無法取得結果',
          helpText: '您可能需要檢查網路連線。'
        },
        footer: {
          selectText: '選擇',
          selectKeyAriaLabel: 'Enter 鍵',
          navigateText: '導航',
          navigateUpKeyAriaLabel: '向上箭頭',
          navigateDownKeyAriaLabel: '箭頭向下',
          closeText: '關閉',
          closeKeyAriaLabel: 'Escape 鍵',
          searchByText: '搜尋方式'
        },
        noResultsScreen: {
          noResultsText: '沒有結果',
          suggestedQueryText: '試著搜尋',
          reportMissingResultsText: '相信這個查詢應該會傳回結果嗎？',
          reportMissingResultsLinkText: '讓我們知道。'
        }
      }
    }
  },
  ja: {
    placeholder: 'ドキュメント検索',
    translations: {
      button: {
        buttonText: '検索',
        buttonAriaLabel: '検索'
      },
      modal: {
        searchBox: {
          resetButtonTitle: 'クエリをクリアする',
          resetButtonAriaLabel: 'クエリをクリアする',
          cancelButtonText: 'キャンセル',
          cancelButtonAriaLabel: 'キャンセル',
          searchInputLabel: '検索'
        },
        startScreen: {
          recentSearchesTitle: '最近',
          noRecentSearchesText: '最近の検索なし',
          saveRecentSearchButtonTitle: 'この検索を保存',
          removeRecentSearchButtonTitle: 'この検索を履歴から削除する',
          favoriteSearchesTitle: 'お気に入り',
          removeFavoriteSearchButtonTitle: 'この検索をお気に入りから削除する'
        },
        errorScreen: {
          titleText: '結果を取得できない',
          helpText: 'ネットワーク接続を確認したほうがいいかもしれない。'
        },
        footer: {
          selectText: 'を選択します。',
          selectKeyAriaLabel: 'エンターキー',
          navigateText: 'ナビゲートする',
          navigateUpKeyAriaLabel: '矢印を上に',
          navigateDownKeyAriaLabel: '矢印を下に',
          closeText: '閉じる',
          closeKeyAriaLabel: 'エスケープキー',
          searchByText: 'で検索'
        },
        noResultsScreen: {
          noResultsText: '該当事項はありません。',
          suggestedQueryText: 'を検索してみよう。',
          reportMissingResultsText: 'このクエリーは結果を返すべきだと思いますか？',
          reportMissingResultsLinkText: '教えてください。'
        }
      }
    }
  }
};
