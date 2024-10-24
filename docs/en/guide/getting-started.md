---
order: 1
---

# Getting Started

This page walks you through the installation and use of the VitePress I18n module.

## Installation

You may need to pre-configure the **[VitePress](https://vitepress.dev)** module before using this module.

It is recommended that you use Node.js version 18.x or higher. **VitePress I18n** is written in `ESM`.

You can install the module using [NPM](https://www.npmjs.com/package/vitepress-i18n) or another node module package manager. This package is only used in the developer environment and should be installed in `devDependencies`. Install it with the command below:

```shell
# via npm
$ npm i -D vitepress-i18n

# via yarn
$ yarn add -D vitepress-i18n

# via pnpm
$ pnpm i -D vitepress-i18n
```

## How to Use

This article does not cover basic knowledge of **VitePress**. To learn more about **VitePress**, please visit: https://vitepress.dev

First, import `vitepress-i18n` in one of the two ways below.

### 1. Using named-import (Recommend)

```javascript
// `.vitepress/config.js`
import { generateI18n } from 'vitepress-i18n';

const vitePressOptions = {
  title: 'VitePress',
  themeConfig: {
    // ...
  }
};

const vitePressI18nOptions = {
  /* Options... */
};

export default defineConfig(withI18n(vitePressOptions, vitePressI18nOptions));
```

### 2. Using default-import

```javascript
// `.vitepress/config.js`
import VitePressI18n from 'vitepress-i18n';

const vitePressOptions = {
  title: 'VitePress',
  themeConfig: {
    // ...
  }
};

const vitePressI18nOptions = {
  /* Options... */
};

export default defineConfig(VitePressI18n.withI18n(vitePressOptions, vitePressI18nOptions));
```

Call `withI18n` on the `defineConfig` option of VitePress's configuration file, the `.vitepress/config.js` file (the name of the configuration file may vary depending on your project environment).

The `withI18n` must contain two argument values: the first argument contains the value of the option in VitePress and the second argument contains the value of the option in VitePress I18n to override.

The output from VitePress I18n contains automatically translated text. This options data will be merged with the existing options in VitePress.

There are several options available, but they are optional depending on the context. However, the `locales` option is mandatory: it provides the languages that VitePress I18n should translate into.

```javascript
withI18n(vitePressOptions, {
  locales: ['en', 'ko'] // "Required"
});
```

The value of the `locales` option must include the supported language codes. For a list of supported language codes, see [this article](/guide/supported-languages).

VitePress requires you to specify a primary language. This is called the root locale, and in VitePress I18n, you can specify the root locale like this

```javascript
withI18n(vitePressOptions, {
  locales: [
    { path: 'eng', locale: 'en' },
    { path: 'kor', locale: 'ko' }
  ],
  rootLocale: 'en'
});
```

The value of `rootLocale` uses a supported language code rather than a directory path. If this option is not specified, the first value in the `locales` array will be the root locale.

To test what the overall output looks like, try building VitePress with the `debugPrint` option provided by VitePress I18 set to `true`. You should see the output in the console.

```javascript
withI18n(vitePressOptions, {
  locales: ['en', 'ko'],
  debugPrint: true
});
```

To learn more about the options in VitePress I18n, see the [VitePress I18n options page](/guide/options).
