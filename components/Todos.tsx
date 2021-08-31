import React, { FunctionComponent, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

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

export const Todos: FunctionComponent = () => {
  const [currentTodo, setCurrentTodo] = useState<Partial<Todo> | null>(null);
  const [currentEvent, setCurrentEvent] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>(getTodos());

  const addTodoHandler = () => {
    setCurrentEvent("edit");
    setCurrentTodo({
      name: "",
      description: "",
      type: "",
      confidential: "No",
      remind: false,
      date: "",
    });
  };

  const selectTodoHandler = (id: number, currentEvent: string) => {
    setCurrentEvent(currentEvent);
    setCurrentTodo(getTodo(id));
  };

  const onUpdateTodoHandler = (todo: Partial<Todo>) => {
    if (!todo.id) {
      addTodo(todo);
    } else {
      updateTodo(todo as Todo);
    }
    setCurrentTodo(null);
    setTodos(new Array(...getTodos()));
  };

  const deleteTodoHandler = (id: number) => {
    deleteTodo(id);
    setTodos(new Array(...getTodos()));
  };

  return (
    <>
      <Typography variant="h5" component="h3">
        Todos
        <Button variant="contained" color="primary" onClick={addTodoHandler}>
          New
        </Button>
      </Typography>
      {currentTodo && currentEvent === "view" && (
        <TodoView todo={currentTodo} onClose={() => setCurrentEvent(null)} />
      )}
      {currentTodo && currentEvent === "edit" && (
        <TodoForm todo={currentTodo} onAddOrUpdate={onUpdateTodoHandler} onCancel={() => setCurrentEvent(null)} />
      )}
      <br />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">description</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Confidential</TableCell>
            <TableCell align="left">Remind</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.id}</TableCell>
              <TableCell>{todo.name}</TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>{todo.type}</TableCell>
              <TableCell>{todo.confidential}</TableCell>
              <TableCell>{todo.remind.toString()}</TableCell>
              <TableCell>{todo.date}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => selectTodoHandler(todo.id, "view")}
                >
                  View
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => selectTodoHandler(todo.id, "edit")}
                >
                  Edit
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => deleteTodoHandler(todo.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Todos;
