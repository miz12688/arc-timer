import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  docs: [
    'getting-started',
    'api-reference',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/migration',
        'guides/animations',
        'guides/multi-timer',
        'guides/theming',
        'guides/accessibility',
      ],
    },
  ],
}

export default sidebars
