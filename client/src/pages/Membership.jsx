import React from "react";
import ResponsiveNavbar from "../components/RespNavbar";

// Import CSS
import "./styles/membershipStyle.css";

// Import images
import Cars from "../images/cars.jpg";

// Import MUI components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// MUI styles
const useStyles = makeStyles((theme) => ({
  btn: {
    color: "#EB4440",
    border: "1px solid #EB4440",
    width: "50%",
    margin: "3px auto",
  },
  btnCTA: {
    color: "rgb(66,66,66)",
    backgroundColor: "#EB4440",
    width: "50%",
    margin: "3px auto",
  },
  textInput: {
    marginBottom: "20px",
    width: "100%",
  },
}));

function HowItWorks(props) {
  const classes = useStyles();
  return (
    <div>
      <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>
      <div id="memberships-section">
        <div id="section-1">
          <h1>VIP Memberships</h1>

          <p>
            A Presige Auto VIP Membership is a private motor car club that
            provides members with convenient access to the largest collection of
            the world’s greatest exotic and luxury car rentals right here in the
            greatest city in world, New York City.
          </p>

          <p>
            Choose a membership level that is right for you and offer the perks
            to your business associates or your friends and family. All VIP
            Membership levels include:
            <ul>
              <li>Comprehensive insurance</li>
              <li>Invites to Prestige Auto events</li>
              <li>Prestige Auto merchandise</li>
            </ul>
          </p>
          <div id="section-1-img">
            <img src={Cars} alt="" />
          </div>
        </div>

        <div id="section-2">
          <h1>VIP Membership Levels</h1>
          <div id="membership-cards">
            <div className="membership-card" id="card-1">
              <div className="membership-card-title">
                <div className="level">BRONZE</div>
                <div className="price">
                  <span>$</span>795
                </div>
                <div className="per-month">PER MONTH</div>
              </div>
              <div className="membership-card-items">
                <ul>
                  <li>120 points per year</li>
                  <li>Free additional driver (spouse only)</li>
                  <li>2 concierge calls per year</li>
                  <li>Free shuttle service from major airports in New York</li>
                </ul>
              </div>
              <div className="contact-btn">
                <Button
                  href="/contact"
                  className={classes.btnCTA}
                  variant="contained"
                >
                  Contact
                </Button>
              </div>
            </div>

            <div className="membership-card" id="card-2">
              <div className="membership-card-title">
                <div className="level">SILVER</div>
                <div className="price">
                  <span>$</span>1,295
                </div>
                <div className="per-month">PER MONTH</div>
              </div>
              <div className="membership-card-items">
                <ul>
                  <li>240 points per year</li>
                  <li>Free additional driver</li>
                  <li>6 concierge calls per year</li>
                  <li>Free delivery to major airports in New York</li>
                  <li>Access to Prestige Auto events</li>
                </ul>
              </div>
              <div className="contact-btn">
                <Button
                  href="/contact"
                  className={classes.btnCTA}
                  variant="contained"
                >
                  Contact
                </Button>
              </div>
            </div>

            <div className="membership-card" id="card-3">
              <div className="membership-card-title">
                <div className="level">GOLD</div>
                <div className="price">
                  <span>$</span>1,795
                </div>
                <div className="per-month">PER MONTH</div>
              </div>
              <div className="membership-card-items">
                <ul>
                  <li>360 points per year</li>
                  <li>Free unlimted additional drivers</li>
                  <li>Unlimited 24-Hour concierge</li>
                  <li>Free delivery in the New York metropolitan area</li>

                  <li>VIP access to Prestige Auto events</li>
                  <li>No fuel charge</li>
                </ul>
              </div>
              <div className="contact-btn">
                <Button
                  href="/contact"
                  className={classes.btnCTA}
                  variant="contained"
                >
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* <div id="section-3"></div> */}
      </div>
    </div>
  );
}

export default HowItWorks;
