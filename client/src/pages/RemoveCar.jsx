import React, { useState } from "react";
import ResponsiveNavbar from "../components/RespNavbar";

// Import toastify components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import CSS
import "./styles/removeCarStyle.css";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function RemoveCar(props) {
  // State
  const [id, setId] = useState();

  // MUI styles
  const useStyles = makeStyles((theme) => ({
    btn: {
      color: "#EB4440",
      border: "1px solid #EB4440",
      width: "100%",
      margin: "3px auto",
    },
    btnCTA: {
      color: "rgb(66,66,66)",
      backgroundColor: "#EB4440",
      width: "100%",
      margin: "3px auto",
    },
    textInput: {
      marginBottom: "20px",
      width: "100%",
    },
  }));

  // Create toastify notification banner
  const notifyErr = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  const notifySuc = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      onClose: () => (window.location.href = "/fleet"),
    });

  // Input handler
  const idHandler = (e) => {
    setId(e.target.value);
  };

  // Delete car
  const deleteHandler = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    // Fetch request
    fetch(`/cars/delete/${id}`, requestOptions)
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        // Succesful login, redirect to /cars page
        if (data._id) {
          notifySuc("Car removed");
        } else {
          notifyErr("Error, please try again");
        }
      })
      .catch((error) => {
        notifyErr("Error, please try again");
        console.error("There was an error!", error);
      });
  };

  const classes = useStyles();
  return (
    <div id="remove-car-section">
      <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>

      <div id="remove-car-form-section">
        <h1>Remove Car</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <div id="remove-car-text">
            <TextField
              className={classes.textInput}
              onChange={idHandler}
              id="id"
              label="ID"
            />
          </div>
        </form>
        <div id="remove-car-btns">
          <Button
            onClick={deleteHandler}
            className={classes.btnCTA}
            variant="contained"
          >
            Delete
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RemoveCar;
