import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./ItemSlider.module.scss";
const cx = classNames.bind(styles);
class ItemSlider extends Component {
  render() {
    return (
      <div className={cx("item-slider")}>
        <img src={this.props.data.image} alt={this.props.data.img} />
      </div>
    );
  }
}

export default ItemSlider;
