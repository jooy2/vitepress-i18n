import { withSidebar } from 'vitepress-sidebar';
import packageJson from '../../package.json' with { type: 'json' };
import { defineConfig, UserConfig } from 'vitepress';
import { withI18n } from '../../dist/index.js';
import { VitePressI18nOptions } from '../../dist/types.js';
import { VitePressSidebarOptions } from 'vitepress-sidebar/types';

const defaultLocale: string = 'en';
const defineSupportLocales = [defaultLocale, 'ko'];

const commonSidebarConfig: VitePressSidebarOptions = {
  debugPrint: true,
  manualSortFileNameByPriority: ['introduction.md', 'guide'],
  excludePattern: ['changelog.md'],
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
    hostname: packageJson.homepage
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
