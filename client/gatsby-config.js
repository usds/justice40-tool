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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-33523145-1',

        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,

        // Setting this parameter is optional
        anonymize: true,

        // Setting this parameter is also optional
        respectDNT: true,

        // Avoids sending pageview hits from custom paths
        // exclude: ['/preview/**', '/do-not-track/me/too/'],

        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,

        // Enables Google Optimize using your container Id
        // optimizeId: 'YOUR_GOOGLE_OPTIMIZE_TRACKING_ID',
        // Enables Google Optimize Experiment ID
        // experimentId: 'YOUR_GOOGLE_EXPERIMENT_ID',
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: 'YOUR_GOOGLE_OPTIMIZE_VARIATION_ID',

        // Defers execution of google analytics script after page load
        defer: false,

        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: 'screeningtool.geoplatform.gov',

        // defaults to false
        enableWebVitalsTracking: true,
      },
    },
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
