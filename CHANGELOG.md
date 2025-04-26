# Changelog

## 1.3.4 (2025-04-26)

- Fixed some common themeConfig settings not being merged (#8)

## 1.3.3 (2025-03-13)

- Do not include in the options when `editLink` is not defined (#6)

## 1.3.2 (2024-12-07)

- Update french translations (@paul-louyot)

## 1.3.1 (2024-12-07)

- Fix import of type declaration files

## 1.3.0 (2024-10-24)

- **BREAKING CHANGES**: There have been significant changes to how this plugin is used. Learn more by visiting the following documentation pages: https://vitepress-i18n.cdget.com

## 1.2.0 (2024-10-24)

This version is deprecated and not recommended for production use.

- **BREAKING CHANGES**: The `generateI18nLocale` and `generateI18nSearch` functions have now been merged into `withI18n`. Therefore, both functions will be removed in the next version. Please refer to the documentation to migrate to the `withI18n` function.

## 1.1.1 (2024-10-23)

This version is deprecated and not recommended for production use.

- Fix chinese simplified string (#1)

## 1.1.0 (2024-10-23)

This version is deprecated and not recommended for production use.

- **BREAKING CHANGES**: The `generateI18nLocale` and `generateI18nSearch` functions have now been merged into `generateI18n`. Therefore, both functions will be removed in the next version. Please refer to the documentation to migrate to the `generateI18n` function.

## 1.0.6 (2024-09-16)

This version is deprecated and not recommended for production use.

- Override `editLinkPattern` value even if defined common theme configs
- Add `debugPrint` option for `generateI18nSearch`

## 1.0.5 (2024-09-16) - Not for Production

- Add italian translations
- Allow auto set lang and label value when if not defined
- Add `debugPrint` method
- Add `disableAutoSetLangValue` method

## 1.0.4 (2024-09-07) - Not for Production

- Fix import issue

## 1.0.3 (2024-09-07) - Not for Production

- Add chinese traditional, japanese, spanish, portuguese, russian, indonesian, german, french, vietnamese translations
- Split translation and type files

## 1.0.2 (2024-09-06) - Not for Production

- Add chinese simplified translation

## 1.0.1 (2024-09-04) - Not for Production

- Minor improvements

## 1.0.0 (2024-09-04) - Not for Production

Not purpose for release. Do not use production.

- Initial release
