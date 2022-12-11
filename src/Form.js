import React, { Component } from "react";
import Hidden from "./Hidden";

class Form extends Component {
  state = {
    isFuture: true,
    course: "",
    coin: "",
    arrCourse: [
      {
        id: Math.floor(Math.random() * 100),
        course: "java",
        coin: 100,
      },
      {
        id: Math.floor(Math.random() * 100),
        course: "js",
        coin: 200,
      },
      {
        id: Math.floor(Math.random() * 100),
        course: "Ruby",
        coin: 150,
      },
    ],
  };
  handleAddCourse = (job) => {
    this.setState({
      arrCourse: [...this.state.arrCourse, job],
    });
  };
  handleDeleteCourse = (job) => {
    const preCourse = [...this.state.arrCourse];
    const courses =
      preCourse.length > 0 && preCourse.filter((item) => job.id !== item.id);
    this.setState({
      arrCourse: [...courses],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.coin || !this.state.course) {
      alert("No data");
      return;
    }
    this.handleAddCourse({
      id: Math.floor(Math.random() * 100),
      course: this.state.course,
      coin: this.state.coin,
    });
    this.setState({
      isFuture: false,
      coin: "",
      course: "",
    });
  };
  componentDidMount = () => {
    console.log("did mounth");
  };
  componentDidUpdate = (preProps, preState) => {
    console.log(preState);
    console.log("sesss");
    console.log(this.state);
  };
  componentWillUnmount = () => {
    console.log("unmonth");
  };

  render() {
    console.log("render");
    return (
      <>
        <form>
          <label htmlFor="fname">Khoa hoa</label>
          <br />
          <input
            type="text"
            id="fname"
            name="fname"
            value={this.state.course}
            onChange={(e) => {
              this.setState({
                course: e.target.value,
              });
            }}
          />
          <br />
          <label htmlFor="lname">coin</label>
          <br />
          <input
            type="text"
            id="lname"
            name="lname"
            value={this.state.coin}
            onChange={(e) => {
              this.setState({
                coin: e.target.value,
              });
            }}
          />
          <br />
          <br />
          <div>
            <button
              type="Submit"
              onClick={(e) => {
                this.handleSubmit(e);
              }}
            >
              Submit
            </button>
          </div>
        </form>
        {this.state.isFuture && (
          <Hidden
            courses={this.state.arrCourse}
            handleDeleteCourse={this.handleDeleteCourse}
          />
        )}
      </>
    );
  }
}

export default Form;
