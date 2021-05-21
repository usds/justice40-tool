// Disable references to window from trussworks/uswds
// See here: https://www.gatsbyjs.com/docs/debugging-html-builds/#fixing-third-party-modules
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html" || stage === "develop-html") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /@trussworks\/react-uswds/,
              use: loaders.null(),
            },
          ],
        },
      })
    }
  }