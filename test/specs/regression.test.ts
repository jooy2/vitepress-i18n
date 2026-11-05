import assert from 'assert';
import { describe, it } from 'node:test';
import type { UserConfig } from 'vitepress';
import { withI18n } from '../../dist/index.js';
import { LOCALES_TRANSLATIONS } from '../../dist/strings.js';

type AnyRecord = { [key: string]: any };

const editLinkPattern = 'https://vitepress-i18n.cdget.com/edit/:path';

const baseConfig = (themeConfig: AnyRecord = {}): UserConfig => ({
  themeConfig: { editLink: { pattern: editLinkPattern }, ...themeConfig }
});

const localesOf = (config: Partial<UserConfig>): AnyRecord => config.locales as AnyRecord;

// What VitePress shows on a page of the locale: its `themeConfig` laid over the
// site one, one level deep, as `resolveSiteDataByRoute` does
const resolvedThemeConfig = (config: Partial<UserConfig>, key: string): AnyRecord => ({
  ...(config.themeConfig as AnyRecord),
  ...localesOf(config)[key].themeConfig
});

describe('Test: shared translation constants', () => {
  it('does not delete `editLink` from the constant when no pattern is given', () => {
    withI18n({ themeConfig: {} }, { locales: ['en'] });

    assert.deepStrictEqual(LOCALES_TRANSLATIONS.en.editLink, { text: 'Edit this page' });
  });

  it('still resolves `editLink` on a later call', () => {
    withI18n({ themeConfig: {} }, { locales: ['en'] });

    const result = withI18n(baseConfig(), { locales: ['en'] });

    assert.deepStrictEqual(localesOf(result).root.themeConfig.editLink, {
      text: 'Edit this page',
      pattern: editLinkPattern
    });
  });

  it('does not hand out references to the constants', () => {
    const result = withI18n(baseConfig(), { locales: ['en'] });

    assert.notStrictEqual(
      localesOf(result).root.themeConfig.docFooter,
      LOCALES_TRANSLATIONS.en.docFooter
    );
  });
});

describe('Test: search options', () => {
  it('translates every locale when the provider comes from `themeConfig`', () => {
    const vitePressOptions = baseConfig({
      search: { provider: 'local', options: { detailedView: true } }
    });

    const result = withI18n(vitePressOptions, { locales: ['en', 'ko'] });
    const search = (result.themeConfig as AnyRecord).search;

    assert.strictEqual(search.provider, 'local');
    assert.strictEqual(search.options.detailedView, true);
    assert.deepStrictEqual(Object.keys(search.options.locales), ['root', 'ko']);
    assert.strictEqual(search.options.locales.ko.translations.button.buttonText, '검색');
  });

  it('translates every locale when the provider comes from the plugin options', () => {
    const result = withI18n(baseConfig(), { locales: ['en', 'ko'], searchProvider: 'algolia' });
    const search = (result.themeConfig as AnyRecord).search;

    assert.strictEqual(search.provider, 'algolia');
    assert.deepStrictEqual(Object.keys(search.options.locales), ['root', 'ko']);
  });

  it('leaves `search` alone when no provider is configured', () => {
    const result = withI18n(baseConfig(), { locales: ['en'] });

    assert.strictEqual((result.themeConfig as AnyRecord).search, undefined);
  });
});

describe('Test: `themeConfig` merge precedence', () => {
  it('lets the shared value override a built-in translation', () => {
    const result = withI18n(baseConfig({ outline: { label: 'Contents' } }), { locales: ['en'] });

    assert.deepStrictEqual(localesOf(result).root.themeConfig.outline, { label: 'Contents' });
  });

  it('lets the per locale value override the shared one', () => {
    const result = withI18n(baseConfig({ outline: { label: 'Contents' } }), {
      locales: ['en', 'ko'],
      themeConfig: { ko: { outline: { label: '목차' } } }
    });

    assert.deepStrictEqual(localesOf(result).ko.themeConfig.outline, { label: '목차' });
  });

  it('replaces an array of the same length instead of merging it by index', () => {
    const result = withI18n(baseConfig({ nav: [{ text: 'Guide' }, { text: 'API' }] }), {
      locales: ['en', 'ko'],
      themeConfig: { ko: { nav: [{ text: '가이드' }, { text: 'API 문서' }] } }
    });

    assert.deepStrictEqual(localesOf(result).ko.themeConfig.nav, [
      { text: '가이드' },
      { text: 'API 문서' }
    ]);
  });

  it('replaces an array of a different length as well', () => {
    const result = withI18n(baseConfig({ nav: [{ text: 'A' }, { text: 'B' }, { text: 'C' }] }), {
      locales: ['en', 'ko'],
      themeConfig: { ko: { nav: [{ text: '가' }] } }
    });

    assert.deepStrictEqual(localesOf(result).ko.themeConfig.nav, [{ text: '가' }]);
    assert.deepStrictEqual(resolvedThemeConfig(result, 'root').nav, [
      { text: 'A' },
      { text: 'B' },
      { text: 'C' }
    ]);
  });

  it('does not turn a mixed type array into `null` entries', () => {
    const result = withI18n(baseConfig({ sidebar: [{ text: 'Shared' }] }), {
      locales: ['en'],
      themeConfig: { en: { sidebar: ['/guide/'] } }
    });

    assert.deepStrictEqual(localesOf(result).root.themeConfig.sidebar, ['/guide/']);
  });

  it('stops on a circular reference instead of overflowing the stack', () => {
    const circular: AnyRecord = { name: 'root' };
    circular.self = circular;

    // Both sides hold the same circular object, so the merge has to walk into it
    const result = withI18n(baseConfig({ custom: circular }), {
      locales: ['en'],
      themeConfig: { en: { custom: circular } }
    });

    assert.strictEqual(localesOf(result).root.themeConfig.custom.name, 'root');
  });
});

describe('Test: shared `themeConfig` in the locales', () => {
  const all = [
    'en',
    'ko',
    'zhHans',
    'zhHant',
    'ja',
    'es',
    'pt',
    'ru',
    'id',
    'de',
    'fr',
    'vi',
    'it'
  ];

  it('leaves a shared key that no locale sets at the top level only', () => {
    const sidebar = [{ text: 'Guide', link: '/guide/' }];
    const socialLinks = [{ icon: 'github', link: 'https://example.com' }];
    const result = withI18n(baseConfig({ sidebar, socialLinks }), { locales: ['en', 'ko'] });

    ['root', 'ko'].forEach((key) => {
      assert.strictEqual(Object.hasOwn(localesOf(result)[key].themeConfig, 'sidebar'), false);
      assert.strictEqual(Object.hasOwn(localesOf(result)[key].themeConfig, 'socialLinks'), false);
      assert.deepStrictEqual(resolvedThemeConfig(result, key).sidebar, sidebar);
      assert.deepStrictEqual(resolvedThemeConfig(result, key).socialLinks, socialLinks);
    });
  });

  it('copies a shared object that a locale also sets, so the two are merged', () => {
    const result = withI18n(
      baseConfig({ sidebar: { '/guide/': [{ text: 'Guide' }] }, footer: { message: 'MIT' } }),
      {
        locales: ['en', 'ko'],
        themeConfig: { ko: { sidebar: { '/ko/guide/': [{ text: '가이드' }] } } }
      }
    );

    assert.deepStrictEqual(localesOf(result).ko.themeConfig.sidebar, {
      '/guide/': [{ text: 'Guide' }],
      '/ko/guide/': [{ text: '가이드' }]
    });
    assert.strictEqual(Object.hasOwn(localesOf(result).ko.themeConfig, 'footer'), false);
    assert.strictEqual(Object.hasOwn(localesOf(result).root.themeConfig, 'sidebar'), false);
  });

  it('still lays a shared value over a translated key', () => {
    const result = withI18n(baseConfig({ langMenuLabel: 'Language' }), { locales: ['en', 'ko'] });

    assert.strictEqual(localesOf(result).ko.themeConfig.langMenuLabel, 'Language');
  });

  it('does not grow with the number of locales for a large shared `sidebar`', () => {
    const sidebar = Array.from({ length: 300 }, (_, index) => ({
      text: `Page ${index}`,
      link: `/guide/page-${index}`
    }));
    const sizeOf = (locales: string[]): number =>
      JSON.stringify(withI18n(baseConfig({ sidebar }), { locales })).length;
    const sidebarSize = JSON.stringify(sidebar).length;

    assert.ok(sizeOf(all) - sizeOf(['en']) < sidebarSize);
  });

  it('lets a `sidebar` set after `withI18n` reach every locale', () => {
    const result = withI18n(baseConfig({ sidebar: [{ text: 'Old' }] }), { locales: ['en', 'ko'] });
    const updated = {
      ...result,
      themeConfig: { ...(result.themeConfig as AnyRecord), sidebar: [{ text: 'New' }] }
    };

    assert.deepStrictEqual(resolvedThemeConfig(updated, 'ko').sidebar, [{ text: 'New' }]);
  });
});

describe('Test: `outline` and the deprecated labels', () => {
  const koOutlineLabel = LOCALES_TRANSLATIONS.ko.outline.label;

  it('keeps the translated label when `outline` is a heading level only', () => {
    const levels = ['deep', [2, 3], 2];

    levels.forEach((level) => {
      const result = withI18n(baseConfig({ outline: level }), { locales: ['en', 'ko'] });

      assert.deepStrictEqual(localesOf(result).ko.themeConfig.outline, {
        level,
        label: koOutlineLabel
      });
      assert.deepStrictEqual((result.themeConfig as AnyRecord).outline, level);
    });
  });

  it('keeps `outline` hidden when it is `false`', () => {
    const result = withI18n(baseConfig({ outline: false }), { locales: ['en', 'ko'] });

    assert.strictEqual(localesOf(result).ko.themeConfig.outline, false);
  });

  it('restores the label when a per locale `outline` follows a shared `false`', () => {
    const result = withI18n(baseConfig({ outline: false }), {
      locales: ['en', 'ko'],
      themeConfig: { ko: { outline: 'deep' } }
    });

    assert.deepStrictEqual(localesOf(result).ko.themeConfig.outline, {
      level: 'deep',
      label: koOutlineLabel
    });
    assert.strictEqual(localesOf(result).root.themeConfig.outline, false);
  });

  it('lets a shared `outlineTitle` beat the built-in label', () => {
    const result = withI18n(baseConfig({ outlineTitle: 'Contents' }), {
      locales: ['en', 'ko'],
      themeConfig: { ko: { outlineTitle: '목차' } }
    });

    assert.strictEqual(localesOf(result).root.themeConfig.outline.label, 'Contents');
    assert.strictEqual(localesOf(result).ko.themeConfig.outline.label, '목차');
  });

  it('lets a shared `lastUpdatedText` beat the built-in text', () => {
    const formatOptions = { dateStyle: 'short' };
    const result = withI18n(
      baseConfig({ lastUpdatedText: 'Updated', lastUpdated: { formatOptions } }),
      { locales: ['en', 'ko'] }
    );

    assert.deepStrictEqual(localesOf(result).ko.themeConfig.lastUpdated, {
      text: 'Updated',
      formatOptions
    });
  });

  it('prefers `outline.label` over `outlineTitle` in the same layer', () => {
    const result = withI18n(
      baseConfig({ outline: { label: 'Outline' }, outlineTitle: 'Contents' }),
      { locales: ['en'] }
    );

    assert.strictEqual(localesOf(result).root.themeConfig.outline.label, 'Outline');
  });

  it('does not write the rewritten forms back into the options', () => {
    const vitePressOptions = baseConfig({ outline: 'deep', outlineTitle: 'Contents' });
    const snapshot = JSON.stringify(vitePressOptions);

    withI18n(vitePressOptions, { locales: ['en', 'ko'] });

    assert.strictEqual(JSON.stringify(vitePressOptions), snapshot);
  });
});

describe('Test: per language option keys', () => {
  const locales = [
    { path: 'eng', locale: 'en' },
    { path: 'kor', locale: 'ko' }
  ];

  it('accepts the language code as the key', () => {
    const result = withI18n(baseConfig(), {
      locales,
      title: { en: 'Welcome', ko: '환영합니다' }
    });

    assert.strictEqual(localesOf(result).root.title, 'Welcome');
    assert.strictEqual(localesOf(result).kor.title, '환영합니다');
  });

  it('accepts the directory path as the key', () => {
    const result = withI18n(baseConfig(), {
      locales,
      title: { eng: 'Welcome', kor: '환영합니다' }
    });

    assert.strictEqual(localesOf(result).root.title, 'Welcome');
    assert.strictEqual(localesOf(result).kor.title, '환영합니다');
  });

  it('prefers the directory path when both keys are present', () => {
    const result = withI18n(baseConfig(), {
      locales,
      title: { eng: 'by path', en: 'by locale' }
    });

    assert.strictEqual(localesOf(result).root.title, 'by path');
  });
});

describe('Test: `head` option', () => {
  it('emits only the locale specific tags', () => {
    const vitePressOptions: UserConfig = {
      head: [['script', {}, 'console.log(1)']],
      themeConfig: { editLink: { pattern: editLinkPattern } }
    };

    const result = withI18n(vitePressOptions, {
      locales: ['en', 'ko'],
      head: { ko: [['link', { rel: 'icon', href: '/ko.ico' }]] }
    });

    assert.strictEqual(localesOf(result).root.head, undefined);
    assert.deepStrictEqual(localesOf(result).ko.head, [['link', { rel: 'icon', href: '/ko.ico' }]]);
    assert.deepStrictEqual(result.head, [['script', {}, 'console.log(1)']]);
  });
});

describe('Test: option validation', () => {
  it('rejects a `rootLocale` that is missing from `locales`', () => {
    assert.throws(
      () => withI18n(baseConfig(), { locales: ['ko', 'ja'], rootLocale: 'en' }),
      /missing from the 'locales' option/
    );
  });

  it('rejects two locales resolving to the same key', () => {
    assert.throws(
      () =>
        withI18n(baseConfig(), {
          locales: [
            { path: 'x', locale: 'en' },
            { path: 'a', locale: 'ko' },
            { path: 'a', locale: 'ja' }
          ]
        }),
      /used more than once/
    );
  });

  it('rejects two locales sharing a directory when `rootLocale` is `false`', () => {
    assert.throws(
      () =>
        withI18n(baseConfig(), {
          locales: [
            { path: 'a', locale: 'en' },
            { path: 'a', locale: 'ko' }
          ],
          rootLocale: false
        }),
      /'a' locale key is used more than once/
    );
  });

  it('removes the slashes around a `path`', () => {
    const result = withI18n(baseConfig(), {
      locales: [
        { path: 'en', locale: 'en' },
        { path: '/kor/', locale: 'ko' },
        { path: '//docs/ja', locale: 'ja' }
      ],
      title: { kor: '문서' }
    });

    assert.deepStrictEqual(Object.keys(localesOf(result)), ['root', 'kor', 'docs/ja']);
    assert.strictEqual(localesOf(result).kor.title, '문서');
  });

  it('accepts an empty `path` for the root locale only', () => {
    const result = withI18n(baseConfig(), {
      locales: [
        { path: '', locale: 'en' },
        { path: 'ko', locale: 'ko' }
      ]
    });

    assert.deepStrictEqual(Object.keys(localesOf(result)), ['root', 'ko']);
    assert.throws(
      () =>
        withI18n(baseConfig(), {
          locales: [
            { path: 'en', locale: 'en' },
            { path: '/', locale: 'ko' }
          ]
        }),
      /'ko' locale needs a 'path'/
    );
    assert.throws(
      () => withI18n(baseConfig(), { locales: [{ path: '', locale: 'en' }], rootLocale: false }),
      /'en' locale needs a 'path'/
    );
  });

  it('still rejects an unsupported locale when `rootLocale` is `false`', () => {
    assert.throws(
      () => withI18n(baseConfig(), { locales: ['en', 'xx'], rootLocale: false }),
      /'xx' locale is not currently supported/
    );
  });

  it('reports the format error for malformed entries', () => {
    const malformed = [null, {}, 123, ''];

    malformed.forEach((entry) => {
      assert.throws(
        () => withI18n(baseConfig(), { locales: [entry] as any }),
        /not in the correct format/
      );
    });
  });

  it('rejects an unsupported locale', () => {
    assert.throws(
      () => withI18n(baseConfig(), { locales: ['en', 'xx'] }),
      /'xx' locale is not currently supported/
    );
  });
});

describe('Test: existing VitePress `locales` entries', () => {
  const withLocales = (locales: AnyRecord, themeConfig: AnyRecord = {}): UserConfig => ({
    ...baseConfig(themeConfig),
    locales
  });

  it('keeps the values set on the entry with the same key', () => {
    const result = withI18n(
      withLocales({ ko: { label: 'Korean', lang: 'ko', title: 'Docs', dir: 'ltr' } }),
      { locales: ['en', 'ko'] }
    );
    const ko = localesOf(result).ko;

    assert.strictEqual(ko.label, 'Korean');
    assert.strictEqual(ko.lang, 'ko');
    assert.strictEqual(ko.title, 'Docs');
    assert.strictEqual(ko.dir, 'ltr');
  });

  it('lets the entry `themeConfig` beat the shared one and the built-in translations', () => {
    const result = withI18n(
      withLocales(
        { ko: { themeConfig: { nav: [{ text: '가이드' }], outline: { label: '목차' } } } },
        { nav: [{ text: 'Guide' }] }
      ),
      { locales: ['en', 'ko'] }
    );
    const ko = localesOf(result).ko.themeConfig;

    assert.deepStrictEqual(ko.nav, [{ text: '가이드' }]);
    assert.strictEqual(ko.outline.label, '목차');
    assert.strictEqual(ko.docFooter.prev, LOCALES_TRANSLATIONS.ko.docFooter.prev);
    assert.deepStrictEqual(resolvedThemeConfig(result, 'root').nav, [{ text: 'Guide' }]);
  });

  it('lets the per locale plugin options beat the entry', () => {
    const result = withI18n(
      withLocales({
        ko: { label: 'Korean', lang: 'ko', themeConfig: { nav: [{ text: 'A' }] } }
      }),
      {
        locales: ['en', 'ko'],
        label: { ko: '한글' },
        lang: { ko: 'ko-Kore-KR' },
        themeConfig: { ko: { nav: [{ text: 'B' }] } }
      }
    );
    const ko = localesOf(result).ko;

    assert.strictEqual(ko.label, '한글');
    assert.strictEqual(ko.lang, 'ko-Kore-KR');
    assert.deepStrictEqual(ko.themeConfig.nav, [{ text: 'B' }]);
  });

  it('applies the `root` entry to the root locale', () => {
    const result = withI18n(withLocales({ root: { label: 'EN' } }), { locales: ['en', 'ko'] });

    assert.strictEqual(localesOf(result).root.label, 'EN');
    assert.strictEqual(localesOf(result).root.lang, 'en-US');
  });

  it('falls back to the built-in label when the entry label is empty', () => {
    const result = withI18n(withLocales({ ko: { label: '' } }), { locales: ['en', 'ko'] });

    assert.strictEqual(localesOf(result).ko.label, '한국어');
  });

  it('keeps an entry under its own `lang` when auto setting is disabled', () => {
    const result = withI18n(withLocales({ ko: { lang: 'ko' } }), {
      locales: ['en', 'ko'],
      disableAutoSetLangValue: true
    });

    assert.strictEqual(localesOf(result).ko.lang, 'ko');
    assert.strictEqual(localesOf(result).root.lang, undefined);
  });

  it('leaves an entry the plugin does not generate untouched', () => {
    const polish = { label: 'Polski', lang: 'pl-PL', themeConfig: { outline: { label: 'Spis' } } };
    const result = withI18n(withLocales({ pl: polish }), { locales: ['en', 'ko'] });

    assert.deepStrictEqual(Object.keys(localesOf(result)), ['pl', 'root', 'ko']);
    assert.deepStrictEqual(localesOf(result).pl, polish);
  });

  it('lists each language once when every language has its own directory', () => {
    const result = withI18n(
      withLocales({
        en: { label: 'English (US)', link: '/en/' },
        de: { label: 'Deutsch', link: '/de/' }
      }),
      {
        locales: [
          { path: 'en', locale: 'en' },
          { path: 'de', locale: 'de' }
        ],
        rootLocale: false,
        searchProvider: 'local'
      }
    );
    const searchLocales = (result.themeConfig as AnyRecord).search.options.locales;

    assert.deepStrictEqual(Object.keys(localesOf(result)), ['en', 'de']);
    assert.deepStrictEqual(Object.keys(searchLocales), ['en', 'de']);
    assert.strictEqual(localesOf(result).en.label, 'English (US)');
    assert.strictEqual(localesOf(result).en.link, '/en/');
    assert.strictEqual(
      localesOf(result).de.themeConfig.outline.label,
      LOCALES_TRANSLATIONS.de.outline.label
    );
  });

  it('does not write back into the entries', () => {
    const vitePressOptions = withLocales(
      { ko: { label: 'Korean', themeConfig: { nav: [{ text: '가이드' }] } } },
      { nav: [{ text: 'Guide' }] }
    );
    const snapshot = JSON.stringify(vitePressOptions);

    withI18n(vitePressOptions, {
      locales: ['en', 'ko'],
      themeConfig: { ko: { outline: { label: '목차' } } }
    });

    assert.strictEqual(JSON.stringify(vitePressOptions), snapshot);
  });
});

describe('Test: argument immutability', () => {
  it('does not write back into either options object', () => {
    const vitePressOptions = baseConfig({
      search: { provider: 'local' },
      nav: [{ text: 'Guide' }]
    });
    const i18nOptions = {
      locales: ['en', 'ko'],
      themeConfig: { ko: { nav: [{ text: '가이드' }] } }
    };
    const snapshot = JSON.stringify({ vitePressOptions, i18nOptions });

    withI18n(vitePressOptions, i18nOptions);

    assert.strictEqual(JSON.stringify({ vitePressOptions, i18nOptions }), snapshot);
  });
});

describe('Test: translation coverage', () => {
  it('translates the not found page and the skip link for every locale', () => {
    Object.keys(LOCALES_TRANSLATIONS).forEach((locale) => {
      const translation = LOCALES_TRANSLATIONS[locale];

      assert.strictEqual(typeof translation.skipToContentLabel, 'string');
      assert.deepStrictEqual(Object.keys(translation.notFound), [
        'title',
        'quote',
        'linkLabel',
        'linkText'
      ]);
    });
  });
});
