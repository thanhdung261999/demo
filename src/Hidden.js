import React, { Component } from "react";

class Hidden extends Component {
  state = {
    isShow: false,
  };
  handleHidden = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };
  render() {
    return (
      <>
        {!this.state.isShow ? (
          <div>
            <button onClick={this.handleHidden}>Show</button>
          </div>
        ) : (
          <div>
            {this.props.courses.map((item) => {
              return (
                <h2 key={item.id}>
                  {`${item.course} - ${item.coin}`}
                  <span
                    onClick={() => {
                      this.props.handleDeleteCourse(item);
                    }}
                  >
                    Xoá
                  </span>
                </h2>
              );
            })}
            <button onClick={this.handleHidden}>Hide</button>
          </div>
        )}
      </>
    );
  }
}

export default Hidden;
