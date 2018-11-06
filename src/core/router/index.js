import { NotFoundPage } from "@client/page/notFound";
import HomePage from "@client/page/home";
import { AboutPage } from "@client/page/about";

export const routes = [
  {
    path:"/",
    component:HomePage,
    exact:true,
    key:"home",
    loadData:HomePage.loadData
  },
  {
    path:"/home",
    component:HomePage,
    exact:true,
    key:"home",
    loadData:HomePage.loadData
  },
  {
    path:"/about",
    component:AboutPage,
    exact:true,
    key:"about",
  },
  {
    component:NotFoundPage,
    key:"404",
  },
];