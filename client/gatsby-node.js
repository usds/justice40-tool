path = require('path');

// https://github.com/maplibre/maplibre-gl-js/issues/83#issuecomment-877012839
exports.onCreateWebpackConfig = ({stage, loaders, actions}) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
    resolve: {
      alias: {
        'mapbox-gl': 'maplibre-gl',
      },
    },
  });
};
