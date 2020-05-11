module.exports = {
  title: 'Variant',
  tagline: 'Better discriminated unions in TypeScript',
  url: 'paarth.io/variant',
  baseUrl: '/',
  favicon: 'img/variant.ico',
  organizationName: 'paarthenon', // Usually your GitHub org/user name.
  projectName: 'variant', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Variant',
      logo: {
        alt: 'Variant Logo',
        src: 'img/variant_logo.png',
      },
      links: [
        {
          to: 'docs/intro',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'About', position: 'left'},
        {
          href: 'https://github.com/paarthenon/variant',
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
            {
              label: 'Style Guide',
              to: 'docs/doc1',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/paarthenon/variant',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Variant Contributors`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
