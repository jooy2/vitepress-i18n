# 🔌 VitePress i18n

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/vitepress-i18n/blob/master/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/vitepress-i18n) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/vitepress-i18n) [![npm downloads](https://img.shields.io/npm/dm/vitepress-i18n.svg)](https://www.npmjs.com/package/vitepress-i18n) [![npm latest package](https://img.shields.io/npm/v/vitepress-i18n/latest.svg)](https://www.npmjs.com/package/vitepress-i18n) ![npm bundle size](https://img.shields.io/bundlephobia/min/vitepress-i18n) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/vitepress-i18n?style=social)

**VitePress i18n** is a plugin for VitePress that makes it easy to translate text in the default theme and search tool. It translates the default layout with a simple setup and can be used in multiple projects without duplicate code.

- ⚡️ Optimized for the latest version of **VitePress**
- ⚡️ Lightweight bundle file size, zero dependencies
- ⚡️ [TypeScript](https://www.typescriptlang.org) support

## Installation

First, you may need to pre-configure **[VitePress](https://vitepress.dev)** before using this module.

We recommend using **Node.js 18.x** or higher. The **VitePress i18n** is written in `ESM`.

You will need to install the module using [NPM](https://www.npmjs.com/package/vitepress-i18n) or any other Node module package manager. The package should be installed in `devDependencies` as it is only used in the developer environment. Use the command below:

```shell
# via npm
$ npm i -D vitepress-i18n

# via yarn
$ yarn add -D vitepress-i18n

# via pnpm
$ pnpm i -D vitepress-i18n
```

## How to use

VitePress i18n comes with a function to translate the general layout text (`generateI18nLocale`) and a function to translate the search interface (`generateI18nSearch`).

Each function must be called from a specific location in VitePress's configuration file. VitePress's configuration file is typically located at `.vitepress/config.ts`.

In VitePress' i18n, you can customize the locale key. For example, if you specify `kor` as the locale key for Korean translation, you can use a URL like `/kor/docs/abc`. This plugin requires you to properly configure `defineLocales` in the parameter so that it can tell it to translate a specific locale key into the language you specify.

For example, to translate what is specified as the `kor` key into Korean, add the following to the values in the `defineLocales` array: `{ label: 'kor', translateLocale: 'ko' }`

The currently supported translation languages and `translateLocale` matching values are as follows:

- English: `en`
- Korean: `ko`

It will then use the same parameters that VitePress already uses. Note, however, that you must declare custom values for each of the keys you specify in `defineLocales`.

## Methods: `generateI18nLocale`

Call this function with the `locales` option in VitePress's root config:

### Example

```javascript
export default defineConfig({
  locales: generateI18nLocale({
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
  })
});
```

### Parameters

```text
{
  defineLocales: DefineLocales[];
  editLinkPattern: string;
  label: { [key: string]: string };
  link?: { [key: string]: string };
  lang?: { [key: string]: string };
  title?: { [key: string]: string };
  titleTemplate?: { [key: string]: string | boolean };
  description?: { [key: string]: string };
  head?: { [key: string]: HeadConfig[] };
  themeConfig?: { [key: string]: any };
}
```

## Methods: `generateI18nSearch`

Call this function on the `search` option of VitePress's `themeConfig`:

### Example

```javascript
export default defineConfig({
  themeConfig: {
    search: generateI18nSearch({
      defineLocales: [{ label: 'ko', translateLocale: 'ko' }],
      provider: 'local'
    })
  }
});
```

### Parameters

```text
{
  defineLocales: DefineLocales[];
  provider: 'local' | 'algolia';
  options?: LocalSearchOptions;
}
```

## Contribute

You can report issues on [GitHub Issue Tracker](https://github.com/jooy2/vitepress-i18n/issues).

You can also request a pull to fix bugs and add frequently used features.

## License

Copyright © 2024 [CDGet](https://cdget.com) <[jooy2.contact@gmail.com](mailto:jooy2.contact@gmail.com)> Released under the MIT license.
