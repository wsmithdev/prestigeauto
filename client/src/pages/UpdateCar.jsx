import React, { useState } from "react";
import ResponsiveNavbar from "../components/RespNavbar";

// Import CSS
import "./styles/updateCarStyle.css";

// Import toastify components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function UpdateCar(props) {
  // State
  const [id, updateId] = useState();
  const [carInfo, updateCarInfo] = useState({});
  const [band, setBand] = useState();
  const [seats, setSeats] = useState();
  const [type, setType] = useState();
  const [transmission, setTransmission] = useState();
  let updatedCarInfo = {};

  // Input change handlers
  const bandHandler = (e) => {
    setBand(e.target.value);
  };
  const seatHandler = (e) => {
    setSeats(e.target.value);
  };
  const typeHandler = (e) => {
    setType(e.target.value);
  };
  const transmissionHandler = (e) => {
    setTransmission(e.target.value);
  };

  // Id input handler
  const handlerIdInput = (e) => {
    updateId(e.target.value);
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
      onClose: () => window.location.reload(false),
    });

  // Get request
  const handlerGetRequest = async () => {
    await fetch(`/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBand(data.band);
        setSeats(data.seats);
        setType(data.type);
        setTransmission(data.transmission);
        updateCarInfo(data);
      });
  };

  // Update request
  const handlerUpdateCar = () => {
    updatedCarInfo = {
      year: document.getElementById("year").value,
      make: document.getElementById("make").value,
      model: document.getElementById("model").value,
      band: band,
      seats: seats,
      type: type,
      power: document.getElementById("power").value,
      transmission: transmission,
    };

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCarInfo),
    };

    // Fetch request
    fetch(`/cars/update/${id}`, requestOptions)
      .then(async (res) => {
        const data = await res.json();

        if (data._id) {
          notifySuc("Car information updated");
        } else {
          notifyErr("Error, please try again");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        notifyErr("Error, please try again");
      });
  };

  const classes = useStyles();
  return (
    <div id="update-car-section">
      <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>

      <div id="update-car-form-section">
        <h1>Update Car</h1>

        <form className={classes.root} noValidate autoComplete="off">
          {!carInfo._id ? (
            <>
              <div id="update-car-text">
                <TextField
                  className={classes.textInput}
                  onChange={handlerIdInput}
                  id="id"
                  label="ID"
                />
              </div>

              <div id="update-car-btns">
                <Button
                  onClick={handlerGetRequest}
                  className={classes.btnCTA}
                  variant="contained"
                >
                  Find Car
                </Button>
              </div>
            </>
          ) : (
            ""
          )}

          {carInfo._id ? (
            <>
              <div id="update-car-text">
                <TextField
                  className={classes.textInput}
                  id="year"
                  label="Year"
                  type="text"
                  defaultValue={carInfo.year}
                />
                <br />
                <TextField
                  className={classes.textInput}
                  id="make"
                  label="Make"
                  type="text"
                  defaultValue={carInfo.make}
                />
                <br />
                <TextField
                  className={classes.textInput}
                  id="model"
                  label="Model"
                  type="text"
                  defaultValue={carInfo.model}
                />
                <br />
                <TextField
                  className={classes.textInput}
                  id="power"
                  label="Power"
                  type="text"
                  defaultValue={carInfo.power}
                />

                <InputLabel>Band</InputLabel>
                <Select
                  defaultValue={carInfo.band}
                  id="band"
                  value={band}
                  onChange={bandHandler}
                  className={classes.textInput}
                >
                  <MenuItem value={"A"}>A</MenuItem>
                  <MenuItem value={"B"}>B</MenuItem>
                  <MenuItem value={"C"}>C</MenuItem>
                  <MenuItem value={"D"}>D</MenuItem>
                  <MenuItem value={"E"}>E</MenuItem>
                  <MenuItem value={"F"}>F</MenuItem>
                </Select>

                <br />
                <InputLabel id="demo-simple-select-label">Seats</InputLabel>
                <Select
                  defaultValue={carInfo.seats}
                  labelId="demo-simple-select-label"
                  id="seats"
                  value={seats}
                  onChange={seatHandler}
                  className={classes.textInput}
                >
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"4"}>4</MenuItem>
                  <MenuItem value={"6"}>6</MenuItem>
                </Select>
                <br />
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  defaultValue={carInfo.type}
                  labelId="demo-simple-select-label"
                  id="type"
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

                <br />
                <InputLabel id="demo-simple-select-label">
                  Transmission
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="transmission"
                  value={transmission}
                  onChange={transmissionHandler}
                  className={classes.textInput}
                >
                  <MenuItem value={"Automatic"}>Automatic</MenuItem>
                  <MenuItem value={"Manual"}>Manual</MenuItem>
                </Select>
              </div>
              <div id="update-car-btns">
                <Button
                  onClick={handlerUpdateCar}
                  className={classes.btnCTA}
                  variant="contained"
                >
                  Update Car
                </Button>
              </div>
            </>
          ) : (
            ""
          )}
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default UpdateCar;
