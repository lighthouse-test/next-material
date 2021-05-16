import React, { FunctionComponent, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Todo } from "./todos";

interface Props {
  todo: Partial<Todo>;
  onClose: Function;
}

export const TodoForm: FunctionComponent<Props> = (props: Props) => {
  const [todo] = useState<Partial<Todo>>(props.todo);

  const closeTodoHandler = () => {
    props.onClose();
  };

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h4">Todo</Typography>
          <Divider />
          <br />
          <dl>
            <dt>Name</dt>
            <dd>{todo.name}</dd>
            <dt>Description</dt>
            <dd>{todo.description}</dd>
            <dt>Type</dt>
            <dd>{todo.type}</dd>
            <dt>Confidential</dt>
            <dd>{todo.confidential}</dd>
            <dt>Remind</dt>
            <dd>{todo.remind}</dd>
            <dt>Date</dt>
            <dd>{todo.date}</dd>
          </dl>
          <br />
          <Divider />
        </CardContent>
        <CardActions>
          <Button type="button" onClick={closeTodoHandler}>
            Close
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default TodoForm;
