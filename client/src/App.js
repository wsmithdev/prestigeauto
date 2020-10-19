import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Cars from "./pages/Cars";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Membership from "./pages/Membership";
import Setup from "./pages/Setup";
import AddCar from "./pages/AddCar";
import RemoveCar from "./pages/RemoveCar";
import UpdateCar from "./pages/UpdateCar";

function App() {
  // State
  const [user, updateUser] = useState({});

  // Check if user is logged in
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
        }
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage user={user} />
          </Route>
          <Route exact path="/signup">
            <Signup user={user} />
          </Route>
          <Route exact path="/login">
            <Login user={user} />
          </Route>
          <Route exact path="/fleet">
            <Cars user={user} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} />
          </Route>
          <Route exact path="/contact">
            <Contact user={user} />
          </Route>
          <Route exact path="/membership">
            <Membership user={user} />
          </Route>
          <Route exact path="/about">
            <About user={user} />
          </Route>
          <Route exact path="/setup">
            <Setup user={user} />
          </Route>
          <Route exact path="/setup/add">
            <AddCar user={user} />
          </Route>
          <Route exact path="/setup/remove">
            <RemoveCar user={user} />
          </Route>
          <Route exact path="/setup/update">
            <UpdateCar user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
