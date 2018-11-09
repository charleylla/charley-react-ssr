const ManifestPlugin = require("webpack-manifest-plugin")
const { loaderGen } = require("./loaders");
const { resolve } = require("./bundle");

module.exports = (basicConfig,ENV) => {
  basicConfig.entry = { 
    client:resolve("src/client/index.js")
   };
  basicConfig.output = {
    filename:"bundle.[hash:5].js",
    path:ENV === "DEVELOPMENT" ? resolve(".build/client") : resolve("build/client")
  };
  basicConfig.module.rules = loaderGen("CLIENT");
  if(ENV === "PRODUCTION"){
    basicConfig.plugins.push(
      new ManifestPlugin({
        fileName:resolve("build/manifest.json")
      }),
    )
  }
  return basicConfig;
}