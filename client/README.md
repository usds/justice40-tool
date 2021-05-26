# Justice40 Client

## Linting and Formatting

This project uses [ESLint](https://eslint.org/) for code linting and [Prettier](https://prettier.io/) for formatting. They are integrated via [gatsby-plugin-prettier-eslint](https://www.gatsbyjs.com/plugins/gatsby-plugin-prettier-eslint/).

Linting is a required check before merges can happen, please lint your code, for the sake of consistency!

To use:

1. During development:

   1. `npx gatsby develop` will automatically run prettier and eslint during development as files change, watch the console for updates.
   2. Alternatively, if you're using VSCode:
      1. Install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) plugins
      2. Enable `editor.formatOnSave`, and optionally `"editor.codeActionsOnSave": {"source.fixAll": true},` to apply settings on save

2. Before a PR: `npm run lint:fix` can be run locally to apply auto-fixes to issues that can be fixed
3. Before merge (automatic): `npm run lint` is run against all PRs by a github action.

The ruleset is simply the base ruleset + [Google](https://github.com/google/eslint-config-google).

## Testing

This project uses [jest](https://jestjs.io/) for unit testing, using `react-test-renderer` to output to text-based snapshot files.

To run tests: `npm test`
To rebuild snapshots when you know a component has changed: `npm run test:update`

-

## Localization

### About

This project uses [Gatsby Plugin Intl](https://www.gatsbyjs.com/plugins/gatsby-plugin-intl/?=intl) to manage internationalization and localization.

There are a number of components to this, but for the purposes of localization, this utizes the popular `react-intl` package from [FormatJS](https://github.com/formatjs/formatjs).

This works by directing users to a locale-appropriate version of the page they wish to visit based on their browser settings, populated automatically at build time by the contents of `json` files in the `src/intl` directory.

### Writing

For this library to work optimally, the following principles should be obeyed (see [here](https://formatjs.io/docs/getting-started/message-extraction) for more detail):

- All user-visible strings should be wrapped with the `intl.formatMessage` function or the `<FormattedMessage>` tag, with a `description` and `defaultMessage` set. Do not yet set the "id" tag, it will be generated for you. To generate files for localization, run `npm run intl:extract` to update the file at `src/intl/en.json` with the extracted contents of all `FormattedMessage` components.
- Take note of the `id` in this file, and add this back as a parameter of your function/prop for your component (this is done to avoid naming collisions as detailed [here](https://formatjs.io/docs/getting-started/message-extraction))
- All `Link` components should be imported from `gatsby-plugin-intl` instead to get the locale-appropriate link
- All pages should import and use `useIntl` from `gatsby-plugin-intl`

We will later add integration with Github Actions to ensure that all messages have been formatted as a condition/check for committed code.

### Translating

From there, send `src/intl/en.json` to translators. (Depending on the TMS (Translation Management System) in use, we may need a different format, so we can alter the settings in `package.json` if needbe). When they return with the other language file, e.g. `es.json`, place this in `src/intl/` as a sibling to `en.json`.

### Consuming

`React-Intl` works according to Google SEO [best practices](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites#use-different-urls-for-different-language-versions) by creating locale-specific URLs.

To access a translated version of a page, e.g. `pages/index.js`, add the locale as a portion of the URL path, as follows:

- English: `localhost:8000/en/`, or `localhost:8000/` (the default fallback is English)
