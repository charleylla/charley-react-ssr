const ManifestPlugin = require("webpack-manifest-plugin")
const LiveReloadPlugin = require("webpack-livereload-plugin");
const { loaderGen } = require("./loaders");
const { resolve } = require("./bundle");
const { env:{ CLIENT_PORT } } = process;

module.exports = (basicConfig,ENV) => {
  basicConfig.entry = { 
    client:resolve("src/client/index.js")
   };
  basicConfig.output = {
    filename:"bundle.[hash:5].js",
    path:ENV === "DEVELOPMENT" ? resolve(".build/client") : resolve("build/client")
  };
  basicConfig.module.rules = loaderGen("CLIENT");
  if(ENV === "DEVELOPMENT"){
    basicConfig.plugins.push(
      new LiveReloadPlugin({
        port:CLIENT_PORT || 35729
      })
    )
  }else if(ENV === "PRODUCTION"){
    basicConfig.plugins.push(
      new ManifestPlugin({
        fileName:resolve("build/manifest.json")
      }),
    )
  }
  return basicConfig;
}