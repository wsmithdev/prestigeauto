import React, { useEffect, useState } from "react";
import ResponsiveNavbar from "../components/RespNavbar";
import AliceCarousel from "react-alice-carousel";
import "./styles/homepageStyle.css";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

function HomePage(props) {
  //State
  const [images, setImages] = useState([]);

  // MUI styles
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      backgroundColor: "#323232",
      color: "#ffffff",
    },
    title: {
      fontSize: "2.5rem",
      height: "3rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      marginTop: "2rem",
      marginBottom: "2rem",
      fontFamily: "Snell Roundhand",
      
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
      margin: "auto",
      color: "rgb(66,66,66)",
      backgroundColor: "#EB4440",
      '&:hover': {
        transform: "scale(1.1)",
        backgroundColor: "#EB4440",
     }
    },
    
    modalRoot: {
      width: "95vw",
      minHeight: "95vh",

      backgroundColor: "#323232",
      color: "#ffffff",
    },

    
  });
  const classes = useStyles();

  // API request
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/cars/`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.reverse().slice(0, 7));
      });
  }, []);

  return (
    <div id="homepage-section">
      <div className="navbar">
        <ResponsiveNavbar user={props.user} />
      </div>

      <div id="latest-arrivals">
        {/* <Typography className={classes.title}>Browse through the latest exotics our club members get to drive.</Typography> */}
        
        <p>Browse through the latest exotics our club members get to drive.</p>

        <div id="slideshow">
          {images.length > 0 ? (
            <AliceCarousel
              autoPlay
              autoPlayInterval={1500}
              buttonsDisabled
              dotsDisabled
              duration={500}
            >
              {images.map(function (item, i) {
                return (
                  <div key={i} id="latest-arrivals-item">
                    <img src={images[i].imagesURL[0]} alt="" />
                  </div>
                );
              })}
            </AliceCarousel>
          ) : (
            ""
          )}
        </div>
      </div>
      <div id="fleet-btn">
        <Button
          href="/fleet"
          className={classes.btn}
          fullWidth
          variant="contained"
        >
          View fleet
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
