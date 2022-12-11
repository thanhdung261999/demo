import React, { Component } from "react";
import { toast } from "react-toastify";
import "./AddTodo.scss";
class AddTodo extends Component {
  state = {
    value: "",
  };
  handleAddTodo = () => {
    if (!this.state.value) {
      toast.error("Error Empty value");
      return;
    }
    const job = this.state.value;
    this.props.handleAddJob(job);
    toast.success("Add job success");
  };
  render() {
    return (
      <div className="add-todo">
        <input
          value={this.value}
          onChange={(e) => {
            this.setState({ value: e.target.value });
          }}
        />
        <button className="btn-addtodo" onClick={this.handleAddTodo}>
          Add
        </button>
      </div>
    );
  }
}

export default AddTodo;
