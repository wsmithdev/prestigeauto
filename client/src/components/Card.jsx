import React, { useState } from "react";
import Modal from "react-modal";
import AliceCarousel from "react-alice-carousel";
import { CopyToClipboard } from "react-copy-to-clipboard";

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

// Icons
import dollarIcon from "../icons/dollar.png";
import transmissionIcon from "../icons/hand.png";
import seatIcon from "../icons/seat.png";
import engineIcon from "../icons/engine.png";
import axleIcon from "../icons/axle.png";

// CSS
import "../components/styles/cardStyle.css";
import "react-alice-carousel/lib/alice-carousel.css";

function CardItem(props) {
  // State
  const [modalIsOpen, setIsOpen] = useState(false);

  // MUI styles
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      backgroundColor: "rgb(66,66,66)",
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
      color: "#EB4440",
      marginBottom: "15px",
      textAlign: "center",
    },
    desciption: {
      fontSize: "1rem",
    },
    btn: {
      color: "#EB4440",
      margin: "auto",
      border: "1px solid #EB4440",
    },
    btnCTA: {
      color: "rgb(66,66,66)",
      backgroundColor: "#EB4440",
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

  const customStyles = {
    content: {
      top: "55vh",
      left: "50vw",
      right: "auto",
      bottom: "auto",
      marginRight: "-50vw",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#323232",
    },
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const bookNow = async () => {
    const userId = props.user._id;
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        carId: props.data._id,
      }),
    };

    // Fetch request
    fetch(`/user/book/${userId}`, requestOptions).then(async (response) => {
      const data = await response.json();
      console.log(data);
    });
  };

  return (
    <div id="card-item">
      <Card className={classes.root}>
        <Typography className={classes.title}>{props.data.make}</Typography>
        <CardActionArea onClick={openModal}>
          <CardMedia
            className={classes.imageArea}
            component="img"
            image={props.data.imagesURL[0]}
          />
          <CardContent>
            <Typography className={classes.subTitle}>
              {props.data.model}
            </Typography>
            <Typography className={classes.desciption}>
              <Grid container>
                <Grid item xs={6}>
                  <ul>
                    <li style={{ listStyle: "none" }}>
                      <Grid container direction="row" alignItems="center">
                        <Grid item>
                          <img width="40px" src={dollarIcon} alt="" />
                        </Grid>
                        <Grid item>Band {props.data.band}</Grid>
                      </Grid>
                    </li>
                    <li style={{ listStyle: "none" }}>
                      <Grid container direction="row" alignItems="center">
                        <Grid item>
                          <img width="40px" src={transmissionIcon} alt="" />
                        </Grid>
                        <Grid item>{props.data.transmission}</Grid>
                      </Grid>
                    </li>
                    <li style={{ listStyle: "none" }}>
                      <Grid container direction="row" alignItems="center">
                        <Grid item>
                          <img width="40px" src={axleIcon} alt="" />
                        </Grid>
                        <Grid item>{props.data.type}</Grid>
                      </Grid>
                    </li>
                  </ul>
                </Grid>
                <Grid item xs={6}>
                  <ul>
                    <li style={{ listStyle: "none" }}>
                      <Grid container direction="row" alignItems="center">
                        <Grid item>
                          <img width="40px" src={engineIcon} alt="" />
                        </Grid>
                        <Grid item>{props.data.power} BHP</Grid>
                      </Grid>
                    </li>
                    <li style={{ listStyle: "none" }}>
                      <Grid container direction="row" alignItems="center">
                        <Grid item>
                          <img width="40px" src={seatIcon} alt="" />
                        </Grid>
                        <Grid item>{props.data.seats}</Grid>
                      </Grid>
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={openModal}
            className={classes.btn}
            variant="outlined"
            fullWidth
          >
            See more
          </Button>
          {props.user.membership === "admin" ? (
            <>
              <CopyToClipboard
                text={props.data._id}
                onCopy={() => alert("ID number copied to clipboard")}
              >
                <Button
                  className={classes.btnCTA}
                  variant="contained"
                  fullWidth
                >
                  Copy ID
                </Button>
              </CopyToClipboard>
            </>
          ) : (
            <>
              <Button
                href="/contact"
                className={classes.btnCTA}
                variant="contained"
                fullWidth
              >
                Contact
              </Button>
            </>
          )}
        </CardActions>
      </Card>

      {/*  Modal  */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div id="close-btn">
          <Button className={classes.btn} onClick={closeModal}>
            Close
          </Button>
        </div>

        <div id="carousel">
          <AliceCarousel mouseTrackingEnabled>
            {props.data.imagesURL.map(function (item, i) {
              return (
                <div className="carousel-item">
                  <img key={i} src={props.data.imagesURL[i]} alt="" />
                </div>
              );
            })}
          </AliceCarousel>
        </div>
      </Modal>
    </div>
  );
}

export default CardItem;
