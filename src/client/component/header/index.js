import React,{ Component } from "react";
import { Link } from "react-router-dom";

export class Header extends Component{
  render(){
    return (
      <div>
        <Link to="/home">主页</Link>
        <br/>
        <Link to="/about">关于</Link>
        <br/>
        <Link to="/about11">非法页面</Link>
      </div>
    );
  }
}