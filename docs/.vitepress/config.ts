import { readdirSync, readFileSync } from 'node:fs';
import { join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { withSidebar } from 'vitepress-sidebar';
import packageJson from '../../package.json' with { type: 'json' };
import { defineConfig, HeadConfig, TransformContext, UserConfig } from 'vitepress';
import { withI18n } from '../../dist/index.js';
import { VitePressI18nOptions } from '../../dist/types.js';
import { VitePressSidebarOptions } from 'vitepress-sidebar/types';

const defaultLocale: string = 'en';
const defineSupportLocales = [defaultLocale, 'ko'];

const SITE_URL: string = packageJson.homepage;
const DOCS_DIR: string = fileURLToPath(new URL('..', import.meta.url));
const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/;
const SEO_LOCALES: { [lang: string]: { ogLocale: string; imageAlt: string } } = {
  en: { ogLocale: 'en_US', imageAlt: 'A globe with speech bubbles in several colors' },
  ko: { ogLocale: 'ko_KR', imageAlt: '여러 색의 말풍선이 있는 지구본' }
};

// Site path of a page, such as `ko/guide/`, following the `en` rewrite and `cleanUrls`
const toPagePath = (lang: string, restPath: string): string =>
  `${lang === defaultLocale ? '' : `${lang}/`}${restPath}`
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '');

const toPageUrl = (lang: string, restPath: string): string =>
  `${SITE_URL}/${toPagePath(lang, restPath)}`;

/*
 * Site paths of the pages that hold nothing but frontmatter, such as a folder
 * `index.md` that only names the folder in the sidebar. They are marked
 * `noindex` and left out of the sitemap.
 */
const EMPTY_PAGE_PATHS = new Set(
  defineSupportLocales.flatMap((lang) =>
    readdirSync(join(DOCS_DIR, lang), { recursive: true, encoding: 'utf-8' })
      .filter((file) => file.endsWith('.md'))
      .filter(
        (file) =>
          readFileSync(join(DOCS_DIR, lang, file), 'utf-8')
            .replace(FRONTMATTER, '')
            .trim() === ''
      )
      .map((file) => toPagePath(lang, file.split(sep).join('/')))
  )
);

/*
 * Gives every page its canonical URL, links to the same page in the other
 * languages, and Open Graph tags. VitePress only calls this while building.
 */
const transformHead = ({
  pageData,
  siteConfig,
  title,
  description
}: TransformContext): HeadConfig[] => {
  // `filePath` is the source path, such as `ko/guide/options.md`, before the rewrite
  const [lang, ...restParts] = pageData.filePath.split('/');
  const restPath = restParts.join('/');

  if (pageData.isNotFound || !SEO_LOCALES[lang]) {
    return [];
  }

  if (EMPTY_PAGE_PATHS.has(toPagePath(lang, restPath))) {
    return [['meta', { name: 'robots', content: 'noindex' }]];
  }

  const url = toPageUrl(lang, restPath);
  const translatedLangs = defineSupportLocales.filter(
    (otherLang) =>
      siteConfig.pages.includes(`${otherLang}/${restPath}`) &&
      !EMPTY_PAGE_PATHS.has(toPagePath(otherLang, restPath))
  );
  const alternates: HeadConfig[] = [];

  if (translatedLangs.length > 1) {
    translatedLangs.forEach((otherLang) => {
      alternates.push([
        'link',
        { rel: 'alternate', hreflang: otherLang, href: toPageUrl(otherLang, restPath) }
      ]);
    });

    if (translatedLangs.includes(defaultLocale)) {
      alternates.push([
        'link',
        { rel: 'alternate', hreflang: 'x-default', href: toPageUrl(defaultLocale, restPath) }
      ]);
    }
  }

  return [
    ['link', { rel: 'canonical', href: url }],
    ...alternates,
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteConfig.site.title }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:image', content: `${SITE_URL}/language.png` }],
    ['meta', { property: 'og:image:width', content: '512' }],
    ['meta', { property: 'og:image:height', content: '512' }],
    ['meta', { property: 'og:image:alt', content: SEO_LOCALES[lang].imageAlt }],
    ['meta', { property: 'og:locale', content: SEO_LOCALES[lang].ogLocale }],
    ...translatedLangs
      .filter((otherLang) => otherLang !== lang)
      .map((otherLang): HeadConfig => [
        'meta',
        { property: 'og:locale:alternate', content: SEO_LOCALES[otherLang].ogLocale }
      ]),
    ['meta', { name: 'twitter:card', content: 'summary' }]
  ];
};

const commonSidebarConfig: VitePressSidebarOptions = {
  debugPrint: true,
  manualSortFileNameByPriority: ['introduction.md', 'guide'],
  excludeByGlobPattern: ['changelog.md'],
  collapsed: false,
  capitalizeFirst: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  sortMenusByFrontmatterOrder: true
};

const vitePressSidebarConfig = [
  ...defineSupportLocales.map((lang) => {
    return {
      ...commonSidebarConfig,
      documentRootPath: `/docs/${lang}`,
      resolvePath: defaultLocale === lang ? '/' : `/${lang}/`,
      ...(defaultLocale === lang ? {} : { basePath: `/${lang}/` })
    };
  })
];

const vitePressI18nConfig: VitePressI18nOptions = {
  debugPrint: true,
  locales: defineSupportLocales,
  rootLocale: defaultLocale,
  searchProvider: 'local',
  description: {
    en: 'VitePress i18n is a plugin for VitePress that makes it easy to translate text in the default theme and search tool.',
    ko: 'VitePress i18n은 기본 테마와 검색 도구에서 텍스트를 쉽게 번역할 수 있는 VitePress용 플러그인입니다.'
  },
  themeConfig: {
    en: {
      nav: [
        {
          text: 'Installation',
          link: '/guide/getting-started'
        },
        {
          text: 'Changelog',
          link: 'changelog'
        }
      ]
    },
    ko: {
      nav: [
        {
          text: '설치',
          link: '/ko/guide/getting-started'
        },
        {
          text: '변경사항',
          link: '/ko/changelog'
        }
      ]
    }
  }
};

const vitePressConfig: UserConfig = {
  title: 'VitePress I18n',
  lastUpdated: true,
  outDir: '../docs-dist',
  cleanUrls: true,
  metaChunk: true,
  rewrites: {
    'en/:rest*': ':rest*'
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo-32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/logo-16.png' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }]
  ],
  sitemap: {
    hostname: packageJson.homepage,
    // Empty pages are `noindex`, so listing them in the sitemap would contradict it
    transformItems: (items) =>
      items
        .filter((item) => !EMPTY_PAGE_PATHS.has(item.url))
        .map((item) =>
          item.links
            ? { ...item, links: item.links.filter((link) => !EMPTY_PAGE_PATHS.has(link.url)) }
            : item
        )
  },
  transformHead,
  markdown: {
    config: (md) => {
      // VitePress builds the heading permalink label from the raw heading, so
      // without this a screen reader would read out a custom `{#id}` as well
      md.core.ruler.push('strip_custom_id_from_permalink_label', (state) => {
        state.tokens.forEach((token) => {
          token.children?.forEach((child) => {
            const label = child.attrGet('aria-label');

            if (child.type === 'link_open' && label) {
              child.attrSet('aria-label', label.replace(/\s*\{#[^}]*\}/, ''));
            }
          });
        });
      });
    }
  },
  themeConfig: {
    logo: { src: '/logo-32.png', width: 24, height: 24 },
    editLink: {
      pattern: `${packageJson.repository.url}/edit/main/docs/:path`
    },
    socialLinks: [
      { icon: 'npm', link: `https://www.npmjs.com/package/${packageJson.name}` },
      { icon: 'github', link: packageJson.repository.url.replace('.git', '') }
    ],
    footer: {
      message: 'Released under the MIT License',
      copyright: '© <a href="https://cdget.com">CDGet</a>'
    }
  }
};

export default defineConfig(
  withSidebar(withI18n(vitePressConfig, vitePressI18nConfig), vitePressSidebarConfig)
);
