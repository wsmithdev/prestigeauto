import React, { useState } from "react";
import ResponsiveNavbar from "../components/RespNavbar";

// Import toastify components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import CSS
import "./styles/addCarStyle.css";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
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

function AddCar(props) {
  // State
  const [year, setYear] = useState();
  const [make, setMake] = useState();
  const [model, setModel] = useState();
  const [info, setInfo] = useState();
  const [band, setBand] = useState();
  const [seats, setSeats] = useState();
  const [type, setType] = useState();
  const [power, setPower] = useState();
  const [transmission, setTransmission] = useState();
  const [imageFile, setImageFile] = useState([]);

  // Input handlers
  const yearHandler = (e) => {
    setYear(e.target.value);
  };
  const makeHandler = (e) => {
    setMake(e.target.value);
  };
  const modelHandler = (e) => {
    setModel(e.target.value);
  };
  const infoHandler = (e) => {
    setInfo(e.target.value);
  };
  const bandHandler = (e) => {
    setBand(e.target.value);
  };
  const seatsHandler = (e) => {
    setSeats(e.target.value);
  };
  const typeHandler = (e) => {
    setType(e.target.value);
  };
  const powerHandler = (e) => {
    setPower(e.target.value);
  };
  const transmissionHandler = (e) => {
    setTransmission(e.target.value);
  };

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
      onClose: () => (window.location.href = "/cars"),
    });

  // Upload image to Cloudinary
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
      setImageFile([...imageFile, file.secure_url]);
    }
  };

  // Upload car
  const addCarHandler = () => {
    console.log("function triggered");
    // Post data to be sent
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year: year,
        make: make,
        model: model,
        info: info,
        band: band,
        seats: seats,
        type: type,
        power: power,
        transmission: transmission,
        imagesURL: imageFile,
      }),
    };

    // Fetch request
    fetch("/cars/new", requestOptions)
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        // Succesful login, redirect to /cars page
        if (data.car_id) {
          notifySuc("Car added");
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
    <div id="add-car-section">
      <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>

      <div id="add-car-form-section">
        <h1>Add Car</h1>

        <form className={classes.root} noValidate autoComplete="off">
          <div id="add-car-text">
            <TextField
              className={classes.textInput}
              onChange={yearHandler}
              id="year"
              label="Year"
            />
            <br />
            <TextField
              className={classes.textInput}
              onChange={makeHandler}
              id="Make"
              label="Make"
            />
            <br />
            <TextField
              className={classes.textInput}
              onChange={modelHandler}
              id="Model"
              label="Model"
            />
            <br />
            <TextField
              onChange={infoHandler}
              id="Info"
              label="Info"
              multiline
              className={classes.textInput}
            />
            <br />
            <TextField
              className={classes.textInput}
              onChange={bandHandler}
              id="Band"
              label="Band"
            />
            <br />
            <TextField
              className={classes.textInput}
              onChange={seatsHandler}
              id="Seats"
              label="Seats"
            />
            <br />
            <TextField
              className={classes.textInput}
              onChange={powerHandler}
              id="Power"
              label="Power"
            />
            <br />
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={typeHandler}
              className={classes.textInput}
            >
              <MenuItem value={"Supercar"}>Supercar</MenuItem>
              <MenuItem value={"Sedan"}>Sedan</MenuItem>
              <MenuItem value={"SUV"}>SUV</MenuItem>
              <MenuItem value={"Truck"}>Truck</MenuItem>
            </Select>
            <br />
            <InputLabel>Transmission</InputLabel>
            <Select
              value={transmission}
              onChange={transmissionHandler}
              className={classes.textInput}
            >
              <MenuItem value={"Automatic"}>Automatic</MenuItem>
              <MenuItem value={"Manual"}>Manual</MenuItem>
            </Select>
            <br />
            <input
              type="file"
              name="file"
              id="file"
              placeholder="Upload an image"
              onChange={imageUpload}
              className={classes.textInput}
            />
            <br />

            <br />
            {imageFile.map(function (item, i) {
              return (
                <div key={i}>
                  <img width="100%" src={item} alt="" />
                  <br/>
                </div>
              );
            })}
          </div>
        </form>
        <div id="add-car-btns">
          <Button
            onClick={addCarHandler}
            className={classes.btnCTA}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default AddCar;
