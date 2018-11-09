const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const { resolve } = require("./bundle");
const { env:{ LIVE_RELOAD_PORT } } = process;

module.exports = (basicConfig) => {
  basicConfig.mode = "development";
  basicConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([".build"], {
      root: resolve(""),
      verbose: true, //开启在控制台输出信息
      dry: false,
    }),
    new CleanWebpackPlugin(["build"], {
      root: resolve(""),
      verbose: true, //开启在控制台输出信息
      dry: false,
    }),
    new LiveReloadPlugin({
      port:LIVE_RELOAD_PORT || 35729
    }),
  );
  return basicConfig;
}
