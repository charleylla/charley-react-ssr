const NodeExternals = require("webpack-node-externals");
const { loaderGen } = require("./loaders");
const { resolve } = require("./bundle");

module.exports = (basicConfig) => {
  basicConfig.entry = { server:resolve("src/server/app.js") };
  basicConfig.output = {
    filename:"server.js",
    path:resolve("dist")
  };
  basicConfig.target = "node";
  basicConfig.externals.push(NodeExternals());
  basicConfig.module.rules = loaderGen("SERVER");
  return basicConfig;
}