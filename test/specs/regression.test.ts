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
    assert.deepStrictEqual(localesOf(result).root.themeConfig.nav, [
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

    const result = withI18n(baseConfig({ custom: circular }), { locales: ['en'] });

    assert.strictEqual(localesOf(result).root.themeConfig.custom.name, 'root');
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
