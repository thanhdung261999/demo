import { Component } from "react";
import axios from "axios";
import "./index.css";
import { withRouter } from "./WithRouter";
// import { withRouter } from "./WithRouter";
class Home extends Component {
  state = {
    listUser: [],
  };
  async componentDidMount() {
    const listUser = await axios.get("https://reqres.in/api/users?page=2");
    this.setState({
      listUser:
        listUser && listUser.data && listUser.data ? listUser.data.data : [],
    });
  }

  render() {
    const { listUser } = this.state;
    return (
      <>
        <div>Home</div>
        <div className="list-user">
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user, index) => {
              return (
                <div className="item-user" key={user.id}>
                  <div
                    onClick={() => {
                      this.props.navigate(`./content/${user.id}`);
                    }}
                  >
                    {index + 1} - {`${user.first_name} ${user.last_name}`}
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

export default withRouter(Home);
