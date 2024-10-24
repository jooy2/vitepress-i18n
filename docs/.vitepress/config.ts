import { generateSidebar, VitePressSidebarOptions } from 'vitepress-sidebar';
import { repository, homepage } from '../../package.json';
import { defineConfig, UserConfig } from 'vitepress';
import { withI18n } from '../../dist';
import { VitePressI18nOptions } from '../../dist/types';

const defaultLocale: string = 'en';
const editLinkPattern = `${repository.url}/edit/master/docs/:path`;

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

const defineSupportLocales = [
  { label: defaultLocale, translateLocale: defaultLocale },
  { label: 'ko', translateLocale: 'ko' }
];

const vitePressI18nConfig: VitePressI18nOptions = {
  defineLocales: defineSupportLocales,
  rootLocale: defaultLocale,
  editLinkPattern: editLinkPattern,
  searchProvider: 'local'
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
    hostname: homepage
  },
  themeConfig: {
    logo: { src: '/logo-32.png', width: 24, height: 24 },
    sidebar: generateSidebar([
      ...[defaultLocale, 'ko'].map((lang) => {
        return {
          ...commonSidebarConfig,
          documentRootPath: `/docs/${lang}`,
          resolvePath: defaultLocale === lang ? '/' : `/${lang}/`,
          ...(defaultLocale === lang ? {} : { basePath: `/${lang}/` })
        };
      })
    ]),
    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/vitepress-i18n' },
      { icon: 'github', link: repository.url.replace('.git', '') }
    ],
    footer: {
      message: 'Released under the MIT License',
      copyright: '© <a href="https://cdget.com">CDGet</a>'
    }
  }
};

export default defineConfig(withI18n(vitePressConfig, vitePressI18nConfig));
