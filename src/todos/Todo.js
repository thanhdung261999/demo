import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Todo.scss";
import AddTodo from "./AddTodo/AddTodo";
class Todo extends Component {
  state = {
    todo: [
      {
        id: 1,
        title: "Js",
      },
      {
        id: 2,
        title: "Python",
      },
      {
        id: 3,
        title: "Ruby",
      },
    ],
    editTodo: {},
  };
  handleAddJob = (job) => {
    const newJob = {
      id: Math.floor(Math.random() * 100),
      title: job,
    };
    this.setState({
      todo: [...this.state.todo, newJob],
    });
  };
  handleDeleteJob = (item) => {
    const preJob = this.state.todo;
    const newJob = preJob.filter((job) => job.id !== item.id);
    this.setState({
      todo: newJob,
    });
    toast.success("success delete job");
  };
  handleUpdate = (job) => {
    const { todo, editTodo } = this.state;
    let isEmpty = Object.keys(editTodo).length === 0;
    if (isEmpty === true) {
      this.setState({
        editTodo: job,
      });
    } else {
      const preTodo = todo;
      todo.forEach((item, index) => {
        if (item.id === job.id) {
          preTodo[index].title = job.title;
          this.setState({
            editTodo: {},
            todo: preTodo,
          });
          toast.success("Update job success");
        }
      });
    }
  };
  handleChangeEdit = (e) => {
    let preEditTodo = this.state.editTodo;
    preEditTodo.title = e.target.value;
    this.setState({
      editTodo: preEditTodo,
    });
  };
  render() {
    const { todo, editTodo } = this.state;
    let isEmpty = Object.keys(editTodo).length === 0;
    return (
      <>
        <AddTodo handleAddJob={this.handleAddJob} />
        <div className="list-todo">
          {todo &&
            todo.length > 0 &&
            todo.map((item, index) => {
              return (
                <div key={item.id} className="item-todo">
                  {isEmpty === true ? (
                    <span className="title">{`${index + 1} - ${
                      item.title
                    }`}</span>
                  ) : (
                    <>
                      {item.id === editTodo.id ? (
                        <span>
                          {`${index + 1} - `}
                          <input
                            value={item.title}
                            onChange={(e) => {
                              this.handleChangeEdit(e);
                            }}
                          />
                        </span>
                      ) : (
                        <span className="title">{`${index + 1} - ${
                          item.title
                        }`}</span>
                      )}
                    </>
                  )}

                  <button
                    onClick={() => {
                      this.handleUpdate(item);
                    }}
                  >
                    {
                      (isEmpty =
                        true && item.id !== editTodo.id ? "Edit" : "Save")
                    }
                  </button>

                  <button
                    onClick={() => {
                      this.handleDeleteJob(item);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

export default Todo;
