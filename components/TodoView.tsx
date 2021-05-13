import React from "react";
import { Todo } from "./todos";

interface State {
  todo: Partial<Todo>;
}

interface Props {
  todo: Partial<Todo>;
  onClose: Function;
}

export default class TodoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      todo: props.todo,
    };

    this.closeTodoHandler = this.closeTodoHandler.bind(this);
  }

  closeTodoHandler() {
    this.props.onClose();
  }

  render() {
    return (
      <>
        <h4>Todo</h4>
        <table>
          <tbody>
            <tr>
              <th align="left">Name</th>
              <td>{this.state.todo.name}</td>
            </tr>
            <tr>
              <th align="left">Description</th>
              {this.state.todo.description}
            </tr>
            <tr>
              <th align="left">Type</th>
              <td>{this.state.todo.type}</td>
            </tr>
            <tr>
              <th align="left">Confidential</th>
              <td>{this.state.todo.confidential}</td>
            </tr>
            <tr>
              <th align="left">Remind</th>
              <td>{this.state.todo.remind?.toString()}</td>
            </tr>
            <tr>
              <th align="left">Date</th>
              <td>{this.state.todo.date}</td>
            </tr>
            <tr>
              <th colSpan={2} align="right">
                <button type="button" onClick={this.closeTodoHandler}>
                  Close
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
