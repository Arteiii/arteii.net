import { themes as prismThemes } from "prism-react-renderer";

const fs = require("fs");
const resourcesHTML = fs.readFileSync("./src/navbar/resources.html", "utf-8");
const math = require("remark-math");
const katex = require("rehype-katex");

const internetProfiles = {
  discord: {
    label: "Discord",
    href: "arteii",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ben-pilger/",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/Arteiii",
  },
  // keybase: {
  //   label: "keybase",
  //   href: "https://keybase.io/arteii",
  // },
  vcard: {
    label: "Save Contact (vCard)",
    href: "download/ben_pilger.vcf"
  },
  resume: {
    label: "Resume & CV",
    to: "resume",
  },
  email: {
    label: "Email",
    href: "mailto:ben.pilger@arteii.net",
  },
  blog: {
    label: "Blog",
    to: "blog",
  },
  docs: {
    label: "Documentation",
    to: "docs",
  },
  rust: {
    label: "Rust Cookbook",
    to: "rust-cookbook",
  },
};

module.exports = {
  title: "Arteii",
  tagline: "i do stuff",
  url: "https://arteii.net/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
  favicon: "img/favicon.ico",
  organizationName: "arteii",
  projectName: "arteii.net",
  trailingSlash: true,

  scripts: [
    {
      src: "https://static.cloudflareinsights.com/beacon.min.js",
      defer: true,
      "data-cf-beacon": '{"token": "df2b6893991644aebaca618dc567001b"}',
    },
  ],

  themeConfig: {
    image: "img/Website-Social-Card.jpeg",

    // Declare some <meta> tags
    metadata: [
      { name: "robots", content: "index" },
      { name: "twitter:card", content: "summary_large_image" },
    ],

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: [
        "ruby",
        "json",
        "rust",
        "c",
        "cpp",
        "cmake",
        "makefile",
        "bash",
        "toml",
        "asm6502",
      ],
      magicComments: [
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-error-line",
          line: "highlight-next-line-error",
        },
      ],
    },

    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: true,
      title: "Arteii", // logo: {
      //   alt: 'Arteii',
      //   srcDark: 'img/logo_dark.svg',
      //   href: 'https://docusaurus.io/',
      //   target: '_self',
      //   width: 32,
      //   height: 32,
      //   className: 'custom-navbar-logo-class',
      //   style: {border: 'solid red'},
      // },
      items: [
        {
          label: "Socials",
          type: "dropdown",
          className: "dyte-dropdown resources-dropdown",
          position: "left",
          items: [
            {
              type: "html",
              value: resourcesHTML,
              className: "dyte-dropdown",
            },
          ],
        },
        { to: "blog/", label: "Blog", position: "left" },
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          to: "rust-cookbook/",
          activeBasePath: "rust-cookbook",
          label: "Rust Cookbook",
          position: "left",
        },
        // {to: "security/", activeBasePath: "security", label: "Security", position: "left",},
      ],
    },
    footer: {
      links: [
        {
          title: "Connect",
          items: [
            internetProfiles.vcard,
            internetProfiles.linkedin,
            internetProfiles.github,
            internetProfiles.email,
          ],
        },
        {
          title: "Discover",
          items: [
            internetProfiles.blog,
            internetProfiles.docs, 
            internetProfiles.rust,
            internetProfiles.resume,
          ],
        },
      ],
      copyright: `Arteii • <a href="https://github.com/arteiii/arteii.net/commits/main">Updated ${new Date().toLocaleDateString()}</a>`,
    },

    algolia: {
      // The application ID provided by Algolia
      appId: "D3ST694UAZ",

      // Public API key: it is safe to commit
      apiKey: "d358a9d8d689d82a8e64b1dcf4f99b33",

      indexName: "arteiiiio",

      // Optional: see doc section below
      contextualSearch: false, // search wont work with it active
      // no need to fix since there is only one language and only en
      //(https://stackoverflow.com/questions/72838375/algolia-docsearch-in-docusaurus-doesnt-bring-any-results#:~:text=The%20problem%20is%20a%20recent%20update%20of%20Docusaurus%2C,the%20crawler.%20To%20solve%3A%20Delete%20the%20current%20index)

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      // replaceSearchResultPathname: {
      //   from: '/docs/', // or as RegExp: /\/docs\//
      //   to: '/',
      // },

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: "search",
    },
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          disableVersioning: false,
          editCurrentVersion: false,
          remarkPlugins: [math],
          rehypePlugins: [katex],
          editUrl: "https://github.com/arteiii/arteii.net/tree/main/",
        },
        blog: {
          blogSidebarTitle: "Blog",
          blogSidebarCount: "ALL",
          remarkPlugins: [math],
          rehypePlugins: [katex],

          blogTitle: "blog!",
          blogDescription: "A Docusaurus powered blog!",
          postsPerPage: "ALL",

          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            defaultReadingTime({
              content,
              options: { wordsPerMinute: 300 },
            }),
          editUrl: "https://github.com/arteiii/arteii.net/tree/main/",

          feedOptions: {
            xslt: true,
            type: "all",
            copyright: `${new Date().getFullYear()} Arteii`,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;

              // Ensure blogPosts is an array before filtering
              const validBlogPosts = Array.isArray(blogPosts) ? blogPosts : [];

              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: validBlogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-7Z0ZVNLZ6V",
          anonymizeIP: true,
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "rust-cookbook",
        path: "rust-cookbook",
        routeBasePath: "rust-cookbook",
        sidebarPath: require.resolve("./sidebarsRustCookbook.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "security",
        path: "security",
        routeBasePath: "security",
        sidebarPath: require.resolve("./sidebarsSecurity.js"),
      },
    ],
    async function tailwindPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
};
