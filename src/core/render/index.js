import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Provider } from "react-redux";
import { matchRoutes } from "react-router-config";
import { minify } from "html-minifier";
import { getStore } from "@core/store";
import App from "@client/App";
import { routes } from "@core/router";
const { env:{ CLIENT_PORT,ENV,LIVERELOAD_PORT } } = process;

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
    this.htmlStr = "";
    this.styleStr = "";
    this.scriptUrl = "";
    if(ENV === "PRODUCTION"){
      // this.scriptUrl = "client/" + require("/manifest.json")["client.js"];
      console.log(this.scriptUrl)
    }
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
  minifyHTML(htmlStr,option = {}){
    return minify(htmlStr,{
      removeAttributeQuotes: true,
      collapseWhitespace:true,
      collapseInlineTagWhitespace:true,
      minifyCSS:true,
      ...option
    })
  }
  getRenderHTML(){
    let scriptUrl = this.scriptUrl,liverReloadScriptTag = "";
    if(ENV === "DEVELOPMENT"){
      scriptUrl = `http://localhost:${CLIENT_PORT || 9099}/dev-client-script.js?q=${+new Date()}`;
      liverReloadScriptTag = `<script src="http://localhost:${LIVERELOAD_PORT || 35729}/livereload.js"></script>`
    }
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
        ${liverReloadScriptTag}
        <script src="${scriptUrl}"></script>
      </body>
      </html>
    `
    this.htmlStr = this.minifyHTML(htmlStr);
  }
  async render(CLIENT_PORT){
    await this.initialStore();
    this.initialContent();
    this.initialStyle();
    this.getRenderHTML(CLIENT_PORT);
    if(ENV === "DEVELOPMENT"){
      await new Promise((res) => {
        setTimeout(() => {res()},100)
      })
    }
    this.res.send(this.htmlStr);
  }
}