const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const carsRoutes = require("./routes/carsRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDb
mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Database connection error", err));

// Routes
app.use(authRoutes);
app.use(carsRoutes);
app.use(userRoutes);

// Serve build
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Establish Port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
