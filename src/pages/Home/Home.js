import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import ItemSlider from "./ListSlider/ItemSlider";
import { imagesSlider } from "../../components/images/imagesSlider";
const cx = classNames.bind(styles);
const LIST_SLIDER = imagesSlider.map((img, index) => {
  return {
    id: index,
    image: img.image,
  };
});
let i = 0;
class Home extends Component {
  componentDidMount() {
    setTimeout(() => {
      const listSliderElement = document.querySelector(".list-slider");
      listSliderElement.style.right = 0;
    }, 100);
    document.querySelector(".dot-item").classList.add("active");
  }
  render() {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("slider")}>
          <button
            className={cx("btn")}
            onClick={() => {
              i++;
              if (i === LIST_SLIDER.length) {
                i = 0;
              }
              const listSliderElement = document.querySelector(".list-slider");
              listSliderElement.style.right = i * 100 + "%";
            }}
          >
            Next
          </button>
          <button
            className={cx("btn-pre")}
            onClick={() => {
              if (i === 0) {
                i = LIST_SLIDER.length;
              }
              i--;
              const listSliderElement = document.querySelector(".list-slider");
              listSliderElement.style.right = i * 100 + "%";
            }}
          >
            Pre
          </button>
          <div className="list-slider">
            {LIST_SLIDER.map((item) => {
              return <ItemSlider key={item.id} data={item} />;
            })}
          </div>
          <div className={cx("dot-list")}>
            {LIST_SLIDER.map((item, index) => (
              <div
                key={item.id}
                className="dot-item"
                onClick={(e) => {
                  document
                    .querySelector(".dot-item.active")
                    .classList.remove("active");
                  const listSliderElement =
                    document.querySelector(".list-slider");
                  listSliderElement.style.right = index * 100 + "%";
                  e.target.classList.add("active");
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
