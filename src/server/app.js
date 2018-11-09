import express from "express";
import { ServerRender } from "@core/render";
import { resolve } from "@config/bundle"
const { env:{ SERVER_PORT } } = process;
const app = express();

const PROD_STATIC_DIR = process.cwd() + "/build/client";
app.use(express.static(PROD_STATIC_DIR));

app.get("*", (req, res)  => {
  new ServerRender(req,res).render();
});

app.listen(SERVER_PORT || 9527,() => {
  console.log(`SSR 服务已启动，正在监听 ${SERVER_PORT || 9527} 端口`);
});