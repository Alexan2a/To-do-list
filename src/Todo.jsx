import React from "react";
import "./App.css";

export default class Todo extends React.PureComponent {
  render() {
    console.log(this.props.name);
    return (
      <div className="todo-box">
        <div className={this.props.done ? "todo done" : "todo"}>
          <input
            type="checkbox"
            checked={this.props.done}
            onChange={this.handleCheck}
          />
          <span>{this.props.name}</span>
        </div>
        <button onClick={this.handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    );
  }
  handleCheck = (e) => {
    this.props.onDone(e.target.checked, this.props.id);
  };
  handleDelete = () => {
    this.props.onDelete(this.props.id);
  };
}
