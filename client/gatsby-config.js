require('dotenv').config({
  path: `.env.${process.env.DATA_SOURCE}`,
});

module.exports = {
  siteMetadata: {
    title: 'Justice40',
    image: '/static/favicon.ico',
  },
  pathPrefix: `${process.env.PATH_PREFIX}`,
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: {
          includePaths: [
            './node_modules/uswds',
          ],
        },
        cssLoaderOptions: {
          modules: {
            exportLocalsConvention: 'camelCaseOnly',
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-intl',
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
    {
      resolve: 'gatsby-plugin-prettier-eslint',
      options: {
        prettier: {
          patterns: [
            // The pattern "**/*.{js,jsx,ts,tsx}" is
            // not used because we will rely on `eslint --fix`
            '**/*.{scss}',
            '**/*.{json}',
            '**/*.{graphql}',
            '**/*.{md}',
            '**/*.{html}',
            '**/*.{yaml,yml}',
          ],
        },
        eslint: {
          patterns: '**/*.{js,jsx,ts,tsx}',
          ignorePatterns: ['public', 'node_modules', '*scss.d.ts'],
          failOnError: true,
          customOptions: {
            fix: true,
            cache: true,
          },
        },
      },
    },
    'gatsby-plugin-react-helmet',
  ],
};
