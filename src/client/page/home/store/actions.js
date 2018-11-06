import { GET_NEWS_LIST } from "./index";

export const getNewsList = () => {
  return  async (dispatch) => {
    const res = await new Promise(res => {
      setTimeout(() => {
        res([
          {title:"周一新闻"},
          {title:"周二新闻"},
          {title:"周三新闻"},
          {title:"周四新闻"},
        ]);
      }, 100);
    });
    dispatch({
      type:GET_NEWS_LIST,
      payload:res,
    });
  };
};