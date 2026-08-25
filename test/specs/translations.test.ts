import assert from 'assert';
import { describe, it } from 'node:test';
import {
  ALGOLIA_SEARCH_TRANSLATIONS,
  LOCAL_SEARCH_TRANSLATIONS,
  LOCALES_TRANSLATIONS
} from '../../dist/strings.js';

type AnyRecord = { [key: string]: any };

/*
 * Kept in sync with `PLUGIN_SUPPORT_LOCALES` in `lib/index.ts`. A locale added
 * there without strings, or strings added without the locale, fails here.
 */
const SUPPORTED_LOCALES = [
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

const DICTIONARIES: { name: string; data: AnyRecord }[] = [
  { name: 'LOCALES_TRANSLATIONS', data: LOCALES_TRANSLATIONS },
  { name: 'LOCAL_SEARCH_TRANSLATIONS', data: LOCAL_SEARCH_TRANSLATIONS },
  { name: 'ALGOLIA_SEARCH_TRANSLATIONS', data: ALGOLIA_SEARCH_TRANSLATIONS }
];

const keyPaths = (value: AnyRecord, prefix = ''): string[] =>
  Object.entries(value).flatMap(([key, entry]) =>
    entry !== null && typeof entry === 'object' && !Array.isArray(entry)
      ? keyPaths(entry, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  );

const valueAt = (value: AnyRecord, path: string): unknown =>
  path.split('.').reduce<any>((entry, key) => entry?.[key], value);

describe('Test: translation dictionaries', () => {
  DICTIONARIES.forEach(({ name, data }) => {
    it(`${name} covers exactly the supported locales`, () => {
      assert.deepStrictEqual(Object.keys(data).sort(), [...SUPPORTED_LOCALES].sort());
    });

    it(`${name} defines the same keys for every locale`, () => {
      const expected = keyPaths(data.en).sort();

      Object.keys(data).forEach((locale) => {
        assert.deepStrictEqual(
          keyPaths(data[locale]).sort(),
          expected,
          `'${locale}' does not match the key set of 'en'`
        );
      });
    });

    it(`${name} has a non empty string at every key`, () => {
      Object.keys(data).forEach((locale) => {
        keyPaths(data[locale]).forEach((path) => {
          const value = valueAt(data[locale], path);

          assert.strictEqual(typeof value, 'string', `'${locale}.${path}' is not a string`);
          assert.notStrictEqual((value as string).trim(), '', `'${locale}.${path}' is empty`);
        });
      });
    });
  });

  it('does not name a specific hosting service in `editLink`', () => {
    Object.keys(LOCALES_TRANSLATIONS).forEach((locale) => {
      assert.doesNotMatch(
        LOCALES_TRANSLATIONS[locale].editLink.text,
        /github|gitlab|bitbucket/i,
        `'${locale}' names a hosting service, but 'editLink.pattern' can point anywhere`
      );
    });
  });

  it('translates every string away from English', () => {
    /*
     * Words that legitimately match English in the given language. Anything
     * else matching `en` is an untranslated leftover.
     */
    const allowed = new Set([
      'id.sidebarMenuLabel',
      'fr.sidebarMenuLabel',
      'it.sidebarMenuLabel',
      'vi.sidebarMenuLabel',
      'zhHant.translations.modal.footer.closeKeyAriaLabel',
      'ja.translations.modal.footer.closeKeyAriaLabel',
      'es.translations.modal.footer.selectKeyAriaLabel'
    ]);

    DICTIONARIES.forEach(({ data }) => {
      Object.keys(data).forEach((locale) => {
        if (locale === 'en') {
          return;
        }

        keyPaths(data.en).forEach((path) => {
          if (allowed.has(`${locale}.${path}`)) {
            return;
          }

          assert.notStrictEqual(
            valueAt(data[locale], path),
            valueAt(data.en, path),
            `'${locale}.${path}' is still the English string`
          );
        });
      });
    });
  });

  it('provides an Algolia `placeholder` for every locale', () => {
    Object.keys(ALGOLIA_SEARCH_TRANSLATIONS).forEach((locale) => {
      assert.strictEqual(typeof ALGOLIA_SEARCH_TRANSLATIONS[locale].placeholder, 'string');
    });
  });
});
