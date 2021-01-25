/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { override, addWebpackAlias, addLessLoader } = require('customize-cra');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  webpack: override(
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      },
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
    }),
    config => {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['sql', 'javascript',"css","html","json"],
        })
      );
      return config;
    }
  ),
};
