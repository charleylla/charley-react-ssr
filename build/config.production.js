const webpack = require("webpack");
module.exports = (basicConfig) => {
  basicConfig.mode = "production";
  basicConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  );
  return basicConfig;
}