import React from "react";

import {
  Todo,
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from "./todos";

import TodoView from "./TodoView";
import TodoForm from "./TodoForm";

interface State {
  currentTodo: Partial<Todo> | null;
  currentEvent: string | null;
  todos: Todo[];
}

interface Props {}

export default class Todos extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentTodo: null,
      currentEvent: null,
      todos: getTodos(),
    };

    this.addTodoHandler = this.addTodoHandler.bind(this);
    this.selectTodoHandler = this.selectTodoHandler.bind(this);
    this.onUpdateTodoHandler = this.onUpdateTodoHandler.bind(this);
  }

  addTodoHandler() {
    this.setState({
      currentEvent: "edit",
      currentTodo: {
        name: "",
        description: "",
        type: "",
        confidential: "No",
        remind: false,
        date: "",
      },
    });
  }

  selectTodoHandler(id: number, currentEvent: string) {
    this.setState({ currentEvent, currentTodo: getTodo(id) });
  }

  onUpdateTodoHandler(todo: Partial<Todo>) {
    if (!todo.id) {
      addTodo(todo);
    } else {
      updateTodo(todo as Todo);
    }
    this.setState({ currentTodo: null, todos: getTodos() });
  }

  deleteTodoHandler(id: number) {
    deleteTodo(id);
    this.setState({ todos: getTodos() });
  }

  render() {
    return (
      <>
        <h3>
          Todos <button onClick={this.addTodoHandler}>New</button>
        </h3>
        {this.state.currentTodo && this.state.currentEvent === "view" && (
          <TodoView
            todo={this.state.currentTodo}
            onClose={() => this.setState({ currentEvent: null })}
          />
        )}
        {this.state.currentTodo && this.state.currentEvent === "edit" && (
          <TodoForm
            todo={this.state.currentTodo}
            onAddOrUpdate={this.onUpdateTodoHandler}
          />
        )}
        <br />
        <table width="100%">
          <thead>
            <tr>
              <th align="left">Id</th>
              <th align="left">Name</th>
              <th align="left">description</th>
              <th align="left">Type</th>
              <th align="left">Confidential</th>
              <th align="left">Remind</th>
              <th align="left">Date</th>
              <th align="left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.name}</td>
                <td>{todo.description}</td>
                <td>{todo.type}</td>
                <td>{todo.confidential}</td>
                <td>{todo.remind.toString()}</td>
                <td>{todo.date}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => this.selectTodoHandler(todo.id, "view")}
                  >
                    View
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    onClick={() => this.selectTodoHandler(todo.id, "edit")}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    onClick={() => this.deleteTodoHandler(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
