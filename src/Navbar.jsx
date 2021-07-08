import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ "backgroundColor": "#394171" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className="navbar_button">
              BlockChain API
            </NavLink>
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuItem>
              <NavLink
                exact
                activeClassName="menu-active"
                className="navbar_button"
                to="/"
              >
                Home
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                exact
                activeClassName="menu-active"
                className="navbar_button"
                to="/block"
              >
                Block
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                exact
                activeClassName="menu-active"
                className="navbar_button"
                to="/singleblock"
              >
                Single Block
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                exact
                activeClassName="menu-active"
                className="navbar_button"
                to="/transaction"
              >
                Transaction
              </NavLink>
            </MenuItem>
            <MenuItem>
              <a
                exact
                activeClassName="menu-active"
                className="navbar_button"
                href="https://blockchain.info/api/blockchain_api"
                target="_blank"
              >
                More Info
              </a>
            </MenuItem>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
