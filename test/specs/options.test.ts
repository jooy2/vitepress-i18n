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

const SUPPORTED = [
  { locale: 'en', lang: 'en-US', label: 'English' },
  { locale: 'ko', lang: 'ko-KR', label: '한국어' },
  { locale: 'zhHans', lang: 'zh-CN', label: '简体中文' },
  { locale: 'zhHant', lang: 'zh-TW', label: '繁體中文' },
  { locale: 'ja', lang: 'ja-JP', label: '日本語' },
  { locale: 'es', lang: 'es-ES', label: 'Español' },
  { locale: 'pt', lang: 'pt-PT', label: 'Português' },
  { locale: 'ru', lang: 'ru-RU', label: 'Русский' },
  { locale: 'id', lang: 'id-ID', label: 'Bahasa Indonesia' },
  { locale: 'de', lang: 'de-DE', label: 'Deutsch' },
  { locale: 'fr', lang: 'fr-FR', label: 'Français' },
  { locale: 'vi', lang: 'vi-VN', label: 'Tiếng Việt' },
  { locale: 'it', lang: 'it-IT', label: 'Italiano' }
];

describe('Test: every supported locale', () => {
  it('resolves the expected `lang` and `label`', () => {
    const result = withI18n(baseConfig(), { locales: SUPPORTED.map((entry) => entry.locale) });

    SUPPORTED.forEach(({ locale, lang, label }, index) => {
      const entry = localesOf(result)[index === 0 ? 'root' : locale];

      assert.strictEqual(entry.lang, lang, `'${locale}' has the wrong lang`);
      assert.strictEqual(entry.label, label, `'${locale}' has the wrong label`);
    });
  });

  it('uses a well formed BCP 47 tag for every `lang`', () => {
    SUPPORTED.forEach(({ locale, lang }) => {
      const result = withI18n(baseConfig(), { locales: [locale] });

      assert.match(localesOf(result).root.lang, /^[a-z]{2}-[A-Z]{2}$/, `'${locale}' lang: ${lang}`);
    });
  });

  it('carries the built-in translations into `themeConfig`', () => {
    SUPPORTED.forEach(({ locale }) => {
      const result = withI18n(baseConfig(), { locales: [locale] });
      const themeConfig = localesOf(result).root.themeConfig;

      assert.strictEqual(themeConfig.outline.label, LOCALES_TRANSLATIONS[locale].outline.label);
      assert.strictEqual(themeConfig.docFooter.prev, LOCALES_TRANSLATIONS[locale].docFooter.prev);
    });
  });

  it('translates the search interface for every locale', () => {
    (['local', 'algolia'] as const).forEach((provider) => {
      const result = withI18n(baseConfig(), {
        locales: SUPPORTED.map((entry) => entry.locale),
        searchProvider: provider
      });
      const searchLocales = (result.themeConfig as AnyRecord).search.options.locales;

      assert.strictEqual(Object.keys(searchLocales).length, SUPPORTED.length);

      Object.keys(searchLocales).forEach((key) => {
        assert.strictEqual(typeof searchLocales[key].translations.button.buttonText, 'string');
      });
    });
  });
});

describe('Test: `rootLocale`', () => {
  it('defaults to the first entry of a string list', () => {
    const result = withI18n(baseConfig(), { locales: ['ko', 'en'] });

    assert.deepStrictEqual(Object.keys(localesOf(result)), ['root', 'en']);
    assert.strictEqual(localesOf(result).root.lang, 'ko-KR');
  });

  it('defaults to the first entry of an object list', () => {
    const result = withI18n(baseConfig(), {
      locales: [
        { path: 'kor', locale: 'ko' },
        { path: 'eng', locale: 'en' }
      ]
    });

    assert.deepStrictEqual(Object.keys(localesOf(result)), ['root', 'eng']);
    assert.strictEqual(localesOf(result).root.lang, 'ko-KR');
  });

  it('honours a locale that is not the first entry', () => {
    const result = withI18n(baseConfig(), { locales: ['ko', 'ja', 'en'], rootLocale: 'ja' });

    assert.deepStrictEqual(Object.keys(localesOf(result)), ['ko', 'root', 'en']);
    assert.strictEqual(localesOf(result).root.lang, 'ja-JP');
  });

  it('maps the root locale to `root` in the search options as well', () => {
    const result = withI18n(baseConfig(), {
      locales: ['ko', 'en'],
      rootLocale: 'en',
      searchProvider: 'local'
    });

    assert.deepStrictEqual(Object.keys((result.themeConfig as AnyRecord).search.options.locales), [
      'ko',
      'root'
    ]);
  });
});

describe('Test: `lang` and `disableAutoSetLangValue`', () => {
  it('uses a custom `lang` over the built-in one', () => {
    const result = withI18n(baseConfig(), { locales: ['ko'], lang: { ko: 'ko-Kore-KR' } });

    assert.strictEqual(localesOf(result).root.lang, 'ko-Kore-KR');
  });

  it('omits `lang` entirely when auto setting is disabled', () => {
    const result = withI18n(baseConfig(), { locales: ['ko'], disableAutoSetLangValue: true });

    assert.strictEqual(Object.hasOwn(localesOf(result).root, 'lang'), false);
  });

  it('still applies a custom `lang` when auto setting is disabled', () => {
    const result = withI18n(baseConfig(), {
      locales: ['ko'],
      disableAutoSetLangValue: true,
      lang: { ko: 'ko-Kore-KR' }
    });

    assert.strictEqual(localesOf(result).root.lang, 'ko-Kore-KR');
  });
});

describe('Test: plain per locale options', () => {
  it('applies `label`, `link`, `title` and `description`', () => {
    const result = withI18n(baseConfig(), {
      locales: ['en', 'ko'],
      label: { ko: '한국말' },
      link: { ko: '/ko/guide/' },
      title: { ko: '제목' },
      description: { ko: '설명' }
    });

    assert.deepStrictEqual(localesOf(result).ko, {
      lang: 'ko-KR',
      label: '한국말',
      link: '/ko/guide/',
      title: '제목',
      description: '설명',
      themeConfig: localesOf(result).ko.themeConfig
    });
  });

  it('falls back to the built-in label when a custom one is empty', () => {
    const result = withI18n(baseConfig(), { locales: ['ko'], label: { ko: '' } });

    assert.strictEqual(localesOf(result).root.label, '한국어');
  });

  it('keeps `titleTemplate` when it is `false`', () => {
    const result = withI18n(baseConfig(), {
      locales: ['en', 'ko'],
      titleTemplate: { en: false, ko: ' | 사이트' }
    });

    assert.strictEqual(localesOf(result).root.titleTemplate, false);
    assert.strictEqual(localesOf(result).ko.titleTemplate, ' | 사이트');
  });

  it('omits options that were not configured', () => {
    const result = withI18n(baseConfig(), { locales: ['en'] });

    ['link', 'title', 'titleTemplate', 'description', 'head'].forEach((key) => {
      assert.strictEqual(Object.hasOwn(localesOf(result).root, key), false, `'${key}' was emitted`);
    });
  });
});

describe('Test: `editLink`', () => {
  it('keeps the translated text next to the shared pattern', () => {
    const result = withI18n(baseConfig(), { locales: ['en', 'ko'] });

    assert.deepStrictEqual(localesOf(result).ko.themeConfig.editLink, {
      text: '이 페이지 편집 제안',
      pattern: editLinkPattern
    });
  });

  it('drops `editLink` when no pattern is configured', () => {
    const result = withI18n({ themeConfig: {} }, { locales: ['en', 'ko'] });

    assert.strictEqual(Object.hasOwn(localesOf(result).ko.themeConfig, 'editLink'), false);
  });

  it('lets a per locale `editLink` override the shared one', () => {
    const result = withI18n(baseConfig(), {
      locales: ['en', 'ko'],
      themeConfig: { ko: { editLink: { text: '편집하기', pattern: 'https://example.com/:path' } } }
    });

    assert.deepStrictEqual(localesOf(result).ko.themeConfig.editLink, {
      text: '편집하기',
      pattern: 'https://example.com/:path'
    });
    assert.strictEqual(localesOf(result).root.themeConfig.editLink.pattern, editLinkPattern);
  });
});

describe('Test: input shapes', () => {
  it('works without any `themeConfig` at all', () => {
    const result = withI18n({}, { locales: ['en', 'ko'] });

    assert.deepStrictEqual(Object.keys(localesOf(result)), ['root', 'ko']);
    assert.strictEqual(localesOf(result).ko.themeConfig.outline.label, '이 페이지 콘텐츠');
  });

  it('treats a string list and an equivalent object list the same', () => {
    const fromStrings = withI18n(baseConfig(), { locales: ['en', 'ko'] });
    const fromObjects = withI18n(baseConfig(), {
      locales: [
        { path: 'en', locale: 'en' },
        { path: 'ko', locale: 'ko' }
      ]
    });

    assert.deepStrictEqual(fromStrings, fromObjects);
  });

  it('rejects a missing or empty `locales`', () => {
    assert.throws(() => withI18n(baseConfig(), {}), /'locales' option value is required/);
    assert.throws(
      () => withI18n(baseConfig(), { locales: [] }),
      /'locales' option value is required/
    );
  });

  it('rejects a missing options object', () => {
    assert.throws(
      () => (withI18n as any)(baseConfig()),
      /pass VitePress's defineConfig option and plugin options/
    );
    assert.throws(
      () => (withI18n as any)(undefined, { locales: ['en'] }),
      /pass VitePress's defineConfig option and plugin options/
    );
  });
});

describe('Test: repeated calls', () => {
  it('returns identical output for identical input', () => {
    const build = () =>
      withI18n(baseConfig({ nav: [{ text: 'Guide', link: '/guide/' }] }), {
        locales: ['en', 'ko'],
        searchProvider: 'local',
        description: { ko: '설명' },
        themeConfig: { ko: { nav: [{ text: '가이드', link: '/ko/guide/' }] } }
      });

    assert.deepStrictEqual(build(), build());
  });

  it('keeps two differently configured calls independent', () => {
    const first = withI18n(baseConfig(), { locales: ['en'] });
    const second = withI18n(
      { themeConfig: { editLink: { pattern: '/other/:path' } } },
      {
        locales: ['en']
      }
    );

    assert.strictEqual(localesOf(first).root.themeConfig.editLink.pattern, editLinkPattern);
    assert.strictEqual(localesOf(second).root.themeConfig.editLink.pattern, '/other/:path');
  });

  it('does not let one locale leak into the next', () => {
    const result = withI18n(baseConfig(), {
      locales: ['en', 'ko', 'ja'],
      themeConfig: { ko: { outline: { label: '목차' } } }
    });

    assert.strictEqual(localesOf(result).root.themeConfig.outline.label, 'On this page');
    assert.strictEqual(localesOf(result).ko.themeConfig.outline.label, '목차');
    assert.strictEqual(localesOf(result).ja.themeConfig.outline.label, 'このページの内容');
  });
});

describe('Test: top level VitePress options', () => {
  it('leaves unrelated options untouched', () => {
    const result = withI18n(
      { ...baseConfig(), title: 'Site', cleanUrls: true, outDir: '../dist' },
      { locales: ['en'] }
    );

    assert.strictEqual(result.title, 'Site');
    assert.strictEqual(result.cleanUrls, true);
    assert.strictEqual(result.outDir, '../dist');
  });

  it('keeps the shared `themeConfig` at the top level', () => {
    const result = withI18n(baseConfig({ logo: '/logo.png' }), { locales: ['en', 'ko'] });

    assert.strictEqual((result.themeConfig as AnyRecord).logo, '/logo.png');
    assert.strictEqual(localesOf(result).ko.themeConfig.logo, '/logo.png');
  });
});

describe('Test: search options', () => {
  it('passes custom search options through', () => {
    const result = withI18n(baseConfig(), {
      locales: ['en'],
      searchProvider: 'local',
      searchOptions: { detailedView: true, miniSearch: { searchOptions: { fuzzy: 0.2 } } }
    });
    const options = (result.themeConfig as AnyRecord).search.options;

    assert.strictEqual(options.detailedView, true);
    assert.deepStrictEqual(options.miniSearch, { searchOptions: { fuzzy: 0.2 } });
  });

  it('owns the `locales` key of the search options', () => {
    const result = withI18n(baseConfig(), {
      locales: ['en'],
      searchProvider: 'local',
      searchOptions: { locales: { root: { translations: { button: { buttonText: 'nope' } } } } }
    });
    const searchLocales = (result.themeConfig as AnyRecord).search.options.locales;

    assert.strictEqual(searchLocales.root.translations.button.buttonText, 'Search');
  });

  it('emits the provider without translations when it is unknown', () => {
    const result = withI18n(baseConfig(), {
      locales: ['en'],
      searchProvider: 'unknown' as any
    });
    const search = (result.themeConfig as AnyRecord).search;

    assert.strictEqual(search.provider, 'unknown');
    assert.deepStrictEqual(search.options.locales, {});
  });
});

describe('Test: `debugPrint`', () => {
  const captureStdout = (run: () => void): string => {
    const original = process.stdout.write;
    let captured = '';

    process.stdout.write = ((chunk: any) => {
      captured += String(chunk);

      return true;
    }) as typeof process.stdout.write;

    try {
      run();
    } finally {
      process.stdout.write = original;
    }

    return captured;
  };

  it('prints nothing by default', () => {
    const captured = captureStdout(() => withI18n(baseConfig(), { locales: ['en'] }));

    assert.strictEqual(captured, '');
  });

  it('prints both the options and the result when enabled', () => {
    const captured = captureStdout(() =>
      withI18n(baseConfig(), { locales: ['en', 'ko'], debugPrint: true })
    );

    assert.match(captured, /"locales"/);
    assert.match(captured, /"이 페이지 콘텐츠"/);
  });
});
