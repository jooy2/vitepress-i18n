---
order: 2
---

# 옵션

이 페이지에서는 VitePress I18n의 모든 옵션에 대해 설명합니다.

## `locales` (필수) {#locales-required}

- Type: `string[] | I18nLocale[]`

이 플러그인이 지원 해야 할 언어 목록을 정의합니다. 여기에는 지원되는 언어 목록에 해당하는 언어 코드를 배열 값에 포함합니다.

예를 들어 영어와 한국어를 지원하려면 `['en', 'ko']`와 같이 값을 사용합니다.

```javascript
withI18n(vitePressOptions, {
  locales: ['en', 'ko']
});
```

이렇게 하면 문서 구조에서 영어는 `en` 디렉토리, 한국어는 `ko` 디렉토리로 구성해야 합니다.

만약 디렉토리 이름을 지원 언어 코드와 다르게 지정하고 싶은 경우, `I18nLocale` 타입의 객체로 디렉토리를 매핑할 수 있습니다. 예를 들어 디렉토리가 각각 `eng`, `kor`인 경우, 다음과 같이 영어와 한국어로 매핑할 수 있습니다:

```javascript
withI18n({
  locales: [
    { path: 'eng', locale: 'en' },
    { path: 'kor', locale: 'ko' }
  ]
});
```

`path`는 디렉토리 이름, `locale`은 지원 언어 코드입니다.

VitePress는 `path`를 로캐일의 키로 사용합니다. 따라서 소스 디렉토리(`srcDir`) 기준의 디렉토리를 적고 `base`는 넣지 않습니다. 예를 들어 사이트가 `base: '/docs/'` 아래에서 제공되고 독일어 페이지가 `de` 디렉토리에 있으면 `docs/de`가 아니라 `de`를 사용합니다. `path` 앞뒤의 슬래시는 제거되므로 `/de/`는 `de`로 읽습니다. `path`를 비워 둘 수 있는 것은 root 로캐일뿐입니다.

언어별로 선언하는 옵션(`label`, `link`, `lang`, `title`, `titleTemplate`, `description`, `head`, `themeConfig`)은 두 값 중 어느 것이든 키로 사용할 수 있습니다. `path`를 먼저 조회하므로 두 키가 모두 존재하면 `path`가 우선합니다.

지원 언어 코드 목록은 [이 문서](/ko/guide/supported-languages)를 참고해주세요.

## `rootLocale`

- Type: `string | false`
- Default: `undefined`

이 옵션값에는 `root` 로캐일로 설정 할 언어 코드를 지정합니다. VitePress의 i18n 설정에서 해당 언어는 `root`로 지정됩니다. 이 값은 VitePress의 기본 언어를 지정하기 위해 필요하지만 옵션 값을 지정하지 않더라도 `locales` 옵션의 첫번째 배열값을 사용합니다.

예를 들어 영어가 기본 언어이면 `rootLocale` 값을 `en`으로 설정합니다.

주의할 점은 디렉토리 경로가 아닌 로캐일 언어 코드를 사용해야 합니다. (예: 디렉토리 이름이 `eng`일 때 `rootLocale`값은 `en`을 사용)

기본 언어를 포함한 모든 언어가 `en`, `de`처럼 각자의 디렉토리를 가진다면 `rootLocale`을 `false`로 설정합니다. 이때는 어떤 로캐일도 `root`로 지정되지 않고 모든 로캐일이 `path`를 키로 사용하므로, 언어 메뉴에 언어마다 항목이 하나씩만 나옵니다.

```javascript
withI18n(vitePressOptions, {
  locales: ['en', 'de'],
  rootLocale: false
});
```

이 경우 `/en/`으로 이동시키는 최상위 `index.md`처럼 어느 언어 디렉토리에도 속하지 않는 페이지는 로캐일이 없으므로 VitePress 기본 테마의 문구가 표시됩니다.

## `searchProvider`

- Type: `'local' | 'algolia' | undefined`
- Default: `undefined`

이 옵션을 `local` 또는 `algolia`로 설정하면 검색 인터페이스를 사이트에 표시합니다. 이 검색에 사용되는 인터페이스 텍스트 번역은 자동으로 제공됩니다. 자세한 내용은 다음 문서를 참고하세요: https://vitepress.dev/reference/default-theme-search#search

VitePress의 검색 옵션을 오버라이딩하려면 `searchOptions` 옵션을 사용할 수 있습니다.

## `searchOptions`

- Type: `LocalSearchOptions | AlgoliaSearchOptions`
- Default: `undefined`

`local` 또는 `algolia` 검색에 대한 상세 옵션을 지정할 수 있습니다.

`locales`에 넣은 항목은 그대로 유지됩니다. VitePress I18n이 번역하는 언어의 항목은 기본 번역 위에 병합되므로, 그 언어의 문구 하나만 바꾸거나 Algolia `indexName` 같은 설정을 추가할 수 있습니다. 다른 키의 항목은 손대지 않고 그대로 전달합니다. 키는 VitePress의 로캐일 키이므로 root 로캐일에는 `root`를 사용합니다. 검색 옵션을 VitePress 옵션의 `themeConfig.search.options`에서 가져오는 경우에도 같습니다.

```javascript
withI18n(vitePressOptions, {
  locales: ['en', 'ko'],
  searchProvider: 'algolia',
  searchOptions: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_SEARCH_API_KEY',
    indexName: 'docs',
    locales: {
      ko: { indexName: 'docs-ko' }
    }
  }
});
```

## `disableAutoSetLangValue`

- Type: `boolean`
- Default: `false`

이 옵션이 `true`일 경우, `lang` 값을 자동으로 설정하지 않습니다.`html` 태그의 `lang` 속성값을 지정하지 않고 싶은 경우에 사용합니다.

## `debugPrint`

- Type: `boolean`
- Default: `false`

이 옵션이 `true`일 경우, VitePress I18n에 전달한 옵션과 결과로 나온 `locales`, `themeConfig`를 콘솔에 출력합니다. 결과는 VitePress 옵션과 병합한 뒤에 출력하므로 VitePress 옵션에 원래 있던 `locales` 항목도 함께 보입니다.

## `label`

- Type: `object`
- Default: `undefined`

이 옵션은 사용자 지정 라벨을 사용하려는 경우에 사용합니다.

## `link`

- Type: `object`
- Default: `undefined`

이 옵션은 사용자 지정 링크를 사용하려는 경우에 사용합니다.

## `lang`

- Type: `object`
- Default: `undefined`

이 옵션은 사용자 지정 `lang` 속성값을 사용하려는 경우에 사용합니다.

## `title`

- Type: `object`
- Default: `undefined`

이 옵션은 언어별로 서로 다른 사이트 제목을 표시하려 할 때 사용됩니다.

object 객체로 선언되며 키 값은 언어 코드, 값은 string 데이터입니다. root 로캐일일 때에도 해당 언어 코드를 사용해야 합니다. `I18nLocale`로 디렉토리 이름을 별도로 매핑한 경우에는 디렉토리 이름과 언어 코드 중 어느 쪽을 키로 사용해도 되며, 두 키가 모두 있으면 디렉토리 이름이 우선합니다. 예를 들어 영어와 한국어를 각각 사용자 지정하려면 다음과 같이 설정하세요:

```javascript
withI18n({
  locales: ['en', 'ko'],
  rootLocale: 'en',
  title: {
    en: 'Welcome',
    ko: '환영합니다'
  }
});
```

## `titleTemplate`

- Type: `object`
- Default: `undefined`

이 옵션은 언어별로 서로 다른 사이트 제목 템플릿 (꼬리부분 구분자)을 표시하려 할 때 사용됩니다.

object 객체로 선언되며 키 값은 언어 코드, 값은 string 데이터입니다. root 로캐일일 때에도 해당 언어 코드를 사용해야 합니다. `I18nLocale`로 디렉토리 이름을 별도로 매핑한 경우에는 디렉토리 이름과 언어 코드 중 어느 쪽을 키로 사용해도 되며, 두 키가 모두 있으면 디렉토리 이름이 우선합니다. 예를 들어 영어와 한국어를 각각 사용자 지정하려면 다음과 같이 설정하세요:

```javascript
withI18n({
  locales: ['en', 'ko'],
  rootLocale: 'en',
  titleTemplate: {
    en: ' | Website',
    ko: ' | 웹사이트'
  }
});
```

## `description`

- Type: `object`
- Default: `undefined`

이 옵션은 언어별로 서로 다른 사이트 설명을 표시하려 할 때 사용됩니다.

object 객체로 선언되며 키 값은 언어 코드, 값은 string 데이터입니다. root 로캐일일 때에도 해당 언어 코드를 사용해야 합니다. `I18nLocale`로 디렉토리 이름을 별도로 매핑한 경우에는 디렉토리 이름과 언어 코드 중 어느 쪽을 키로 사용해도 되며, 두 키가 모두 있으면 디렉토리 이름이 우선합니다. 예를 들어 영어와 한국어를 각각 사용자 지정하려면 다음과 같이 설정하세요:

```javascript
withI18n({
  locales: ['en', 'ko'],
  rootLocale: 'en',
  description: {
    en: 'Website description',
    ko: '웹사이트 설명'
  }
});
```

## `head`

- Type: `object`
- Default: `undefined`

이 옵션은 언어별로 서로 다른 `head` 설정을 사용할 때 사용됩니다.

object 객체로 선언되며 키 값은 언어 코드, 값은 string 데이터입니다. root 로캐일일 때에도 해당 언어 코드를 사용해야 합니다. `I18nLocale`로 디렉토리 이름을 별도로 매핑한 경우에는 디렉토리 이름과 언어 코드 중 어느 쪽을 키로 사용해도 되며, 두 키가 모두 있으면 디렉토리 이름이 우선합니다. 예를 들어 영어와 한국어를 각각 사용자 지정하려면 다음과 같이 설정하세요:

```javascript
withI18n({
  locales: ['en', 'ko'],
  rootLocale: 'en',
  head: {
    en: [['link', { rel: 'icon', href: '/favicon-en.ico' }]],
    ko: [['link', { rel: 'icon', href: '/favicon-ko.ico' }]]
  }
});
```

## `themeConfig`

- Type: `object`
- Default: `undefined`

이 옵션은 언어별로 서로 다른 `themeConfig` 설정을 사용할 때 사용됩니다.

object 객체로 선언되며 키 값은 언어 코드, 값은 string 데이터입니다. root 로캐일일 때에도 해당 언어 코드를 사용해야 합니다. `I18nLocale`로 디렉토리 이름을 별도로 매핑한 경우에는 디렉토리 이름과 언어 코드 중 어느 쪽을 키로 사용해도 되며, 두 키가 모두 있으면 디렉토리 이름이 우선합니다. 예를 들어 영어와 한국어를 각각 사용자 지정하려면 다음과 같이 설정하세요:

```javascript
withI18n({
  locales: ['en', 'ko'],
  rootLocale: 'en',
  themeConfig: {
    en: {
      nav: [
        {
          text: 'API',
          link: '/en/api'
        }
      ]
    },
    ko: {
      nav: [
        {
          text: 'API',
          link: '/ko/api'
        }
      ]
    }
  }
});
```
