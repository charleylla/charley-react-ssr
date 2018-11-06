import React,{ Component } from "react";
import PropTypes from "prop-types";
import { getNewsList } from "./store"
import connect from "./connect";

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
      <React.Fragment>
        {NewsList}
        <div>HOME<button onClick={()=>{console.log("HOME");}}>ABOUT</button></div>
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  newsList:PropTypes.array,
  getNewsList:PropTypes.func
}

export default connect(HomePage);