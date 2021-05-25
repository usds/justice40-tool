path = require('path');

exports.onCreateWebpackConfig = ({stage, loaders, actions}) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  });
};
