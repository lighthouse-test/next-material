import React from "react";
import { Todo, TYPES } from "./todos";

interface State {
  todo: Partial<Todo>;
  types: string[];
  errors: any;
}

interface Props {
  todo: Partial<Todo>;
  onAddOrUpdate: Function;
}

export default class TodoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      todo: props.todo,
      types: TYPES,
      errors: {
        status: false,
      },
    };

    this.formChangeHandler = this.formChangeHandler.bind(this);
    this.updateTodoHandler = this.updateTodoHandler.bind(this);
  }

  formChangeHandler(event: any) {
    const target = event.target;
    const name = target.name;
    let value: boolean;
    switch (target.type) {
      case "checkbox":
        value = target.checked;
        break;

      default:
        value = target.value;
        break;
    }

    this.setState((prevState) => ({
      todo: {
        ...prevState.todo,
        [name]: value,
      },
    }));
  }

  updateTodoHandler(event: React.FormEvent) {
    event.preventDefault();
    this.setState({ errors: { status: false } });
    if (!this.state.todo.name) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          name: "Name is required.",
          status: true,
        },
      }));
    }
    if (!this.state.todo.description) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          description: "Description is required.",
          status: true,
        },
      }));
    }
    if (!this.state.todo.type) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          type: "Type is required.",
          status: true,
        },
      }));
    }
    if (!this.state.todo.date) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          date: "Date is required.",
          status: true,
        },
      }));
    }

    setTimeout(() => {
      if (!this.state.errors.status) {
        this.props.onAddOrUpdate(this.state.todo);
      } else {
        alert("All Fields are required");
      }
    });
  }

  render() {
    return (
      <>
        <h4>{this.state.todo.id ? "Update" : "Add"} Todo</h4>
        <form onSubmit={this.updateTodoHandler} noValidate>
          <table>
            <tbody>
              <tr>
                <th align="left">
                  <label htmlFor="name">Name</label>
                </th>
                <td>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    onChange={this.formChangeHandler}
                    value={this.state.todo.name}
                    required
                  />
                </td>
                <td>{this.state.errors.name}</td>
              </tr>
              <tr>
                <th align="left">
                  <label htmlFor="description">description</label>
                </th>
                <td>
                  <textarea
                    id="description"
                    name="description"
                    onChange={this.formChangeHandler}
                    value={this.state.todo.description}
                    required
                  ></textarea>
                </td>
                <td>{this.state.errors.description}</td>
              </tr>
              <tr>
                <th align="left">
                  <label>Type</label>
                </th>
                <td>
                  <select
                    id="type"
                    name="type"
                    onChange={this.formChangeHandler}
                    value={this.state.todo.type}
                    required
                  >
                    {this.state.types.map((type: string) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{this.state.errors.type}</td>
              </tr>
              <tr>
                <th align="left">
                  <label>Confidential</label>
                </th>
                <td>
                  <label htmlFor="confidential1">Yes</label>
                  <input
                    id="confidential1"
                    type="radio"
                    name="confidential"
                    value="Yes"
                    onChange={this.formChangeHandler}
                    checked={this.state.todo.confidential === "Yes"}
                  />
                  <label htmlFor="confidential2">No</label>
                  <input
                    id="confidential2"
                    type="radio"
                    name="confidential"
                    value="No"
                    onChange={this.formChangeHandler}
                    checked={this.state.todo.confidential === "No"}
                  />
                </td>
                <td></td>
              </tr>
              <tr>
                <th align="left">
                  <label>Remind</label>
                </th>
                <td>
                  <label htmlFor="remind">Yes</label>
                  <input
                    id="remind"
                    type="checkbox"
                    name="remind"
                    onChange={this.formChangeHandler}
                    checked={this.state.todo.remind}
                  />
                </td>
                <td></td>
              </tr>
              <tr>
                <th align="left">
                  <label htmlFor="date">Date</label>
                </th>
                <td>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    onChange={this.formChangeHandler}
                    value={this.state.todo.date}
                    required
                  />
                </td>
                <td>{this.state.errors.date}</td>
              </tr>
              <tr>
                <th colSpan={2} align="right">
                  <button type="submit">
                    {this.state.todo.id ? "Update" : "Add"}
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </form>
      </>
    );
  }
}
