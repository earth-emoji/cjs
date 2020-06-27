const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

require("dotenv").config();

// View engine setup
var hbs = exphbs.create({
  extname: "hbs",
  helpers: require("./helpers/viewHelpers/blockHelper").helpers(),
  // Uses multiple partials dirs, templates in "shared/templates/" are shared
  // with the client-side of the app (see below).
  partialsDir: ["views/partials/"],
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.use(express.static("public"));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const MONGODB_URI = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

app.use(session({
  secret: 'ilikecats',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./config/passport")(passport);
require("./routes/index")(app, passport);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
