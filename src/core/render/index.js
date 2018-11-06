import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Provider } from "react-redux";
import { matchRoutes } from "react-router-config";
import manifest from "@src/manifest.json";
import { getStore } from "@core/store";
import App from "@client/App";
import { routes } from "@core/router";

export class ServerRender {
  constructor(req,res){
    this.req = req;
    this.res = res;
    this.path = req.path;
    this.store = getStore();
    this.matchedRoutesPromises = [];
    this.content = "";
    this.initialState = {};
    this.initialStateStr = "";
    this.context = { cssList:[] };
    this.scriptUrl = manifest["client.js"];
    this.htmlStr = "";
    this.styleStr = "";
  }
  async initialStore(){
    let matchedRoutesRoutes = [];
    try{
      matchedRoutesRoutes = matchRoutes(routes,this.path)
    }catch(e){
      matchedRoutesRoutes = [];
    }
    matchedRoutesRoutes.forEach(match => {
      const  { loadData } = match.route;
      if(loadData) this.matchedRoutesPromises.push(loadData(this.store))
    })
    await Promise.all(this.matchedRoutesPromises)
    this.initialState = this.store.getState();
    this.initialStateStr = JSON.stringify(this.initialState);
  }
  initialContent(){
    this.content = renderToString((
      <Provider store={this.store}>
        <StaticRouter location={this.path} context={this.context}>
          <App/>
        </StaticRouter>
      </Provider>
    ));
  }
  initialStyle(){
    const { cssList } = this.context;
    this.styleStr = cssList.join("");
  }
  getRenderHTML(){
    const htmlStr = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Charley SSR</title>
        <style>${this.styleStr}</style>
        <script>
          window.__INITIAL_STATE__ = ${this.initialStateStr}
        </script>
      </head>
      <body>
        <div id="root">${this.content}</div>
        <script src="/${this.scriptUrl}"></script>
      </body>
      </html>
    `
    this.htmlStr = htmlStr;
  }
  async render(){
    await this.initialStore();
    this.initialContent();
    this.initialStyle();
    this.getRenderHTML();
    this.res.send(this.htmlStr);
  }
}