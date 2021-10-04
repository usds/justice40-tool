# Justice40 Client

This README contains the following content:

- [Installing and running the client site](#installing-and-running-the-client-site)
- [Linting and Formatting](#linting-and-formatting)
- [Testing](#testing)
- [Localization](#localization)
- [Feature toggling](#feature-toggling)
- [Environment variables](#environment-variables)
- [Debugging](#debugging)

## Installing and running the client site

### Via npm
1. Confirm you have the base required software installed. See [INSTALLATION](INSTALLATION.md) for more details.
1. Install yarn if you do not have it yet. Open your terminal and run `sudo npm install -global yarn`. This works on MacOS and Win10. To confirm it is installed, run `yarn -v`. A version number should be returned.
1. Navigate to the base directory of this repository, and go to the `client` directory (`cd client`).
1. Run the command `npm install` to install the dependencies.
1. Run `npm start` to start up the client app.
1. Open your browser and navigate to http://localhost:8000

_Note that while this app uses npm as the package manager, yarn is required to build the [uswds](https://github.com/uswds/uswds) library._

### Via docker
- Launch VS code in the top level directory (above client)
- Install the Microsoft docker VS code extension
- make sure you are in the main repo's directory
- Type `docker-compose up`
- Running this on MacBook Pro with a 2.6GHz 6-core i7 with 16 GB of memory can take upto 20 minutes to complete.
- This will create three images, j4_website, j40_score_server and j40_data_pipeline. It will take up ~ 30 to 35 GB of image disk space

By navigating to the client folder, the Dockerfile runs `npm start`. This will create a development version of the app.

#### Re-building j4_website
If you've made changes to the docker-compose file and want to re-build the j40_website:

`docker-compose build --no-cache j40_website`

This will not use the cache and re-build the image. Then do 

`docker-compoe up`

#### docker hangs
- Ensure that there's enough disk image space in docker. The Docker Desktop app will show the total disk image used (gear cog -> Resources -> Disk image size). This application will require ~ 30 - 35 GB. Allocating 50-60 GB should be sufficient. If the amount used is significantly greater than 35 GB you may need to prune the docker images:

`docker image system`

This should reduce the total used space. 

#### Changing the source of tile / map layer
If you don't want to use the local data-pipeline location for getting the tile / map layers, you can change the 
DATA_SOURCE env variable in the docker-compose.yml. See [environment variables](#environment-variables) for more info.

#### Troubleshooting docker

- If an error is thrown about [running out of space](https://medium.com/@wlarch/no-space-left-on-device-when-using-docker-compose-why-c4a2c783c6f6) on device see this for ways to reclaim space.


### Viewing data on the map

See [VIEW_MAP_DATA](./VIEW_MAP_DATA) for more details on this.

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

The app has end-to-end tests using cypress which can be started by:

`npm run cy:open`

This will open the test runner. Choose any tests to run!

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

## Environment Variables

There are 3 environment variables that can be set:

1. DATA_SOURCE (required) = can be set to 'cdn' or 'local'. This is used to change where the tiles are sourced from. It is used in the [constants](https://github.com/usds/justice40-tool/blob/main/client/src/data/constants.tsx) file to determine which TILE_BASE_URL to use.
2. SITE_URL = set this to change the base URL for the website's public html folder. If none is provided, then localhost:8000 is used. This is used for the site_map.xml file and robots.txt file. This is only used during production build aka `npm build`.
3. PATH_PREFIX = set this to add an additional path(s) to SITE_URL. If none is provided then no additional paths are added to the SITE_URL. This is only used during production build aka `npm build`.

Note when setting environment variables in docker-compose, DATA_SOURCE is the only one that is applicable. 

## Feature Toggling

We have implemented very simple feature flagging for this app, accessible via URL parameters.

There are a lot of benefits to using feature toggles -- see [Martin Fowler](https://martinfowler.com/articles/feature-toggles.html) for a longer justification, but in short, they enable shipping in-progress work to production without enabling particular features for all users.

### Viewing Features

To view features, add the `flags` parameter to the URL, and set the value to a comma-delimited list of features to enable, e.g. `localhost:8000?flags=1,2,3` will enable features 1, 2, and 3.

In the future we may add other means of audience-targeting, but for now we will be sharing links with flags enabled as a means of sharing in-development funcitonality

### Using Flags

When developing, to use a flag:

1. Pass the Gatsby-provided `location` variable to your component. You have several options here:
   1. If your page uses the `Layout` [component](src/components/layout.tsx), you automatically get `URLFlagProvider` (see [FlagContext](src/contexts/FlagContext.tsx) for more info).
   2. If your page does not use `Layout`, you need to surround your component with a `URLFlagProvider` component and pass `location`. You can get `location` from the default props of the page (more [here](https://www.gatsbyjs.com/docs/location-data-from-props/)). See [Index.tsx](src/pages/index.tsx) for an example.
2. Use the `useFlags()` hook to get access to an array of flags, and check this array for the presence of the correct feature identifier. See [J40Header](src/components/J40Header.tsx) for an example.

#### When to use flags:

1. The feature is an experimental change
2. The feature is an outcome of a spike where the direct work wasn’t prioritized in the current sprint however there's a desire to help design to see / use it - eg. fullscreen / geolocation (future sprint purposes)
3. The feature is something with multiple possible implementations that we want to give our team the experience of trying out separately for comparison purposes - eg. mapbox vs. openlayers, different low tile layers for low zoom

## Debugging

1. Ensure that VS code is open in the client folder
2. Run the app with `npm start` in the terminal
3. Click on the debugger (SHIFT+CMD+D on mac)
4. Run the _Debug Chrome_ configuration by hitting the green play button
5. Install the [CORS chrome extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) in the browser that is launched by the debugger.
6. Set breakpoints in VS code!
