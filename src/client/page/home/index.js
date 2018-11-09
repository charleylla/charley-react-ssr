import React,{ Component } from "react";
import PropTypes from "prop-types";
import { getNewsList } from "./store"
import connect from "./connect";
import { withStyle } from "@core/aop";
import style from "./style.m.scss";

class HomePage extends Component{
  static async loadData(store){
    await store.dispatch(getNewsList())
  }
  componentDidMount(){
    const { getNewsList } = this.props;
    getNewsList();
  }
  renderNewsList(){
    const { newsList } = this.props;
    return newsList.map(item => {
      const { title } = item;
      return <div key={title}>{title}</div>;
    });
  }
  render(){
    const NewsList = this.renderNewsList();
    return (
      <section className={style.section}>
        {NewsList}
        <div>~~~~测试!!!!<button onClick={()=>{console.log("主页");}}>点我点我</button></div>
      </section>
    );
  }
}

HomePage.propTypes = {
  newsList:PropTypes.array,
  getNewsList:PropTypes.func
}

export default connect(withStyle(HomePage,style));