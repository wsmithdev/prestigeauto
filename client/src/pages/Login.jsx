import React, { useState } from "react";

// Import toastify components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import custom components
import ResponsiveNavbar from "../components/RespNavbar";

// Import CSS
import "./styles/loginStyle.css";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  btn: {
    color: "rgb(66,66,66)",
    border: "1px solid rgb(66,66,66)",
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
    marginBottom: "10px",
    width: "100%",
  },
}));

function Login(props) {
  // State
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  // Input handlers
  const updateEmailHandler = (e) => {
    updateEmail(e.target.value);
  };
  const updatePasswordHandler = (e) => {
    updatePassword(e.target.value);
  };

  // Create toastify notification banner
  const notify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });

  // Redirect if user is already logged in

  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    // Post data to be sent
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    // Fetch request
    fetch("/login", requestOptions)
      .then(async (res) => {
        const data = await res.json();
        // Succesful login, redirect to /fleet page
        if (data.user) {
          window.location.href = "/fleet";
        } else {
          // Login failed
          notify("Login failed, please try again");
        }
      })
      .catch((error) => {
        notify("Login failed, please try again");
        console.error("There was an error!", error);
      });
  };

  const autoFillHandler = () => {
    let email = document.querySelector("#email-input");
    let pw = document.querySelector("#password-input");
    email.value = "will.smith@hotmail.com";
    pw.value = "will123";
    updateEmail("will.smith@hotmail.com");
    updatePassword("will123");
  };

  const classes = useStyles();
  return (
    <div id="login-section">
      <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>
      <div id="login-form-section">
        <h1>Login</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <div id="login-text">
            <TextField
              className={classes.textInput}
              variant="outlined"
              onChange={updateEmailHandler}
              id="email-input"
              label="Email"
            />
            <br />
            <TextField
              className={classes.textInput}
              variant="outlined"
              onChange={updatePasswordHandler}
              id="password-input"
              label="Password"
              type="password"
            />
          </div>
        </form>
        <div id="login-btns">
          <Button
            onClick={submitHandler}
            className={classes.btnCTA}
            variant="contained"
          >
            Submit
          </Button>
          <br />
          <Button
            onClick={autoFillHandler}
            className={classes.btn}
            variant="contained"
          >
            *Auto Fill*
          </Button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
