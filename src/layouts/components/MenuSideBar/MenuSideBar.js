import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./MenuSideBar.module.scss";
import { DownIcon } from "../../../components/icons";
const cx = classNames.bind(styles);
class MenuSideBar extends Component {
  render() {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("menu-list")}>
          <div className={cx("menu-header")}>Khuyến mãi hot</div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>

          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
          <div className={cx("menu-item")}>
            Thực phẩm, đồ gia dụng
            <DownIcon className={cx("down-icon")} />
          </div>
        </div>
      </div>
    );
  }
}

export default MenuSideBar;
