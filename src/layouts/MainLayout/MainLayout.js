import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./MainLayout.module.scss";
import classNames from "classnames/bind";
import MenuSideBar from "../components/MenuSideBar";
const cx = classNames.bind(styles);
class MainLayout extends Component {
  render() {
    return (
      <div className={cx("wrapper")}>
        <Header />
        <div className={cx("container")}>
          <div className={cx("menu-sidebar")}>
            <MenuSideBar />
          </div>
          <div className={cx("content")}>{this.props.children}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MainLayout;
