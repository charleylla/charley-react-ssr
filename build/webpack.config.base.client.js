const ManifestPlugin = require("webpack-manifest-plugin")
const basicConfig = require("./webpack.config.base");
const { loaderGen } = require("./loaders");
const { resolve } = require("./bundle");

module.exports = () => {
  basicConfig.entry = { client:resolve("src/client/index.js") };
  basicConfig.output = {
    filename:"bundle.[hash:5].js",
    path:resolve("static")
  };
  basicConfig.module.rules = loaderGen("CLIENT");
  basicConfig.plugins.push(
    new ManifestPlugin({
      fileName:resolve("src/manifest.json")
    }),
  )
  return basicConfig;
}