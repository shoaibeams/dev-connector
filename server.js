const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./config/config").get(process.env.NODE_ENV);
const db = require("./config/keys");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//connect to mongodb -- Francis' way
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
// const db = require("./config/keys").mongoURI;

//connect to mongodb -- Brad's way

// mongoose
//   .connect(db)
//   .then(() => {
//     console.log("MongoDB Connected");
//   })
//   .catch(err => console.log(err));

//passport middleware

app.use(passport.initialize());

//passport Config
require("./config/passport")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
