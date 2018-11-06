import { GET_NEWS_LIST } from "./index"

const defaultState = {
  newsList:[]
}

export const reducer = (state = defaultState,action) => {
  const { type,payload } = action;
  switch(type){
    case GET_NEWS_LIST:
      return {
        ...state,
        newsList:payload,
      }
    default:
      return state;
  }
}