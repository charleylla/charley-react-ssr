import React from "react";
export const withStyle = (TargetComponent,style) => {
  return class WrappedComponent extends TargetComponent{
    constructor(props){
      super(props);
      const { staticContext } = props;
      if(staticContext){
        const { cssList } = staticContext;
        cssList.push(style._getCss());
      }
    }
    render(){
      return <TargetComponent {...this.props}/>
    }
  }
}