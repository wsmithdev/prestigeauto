import React, { useState } from "react";

// Import toastify components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import custom components
import ResponsiveNavbar from "../components/RespNavbar";

// Import CSS
import "./styles/signupStyle.css";

// Import MUI components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    marginBottom: "10px",
    width: "100%",
  },
}));

function Signup(props) {
  const [name, updateName] = useState("");
  const [surname, updateSurname] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const updateNameHandler = (e) => {
    updateName(e.target.value);
  };

  const updateSurnameHandler = (e) => {
    updateSurname(e.target.value);
  };

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

  const submitHandler = (e) => {
    e.preventDefault();
    // Post data to be sent
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        surname: surname,
        email: email,
        password: password,
      }),
    };

    // Fetch request
    fetch("/signup", requestOptions)
      .then(async (response) => {
        const data = await response.json();

        // Succesful login, redirect to /cars page
        if (data.user) {
          window.location.href = "/fleet";
        } else {
          // Login failed
          notify("Signup failed, please try again");
        }
      })
      .catch((error) => {
        notify("Signup failed, please try again");
        console.error("There was an error!", error);
      });
  };

  const classes = useStyles();
  return (
    <div id="signup-section">
      <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>
      <div id="signup-form-section">
        <h1>Sign Up</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <div id="signup-text">
            <TextField
              className={classes.textInput}
              variant="outlined"
              onChange={updateNameHandler}
              id="name-input"
              label="Name"
            />
            <br />
            <TextField
              className={classes.textInput}
              variant="outlined"
              onChange={updateSurnameHandler}
              id="surname-input"
              label="Surname"
            />
            <br />
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
        <div id="signup-btns">
          <Button
            onClick={submitHandler}
            className={classes.btnCTA}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
