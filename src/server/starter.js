const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const express = require("express");
const  { clientConfig } = require("../../build/webpack.config");
const  { resolve } =  require("../../build/bundle");

const { env:{ PORT } } = process;
const app = express();
const compiler = webpack(clientConfig);

app.use(webpackDevMiddleware(compiler));
app.get("*", async (req, res)  => {
  res.send("HELLO FROM STARTER");
  const { records:{hash} } = compiler;
  const clientOutputFileName = `bundle.${hash.substr(0,5)}.js`
  const clientOutputFilePath = resolve(`static/${clientOutputFileName}`)
  const clientScriptContent = await new Promise(res => {
    compiler.outputFileSystem.readFile(clientOutputFilePath,(err,data) => {
      let scriptContent = "";
      if(err){
        scriptContent = "console.error('编译失败！')"
      }else{
        scriptContent = data.toString();
      }
      res(scriptContent)
    })
  })
});

app.listen(PORT || 3000,() => {
  console.log(`服务已启动，正在监听 ${PORT || 3000} 端口`);
});