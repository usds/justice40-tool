# Justice40 Client

## Localization

### About

This project uses [Gatsby Plugin Intl](https://www.gatsbyjs.com/plugins/gatsby-plugin-intl/?=intl) to manage internationalization and localization.

There are a number of components to this, but for the purposes of localization, this utizes the popular `react-intl` package from [FormatJS](https://github.com/formatjs/formatjs).

This works by directing users to a locale-appropriate version of the page they wish to visit based on their browser settings, populated automatically at build time by the contents of `json` files in the `src/intl` directory.

### Writing

For this library to work optimally, the following principles should be obeyed:

- All user-visible strings should be wrapped with the `<FormattedMessage>` tag, with a `description` and `defaultMessage` set. To generate files for localization, run `npm run intl:extract` to update the file at `src/intl/en.json` with the extracted contents of all `FormattedMessage` components.
- All `Link` components should be imported from `gatsby-plugin-intl` instead to get the locale-appropriate link
- All pages should import and use `useIntl` from `gatsby-plugin-intl`

We will later add integration with Github Actions to ensure that all messages have been formatted as a condition/check for committed code.

### Translating

From there, send `src/intl/en.json` to translators. (Depending on the TMS (Translation Management System) in use, we may need a different format, so we can alter the settings in `package.json` if needbe). When they return with the other language file, e.g. `es.json`, place this in `src/intl/` as a sibling to `en.json`.

### Consuming

`React-Intl` works according to Google SEO [best practices](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites#use-different-urls-for-different-language-versions) by creating locale-specific URLs.

To access a translated version of a page, e.g. `pages/index.js`, add the locale as a portion of the URL path, as follows:

- English: `localhost:8000/en/`, or `localhost:8000/` (the default fallback is English)
