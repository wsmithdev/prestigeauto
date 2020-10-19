import React from "react";
import ResponsiveNavbar from "../components/RespNavbar";

// Import custom components

// Import CSS
import "./styles/membershipStyle.css";

// Import icons
import Tick from "../icons/tick.png";
import Cancel from "../icons/cancel.png";
import Bronze from "../icons/bronze.png";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Membership(props) {
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
      fontSize: "1.4rem",
      color: "#982033",
      marginBottom: "15px",
    },
    desciption: {
      fontSize: "1rem",
    },
    btn: {
      color: "#982033",
      margin: "auto",
    },
    modalRoot: {
      width: "95vw",
      minHeight: "95vh",

      backgroundColor: "#323232",
      color: "#ffffff",
    },
  });
  const classes = useStyles();
  return (
    <div>
      <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>
      <div id="membership-section">
        <div className="membership-item" id="bronze">
          <div className="name">
            <img src={Bronze} alt="" />
            Bronze
            <img src={Bronze} alt="" />
          </div>
          <div className="price">120 points - $395 p/m</div>
          <div className="info">
            <ul>
              <li>
                <img src={Cancel} alt="" /> Unlimited milage
              </li>
              <li>
                <img src={Cancel} alt="" /> Free late returns
              </li>
              <li>
                <img src={Cancel} alt="" /> Free additional driver
              </li>
              <li>
                <img src={Cancel} alt="" /> Points rollover
              </li>
            </ul>
          </div>
        </div>

        <div className="membership-item" id="silver">
          <div className="name">Silver</div>
          <div className="price">240 points - $795 p/m</div>
          <div className="info">
            <ul>
              <li>
                <img src={Cancel} alt="" /> Unlimited milage
              </li>
              <li>
                <img src={Tick} alt="" /> Free late returns
              </li>
              <li>
                <img src={Cancel} alt="" /> Free additional driver
              </li>
              <li>
                <img src={Tick} alt="" /> Points rollover
              </li>
            </ul>
          </div>
        </div>

        <div className="membership-item" id="gold">
          <div className="name">Gold</div>
          <div className="price">360 points - $1195 p/m</div>
          <div className="info">
            <ul>
              <li>
                <img src={Tick} alt="" /> Unlimited milage
              </li>
              <li>
                <img src={Tick} alt="" /> Free late returns
              </li>
              <li>
                <img src={Tick} alt="" /> Free additional driver
              </li>
              <li>
                <img src={Tick} alt="" /> Points rollover
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
