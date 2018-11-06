import React,{ Component } from "react";
export class AboutPage extends Component{
  render(){
    return (
      <div>ABOUT<button onClick={()=>{console.log("ABOUT");}}>ABOUT</button></div>
    );
  }
}