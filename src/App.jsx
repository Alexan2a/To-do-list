import "./App.css";
import React from "react";
import Todo from "./Todo";

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      name: "",
      todos: [
        // {
        //   name: "One",
        //   done: true,
        //   id: "1",
        // },
        // {
        //   name: "Two",
        //   done: false,
        //   id: "2",
        // },
      ],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    setTimeout(() => {
      this.setState({
        todos,
        isLoading: false,
      });
    }, 2000);
  }

  render() {
    if (this.state.isLoading)
      return (
        <div className="todo-list-container loading">
          <img className="img-loading" src="./loading.gif" />
        </div>
      );

    return (
      <div className="todo-list-container">
        <h1>To-do list</h1>
        <div className="counter">
          <span>all:{this.state.todos.length}</span>
          <span>
            done:
            {this.state.todos.length -
              this.state.todos.filter((todo) => !todo.done).length}
          </span>
          <span>
            undone:
            {this.state.todos.length -
              this.state.todos.filter((todo) => todo.done).length}
          </span>
        </div>
        <div className="todo-in">
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleSetName}
          />
          <button onClick={this.handleAddTodo}> add </button>
        </div>
        <div className="todo-list">
          {this.state.todos.map((todo) => (
            <Todo
              key={todo.id}
              name={todo.name}
              done={todo.done}
              id={todo.id}
              onDone={this.handleSetDone}
              onDelete={this.handleDeleteTodo}
            />
          ))}
        </div>
      </div>
    );
  }

  handleSetName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleAddTodo = () => {
    if (
      this.state.name !== "" &&
      this.state.name[0] !== " " &&
      this.state.name[this.state.name.length - 1] !== " "
    ) {
      const todo = {
        name: this.state.name,
        done: false,
        id: +Date.now(),
      };
      this.state.todos.unshift(todo);
      this.setState({
        name: "",
      });
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    } else
      alert("You CAN'T add EMPTY todo or todo starting/ending WITH SPACES");
  };

  handleDeleteTodo = (id) => {
    const todos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({
      todos,
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  handleSetDone = (done, id) => {
    const todos = this.state.todos
      .map((todo) => (todo.id === id ? { name: todo.name, done, id } : todo))
      .sort((a, b) => a.done - b.done);

    this.setState({
      todos,
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  };
}

export default App;
