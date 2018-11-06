import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Provider } from "react-redux";
import { matchRoutes } from "react-router-config";
import manifest from "@src/manifest.json";
import { getStore } from "@core/store";
import App from "@client/App";
import { routes } from "@core/router";

const { env:{ PORT } } = process;
const app = express();
app.use(express.static("static"));

app.get("*", async (req, res)  => {
  const { path } = req;
  const store = getStore();
  const context = {};
  const matchedRoutesPromises = matchRoutes(routes,path).map(match => match.route.loadData(store));
  await Promise.all(matchedRoutesPromises);
  const initialState = JSON.stringify(store.getState());
  const content = renderToString((
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  ));
  const scriptUrl = manifest["client.js"];
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Charley SSR</title>
      <script>
        window.__INITIAL_STATE__ = ${initialState}
      </script>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="/${scriptUrl}"></script>
    </body>
    </html>
  `;
  res.send(html);
});

app.listen(PORT || 3000,() => {
  console.log(`服务已启动，正在监听 ${PORT || 3000} 端口`);
});