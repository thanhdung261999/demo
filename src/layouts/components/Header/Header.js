import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import logo from "../../../asset/img/bhx.png";
import {
  CartIcon,
  MapIcon,
  SearchIcon,
  MenuBarIcon,
} from "../../../components/icons";
import { Link } from "react-router-dom";
import config from "../../../config";

const cx = classNames.bind(styles);
class Header extends Component {
  render() {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("inner")}>
          <div className={cx("menu")}>
            <span>
              <MenuBarIcon />
            </span>
            <p>Danh mục sản phẩm</p>
          </div>
          <Link to={config.configRoutes.home} className={cx("link-logo")}>
            <img src={logo} alt="logo" className={cx("logo")} />
          </Link>
          <div className={cx("map")}>
            <div className={cx("map-icon")}>
              <MapIcon />
            </div>
            <span>Chọn tỉnh thành, quận huyện để xem chính xác tồn kho</span>
          </div>
          <div className={cx("search")}>
            <input />
            <SearchIcon className={cx("search-icon")} />
          </div>
          <div className={cx("histories")}>Đơn hàng của tôi</div>
          <button className={cx("cart")}>
            <div className={cx("cart-icon")}>
              <CartIcon />
            </div>
            <span>Giỏ hàng</span>
          </button>
          <button className={cx("log-in")}>Đăng nhập</button>
        </div>
      </div>
    );
  }
}

export default Header;
