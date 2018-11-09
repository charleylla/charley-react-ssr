const NodeExternals = require("webpack-node-externals");
const { loaderGen } = require("./loaders");
const { resolve } = require("./bundle");

module.exports = (basicConfig,ENV) => {
  basicConfig.entry = { server:resolve("src/server/app.js") };
  basicConfig.output = {
    filename:"server.js",
    path:ENV === "DEVELOPMENT" ? resolve(".build") : resolve("build")
  };
  basicConfig.target = "node";
  basicConfig.externals.push(
    NodeExternals(),
  );
  basicConfig.module.rules = loaderGen("SERVER");
  return basicConfig;
}