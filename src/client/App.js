import React from "react";
import { renderRoutes } from "react-router-config";
import { routes } from "@core/router";
const App = () => (
  <div>
    { renderRoutes(routes) }
  </div>
);
export default App;