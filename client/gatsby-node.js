path = require('path');
const webpack = require('webpack');

// https://github.com/maplibre/maplibre-gl-js/issues/83#issuecomment-877012839
exports.onCreateWebpackConfig = ({stage, loaders, actions}) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
    resolve: {
      alias: {
        'mapbox-gl': 'maplibre-gl',
      },
      fallback: {
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        http2: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
        process: require.resolve('process/browser'),
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util'),
        buffer: require.resolve('buffer'),
        asset: require.resolve('assert'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      }),
    ],
  });
};
