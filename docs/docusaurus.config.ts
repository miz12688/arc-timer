import type { Config } from '@docusaurus/types'
import type { ThemeConfig } from '@docusaurus/preset-classic'

const config: Config = {
  title: 'ArcTimer',
  tagline:
    'The modern, accessible countdown circle timer for React, React Native & Expo',
  favicon: undefined,
  url: 'https://arctimer.dev',
  baseUrl: '/',

  organizationName: 'ArcTimer',
  projectName: 'arc-timer',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: ['@docusaurus/theme-live-codeblock'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/toankhontech/arc-timer/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'ArcTimer',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/toankhontech/arc-timer',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/docs/getting-started' },
            { label: 'API Reference', to: '/docs/api-reference' },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/toankhontech/arc-timer',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} ArcTimer. Built with Docusaurus.`,
    },
  } satisfies ThemeConfig,
}

export default config
