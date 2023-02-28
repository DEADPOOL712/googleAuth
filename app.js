const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");
const profileRoutes = require("./routes/profile-routes");
const apiRoutes = require("./routes/api-routes");
// set view engine
app.set("view engine", "ejs");

// cookieSession
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["aeoehanegfteiajdk"],
  })
);

// initialize passport and session
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

//connect to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(keys.mongoose.dbURL, () => {
  console.log("connected to mongodb !");
});

// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/api", apiRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("app now listening for requests on port 3000");
});
