import React, { useState, useEffect } from "react";
import ResponsiveNavbar from "../components/RespNavbar";

// Import CSS
import "./styles/profileStyle.css";

// Import toastify components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

function Profile(props) {
  // State
  const [user, updateUser] = useState({});

  // Input handlers
  const nameHandler = (e) => {
    e.persist();

    updateUser(() => ({
      ...user,
      name: e.target.value,
    }));
  };
  const surnameHandler = (e) => {
    e.persist();

    updateUser(() => ({
      ...user,
      surname: e.target.value,
    }));
  };

  // Get user info
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/user/`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // If user is found, update state with user info
        if (data._id) {
          updateUser(data);
        } else {
          window.location.href = "/login";
        }
      });
  }, []);

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
      onClose: () => window.location.reload(false),
    });

  // Upload profile picture
  const imageUpload = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "qbtecq1c");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dulra2azo/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();

    if (file.secure_url) {
      updateUser(() => ({
        ...user,
        pictureURL: file.secure_url,
      }));
    }
  };

  // Save profile picture URL to db
  const updateProfile = async () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pictureURL: user.pictureURL,
        name: user.name,
        surname: user.surname,
      }),
    };
    const userId = user._id;
    // Fetch request
    fetch(`/user/${userId}`, requestOptions).then(async (response) => {
      const data = await response.json();
      console.log(data);
      if (data._id) {
        notifySuc("Profile updated");
      } else {
        notifyErr("Error, profile not updated");
      }
    });
  };

  const classes = useStyles();
  return (
    <div id="profile-section">
      <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>

      <div id="profile-form-section">
      <h1>Profile</h1>
        <div id="profile-picture">
          <img src={user.pictureURL} alt="" />
        </div>

        <div id="choose-file">
          <input
            type="file"
            name="file"
            id="file"
            placeholder="Upload an image"
            onChange={imageUpload}
          />
        </div>

       
        <form className={classes.root} noValidate autoComplete="off">
          <div id="profile-text">
            <TextField
              onChange={nameHandler}
              id="name"
              placeholder={user.name}
              className={classes.textInput}
            />
            <br />
            <TextField
              onChange={surnameHandler}
              id="surname"
              placeholder={user.surname}
              className={classes.textInput}
            />
          </div>
        </form>
        <div id="profile-btns">
          <Button
            onClick={updateProfile}
            className={classes.btnCTA}
            variant="contained"
          >
            Update Profile
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
