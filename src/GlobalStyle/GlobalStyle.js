import React, { Component } from "react";
import "./GlobalStyle.scss";
class GlobalStyle extends Component {
  render() {
    return <>{this.props.children}</>;
  }
}
export default GlobalStyle;
