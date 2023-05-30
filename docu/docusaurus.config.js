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
    colorMode: {

    },
    navbar: {
      title: 'Variant',
      logo: {
        alt: 'Variant Logo',
        src: 'img/variant_logo.png',
      },
      items: [
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
          type: 'docsVersionDropdown',
          position: 'right',
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
          sidebarCollapsible: true,
          sidebarPath: require.resolve('./sidebars.js'),
          versions: {
            current: {
              label: '3.0.0-dev 🔨',
            }
          }
        },
        // about: {
        //   sidebarPath: require.resolve('./sidebars.js'),
        // },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
    [
      'docusaurus-preset-shiki-twoslash',
      {
        themes: ["comrade-contrast", "Monotone-red-color-theme"],
        includeJSDocInHover: true,
      }
    ]
  ],
  plugins: [
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        sidebar: {
          indexLabel: '☕ API',
        },
        readmeTitle: 'Variant API',
        globalsTitle: 'Variant APIs',
        hidePageTitle: true,
      },
    ],
  ],
};
