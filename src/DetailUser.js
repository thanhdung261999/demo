import { Component } from "react";
import { withRouter } from "./WithRouter";
import axios from "axios";
class DetailUser extends Component {
  state = {
    user: {},
  };
  async componentDidMount() {
    const res = await axios.get(
      `https://reqres.in/api/users/${this.props.params.id}`
    );
    // console.log(res.data.data);
    this.setState({
      user: res && res.data && res.data.data ? res.data.data : {},
    });
  }
  render() {
    let { user } = this.state;
    let isEmpty = Object.keys(user).length === 0;
    return (
      <div>
        {isEmpty === false && (
          <>
            <div>
              {user.first_name} - {user.last_name}
            </div>
            <img src={user.avatar} alt="" style={{ width: "200" }} />
            <button
              onClick={() => {
                this.props.navigate("/");
              }}
            >
              Back
            </button>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(DetailUser);
