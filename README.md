# 🔌 VitePress i18n

[![awesome-vitepress](https://awesome.re/mentioned-badge.svg)](https://github.com/logicspark/awesome-vitepress-v1) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/vitepress-i18n/blob/main/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/vitepress-i18n) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/vitepress-i18n) [![npm downloads](https://img.shields.io/npm/dm/vitepress-i18n.svg)](https://www.npmjs.com/package/vitepress-i18n) [![npm latest package](https://img.shields.io/npm/v/vitepress-i18n/latest.svg)](https://www.npmjs.com/package/vitepress-i18n) ![npm bundle size](https://img.shields.io/bundlephobia/min/vitepress-i18n) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/vitepress-i18n?style=social)

**VitePress i18n** is a plugin for VitePress that makes it easy to translate text in the default theme and search tool. Wrap your config with one function and list the languages you need, and every locale gets its interface text, so the same translations work across projects without duplicate code.

- 13 languages built in, each with its native name in the language menu
- One `withI18n` call, with no translation files to create or keep in sync
- Local search and Algolia DocSearch are translated as well
- `label` and a per locale `themeConfig` replace the built-in text, and `title`, `description` and `head` can differ per locale
- Folders such as `eng` or `kor` can be mapped to language codes with `{ path, locale }`
- Optimized for the latest version of **VitePress**, with zero dependencies and [TypeScript](https://www.typescriptlang.org) types

## Installation

VitePress i18n requires Node.js 22 or later. Install it as a dev dependency:

```shell
npm i -D vitepress-i18n
```

## [Documentation (Getting Started & All option lists)](https://vitepress-i18n.cdget.com/guide/getting-started)

Installing and using the package and defining all the utility methods can be found on the documentation page below: https://vitepress-i18n.cdget.com/guide/getting-started

## Supported languages

(`*` = Currently using machine translation. Help us improve translation quality with a pull request!)

- English: `en`
- Korean (한국어): `ko`
- Chinese Simplified (简体中文): `zhHans`
- `*` Chinese Traditional (繁體中文): `zhHant`
- `*` Japanese (日本語): `ja`
- Spanish (Español): `es`
- Portuguese (Português): `pt`
- Russian (Русский): `ru`
- `*` Indonesian (Bahasa Indonesia): `id`
- `*` German (Deutsch): `de`
- `*` French (Français): `fr`
- `*` Vietnamese (Tiếng Việt): `vi`
- `*` Italian (Italiano): `it`

## Example

### Basic configurations

```javascript
import { defineConfig } from 'vitepress';
import { withI18n } from 'vitepress-i18n';

const vitePressOptions = {
  title: 'VitePress',
  themeConfig: {
    // ...
  }
};

const vitePressI18nOptions = {
  locales: ['en', 'ko', 'zhHans']
};

export default defineConfig(withI18n(vitePressOptions, vitePressI18nOptions));
```

### With complex configurations

```javascript
import { defineConfig } from 'vitepress';
import { withI18n } from 'vitepress-i18n';

const vitePressOptions = {
  title: 'VitePress',
  themeConfig: {
    // ...
  }
};

const vitePressI18nOptions = {
  locales: [
    { path: 'eng', locale: 'en' },
    { path: 'kor', locale: 'ko' }
  ],
  rootLocale: 'en',
  description: {
    en: 'Hello',
    ko: '안녕하세요'
  }
};

export default defineConfig(withI18n(vitePressOptions, vitePressI18nOptions));
```

## Contributing

Anyone can contribute to the project by reporting new issues or submitting a pull request. For more information, please see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Please see the [LICENSE](LICENSE) file for more information about project owners, usage rights, and more.
