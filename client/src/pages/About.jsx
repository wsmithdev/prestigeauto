import React from "react";
import ResponsiveNavbar from "../components/RespNavbar";

// Import CSS
import "./styles/aboutStyle.css";

// Import images
import BGImage from "../images/ferrari.jpg";

function About(props) {
  return (
    <div>
      <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>
      <div id="about-section">
        <h1>About Us</h1>
        <p>
        Prestige Auto motor club is a world-famous private club that gives
          its members the keys to a fleet of the most amazing cars ever built,
          from supercars and high-performance sedans to American muscle and
          modern SUVs. But it's not just about the cars, no matter how beautiful
          they are.
        </p>
        <p> 
          For more than a decade, Prestige Auto has been an escape from the
          ordinary and the cause of a riotous time, be it driving across
          the beautiful state of New York in a supercar, exploring Upstate New York
          in a 4X4 SUV or just sharing a drink and a story with fellow members
          at our events around New York. We are, Prestige Auto motor club.
        </p>
        <div id="about-image">
          <img src={BGImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default About;
