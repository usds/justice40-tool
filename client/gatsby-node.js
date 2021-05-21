path = require('path');

// Disable references to window from trussworks/uswds
// See here: https://www.gatsbyjs.com/docs/debugging-html-builds/#fixing-third-party-modules
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  });  
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
        resolve: {
          modules: [path.resolve(__dirname, "src"), "node_modules"],
        },
      })
    }
  }