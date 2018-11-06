import express from "express";
import { ServerRender } from "@core/render"

const { env:{ PORT } } = process;
const app = express();
app.use(express.static("static"));

app.get("*", (req, res)  => {
  new ServerRender(req,res).render();
});

app.listen(PORT || 3000,() => {
  console.log(`服务已启动，正在监听 ${PORT || 3000} 端口`);
});