import React, { useEffect, useState } from "react";

// Import custom components
import ResponsiveNavbar from "../components/RespNavbar";
import Card from "../components/Card";

// Import Material UI components
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

// Import CSS files
import "./styles/carsStyle.css";

function CarsPage(props) {
  // State
  const [carsData, updateCarsData] = useState([]);
  const [make, setMake] = useState("");
  const [makesArr, setMakesArr] = useState([]);

  // Retrieve all cars on intial page load
  useEffect(() => {
    getAllCars();
    // eslint-disable-next-line
  }, []);

  // Get all cars from backend
  const getAllCars = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/cars/`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        getMakes(data);
        updateCarsData(data.reverse());
      });
  };

  // Create array with car makes for filter search bar
  const getMakes = (dataArr) => {
    let allMakesArr = [];
    dataArr.forEach((car) => {
      allMakesArr.push(car.make);
    });
    // Remove duplicate values
    const makesArr = [...new Set(allMakesArr)];
    // Sort array
    const sortedMakesArr = makesArr.sort();
    setMakesArr(sortedMakesArr);
  };

  // Search Filter: Car make change handler
  const handleChange = (event) => {
    const make = event.target.value;
    setMake(make);
    applyFilter(make);
  };

  const applyFilter = (make) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    if (make === "All") {
      getAllCars();
      return;
    }

    fetch(`/cars/find/${make}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        updateCarsData(data);
      });
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
      marginLeft: "20px",
      marginTop: "10px",
      color: "#fff",
    },
    dropdownLabel: {
      color: "#EB4440",
    },
    dropdown: {
      color: "#fff",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    inputFocused: {
      backgroundColor: "#00FF00",
      color: "#00FF00",
    },
  }));
  const classes = useStyles();

  return (
    <div id="fleet-section">
      <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>
      <div id="search-filter">
        <FormControl className={classes.formControl}>
          <InputLabel
          
            className={classes.dropdownLabel}
          >
            Make
          </InputLabel>
          <Select
            className={classes.dropdown}
            value={make}
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            {makesArr.map(function (item, i) {
              return (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div id="cards">
        <Grid container>
          {carsData.map(function (item, i) {
            return (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={3}>
                <Card key={i} data={item} user={props.user} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default CarsPage;
