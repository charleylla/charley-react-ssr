const CleanWebpackPlugin = require("clean-webpack-plugin");
const { resolve } = require("./bundle");

module.exports = (basicConfig) => {
  basicConfig.mode = "production";
  basicConfig.plugins.push(
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
  );
  return basicConfig;
}