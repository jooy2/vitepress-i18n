---
order: 2
---

# Options

This page describes all the options in the VitePress I18n.

## `locales` (Required)

- Type: `string[] | I18nLocale[]`

Defines a list of languages that this plugin should support. This involves including the language code corresponding to the list of supported languages in an array value.

For example, to support English and Korean, use values like `['en', 'ko']`.

```javascript
withI18n(vitePressOptions, {
  locales: ['en', 'ko']
});
```

This way, in your documentation structure, you should organize English as an `en` directory and Korean as a `ko` directory.

If you want to name the directories differently than the supported language codes, you can map them with objects of type `I18nLocale`. For example, if your directories are named `eng` and `kor`, you can map them to English and Korean, respectively, as follows

```javascript
withI18n({
  locales: [
    { path: 'eng', locale: 'en' },
    { path: 'kor', locale: 'ko' }
  ]
});
```

Where `path` is the directory name and `locale` is the supported language code.

For a list of supported language codes, see [this article](/guide/supported-languages).

## `rootLocale`

- Type: `string`
- Default: `undefined`

This option value specifies the language code to set as the `root` locale. In VitePress's i18n settings, that language is specified as `root`. This value is required to specify the default language for VitePress, but it uses the first array value of the `locales` option even if you don't specify an option value.

For example, if English is the default language, set the `rootLocale` value to `en`.

Note that you must use the locale language code, not the directory path (e.g., use `en` for the `rootLocale` value when the directory name is `eng`).

## `searchProvider`

- Type: `'local' | 'algolia' | undefined`
- Default: `undefined`

Setting this option to `local` or `algolia` displays the search interface on your site. The translation of the interface text used for this search is provided automatically. For more information, see the following documentation: https://vitepress.dev/reference/default-theme-search#search

To override VitePress's search options, you can use the `searchOptions` option.

## `searchOptions`

- Type: `LocalSearchOptions | AlgoliaSearchOptions`
- Default: `undefined`

You can specify refinement options for `local` or `algolia` searches.

## `disableAutoSetLangValue`

- Type: `boolean`
- Default: `false`

If this option is `true`, the `lang` value is not set automatically.Use this if you do not want to specify a value for the `lang` attribute of the `html` tag.

## `debugPrint`

- Type: `boolean`
- Default: `false`

If this option is `true`, you can try printing the options used and the output to the console log.

## `label`

- Type: `object`
- Default: `undefined`

Use this option if you want to use custom labels.

## `link`

- Type: `object`
- Default: `undefined`

Use this option if you want to use a custom link.

## `lang`

- Type: `object`
- Default: `undefined`

Use this option if you want to use a custom `lang` property value.

## `title`

- Type: `object`
- Default: `undefined`

This option is used when you want to display different site titles for different languages.

It is declared as an `object`, with the key value being the language code and the value being string data. You must use the corresponding language code even when you are the root locale. For example, to customize English and Korean respectively, you would set it like this:

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

This option is used when you want to display different site title templates (tail separators) for different languages.

It is declared as an `object`, with the key value being the language code and the value being string data. You must use the corresponding language code even when you are the root locale. For example, to customize English and Korean respectively, you would set it like this:

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

This option is used when you want to display different site descriptions for different languages.

It is declared as an `object`, with the key value being the language code and the value being string data. You must use the corresponding language code even when you are the root locale. For example, to customize English and Korean respectively, you would set it like this:

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

This option is used when using different `head` settings for different languages.

It is declared as an `object`, with the key value being the language code and the value being string data. You must use the corresponding language code even when you are the root locale. For example, to customize English and Korean respectively, you would set it like this:

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

This option is used when using different `themeConfig` settings for different languages.

It is declared as an `object`, with the key value being the language code and the value being string data. You must use the corresponding language code even when you are the root locale. For example, to customize English and Korean respectively, you would set it like this:

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
