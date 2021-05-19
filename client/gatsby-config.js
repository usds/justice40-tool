module.exports = {
  siteMetadata: {
    title: "Justice40 Tool",
    flags: {
      DEV_SSR: false
    },
  },
  plugins: [
    "gatsby-plugin-sass",
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
  ]
};
