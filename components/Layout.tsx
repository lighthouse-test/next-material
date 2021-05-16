import React, { FunctionComponent, useState } from "react";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

interface Props {
  children: any;
}

export const Layout: FunctionComponent<Props> = ({ children }) => {
  const [drawer, setDrawer] = useState(true);
  const drawerWidth = 240;
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        paddingTop: "64px",
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerContainer: {
        overflow: "auto",
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
    })
  );

  const classes = useStyles();

  const handleDrawerToggle = () => {
    console.log(!drawer);
    setDrawer(!drawer);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="h1" noWrap>
              Next Material Demo
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={drawer}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItemLink href="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemLink>
            </List>
          </div>
        </Drawer>
        <div className={classes.content}>
          {children}
          <br />
          <footer>
            Check the lighthouse results at
            <a
              href="https://lighthouse-test.github.io"
              rel="noopener"
              target="_blank"
            >
              https://lighthouse-test.github.io
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
