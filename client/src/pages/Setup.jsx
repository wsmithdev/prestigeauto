import React from "react";
import ResponsiveNavbar from "../components/RespNavbar";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

function Setup(props) {
  // MUI styles
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      backgroundColor: "#323232",
      color: "#ffffff",
    },
    btn: {
      color: "#982033",
      margin: "auto",
    },
  });
  const classes = useStyles();
  return (
    <div>
     <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>
      <Button href="/setup/add" className={classes.btn} variant="contained">
        Add
      </Button>
      <Button href="/setup/update" className={classes.btn} variant="contained">
        Update
      </Button>
      <Button  href="/setup/remove" className={classes.btn} variant="contained">
        Remove
      </Button>
    </div>
  );
}

export default Setup;
