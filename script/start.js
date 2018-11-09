const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const express = require("express");
const mutliConfig = require("../config/webpack.config");
const  { resolve } =  require("../config/bundle");

const { env:{ CLIENT_PORT } } = process;
const compiler = webpack(mutliConfig);
const [ serverCompiler,clientCompiler ] = compiler.compilers;
const watchOptions = {
  ignored: /node_modules/,
}
const app = express();
app.use(webpackDevMiddleware(clientCompiler,{
  watchOptions
}));
app.use("/dev-client-script.js", (req, res)  => {
  const { records:{hash} } = clientCompiler;
  const clientOutputFileName = `bundle.${hash.substr(0,5)}.js`;
  res.redirect(`${clientOutputFileName}?target=${clientOutputFileName}`);
});
app.listen(CLIENT_PORT || 9099,() => {
  console.log(`客户端脚本编译服务已启动，正在监听 ${CLIENT_PORT || 9099} 端口`);
});

serverCompiler.watch(watchOptions,() => {
  console.log(`服务端脚本编译服务已启动，编译地址 ${resolve(".build/server.js")}`);
});