import React, { FunctionComponent, useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { Todo, TYPES, TodoErrorStatus } from "./todos";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface Props {
  todo: Partial<Todo>;
  onAddOrUpdate: Function;
}

export const TodoForm: FunctionComponent<Props> = (props: Props) => {
  const [todo, setTodo] = useState<Partial<Todo>>(props.todo);
  const [types] = useState<string[]>(TYPES);
  const [errors, setErrors] = useState<TodoErrorStatus>({ status: false });

  const formChangeHandler = (event: any) => {
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
    setTodo({
      ...Object.assign(todo, { [name]: value }),
    });
  };

  const updateTodoDateHandler = (date: any) => {
    setTodo({
      ...Object.assign(todo, { date: format(date, "yyyy-MM-dd") }),
    });
  };

  const updateTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({ status: false });
    if (!todo.name) {
      setErrors({
        ...Object.assign(errors, {
          name: "Name is required.",
          status: true,
        }),
      });
    }
    if (!todo.description) {
      setErrors({
        ...Object.assign(errors, {
          description: "Description is required.",
          status: true,
        }),
      });
    }
    if (!todo.type) {
      setErrors({
        ...Object.assign(errors, {
          type: "Type is required.",
          status: true,
        }),
      });
    }
    if (!todo.date) {
      setErrors({
        ...Object.assign(errors, {
          date: "Date is required.",
          status: true,
        }),
      });
    }
    setTimeout(() => {
      if (!errors.status) {
        props.onAddOrUpdate(todo);
      } else {
        alert("All Fields are required");
      }
    });
  };

  return (
    <>
      <form onSubmit={updateTodoHandler} noValidate>
        <Dialog open={!!todo}>
          <DialogTitle>{todo.id ? "Update" : "Add"} Todo</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                label="Name"
                variant="filled"
                name="name"
                onChange={formChangeHandler}
                value={todo.name}
                helperText={errors.name}
                required
              />
            </div>
            <br />
            <div>
              <TextField
                label="Description"
                variant="filled"
                name="description"
                onChange={formChangeHandler}
                value={todo.description}
                helperText={errors.description}
                required
                multiline
              />
            </div>
            <br />
            <div>
              <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                  id="type"
                  name="type"
                  onChange={formChangeHandler}
                  value={todo.type}
                  required
                >
                  {types.map((type: string) => (
                    <MenuItem value={type} key={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.type}</FormHelperText>
              </FormControl>
            </div>
            <br />
            <div>
              <FormControl>
                <FormLabel>Confidential</FormLabel>
                <RadioGroup
                  name="confidential"
                  row
                  value={todo.confidential}
                  onChange={formChangeHandler}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                    checked={todo.confidential === "Yes"}
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                    checked={todo.confidential === "No"}
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <br />
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="remind"
                    onChange={formChangeHandler}
                    checked={todo.remind}
                  />
                }
                label="Remind"
              />
            </div>
            <br />
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="date"
                  format="yyyy-MM-dd"
                  label="Date"
                  value={todo.date}
                  onChange={updateTodoDateHandler}
                  required
                />
              </MuiPickersUtilsProvider>
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={updateTodoHandler}>
              {todo.id ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};

export default TodoForm;
