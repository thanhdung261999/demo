import { Component } from "react";
import { withRouter } from "./WithRouter";
import { connect } from "react-redux";

class Profile extends Component {
  state = {
    name: "",
  };

  handledelete = (user) => {
    this.props.deleteRedux(user);
  };
  render() {
    const dataRedux = this.props.dataRedux;
    console.log(dataRedux);
    return (
      <>
        <div>Profile</div>
        <div>
          <label htmlFor="name" />
          <input
            id="name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <button
            onClick={() => {
              const newUser = {
                id: Math.floor(Math.random() * 10000),
                name: this.state.name,
              };
              this.props.createRedux(newUser);
            }}
          >
            Add
          </button>
        </div>
        {dataRedux &&
          dataRedux.length > 0 &&
          dataRedux.map((item, index) => {
            return (
              <div key={item.id}>
                {index + 1} - {item.name}
                <span onClick={() => this.handledelete(item)}>x</span>
              </div>
            );
          })}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataRedux: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteRedux: (userDelete) =>
      dispatch({
        type: "DELETE_ACTION",
        payload: userDelete,
      }),
    createRedux: (user) => {
      dispatch({
        type: "CREATE_ACTION",
        payload: user,
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
