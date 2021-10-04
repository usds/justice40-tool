require('dotenv').config({
  // NODE_ENV is automatically set to
  //   'development' when the app is launched via 'npm start' or 'npm develop'
  //   'production' when the app is launched via 'npm build'

  // Depending on the node environment, the app will then use
  // .env.production or .env.development for application
  // env variables.
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Justice40',
    image: '/static/favicon.ico',
    siteUrl: process.env.SITE_URL || 'http://localhost:8000',
  },
  pathPrefix: process.env.PATH_PREFIX || '',
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
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{userAgent: '*', allow: '/'}],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [
          '/',
          '/cejst',
          '/contact',
          '/methodology',
          '/404',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ['DATA_SOURCE'],
      },
    },
    {
      resolve: '@sentry/gatsby',
      options: {
        dsn: 'https://da0c28c22c9e4ff69d81650cabdec3d9@o1022662.ingest.sentry.io/5989007',
        sampleRate: 0.7,
      },
    },
  ],
};
