import { combineReducers } from "redux";
import { reducer as homeReducer } from "@client/page/home/store";

export const reducer = combineReducers({
  home:homeReducer,
});