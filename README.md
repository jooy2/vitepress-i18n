# 🔌 VitePress i18n

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/vitepress-i18n/blob/master/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/vitepress-i18n) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/vitepress-i18n) [![npm downloads](https://img.shields.io/npm/dm/vitepress-i18n.svg)](https://www.npmjs.com/package/vitepress-i18n) [![npm latest package](https://img.shields.io/npm/v/vitepress-i18n/latest.svg)](https://www.npmjs.com/package/vitepress-i18n) ![npm bundle size](https://img.shields.io/bundlephobia/min/vitepress-i18n) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/vitepress-i18n?style=social)

**VitePress i18n** is a plugin for VitePress that makes it easy to translate text in the default theme and search tool. It translates the default layout with a simple setup and can be used in multiple projects without duplicate code.

- ⚡️ Optimized for the latest version of **VitePress**
- ⚡️ Lightweight bundle file size, zero dependencies
- ⚡️ [TypeScript](https://www.typescriptlang.org) support

## [Documentation (Getting Started & All option lists)](https://vitepress-i18n.cdget.com/guide/getting-started)

Installing and using the package and defining all the utility methods can be found on the documentation page below: https://vitepress-i18n.cdget.com/guide/getting-started

The currently supported translation languages and `translateLocale` matching values are as follows:

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
import { withI18n } from 'vitepress-i18n';

const vitePressOptions = {
  title: 'VitePress',
  themeConfig: {
    // ...
  }
};

const vitePressI18nOptions = {
  locales: [
    { path: 'en', locale: 'en' },
    { path: 'ko', locale: 'ko' }
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
};

export default defineConfig(withI18n(vitePressOptions, vitePressI18nOptions));
```

## Contribute

You can report issues on [GitHub Issue Tracker](https://github.com/jooy2/vitepress-i18n/issues).

You can also request a pull to fix bugs and add frequently used features.

## License

Copyright © 2024 [CDGet](https://cdget.com) <[jooy2.contact@gmail.com](mailto:jooy2.contact@gmail.com)> Released under the MIT license.
