import React,{ Component } from "react";
import { Header } from "../header";

export class Layout extends Component{
  render(){
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}