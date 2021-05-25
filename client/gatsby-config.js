module.exports = {
  /* 
  This is to workaround the following error when building locally:
  Warning: React.createElement: type is invalid -- expected a string 
  (for built-in components) or a class/function (for composite components) but got: undefined.
    at IndexPage
  We will need to fix this before running `gatsby build`
  */
  flags: {
      DEV_SSR: false
  },
  siteMetadata: {
    title: "Justice40",
  },
  pathPrefix: "/justice40-tool",
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          modules: {
            exportLocalsConvention: 'camelCaseOnly'
          }
        }
      }
    },
    {
        resolve: `gatsby-plugin-intl`,
        options: {
          // language JSON resource path
          path: `${__dirname}/src/intl`,
          // supported language
          languages: [`en`, `es`],
          // language file path
          defaultLanguage: `en`,
          // option to redirect to `/en` when connecting `/`
          redirect: true,
        },
    },
  ],
};
