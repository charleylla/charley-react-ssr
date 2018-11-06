const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { resolve } = require("./bundle");

module.exports = (basicConfig) => {
  basicConfig.mode = "development";
  basicConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(["static"], {
      root: resolve(""),
      verbose: true, //开启在控制台输出信息
      dry: false,
    }),
    new CleanWebpackPlugin(["dist"], {
      root: resolve(""),
      verbose: true, //开启在控制台输出信息
      dry: false,
    }),
  );
  return basicConfig;
}
