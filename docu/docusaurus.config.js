module.exports = {
  title: 'Variant',
  tagline: 'Better discriminated unions in TypeScript',
  url: 'https://paarthenon.github.io',
  baseUrl: '/variant/',
  favicon: 'img/variant.ico',
  organizationName: 'paarthenon', // Usually your GitHub org/user name.
  projectName: 'variant', // Usually your repo name.
  
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/vsDark'),
      darkTheme: require('prism-react-renderer/themes/ultramin'),
    },
    sidebarCollapsible: false,
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
        {
          to: 'docs/about', 
          activeBasePath: 'about',
          label: 'About', 
          position: 'left'
        },
        {
          to: 'docs/api',
          label: '☕ API',
          position: 'right',
        },
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
              label: 'Getting Started',
              to: 'docs/intro',
            },
            {
              label: 'About',
              to: 'docs/about',
            },
            {
              label: 'API',
              to: 'docs/api',
            }
          ],
        },
        {
          title: 'Related',
          items: [
            {
              label: 'TypeScript',
              href: 'https://www.typescriptlang.org/',
            },
            {
              label: 'ReasonML Variants',
              href: 'https://reasonml.github.io/docs/en/variant',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/paarthenon/variant',
            },
            {
              label: 'NPM package',
              href: 'https://www.npmjs.com/package/variant',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Variant Contributors` ,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        about: {
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
