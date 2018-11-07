const { env:{ ENV } } = process;
const baseConfigGen = require("./config.base");
const serverConfigGen = require("./config.server");
const clientConfigGen = require("./config.client");
const devConfigGen = require("./config.development");
const prodConfigGen = require("./config.production");

const webpackConfig = [];
if(ENV === "DEVELOPMENT"){
  const devServerConfig = devConfigGen(serverConfigGen(baseConfigGen()));
  const devClientConfig = devConfigGen(clientConfigGen(baseConfigGen()));
  webpackConfig.push(devServerConfig,devClientConfig);
}else if(ENV === "PRODUCTION"){
  const prodServerConfig = prodConfigGen(serverConfigGen(baseConfigGen()));
  const prodClientConfig = prodConfigGen(clientConfigGen(baseConfigGen()));
  webpackConfig.push(prodServerConfig,prodClientConfig);
}

module.exports = webpackConfig;