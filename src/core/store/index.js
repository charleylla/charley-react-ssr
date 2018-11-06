import thunk from "redux-thunk";
import { createStore,applyMiddleware } from "redux";
import { reducer } from "./reducer";

export const getStore = () => {
  return createStore(reducer,applyMiddleware(thunk));
};

export const getClientStore = () => {
  const defaultState = window["__INITIAL_STATE__"]
  return createStore(reducer,defaultState,applyMiddleware(thunk));
}