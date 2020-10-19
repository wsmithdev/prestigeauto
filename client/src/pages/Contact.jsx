import React, { useState } from "react";
import ResponsiveNavbar from "../components/RespNavbar";
import GoogleMapReact from "google-map-react";
import Pindrop from "../icons/pin.png";

// Imports CSS
import "./styles/contactStyle.css";

// Import Icons
import Phone from "../icons/phones.png";
import Location from "../icons/location.png";
import Facebook from "../icons/facebook.png";
import Instagram from "../icons/instagram.png";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Import toastify components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact(props) {
  // State
  const [name, setName] = useState(null);
  const [nameErr, setNameErr] = useState(false);

  const [email, setEmail] = useState(null);
  const [emailErr, setEmailErr] = useState(false);

  const [message, setMessage] = useState(null);
  const [messageErr, setMessageErr] = useState(false);

  const mapsInfo = {
    center: {
      NY: { lat: 40.75867, lng: -74.00333 },
    },
    zoom: 11,
  };

  // MUI styles
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      backgroundColor: "#323232",
      color: "#ffffff",
    },
    title: {
      fontSize: "1.6rem",
      height: "3rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    imageArea: {
      maxHeight: "180px",
    },
    subTitle: {
      display: "flex",
      fontSize: "1.4rem",
      color: "#982033",
      marginBottom: "15px",
      alignItems: "center",
      justifyContent: "center",
    },
    desciption: {
      fontSize: "1rem",
    },
    btnCTA: {
      color: "rgb(66,66,66)",
      backgroundColor: "#EB4440",
      width: "100%",
      margin: "3px auto",
    },
    modalRoot: {
      width: "95vw",
      minHeight: "95vh",

      backgroundColor: "#323232",
      color: "#ffffff",
    },
  });
  const classes = useStyles();

  // Create toastify notification banner
  const notifySuc = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  const notifyErr = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });

  // Input handlers
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const messageHandler = (e) => {
    setMessage(e.target.value);
  };
  const submitHandler = (e) => {
    // Check if "Name" was entered
    if (!name) {
      setNameErr(true);
    } else {
      setNameErr(false);
    }

    // Check if "Email" was entered
    if (!email) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }

    // Check if "Message" was entered
    if (!message) {
      setMessageErr(true);
    } else {
      setMessageErr(false);
    }

    if (!nameErr && !emailErr && !messageErr) {
      notifySuc("Message sent");
    } else {
      notifyErr("Error, please try again");
    }
  };

  return (
    <div>
      <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>
      <div id="contact-section">
        <div id="map">
          <GoogleMapReact
            defaultCenter={mapsInfo.center.NY}
            defaultZoom={mapsInfo.zoom}
          >
            <img style={{ width: "40px" }} src={Pindrop} alt="" />
          </GoogleMapReact>
        </div>
        <div id="contact-box">
         <h1>Prestige Auto</h1>
          <div id="contact-info">
          <div onClick={() => window.open("https://www.google.com/maps/place/40%C2%B045'31.2%22N+74%C2%B000'12.0%22W/@40.7586908,-74.0063682,16z/data=!4m5!3m4!1s0x0:0x0!8m2!3d40.7586667!4d-74.0033333?hl=en&authuser=0")}>
            <img src={Location} alt=""/> <p>408 12th Ave, New York, 10018</p> 
          </div>
          <div>
            <img src={Phone} alt=""/> <p>555-123-1234</p> 
          </div>
          <div onClick={() => window.open("https://www.facebook.com")}>
            <img src={Facebook} alt=""/> <p>Prestige Auto</p> 
          </div>
          <div onClick={() => window.open("https://www.instagram.com")}>
            <img src={Instagram} alt=""/> <p>@PrestigeAuto</p> 
          </div>
            
           
    
        
          </div>
          
         <h2>Get in touch</h2>
          <form noValidate autoComplete="off">
            <div>
              <TextField
                required
                margin="dense"
                label="Name"
                variant="outlined"
                fullWidth
                error={nameErr}
                onChange={nameHandler}
              />
              <TextField
                required
                margin="dense"
                label="Email"
                variant="outlined"
                fullWidth
                error={emailErr}
                onChange={emailHandler}
              />
              <TextField
                required
                margin="dense"
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                rowsMax={3}
                error={messageErr}
                onChange={messageHandler}
              />
            </div>
            <Button
              onClick={submitHandler}
              className={classes.btnCTA}
              fullWidth
              variant="contained"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Contact;
