---
order: 2
---

# 옵션

이 페이지에서는 VitePress I18n의 모든 옵션에 대해 설명합니다.

## `locales` (필수)

- Type: `string[] | I18nLocale[]`

이 플러그인이 지원 해야 할 언어 목록을 정의합니다. 여기에는 지원되는 언어 목록에 해당하는 언어 코드를 배열 값에 포함합니다.

예를 들어 영어와 한국어를 지원하려면 `['en', 'ko']`와 같이 값을 사용합니다.

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

지원 언어 코드 목록은 [이 문서](/ko/guide/supported-languages)를 참고해주세요.

## `rootLocale`

- Type: `string`
- Default: `undefined`

이 옵션값에는 `root` 로캐일로 설정 할 언어 코드를 지정합니다. VitePress의 i18n 설정에서 해당 언어는 `root`로 지정됩니다. 이 값은 VitePress의 기본 언어를 지정하기 위해 필요하지만 옵션 값을 지정하지 않더라도 `locales` 옵션의 첫번째 배열값을 사용합니다.

예를 들어 영어가 기본 언어이면 `rootLocale` 값을 `en`으로 설정합니다.

주의할 점은 디렉토리 경로가 아닌 로캐일 언어 코드를 사용해야 합니다. (예: 디렉토리 이름이 `eng`일 때 `rootLocale`값은 `en`을 사용)

## `searchProvider`

- Type: `'local' | 'algolia' | undefined`
- Default: `undefined`

이 옵션을 `local` 또는 `algolia`로 설정하면 검색 인터페이스를 사이트에 표시합니다. 이 검색에 사용되는 인터페이스 텍스트 번역은 자동으로 제공됩니다. 자세한 내용은 다음 문서를 참고하세요: https://vitepress.dev/reference/default-theme-search#search

VitePress의 검색 옵션을 오버라이딩하려면 `searchOptions` 옵션을 사용할 수 있습니다.

## `searchOptions`

- Type: `LocalSearchOptions | AlgoliaSearchOptions`
- Default: `undefined`

`local` 또는 `algolia` 검색에 대한 상세 옵션을 지정할 수 있습니다.

## `disableAutoSetLangValue`

- Type: `boolean`
- Default: `false`

이 옵션이 `true`일 경우, `lang` 값을 자동으로 설정하지 않습니다.`html` 태그의 `lang` 속성값을 지정하지 않고 싶은 경우에 사용합니다.

## `debugPrint`

- Type: `boolean`
- Default: `false`

이 옵션이 `true`일 경우, 사용 옵션과 출력 결과를 콘솔 로그로 출력해볼 수 있습니다.

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

object 객체로 선언되며 키 값은 언어 코드, 값은 string 데이터입니다. root 로캐일일 때에도 해당 언어 코드를 사용해야 합니다. 예를 들어 영어와 한국어를 각각 사용자 지정하려면 다음과 같이 설정하세요:

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

object 객체로 선언되며 키 값은 언어 코드, 값은 string 데이터입니다. root 로캐일일 때에도 해당 언어 코드를 사용해야 합니다. 예를 들어 영어와 한국어를 각각 사용자 지정하려면 다음과 같이 설정하세요:

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

object 객체로 선언되며 키 값은 언어 코드, 값은 string 데이터입니다. root 로캐일일 때에도 해당 언어 코드를 사용해야 합니다. 예를 들어 영어와 한국어를 각각 사용자 지정하려면 다음과 같이 설정하세요:

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

object 객체로 선언되며 키 값은 언어 코드, 값은 string 데이터입니다. root 로캐일일 때에도 해당 언어 코드를 사용해야 합니다. 예를 들어 영어와 한국어를 각각 사용자 지정하려면 다음과 같이 설정하세요:

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

object 객체로 선언되며 키 값은 언어 코드, 값은 string 데이터입니다. root 로캐일일 때에도 해당 언어 코드를 사용해야 합니다. 예를 들어 영어와 한국어를 각각 사용자 지정하려면 다음과 같이 설정하세요:

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
